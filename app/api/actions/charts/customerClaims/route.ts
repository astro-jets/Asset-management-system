// pages/api/claims.ts
import dbConnect from "@/lib/db";
import Claim from "@/models/Claim";
import Subscription from "@/models/Subscription";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

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
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user");

  const id = new mongoose.Types.ObjectId(userId!);

  // Aggregate claims
  const claimData = await Claim.aggregate([
    {
      $match: {
        user: id, // filter by user ID
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
  ]);

  // Aggregate subscriptions
  const subscriptionData = await Subscription.aggregate([
    {
      $match: {
        user: userId, // filter by user ID
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
  ]);
  console.log("ClaimData => ", claimData);

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
