// pages/api/ClientStats.ts//
import dbConnect from "@/lib/db";
import Asset from "@/models/Asset";
import Maintenance from "@/models/Asset";
import Assignment from "@/models/Assignment";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const maintenanceCount = await Maintenance.countDocuments({ user: id });
    const assignmentsCount = await Assignment.countDocuments({ user: id });
    const assignments = await Assignment.find({ user: id });

    let assetsRevenue = 0;

    for (let i = 0; i < assignments.length; i++) {
      const asset = await Asset.findOne({ _id: assignments[i].asset });
      assetsRevenue += parseInt(asset.cost);
    }

    const stats = {
      maintenances: maintenanceCount,
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
