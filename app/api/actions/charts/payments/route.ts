// pages/api/claims.ts
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
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

  // Find all subscriptions
  const userSubscriptions = await Subscription.find();

  // Initialize result array
  const result = months.map((month) => ({ date: month, Payments: 0 }));

  // Loop through the subscriptions to find the related service and sum up the prices
  for (let subscription of userSubscriptions) {
    const service = await Service.findById(subscription.service);
    const month = new Date(subscription.createdAt).getMonth();
    result[month]["Payments"] += parseFloat(service.price);
  }

  return NextResponse.json({ result }, { status: 201 });
}
