// models/Assignment.ts
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const AssignmentSchema = new Schema(
  {
    user: {
      type: String,
    },
    asset: {
      type: String,
    },
  },
  { timestamps: true }
);

const Assignment =
  mongoose.models.Assignment || model("Assignment", AssignmentSchema);

export default Assignment;
