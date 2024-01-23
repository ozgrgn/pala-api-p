import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
import routeGuard from "../middlewares/routeGuard.js";

router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.products.create_product] }),
  body([
    "no",
    "name",
    "cat",
    "brand",
    "color",
    "name",
    "units",
    "prices",
    "note",
    "order",
    "isActive",
    "images",
    "stockCount",
    "catalogName",
    "catalogDesc1",
    "catalogDesc2",
  ]).optional(),
  validator,
  Controller.addProduct
);

router.put(
  "/:productId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.products.update_product] }),
  param("productId").exists(),
  body(["product"]).exists(),
  validator,
  Controller.updateProduct
);

router.delete(
  "/:productId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.products.delete_product] }),
  param("productId").exists(),
  validator,
  Controller.deleteProduct
);

router.get(
  "/",
  query([
    "cat",
    "brand",
    "isActive",
    "search",
    "campaign",
    "catalogActive",
  ]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getProducts
);

router.get(
  "/:productId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.products.read_product] }),
  param("productId").exists(),
  validator,
  Controller.getProduct
);
router.get(
  "/user/:productId",
  routeGuard(),
  param("productId").exists(),
  validator,
  Controller.getProductById
);
router.put(
  "/update/updatePrices",
  adminRouteGuard({ requirePermissions: [PERMISSONS.products.update_product] }),
  body("newProducts").exists(),
  validator,
  Controller.updatePrices
);

export default router;
