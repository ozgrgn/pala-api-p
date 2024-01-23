import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.generals.create_general] }),
  body("lang").exists(),
  body([
    "phone1",
    "phone2",
    "address1",
    "address2",
    "email1",
    "email2",
    "facebook",
    "instagram",
    "youtube",
    "whatsapp",
    "copright",
    "weekend",
    "weekday",
    "shortDesc",
    "logo1",
    "logo2",
    "map1",
    "map2",
    "other1",
    "brand",
   
  ]).optional(),
  validator,
  Controller.addGeneral
);

router.put(
  "/:generalId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.generals.update_general] }),
  param("generalId").exists(),
  body(["general"]).exists(),
  validator,
  Controller.updateGeneral
);

router.delete(
  "/:generalId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.generals.delete_general] }),
  param("generalId").exists(),
  validator,
  Controller.deleteGeneral
);
//warning adminRouteGuard
router.get(
  "/",
  query(["lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getGenerals
);

router.get(
  "/:generalId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.generals.read_general] }),
  param("generalId").exists(),
  validator,
  Controller.getGeneral
);
router.get(
  "/perma/:perma",
  param("perma").exists(),
  validator,
  Controller.getGeneralViaPerma
);

export default router;
