import mongoose from "mongoose";

const TranslateSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    homePage: { type: String, required: false },
    about: { type: String, required: false },
    treatments: { type: String, required: false },
    contact: { type: String, required: false },
    language: { type: String, required: false },
    emergency_line: { type: String, required: false },
    weekdays: { type: String, required: false },
    weekendWorkDays: { type: String, required: false },
    monday: { type: String, required: false },
    tuesday: { type: String, required: false },
    wednesday: { type: String, required: false },
    thursday: { type: String, required: false },
    friday: { type: String, required: false },
    saturday: { type: String, required: false },
    sunday: { type: String, required: false },
    allTreatments: { type: String, required: false },
    get_in_touch_with_us: { type: String, required: false },
    call_us_anytime: { type: String, required: false },
    mail_us: { type: String, required: false },
    book_an_appointment: { type: String, required: false },
    write_us: { type: String, required: false },
    name: { type: String, required: false },
    phone: { type: String, required: false },
    mail: { type: String, required: false },
    send: { type: String, required: false },
    phone_required: { type: String, required: false },
    name_required: { type: String, required: false },
    email_required: { type: String, required: false },
    book: { type: String, required: false },
    address: { type: String, required: false },
    book_by_phone: { type: String, required: false },
    note: { type: String, required: false },
  },
  { timestamps: true }
);

export const Translate = mongoose.model("Translate", TranslateSchema);

export default {
  Translate,
};
