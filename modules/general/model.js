import mongoose from "mongoose";

const GeneralSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    phone1: { type: String, required: false },
    phone2: { type: String, required: false },
    address1: { type: String, required: false },
    address2: { type: String, required: false },
    email1: { type: String, required: false },
    email2: { type: String, required: false },
    facebook: { type: String, required: false },
    instagram: { type: String, required: false },
    youtube: { type: String, required: false },
    whatsapp: { type: String, required: false },
    copright: { type: String, required: false },
    weekend: { type: String, required: false },
    weekday: { type: String, required: false },
    shortDesc: { type: String, required: false },
    logo1: { type: String, required: false },
    logo2: { type: String, required: false },
    map1: { type: String, required: false },
    map2: { type: String, required: false },
    other1: { type: String, required: false },
    brand: { type: String, required: false },
  },
  { timestamps: true }
);

export const General = mongoose.model("General", GeneralSchema);

export default {
  General,
};
