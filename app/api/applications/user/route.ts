// pages/api/application.ts
import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import Course from "@/models/Course";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("user");

    await dbConnect();

    const application = await Application.find({ user: id }).sort({
      createdAt: -1,
    });

    if (!application) {
      return NextResponse.json(
        {
          status: false,
          message: "No applications found.",
        },
        { status: 500 }
      );
    }

    const data = [];

    for (let i = 0; i < application.length; i++) {
      const app = application[i];
      const user = await User.findById(app.user);
      const course = await Course.findById(app.course);
      data.push({
        id: app.id,
        course,
        user: { name: user.name, email: user.email, id: user._id },
      });
    }

    return NextResponse.json({ application: data }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching claim ${error}`,
    });
  }
}
