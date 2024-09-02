// pages/api/assets.ts
import dbConnect from "@/lib/db";
import Maintenance from "@/models/Maintenance";
import Assignment from "@/models/Assignment";
import { NextResponse } from "next/server";
import moment from "moment";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await dbConnect();
  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Aggregate assets
  const maintenances = await Maintenance.find();

  // Initialize weekly array
  const weekly = week.map((day) => ({
    date: day,
    attended: 0,
    unattended: 0,
  }));

  // Loop through the subscriptions to find the related service and sum up the prices
  for (let maintenance of maintenances) {
    const day = moment(maintenance.createdAt).toLocaleString();
    const thisWeek = moment(Date.now()).week();
    const thisWeekFromDB = moment(maintenance.createdAt).week();
    if (thisWeek == thisWeekFromDB) {
      let arr: string[] = day.split(" ");
      for (let week of weekly) {
        if (week.date == arr[0]) {
          // console.log("Arr Val => ", arr[0], ". Object Week => ", week.date);
          maintenance.status == "pending"
            ? (week.unattended += 1)
            : (week.attended += 1);
        }
      }
    }
  }

  console.table(weekly);
  return NextResponse.json({ weekly }, { status: 201 });
}
