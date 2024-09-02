// api/claims/new
import dbConnect from "@/lib/db";
import Assignment from "@/models/Assignment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.formData();
    const user = data.get("user") as unknown as File;
    const asset = data.get("asset") as unknown as string;

    const newAssignment = new Assignment({
      user,
      asset,
    });

    const assignment = await newAssignment.save();
    if (assignment) {
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
