// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Asset from "@/models/Asset";
import Assignment from "@/models/Assignment";
import User from "@/models/User";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    await dbConnect();

    const assetObj = await Asset.findById(id);
    if (!assetObj) {
      return NextResponse.json(
        {
          status: false,
          message: "No Assets found.",
        },
        { status: 500 }
      );
    }
    const assignment = await Assignment.findOne({ asset: assetObj._id });
    if (assignment) {
      const user = await User.findById(assignment.user);
      const asset = {
        ...assetObj._doc,
        assigned_on: moment(assignment.createdAt).calendar(),
        user: user,
      };
      return NextResponse.json({ asset }, { status: 201 });
    } else {
      const asset = assetObj;
      return NextResponse.json({ asset }, { status: 201 });
    }
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: error,
    });
  }
}
