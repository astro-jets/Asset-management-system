// pages/api/assets.ts
import dbConnect from "@/lib/db";
import Asset from "@/models/Asset";
import Assignment from "@/models/Assignment";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await dbConnect();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Aggregate assignmentss
  const assignmentsData = await Assignment.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
  ]);

  // Aggregate assets
  const assetData = await Asset.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
  ]);

  // Initialize monthly array
  const monthly = months.map((month) => ({
    date: month,
    Assets: 0,
    Assignments: 0,
  }));

  // Populate monthly array with data
  assignmentsData.forEach(({ _id, count }) => {
    monthly[_id - 1]["Assignments"] = count;
  });

  assetData.forEach(({ _id, count }) => {
    monthly[_id - 1]["Assets"] = count;
  });

  return NextResponse.json({ monthly }, { status: 201 });
}
