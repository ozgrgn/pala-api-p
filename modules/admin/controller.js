import PERMISSONS from "./permissions.js"
import Service from "./service.js"
import _ from "lodash"
const getPermissions = (req, res) => {
    return res.json({ status: true, permissions: PERMISSONS })
}


const verifyToken = async (req, res) => {
    return res.json({ status: true, ...req.admin });
};

const getOrganizers = async (req, res) => {
    try {
        let organizers = await Service.getOrganizers();

        return res.json({ status: true, ...organizers });
    } catch (error) {
        console.log(error.message, "getOrganizers error");
        return res.json({ status: false, message: error.message });
    }
};
const getAdmins = async (req, res) => {
    const { limit, skip, startDate, endDate, customQuery } = req.query;

    try {
        const adminsQuery = _.omitBy(
            {
                ...JSON.parse(customQuery),
                created_at:
                    startDate || endDate
                        ? {
                            $gte: startDate
                                ? new Date(startDate)
                                : moment().startOf("day").toDate(),
                            $lte: endDate
                                ? new Date(endDate)
                                : moment().endOf("day").toDate(),
                        }
                        : undefined,
            },
            (a) => a === undefined
        );
        let admins = await Service.getAdmins(adminsQuery, {
            queryOptions: { limit, skip },
        });

        return res.json({ status: true, ...admins });
    } catch (error) {
        console.log(error.message, "getAdmins error");
        return res.json({ status: false, message: error.message });
    }
};

async function createAdmin(req, res) {
    const { clientIp } = req;
    const { adminId } = req.admin
    const { fullName, email, super: isSuper, permissionGroup, password } = req.body

    try {
        let admin = await Service.createAdmin(fullName, email, isSuper, permissionGroup, password)
        return res.json({
            status: true,
            admin,
            message: JSON.stringify({ en: "The process successful.", tr: "İşlem başarı ile tamamlandı." })
        });
    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const { clientIp } = req;

    try {
        let login = await Service.login(email, password)
        return res.json({
            status: true,
            ...login.response,
            message: JSON.stringify({ en: "Login successful.", tr: "Giriş başarılı." })
        });
    } catch (error) {
        return res.json({ status: false, message: error.message });
    }



}

const renewPassword = async (req, res) => {
    const { adminId } = req.params;
    const { newPassword } = req.body;


    try {
        await Service.renewPassword(adminId, newPassword)

        return res.json({
            status: true,
            message: JSON.stringify({
                en: "Admin password settled successfuly.",
                tr: "Admin parolası güncellendi."
            })
        });
    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
}

const updateAdminStatusById = async (req, res) => {
    const { adminId, isActive } = req.params;

    try {
        let updatedAdmin = await Service.updateAdminStatusById(adminId, isActive)
        return res.json({
            status: true,
            updatedAdmin,
            message: JSON.stringify({ en: "Update was successfull.", tr: "Güncelleme işlemi başarılı" })
        });
    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
}


const setAdminPermissionGroup = async (req, res) => {
    const { adminId } = req.params;
    const { clientIp } = req;
    const { adminId: superAdminId } = req.admin;
    const { permissionGroup } = req.body;

    try {
        let admin = await Service.setAdminPermissionGroupByAdminId(adminId, permissionGroup)

        return res.json({
            status: true,
            admin,
            message: JSON.stringify({
                en: "Admin permission group was changed.",
                tr: "Admin yetki grubu değiştirildi."
            })
        });

    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
}


const getAdmin = async (req, res) => {
    try {
        const AdminQuery = _.omitBy(
            {
                _id: req.params.adminId,
            },
            (a) => a === undefined
        );

        let admin = await Service.getAdmin(AdminQuery);
        return res.json({ status: true, admin });
    } catch (error) {
        console.log(error.message, "getAdmin error");
        return res.json({ status: false, message: error.message });
    }
};


const updateAdmin = async (req, res) => {
    const { admin } = req.body;
    const { adminId } = req.params;
    try {
        let updatedAdmin = await Service.updateAdmin(adminId, admin);

        return res.json({
            status: true,
            updatedAdmin,
        });
    } catch (error) {
        console.log(error.message, "updateAdmin error");
        return res.json({ status: false, message: error.message });
    }
};


const deleteAdmin = async (req, res) => {
    const { adminId } = req.params;

    try {
        await Service.deleteAdmin(adminId);

        return res.json({
            status: true,
        });
    } catch (error) {
        console.log(error.message, "deleteAdmin error");
        return res.json({ status: false, message: error.message });
    }
};
export default {
    getPermissions,
    getAdmins,
    getOrganizers,
    getAdmin,
    verifyToken,
    login,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    renewPassword,
    updateAdminStatusById,
    setAdminPermissionGroup
}

