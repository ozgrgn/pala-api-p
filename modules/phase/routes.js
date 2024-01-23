import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.phases.create_phase] }),
  body([
    "name",
    "note",
    "isActive",
  ]).optional(),
  validator,
  Controller.addPhase
);

router.put(
  "/:phaseId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.phases.update_phase] }),
  param("phaseId").exists(),
  body(["phase"]).exists(),
  validator,
  Controller.updatePhase
);

router.delete(
  "/:phaseId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.phases.delete_phase] }),
  param("phaseId").exists(),
  validator,
  Controller.deletePhase
);

router.get(
  "/",
  query(["startDate", "endDate", "lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getPhases
);

router.get(
  "/:phaseId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.phases.read_phase] }),
  param("phaseId").exists(),
  validator,
  Controller.getPhase
);
export default router;
