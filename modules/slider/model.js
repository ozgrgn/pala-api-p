import mongoose from "mongoose";

const SliderSchema = new mongoose.Schema(
  {
    image: { type: String, required: true  },
    order: { type: Number, required: false },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Slider = mongoose.model("Slider", SliderSchema);

export default {
  Slider,
};
