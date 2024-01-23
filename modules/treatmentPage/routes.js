import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.treatmentPages.create_treatmentPage] }),
  body(["lang"]).exists(),
  body([
    "header","text"
  ]).optional(),
  validator,
  Controller.addTreatmentPage
);

router.put(
  "/:treatmentPageId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.treatmentPages.update_treatmentPage] }),
  param("treatmentPageId").exists(),
  body(["treatmentPage"]).exists(),
  validator,
  Controller.updateTreatmentPage
);

router.delete(
  "/:treatmentPageId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.treatmentPages.delete_treatmentPage] }),
  param("treatmentPageId").exists(),
  validator,
  Controller.deleteTreatmentPage
);

router.get(
  "/",
  query(["startDate", "endDate","lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getTreatmentPages
);

router.get(
  "/:treatmentPageId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.treatmentPages.read_treatmentPage] }),
  param("treatmentPageId").exists(),
  validator,
  Controller.getTreatmentPage
);
export default router;

