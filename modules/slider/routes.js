import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.sliders.create_slider] }),
  body(["image"]).exists(),
  body([
    "order",
    "isActive",
  ]).optional(),
  validator,
  Controller.addSlider
);

router.put(
  "/:sliderId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.sliders.update_slider] }),
  param("sliderId").exists(),
  body(["slider"]).exists(),
  validator,
  Controller.updateSlider
);

router.delete(
  "/:sliderId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.sliders.delete_slider] }),
  param("sliderId").exists(),
  validator,
  Controller.deleteSlider
);

router.get(
  "/",
  query(["startDate", "endDate","lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getSliders
);

router.get(
  "/:sliderId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.sliders.read_slider] }),
  param("sliderId").exists(),
  validator,
  Controller.getSlider
);
router.get("/last/slider", validator, Controller.getSliderLastSort);
export default router;

