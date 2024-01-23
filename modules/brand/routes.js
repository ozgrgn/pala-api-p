import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.brands.create_brand] }),
  body([
    "name",
    "note",
    "isActive",
  ]).optional(),
  validator,
  Controller.addBrand
);

router.put(
  "/:brandId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.brands.update_brand] }),
  param("brandId").exists(),
  body(["brand"]).exists(),
  validator,
  Controller.updateBrand
);

router.delete(
  "/:brandId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.brands.delete_brand] }),
  param("brandId").exists(),
  validator,
  Controller.deleteBrand
);

router.get(
  "/",
  query(["isActive"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getBrands
);

router.get(
  "/:brandId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.brands.read_brand] }),
  param("brandId").exists(),
  validator,
  Controller.getBrand
);
export default router;
