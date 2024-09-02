// models/Notification.ts
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const NotificationSchema = new Schema(
  {
    user: { type: String },
    date: { type: String },
    title: { type: String },
    message: { type: String },
    status: { type: String, default: "unread" },
  },
  { timestamps: true }
);

const Notification =
  mongoose.models.Notification || model("Notification", NotificationSchema);

export default Notification;
