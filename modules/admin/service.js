import jwt from "jsonwebtoken";
import CONFIG from "../../config.js";
import { checkPassword, hashPassword } from "../utilities/bcrypt.js";
import Model from "./model.js";
import { PermissionGroup } from "./permissionGroup/permissionGroup.model.js";
const getPermissionGroup = async (id) => {
    const permissionGroup = await PermissionGroup.findById(id)
    if (!permissionGroup) {
        throw new Error(
            JSON.stringify({
                en: "Permission group not found !",
                tr: "Yetki grubu bulunamadı !"
            })
        );
    }

    return permissionGroup;
}

const getOrganizers = async () => {



    const organizers = await Model.Admin.aggregate([
        {
            $lookup: {
                from: "permissiongroups",
                localField: "permissionGroup",
                foreignField: "_id",
                as: "permissionGroup"
            }
        },
        {
            $unwind: "$permissionGroup"
        },
        {
            $match: {
                "permissionGroup.permissions": "has_organizer"
            }
        }
    ])



    return { organizers };
};

const getAdmins = async (query = {}, options = {}) => {
    const { queryOptions } = options;

    const admins = await Model.Admin.find({ ...query, super: { $nin: [true] } }, {}, queryOptions)
        .sort({ created_at: -1 })
        .populate("permissionGroup")


    const count = await Model.Admin.countDocuments(query);

    return { admins, count };
};


const createAdmin = async (fullName, email, isSuper, permissionGroup, password) => {
    let admin = await Model.Admin.findOne({ email })

    if (admin) {
        throw new Error(
            JSON.stringify({
                en: "Admin already saved",
                tr: "Admin zaten kayıtlı"
            })
        );
    }
    password = await hashPassword(password);

    return await new Model.Admin({
        fullName, email, super: isSuper, permissionGroup, password
    }).save();
};


const login = async (email, password) => {
    const admin = await Model.Admin.findOne({ email }).populate("permissionGroup")
    if (!admin) {
        throw new Error(
            JSON.stringify({
                en: "Admin not found!",
                tr: "Admin bulunamadı !"
            })
        );
    }
    let check = await checkPassword(admin.password, password);
    if (!check) {
        throw new Error(
            JSON.stringify({
                en: "Wrong password or email",
                tr: "Yanlış şifre veya mail"
            })
        );
    }

    const expiresIn = Math.floor(Date.now() / 1000) + CONFIG.JWT.expiresIn;
    const token = jwt.sign(
        {
            adminId: admin._id.toString(),
            fullName: admin.fullName,
            email: admin.email,
            // exp: expiresIn,
            type: "admin",
            super: admin.super,
            permissions: admin && admin.permissionGroup && admin.permissionGroup.permissions
        },
        CONFIG.JWT.secret
    );

    let endDate = new Date();

    endDate.setSeconds(endDate.getSeconds() + CONFIG.JWT.expiresIn);

    return {
        admin,
        response: {
            token,
            expire_date: endDate.toISOString(),
            email: admin.email,
            adminId: admin.id, 
            fullName: admin.fullName,
            super:admin.super
        }
    };
}



const setAdminPermissionGroupByAdminId = async (adminId, permissionGroupId) => {
    const admin = await Model.Admin.findById(adminId)

    if (!admin) {
        throw new Error(
            JSON.stringify({
                en: "Admin not found!",
                tr: "Admin bulunamadı !"
            })
        );
    }


    try {
        const permissionGroup = await getPermissionGroup(permissionGroupId);

        admin.permissionGroup = permissionGroup._id;
        await admin.save();
        return admin;
    } catch (error) {
        throw new Error(
            error.message
        );
    }
}

const updateAdminStatusById = async (adminId, isActive) => {
    const updatedAdmin = await Model.Admin.findOneAndUpdate(
        { _id: adminId },
        { isActive },
        { returnOriginal: false }
    )

    if (!updatedAdmin) {
        throw new Error(
            JSON.stringify({
                en: "Admin is not found.",
                tr: "Admin bulunamadı."
            })
        );
    }

    return updatedAdmin;
}

const renewPassword = async (adminId, newPassword) => {
    const admin = await Model.Admin.findOne({ _id: adminId })

    if (!admin) {
        throw new Error(
            JSON.stringify({
                en: "Admin not found!",
                tr: "Admin bulunamadı !"
            })
        );
    }


    admin.password = await hashPassword(newPassword);
    await admin.save();
    LogService.systemLog("admin_password_reset", { admin });
    return password;
};

const getAdmin = async (query) => {
    return Model.Admin.findOne(query);
};

const updateAdmin = async (adminId, admin) => {
    try {
        let isExistAdmin = await Model.Admin.findById(adminId);

        if (!isExistAdmin) {
            throw new Error(
                JSON.stringify({
                    en: "Admin is not found.",
                    tr: "Admin bulunamadı.",
                })
            );
        }

        if (admin.password) {
            admin.password = await hashPassword(admin.password);
        } else {
            delete admin.password
        }

        return Model.Admin.findOneAndUpdate(
            { _id: isExistAdmin._id },
            { ...admin },
            { new: true }
        );
    } catch (error) {
        console.log("updateAdmin service error", error);
        throw new Error(error.message);
    }
};

const deleteAdmin = async (adminId) => {
    try {
        return Model.Admin.deleteOne({ _id: adminId });
    } catch (error) {
        console.log("deleteAdmin service error", error);
        throw new Error(error.message);
    }
};

export default {
    setAdminPermissionGroupByAdminId,
    getAdmins,
    getOrganizers,
    getAdmin,
    deleteAdmin,
    updateAdminStatusById,
    renewPassword,
    login,
    createAdmin,
    updateAdmin
}