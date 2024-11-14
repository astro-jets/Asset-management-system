// pages/api/assets.ts
import dbConnect from "@/lib/db";
import Asset from "@/models/Asset";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const assetName = searchParams.get("asset");

    const assets = await Asset.find({ name: assetName }).sort({
      createdAt: -1,
    });

    if (!assets) {
      return NextResponse.json(
        {
          status: false,
          message: "No assets found.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ assetsData: assets }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching asset ${error}`,
    });
  }
}
