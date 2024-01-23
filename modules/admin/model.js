import mongoose from "mongoose"

const AdminSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        boxOffices: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Category",
            default: []
        },
        permissionGroup: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "PermissionGroup"
        },
        isActive: { type: Boolean, default: true },
        super: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export const Admin = mongoose.model("admin", AdminSchema);

export default { Admin }

