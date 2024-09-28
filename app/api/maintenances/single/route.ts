// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Asset from "@/models/Asset";
import Maintenance from "@/models/Maintenance";
import User from "@/models/User";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await dbConnect();
  try {
    const maintenance = await Maintenance.findOne({ _id: id });
    console.log("Maintenance => ", maintenance);
    if (!maintenance) {
      return NextResponse.json(
        { error: "Couldnt find any maintenace" },
        { status: 500 }
      );
    }
    const user = await User.findById(maintenance.user);
    const asset = await Asset.findById(maintenance.asset);
    const data = {
      maintenance,
      asset,
      user,
    };
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: error,
    });
  }
}
