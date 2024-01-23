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

  body([
    "no",
    "name",
    "surname",
    "country",
    "street",
    "post",
    "city",
    "phone",
    "email",
    "note",
    "membership",
    "basket",
    "order",
    "isActive",
    "status",
    "images",
    "user"

  ]).optional(),
  validator,
  Controller.addCustomer
);

router.put(
  "/:customerId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.customers.update_customer] }),
  param("customerId").exists(),
  body(["customer"]).exists(),
  validator,
  Controller.updateCustomer
);

router.delete(
  "/:customerId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.customers.delete_customer] }),
  param("customerId").exists(),
  validator,
  Controller.deleteCustomer
);

router.get(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.customers.read_customer] }),
  query(["isActive","search","sortValue"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getCustomers
);


router.get(
  "/byUserId",
  routeGuard(),
  validator,
  Controller.getCustomersByUserId
);

router.get(
  "/:customerId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.customers.read_customer] }),
  param("customerId").exists(),
  validator,
  Controller.getCustomer
);
export default router;
