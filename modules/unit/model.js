import mongoose from "mongoose";

const UnitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    note: { type: String, required: false },
    isActive: { type: Boolean, default: false },
  
  },
  { timestamps: true }
);

export const Unit = mongoose.model("Unit", UnitSchema);

export default {
  Unit,
};
