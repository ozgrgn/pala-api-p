import mongoose from "mongoose";

const CatalogImageSchema = new mongoose.Schema(
  {
    image: { type: String},
    place:{ type: String },
    order:{ type: Number},
    

  
  },
  { timestamps: true }
);

export const CatalogImage = mongoose.model("CatalogImage", CatalogImageSchema);

export default {
  CatalogImage,
};
