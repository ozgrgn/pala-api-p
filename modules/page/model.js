import mongoose from "mongoose";

const PageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    perma: { type: String, required: true },
    lang: { type: String, required: false },
    content: { type: String, required: false },
   
  },
  { timestamps: true }
);

export const Page = mongoose.model("Page", PageSchema);

export default {
  Page,
};
