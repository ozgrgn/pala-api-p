import mongoose from "mongoose";

const LangSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    title: { type: String, required: false },
    order: { type: Number, required: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Lang = mongoose.model("Lang", LangSchema);

export default {
  Lang,
};
