// pages/api/signup.ts
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await dbConnect();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          status: false,
          message: "This email is not registred to a user.",
        },
        { status: 500 }
      );
    }
    const approved = await bcrypt.compare(password, user.password);
    if (!approved) {
      return NextResponse.json(
        {
          status: false,
          message: "Invalid Password.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: false, message: "Error creating user" });
  }
}
