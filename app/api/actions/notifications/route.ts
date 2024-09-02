// pages/api/ClientStats.ts//
import dbConnect from "@/lib/db";
import Notification from "@/models/Notification";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user");

    await dbConnect();

    const notifications = await Notification.find({
      user: userId,
      status: "unread",
    });

    if (!notifications) {
      return NextResponse.json(
        { message: "Failed to find notifications" },
        { status: 404 }
      );
    }

    return NextResponse.json({ notifications }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching claim ${error}`,
    });
  }
}
