// api/Applications/new
import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { user, course } = await req.json();

    const newApplication = new Application({
      course,
      user,
    });

    const existing = await Application.find({ course: course, user: user });
    if (existing.length) {
      return NextResponse.json(
        {
          status: false,
          message: "You already applied for this course.",
        },
        { status: 500 }
      );
    }

    const application = await newApplication.save();
    if (application) {
      return NextResponse.json(
        {
          status: true,
          message: `Application ${application.title} has been created successfully!`,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error creating application",
    });
  }
}
