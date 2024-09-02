// pages/api/claims.ts
import dbConnect from "@/lib/db";
import Claim from "@/models/Claim";
import Subscription from "@/models/Subscription";
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

  // Aggregate subscriptions
  const subscriptionData = await Subscription.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
  ]);

  // Aggregate claims
  const claimData = await Claim.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
  ]);

  // Initialize result array
  const result = months.map((month) => ({
    date: month,
    Claims: 0,
    Subscriptions: 0,
  }));

  // Populate result array with data
  subscriptionData.forEach(({ _id, count }) => {
    result[_id - 1]["Subscriptions"] = count;
  });

  claimData.forEach(({ _id, count }) => {
    result[_id - 1]["Claims"] = count;
  });

  return NextResponse.json({ result }, { status: 201 });
}
