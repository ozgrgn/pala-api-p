import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.cats.create_cat] }),
  body([
    "name",
    "note",
    "isActive",
    "images",
    "order"

  ]).optional(),
  validator,
  Controller.addCat
);

router.put(
  "/:catId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.cats.update_cat] }),
  param("catId").exists(),
  body(["cat"]).exists(),
  validator,
  Controller.updateCat
);

router.delete(
  "/:catId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.cats.delete_cat] }),
  param("catId").exists(),
  validator,
  Controller.deleteCat
);

router.get(
  "/",
  query(["isActive"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getCats
);

router.get(
  "/:catId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.cats.read_cat] }),
  param("catId").exists(),
  validator,
  Controller.getCat
);
export default router;
