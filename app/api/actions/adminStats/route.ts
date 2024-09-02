// pages/api/ClientStats.ts//
import dbConnect from "@/lib/db";
import Assets from "@/models/Asset";
import Assignment from "@/models/Assignment";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const assetsCount = await Assets.countDocuments();
    const assignmentsCount = await Assignment.countDocuments();
    const assets = await Assets.find();

    let assetsRevenue = 0;

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      assetsRevenue += parseInt(asset.cost);
    }

    const stats = {
      assets: assetsCount,
      assignments: assignmentsCount,
      revenue: assetsRevenue,
    };

    return NextResponse.json({ stats }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching User ${error}`,
    });
  }
}
