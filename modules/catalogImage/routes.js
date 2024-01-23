import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.catalogImages.create_catalogImage] }),
  body([
    "image",
    "place",
    "order",
  ]).optional(),
  validator,
  Controller.addCatalogImage
);

router.put(
  "/:catalogImageId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.catalogImages.update_catalogImage] }),
  param("catalogImageId").exists(),
  body(["catalogImage"]).exists(),
  validator,
  Controller.updateCatalogImage
);

router.delete(
  "/:catalogImageId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.catalogImages.delete_catalogImage] }),
  param("catalogImageId").exists(),
  validator,
  Controller.deleteCatalogImage
);

router.get(
  "/",
  query(["isActive"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getCatalogImages
);

router.get(
  "/:catalogImageId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.catalogImages.read_catalogImage] }),
  param("catalogImageId").exists(),
  validator,
  Controller.getCatalogImage
);
export default router;
