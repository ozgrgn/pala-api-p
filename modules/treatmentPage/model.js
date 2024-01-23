import mongoose from "mongoose";

const TreatmentPageSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    text: { type: String, required: true },
    header: { type: String, required: false },
  },
  { timestamps: true }
);

export const TreatmentPage = mongoose.model("TreatmentPage", TreatmentPageSchema);

export default {
  TreatmentPage,
};
