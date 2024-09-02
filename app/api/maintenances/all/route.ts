// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Asset from "@/models/Asset";
import Maintenance from "@/models/Maintenance";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const request = await Maintenance.find();
    const maintenances = [];
    for (let i = 0; i < request.length; i++) {
      const maintenance = request[i];
      const asset = await Asset.findById(maintenance.asset);
      maintenances.push({ ...maintenance._doc, asset });
    }
    if (!maintenances.length) {
      return NextResponse.json(
        {
          status: false,
          message: "No Assets found.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ maintenances }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error fetching Maintenance",
    });
  }
}
