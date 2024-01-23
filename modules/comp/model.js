import mongoose from "mongoose";

const CompSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    note: { type: String, required: false },
    isActive: { type: Boolean, default: false },
  
  },
  { timestamps: true }
);

export const Comp = mongoose.model("Comp", CompSchema);

export default {
  Comp,
};
