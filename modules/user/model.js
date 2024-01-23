import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    phone: String,
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Membership"
    },
    email: { type: String, required: false },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);


export default { User }