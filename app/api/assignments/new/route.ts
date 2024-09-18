// api/claims/new
import dbConnect from "@/lib/db";
import Asset from "@/models/Asset";
import Assignment from "@/models/Assignment";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.formData();
    const user = data.get("user") as unknown as File;
    const asset = data.get("asset") as unknown as string;

    // Find the asset in the first Place and if dont exists return null
    const assetDetails = await Asset.findById(asset);

    if (!assetDetails) {
      return NextResponse.json(
        {
          status: false,
          message: `Assignment  has been created successfully!`,
        },
        { status: 404 }
      );
    }

    const newAssignment = new Assignment({
      user,
      asset,
    });

    const assignment = await newAssignment.save();
    if (assignment) {
      // Create a notification to alert the user of the assignment
      const newNotification = new Notification({
        title: "Asset assigned",
        for: user,
        message: `You have been assigned a ${assetDetails.name}`,
      });
      const notification = newNotification.save();
      return NextResponse.json(
        {
          status: true,
          message: `Assignment  has been created successfully!`,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error creating assignment",
    });
  }
}
