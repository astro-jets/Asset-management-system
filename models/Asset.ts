// models/Asset.ts
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const AssetSchema = new Schema(
  {
    name: { type: String, required: true },
    cost: { type: String, required: true },
    path: { type: String, required: true },
    qrCode: {
      type: String,
    },
  },
  { timestamps: true }
);

const Asset = mongoose.models.Asset || model("Asset", AssetSchema);

export default Asset;
