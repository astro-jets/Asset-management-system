// models/Maintenance.ts
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const MaintenanceSchema = new Schema(
  {
    user: {
      type: String,
    },
    asset: {
      type: String,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Maintenance =
  mongoose.models.Maintenance || model("Maintenance", MaintenanceSchema);

export default Maintenance;
