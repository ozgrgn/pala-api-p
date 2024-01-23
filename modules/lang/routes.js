import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.langs.create_lang] }),
  body(["lang", "order", "title", "isActive"]).exists(),
  validator,
  Controller.addLang
);

router.put(
  "/:langId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.langs.update_lang] }),
  param("langId").exists(),
  body(["lang"]).exists(),
  validator,
  Controller.updateLang
);

router.delete(
  "/:langId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.langs.delete_lang] }),
  param("langId").exists(),
  validator,
  Controller.deleteLang
);

router.get(
  "/",
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getLangs
);

router.get(
  "/:langId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.langs.read_lang] }),
  param("langId").exists(),
  validator,
  Controller.getLang
);
export default router;
