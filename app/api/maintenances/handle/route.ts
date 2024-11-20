// api/claims/new
import dbConnect from "@/lib/db";
import Maintenance from "@/models/Maintenance";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const data = await req.formData();
    const status = data.get("status") as unknown as string;
    const user = data.get("user") as unknown as string;
    const asset = data.get("asset") as unknown as string;
    const id = data.get("id") as unknown as string;
    const updatedData = { $set: { status: status } };
    const maintenances = await Maintenance.findOneAndUpdate(
      { _id: id },
      updatedData
    );

    if (!maintenances) {
      return NextResponse.json(
        { message: "Failed to update maintenances" },
        { status: 404 }
      );
    }
    const notification = new Notification({
      by: "system",
      title: "Maintenance Request",
      for: user,
      asset: asset,
      message: `Your request has been ${status}`,
    });
    await notification.save();

    return NextResponse.json({ maintenances }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error creating maintenance",
    });
  }
}
