import mongoose from "mongoose";

const MembershipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    note: { type: String, required: false },
    isActive: { type: Boolean, default: false },
  
  },
  { timestamps: true }
);

export const Membership = mongoose.model("Membership", MembershipSchema);

export default {
  Membership,
};
