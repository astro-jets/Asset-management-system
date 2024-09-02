// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Asset from "@/models/Asset";
import Assignment from "@/models/Assignment";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    await dbConnect();

    const assignments = await Assignment.find({ user: id });
    const assets = [];
    for (let i = 0; i < assignments.length; i++) {
      const assignment = assignments[i];
      const asset = await Asset.findById(assignment.asset);
      assets.push(asset);
    }
    if (!assets.length) {
      return NextResponse.json(
        {
          status: false,
          message: "No Assets found.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ assets }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: error,
    });
  }
}
