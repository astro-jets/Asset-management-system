// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Asset from "@/models/Asset";
import Assignment from "@/models/Assignment";
import User from "@/models/User";
import { AssetProps } from "@/types/asset";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const assetsOBJ = await Asset.find();
    if (!assetsOBJ) {
      return NextResponse.json(
        {
          status: false,
          message: "No assetsOBJ found.",
        },
        { status: 500 }
      );
    }
    if (assetsOBJ) {
      const assets = [];
      for (let i = 0; i < assetsOBJ.length; i++) {
        const asset = assetsOBJ[i];
        const assignment = await Assignment.findOne({ asset: asset._id });
        const user = assignment
          ? await User.findById(assignment.user)
          : undefined;
        assets.push({
          ...asset.toObject(),
          user,
        });
      }
      // console.log("Assets => ", assets);
      return NextResponse.json({ assets }, { status: 201 });
    }
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: error,
    });
  }
}
