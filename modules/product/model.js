import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    no: { type: String, required: false },
    name: { type: String, required: true },
    cat: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Cat"
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Brand"
    },
    color: { type: String, required: false },
    units: { type: Array, default: [], required: false },
    prices: { type: Array, default: [], required: false },
    note: { type: String, required: false },
    order: { type: Number, required: false, default: 0 },
    isActive: { type: Boolean, default: false },
    images: { type: [], default: [] },
    stockCount: { type: Number, required: true, default: 0 },
    campaign: { type: Boolean, default: false },
    catalogName: { type: String, required: false },
    catalogDesc1: { type: String, required: false },
    catalogDesc2: { type: String, required: false },
    catalogActive: { type: Boolean, default: true },
    

  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);

const TestproductSchema = new mongoose.Schema(
  {
    no: { type: String, required: false },
    name: { type: String, required: true },
    cat: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Cat"
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Brand"
    },
    color: { type: String, required: false },
    units: { type: Array, default: [], required: false },
    prices: { type: Array, default: [], required: false },
    note: { type: String, required: false },
    order: { type: Number, required: false, default: 0 },
    isActive: { type: Boolean, default: false },
    images: { type: [], default: [] },
    stockCount: { type: Number, required: true, default: 0 },
    campaign: { type: Boolean, default: false },
    catalogName: { type: String, required: false },
    catalogDesc1: { type: String, required: false },
    catalogDesc2: { type: String, required: false },
    

  },
  { timestamps: true }
);

export const Testproduct = mongoose.model("Testproduct", TestproductSchema);

export default {
  Product,
  Testproduct,
};

