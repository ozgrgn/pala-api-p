import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.contacts.create_contact] }),
  body(["lang"]).exists(),
  body([
    "header",
    "text",
    "spot",
    "title",
    "description",
  ]).optional(),
  validator,
  Controller.addContact
);

router.put(
  "/:contactId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.contacts.update_contact] }),
  param("contactId").exists(),
  body(["contact"]).exists(),
  validator,
  Controller.updateContact
);

router.delete(
  "/:contactId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.contacts.delete_contact] }),
  param("contactId").exists(),
  validator,
  Controller.deleteContact
);

router.get(
  "/",
  query(["startDate", "endDate", "lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getContacts
);

router.get(
  "/:contactId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.contacts.read_contact] }),
  param("contactId").exists(),
  validator,
  Controller.getContact
);
export default router;
