// pages/api/ClientStats.ts//
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const customers = await User.find({ role: "user" });
    if (!customers) {
      return NextResponse.json(
        { error: "Error customers not found!" },
        { status: 404 }
      );
    }
    return NextResponse.json({ customers }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching claim ${error}`,
    });
  }
}
