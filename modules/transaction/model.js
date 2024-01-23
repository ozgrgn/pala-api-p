import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    no: { type: Number, required: false, default: 1 },
    date: { type: String, required: true },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer"
    },
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Membership"
    },
    salesItems: { type: Array, default: [], required: false },
    customerData: { type: Object, default: null, required: false },
    phase: { type: String, required: false }, //stocktaking, order, prepared, cargo, delivered, cancel
    oldPhase: { type: String, required: false },
    total: { type: Number, required: false },
    note: { type: String, required: false },
    isActive: { type: Boolean, default: false },
    kdv:{ type: Number, required: false },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", TransactionSchema);

export default {
  Transaction,
};

