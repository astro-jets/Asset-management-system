// pages/api/application.ts
import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import Course from "@/models/Course";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const res = await Application.find().sort({ createdAt: -1 });

    if (!res) {
      return NextResponse.json(
        {
          status: false,
          message: "No application found.",
        },
        { status: 500 }
      );
    }

    const applications = [];
    for (let i = 0; i < res.length; i++) {
      const application = res[i];
      const user = await User.findById(application.user);
      const course = await Course.findById(application.course);
      applications.push({
        id: application._id as string,
        status: application.status,
        user: {
          name: user.name,
          email: user.email,
        },
        course: course,
      });
    }

    return NextResponse.json({ applications }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching claim ${error}`,
    });
  }
}
