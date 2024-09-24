// models/Notification.ts
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const NotificationSchema = new Schema(
  {
    user: { type: String },
    title: { type: String },
    asset: { type: String },
    for: { type: String, default: "admin" },
    by: { type: String, default: "user" },
    message: { type: String },
    status: { type: String, default: "unread" },
  },
  { timestamps: true }
);

const Notification =
  mongoose.models.Notification || model("Notification", NotificationSchema);

export default Notification;
