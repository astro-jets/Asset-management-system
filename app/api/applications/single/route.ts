// pages/api/application.ts
import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("application");

    await dbConnect();

    const application = await Application.find({
      user: id,
    }).sort({ createdAt: -1 });

    if (!application) {
      return NextResponse.json(
        {
          status: false,
          message: "No applications found.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching claim ${error}`,
    });
  }
}
