import express from "express";
const router = express.Router();
import Controller from "./controller.js"
import PermissionGroupRouter from "./permissionGroup/permissionGroup.router.js"
import { param, body, query } from "express-validator"
import validator from "../middlewares/validator.js"
import adminRouteGuard from "../middlewares/adminRouteGuard.js"
import PERMISSONS from "./permissions.js"


router.use("/permissionGroup", PermissionGroupRouter);

router.get(
    "/permissions",
    adminRouteGuard({ requirePermissions: [PERMISSONS.permissions.read_permissions] }),
    validator,
    Controller.getPermissions
);


router.get(
    "/",
    adminRouteGuard({ requirePermissions: [PERMISSONS.admins.read_admins] }),
    query(["startDate", "endDate", "customQuery"]).optional(),
    query(["limit", "skip"]).optional().toInt().isInt(),
    validator,
    Controller.getAdmins
);

router.get(
    "/organizers",
    adminRouteGuard({ requirePermissions: [PERMISSONS.admins.read_admins] }),
    Controller.getOrganizers
);

router.get(
    "/:adminId",
    adminRouteGuard({ requirePermissions: [PERMISSONS.admins.read_admin] }),
    param("adminId").exists(),
    validator,
    Controller.getAdmin
);


router.patch(
    "/:adminId/status/:isActive",
    adminRouteGuard({ requirePermissions: [PERMISSONS.admins.update_admin_status] }),
    param("adminId").isMongoId(),
    param("isActive").isBoolean(),
    validator,
    Controller.updateAdminStatusById
);

router.put(
    "/:adminId",
    adminRouteGuard({ requirePermissions: [PERMISSONS.admins.update_admin] }),
    param("adminId").exists(),
    body(["admin"]).exists(),
    validator,
    Controller.updateAdmin
);


router.post(
    "/login",
    body("password").exists().isString(),
    body("email").exists().isEmail(),
    validator,
    Controller.login
);

router.post(
    "/",
    adminRouteGuard({ requirePermissions: [PERMISSONS.admins.write_admin] }),
    body("email").exists().isEmail(),
    body(["fullName", "password"]).exists().isString(),
    body("super").optional().isBoolean(),
    body("permissionGroup").optional().isString(),
    validator,
    Controller.createAdmin
);

router.patch(
    "/:adminId/permissionGroup",
    adminRouteGuard({ requirePermissions: [PERMISSONS.admins.update_admin_permissionGroup] }),
    param("adminId").isMongoId(),
    body("permissionGroup").isString(),
    validator,
    Controller.setAdminPermissionGroup
);

router.put(
    "/:adminId/renewPassword",
    adminRouteGuard(),
    param("adminId").exists().isMongoId(),
    body("newPassword").isString(),
    validator,
    Controller.renewPassword
);

router.post(
    "/verifyToken",
    adminRouteGuard(),
    Controller.verifyToken
);

router.delete(
    "/:adminId",
    adminRouteGuard({ requirePermissions: [PERMISSONS.admins.delete_admin] }),
    param("adminId").exists(),
    validator,
    Controller.deleteAdmin
);


export default router;