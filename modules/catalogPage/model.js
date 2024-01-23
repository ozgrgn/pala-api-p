import mongoose from "mongoose";

const CatalogPageSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    type: { type: String, required: false },
    header: { type: String, required: false },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Cat",
    },
    image: { type: String, required: false },
    firstFull: {
      type: [mongoose.Schema.ObjectId],
      ref: "Product",
      required: false,
    },
    firstOne: {
      type: [mongoose.Schema.ObjectId],
      ref: "Product",
      required: false,
    },
    firstTwo: {
      type: [mongoose.Schema.ObjectId],
      ref: "Product",
      required: false,
    },
    firstDouble: {
      type: [mongoose.Schema.ObjectId],
      ref: "Product",
      required: false,
    },
    firstDoubleImage: { type: String, required: false },

    secondOne: {
      type: [mongoose.Schema.ObjectId],
      ref: "Product",
      required: false,
    },
    secondTwo: {
      type: [mongoose.Schema.ObjectId],
      ref: "Product",
      required: false,
    },
    secondDouble: {
      type: [mongoose.Schema.ObjectId],
      ref: "Product",
      required: false,
    },
    secondDoubleImage: { type: String, required: false },
    fullImage: {
      type: [mongoose.Schema.ObjectId],
      ref: "Product",
      required: false,
    },
    fullProduct: {
      type: [mongoose.Schema.ObjectId],
      ref: "Product",
      required: false,
    },
    fullProductImage: { type: String, required: false },
  },
  { timestamps: true }
);

export const CatalogPage = mongoose.model("CatalogPage", CatalogPageSchema);

export default {
  CatalogPage,
};
