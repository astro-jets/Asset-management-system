// pages/api/signup.ts
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password, role } = await req.json();
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role ? (role as string) : "user",
    });

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        {
          status: false,
          message: "This email already belongs to a registered user.",
        },
        { status: 500 }
      );
    }
    const user = await newUser.save();
    if (user) {
      return NextResponse.json(
        {
          status: true,
          message: "Your account has been created successfully!",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({ status: false, message: "Error creating user" });
  }
}
