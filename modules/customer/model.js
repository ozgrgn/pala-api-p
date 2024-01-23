import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    no: { type: String, required: false },
    name: { type: String, required: true },
    surname: { type: String, required: false },
    country: { type: String, required: false },
    street: { type: String, required: false },
    post: { type: String, required: false },
    city: { type: String, required: false },
    person: { type: String, required: false },
    phone: { type: String, required: false },
    mobile: { type: String, required: false },
    email: { type: String, required: false },
    note: { type: String, required: false },
    other: { type: String, required: false },
    basket: { type: Object, required: false },
    status: { type: Object, required: false },
    isActive: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User"
    },
    images: { type: [], default: [] },
  },
  { timestamps: true }
);

export const Customer = mongoose.model("Customer", CustomerSchema);

export default {
  Customer,
};
