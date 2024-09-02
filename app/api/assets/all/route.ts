// pages/api/signup.ts
import dbConnect from "@/lib/db";
import Asset from "@/models/Asset";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const Assets = await Asset.find();
    if (!Assets) {
      return NextResponse.json(
        {
          status: false,
          message: "No Assets found.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ Assets }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error fetching Asset",
    });
  }
}
