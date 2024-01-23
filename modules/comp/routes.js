import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.comps.create_comp] }),
  body([
    "name",
    "note",
    "isActive",
  ]).optional(),
  validator,
  Controller.addComp
);

router.put(
  "/:compId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.comps.update_comp] }),
  param("compId").exists(),
  body(["comp"]).exists(),
  validator,
  Controller.updateComp
);

router.delete(
  "/:compId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.comps.delete_comp] }),
  param("compId").exists(),
  validator,
  Controller.deleteComp
);

router.get(
  "/",
  query(["startDate", "endDate", "lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getComps
);

router.get(
  "/:compId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.comps.read_comp] }),
  param("compId").exists(),
  validator,
  Controller.getComp
);
export default router;
