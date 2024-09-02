// pages/api/ClientStats.ts//
import dbConnect from "@/lib/db";
import Notification from "@/models/Notification";

import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("notification");

    await dbConnect();

    const updatedData = { $set: { status: "read" } };

    const notifications = await Notification.findOneAndUpdate(
      { _id: id },
      updatedData
    );

    console.log("Update => ", notifications.modifiedCount);

    if (!notifications) {
      return NextResponse.json(
        { message: "Failed to update notifications" },
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
