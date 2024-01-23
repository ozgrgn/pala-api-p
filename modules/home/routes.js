import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.homes.create_home] }),
  body(["lang"]).exists(),
  body([
    "form_header",
    "form_text",
    "treatment_spot",
    "treatment_header",
    "review_spot",
    "review_header",
    "map_spot",
    "map_header",
    "map_box_header",
    "map_box_desc"
  ]).optional(),
  validator,
  Controller.addHome
);

router.put(
  "/:homeId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.homes.update_home] }),
  param("homeId").exists(),
  body(["home"]).exists(),
  validator,
  Controller.updateHome
);

router.delete(
  "/:homeId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.homes.delete_home] }),
  param("homeId").exists(),
  validator,
  Controller.deleteHome
);

router.get(
  "/",
  query(["startDate", "endDate","lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getHomes
);

router.get(
  "/:homeId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.homes.read_home] }),
  param("homeId").exists(),
  validator,
  Controller.getHome
);
export default router;

