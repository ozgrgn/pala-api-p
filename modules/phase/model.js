import mongoose from "mongoose";

const PhaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    note: { type: String, required: false },
    isActive: { type: Boolean, default: false },
  
  },
  { timestamps: true }
);

export const Phase = mongoose.model("Phase", PhaseSchema);

export default {
  Phase,
};
