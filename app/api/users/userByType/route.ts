// pages/api/users.ts
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userType = searchParams.get("user");

    const users = await User.find({ role: userType }).sort({
      createdAt: -1,
    });

    if (!users) {
      return NextResponse.json(
        {
          status: false,
          message: "No users found.",
        },
        { status: 500 }
      );
    }

    const usersData: any = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      usersData.push({
        id: user._id as string,
        name: user.name as string,
        email: user.email as string,
        role: user.role as string,
      });
    }
    return NextResponse.json({ usersData }, { status: 201 });
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching user ${error}`,
    });
  }
}
