// api/claims/new
import dbConnect from "@/lib/db";
import Maintenance from "@/models/Maintenance";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.formData();
    const user = data.get("user") as unknown as File;
    const asset = data.get("asset") as unknown as string;
    const message = data.get("message") as unknown as string;

    const newMaintenance = new Maintenance({
      user,
      asset,
      message,
    });

    const maintenance = await newMaintenance.save();
    if (maintenance) {
      const notification = new Notification({
        by: user,
        title: "Maintenance Request",
        for: "admin",
        asset: asset,
        message: message,
      });
      await notification.save();
      return NextResponse.json(
        {
          status: true,
          message: `Maintenance  has been created successfully!`,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error creating maintenance",
    });
  }
}
