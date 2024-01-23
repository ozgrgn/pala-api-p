import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.memberships.create_membership] }),
  body([
    "name",
    "note",
    "isActive",
  ]).optional(),
  validator,
  Controller.addMembership
);

router.put(
  "/:membershipId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.memberships.update_membership] }),
  param("membershipId").exists(),
  body(["membership"]).exists(),
  validator,
  Controller.updateMembership
);

router.delete(
  "/:membershipId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.memberships.delete_membership] }),
  param("membershipId").exists(),
  validator,
  Controller.deleteMembership
);

router.get(
  "/",
  query(["startDate", "endDate", "lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getMemberships
);

router.get(
  "/:membershipId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.memberships.read_membership] }),
  param("membershipId").exists(),
  validator,
  Controller.getMembership
);
export default router;
