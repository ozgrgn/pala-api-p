import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.pages.create_page] }),
  body(["name","perma"]).exists(),
  body(["lang", "content"]).optional(),
  validator,
  Controller.addPage
);

router.put(
  "/:pageId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.pages.update_page] }),
  param("pageId").exists(),
  body(["page"]).exists(),
  validator,
  Controller.updatePage
);

router.delete(
  "/:pageId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.pages.delete_page] }),
  param("pageId").exists(),
  validator,
  Controller.deletePage
);
//warning adminRouteGuard
router.get(
  "/",
  query(["lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getPages
);

router.get(
  "/:pageId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.pages.read_page] }),
  param("pageId").exists(),
  validator,
  Controller.getPage
);
router.get(
  "/perma/:perma",
  param("perma").exists(),
  validator,
  Controller.getPageViaPerma
);

export default router;
