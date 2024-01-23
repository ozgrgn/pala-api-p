import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.catalogPages.create_catalogPage],
  }),
  body([
    "number",
    "type",
    "category",
    "header",
    "image",
    "firstFull",
    "firstOne",
    "firstTwo",
    "firstDouble",
    "firstDoubleImage",
    "secondOne",
    "secondTwo",
    "secondDouble",
    "secondDoubleImage",
    "fullImage",
    "fullProduct",
    "fullProductImage",
  ]).optional(),
  validator,
  Controller.addCatalogPage
);

router.put(
  "/:catalogPageId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.catalogPages.update_catalogPage],
  }),
  param("catalogPageId").exists(),
  body(["catalogPage"]).exists(),
  validator,
  Controller.updateCatalogPage
);

router.delete(
  "/:catalogPageId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.catalogPages.delete_catalogPage],
  }),
  param("catalogPageId").exists(),
  validator,
  Controller.deleteCatalogPage
);

router.get(
  "/",
  query(["startDate", "endDate", "lang", "category"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getCatalogPages
);

router.get(
  "/:catalogPageId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.catalogPages.read_catalogPage],
  }),
  param("catalogPageId").exists(),
  validator,
  Controller.getCatalogPage
);
export default router;
