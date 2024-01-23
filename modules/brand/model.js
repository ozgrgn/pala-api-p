import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    note: { type: String, required: false },
    isActive: { type: Boolean, default: false },
  
  },
  { timestamps: true }
);

export const Brand = mongoose.model("Brand", BrandSchema);

export default {
  Brand,
};
