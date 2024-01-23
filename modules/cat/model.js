import mongoose from "mongoose";

const CatSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    note: { type: String, required: false },
    isActive: { type: Boolean, default: false },
    images: { type: [], default: [] },
    order: { type: Number, required: true },

  },
  { timestamps: true }
);

export const Cat = mongoose.model("Cat", CatSchema);

export default {
  Cat,
};
