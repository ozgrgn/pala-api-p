import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    header: { type: String, required: false },
    text: { type: String, required: false },
    spot: { type: String, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", ContactSchema);

export default {
  Contact,
};
