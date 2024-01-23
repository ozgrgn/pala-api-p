import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import routeGuard from "../middlewares/routeGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.transactions.create_transaction] }),
  body([
    "no",
    "date",
    "phase",
    "customer",
    "salesItems",
    "total",
    "kdv"
  ]).optional(),
  validator,
  Controller.addTransaction
);


router.post(
  "/byUserId",
  routeGuard(),
  body([
    "customerId",
    "salesItems",
    "total",
    "kdv"
  ]).optional(),
  validator,
  Controller.addTransactionByUserId
);

router.put(
  "/:transactionId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.transactions.update_transaction] }),
  param("transactionId").exists(),
  body(["transaction"]).exists(),
  validator,
  Controller.updateTransaction
);

router.delete(
  "/:transactionId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.transactions.delete_transaction] }),
  param("transactionId").exists(),
  validator,
  Controller.deleteTransaction
);

router.get(
  "/",
  query(["startDate", "endDate", "lang","customer"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getTransactions
);

router.get(
  "/:transactionId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.transactions.read_transaction] }),
  param("transactionId").exists(),
  validator,
  Controller.getTransaction
);

router.get(
  "/user/byUserId",
  routeGuard(),
  validator,
  Controller.getTransactionsByUserId
);
export default router;
