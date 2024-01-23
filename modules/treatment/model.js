import mongoose from "mongoose";

const TreatmentSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    title: { type: String, required: false },
    perma: { type: String, required: true },
    spot: { type: String, required: false },
    header: { type: String, required: false },
    shortDesc: { type: String, required: false },
    text: { type: String, required: false },
    hp: { type: Boolean, required: false },
    icon: { type: String, required: false },
    images: { type: [], default: [] },
    isActive: { type: Boolean, default: true },
    order: { type: Number, required: false },

  },
  { timestamps: true }
);

export const Treatment = mongoose.model("Treatment", TreatmentSchema);

export default {
  Treatment,
};
