import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    form_header: { type: String, required: false },
    form_text: { type: String, required: false },
    treatment_spot: { type: String, required: false },
    treatment_header: { type: String, required: false },
    review_spot: { type: String, required: false },
    review_header: { type: String, required: false },
    map_spot: { type: String, required: false },
    map_header: { type: String, required: false },
    map_box_header: { type: String, required: false },
    map_box_desc: { type: String, required: false },

  },
  { timestamps: true }
);

export const Home = mongoose.model("Home", HomeSchema);

export default {
  Home,
};
