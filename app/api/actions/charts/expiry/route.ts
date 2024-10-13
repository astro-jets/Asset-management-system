// pages/api/assets.ts
import dbConnect from "@/lib/db";
import Asset from "@/models/Asset";
import { AssetProps } from "@/types/asset";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await dbConnect();
  const assets = await Asset.find();
  const expired: AssetProps[] = [];
  const expiring: AssetProps[] = [];
  const unexpired: AssetProps[] = [];

  assets.map((asset) => {
    const creationDate = asset.createdAt;
    const fiveYearsLater = new Date(creationDate);
    fiveYearsLater.setFullYear(creationDate.getFullYear() + 5);

    const isExpired = new Date() > fiveYearsLater;
    if (isExpired) {
      expired.push({
        ...asset.toObject(), // Convert Mongoose document to plain object
      });
      return;
    } else {
      if (new Date().getFullYear() == fiveYearsLater.getFullYear()) {
        expiring.push({
          ...asset.toObject(),
        });
      } else {
        unexpired.push({
          ...asset.toObject(),
        });
      }
    }
  });

  const data = {
    unexpired: unexpired.length,
    expired: expired.length,
    expiring: expiring.length,
  };
  return NextResponse.json({ data }, { status: 201 });
}
