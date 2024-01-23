import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.units.create_unit] }),
  body([
    "name",
    "note",
    "isActive",
  ]).optional(),
  validator,
  Controller.addUnit
);

router.put(
  "/:unitId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.units.update_unit] }),
  param("unitId").exists(),
  body(["unit"]).exists(),
  validator,
  Controller.updateUnit
);

router.delete(
  "/:unitId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.units.delete_unit] }),
  param("unitId").exists(),
  validator,
  Controller.deleteUnit
);

router.get(
  "/",
  query(["startDate", "endDate", "lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getUnits
);

router.get(
  "/:unitId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.units.read_unit] }),
  param("unitId").exists(),
  validator,
  Controller.getUnit
);
export default router;
