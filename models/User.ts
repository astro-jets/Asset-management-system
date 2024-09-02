// models/User.ts
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email required."],
    },
    password: { type: String, required: [true, "Password required."] },
    role: { type: String, required: true, default: "user" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || model("User", UserSchema);

export default User;
