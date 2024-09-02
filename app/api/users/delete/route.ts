// pages/api/users.ts
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user");
    // const id = new mongoose.Types.ObjectId(userId!);

    const operation = await User.findOneAndDelete({ _id: userId });

    if (!operation) {
      return NextResponse.json(
        {
          status: false,
          message: "No users found.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "User deleted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching user ${error}`,
    });
  }
}
