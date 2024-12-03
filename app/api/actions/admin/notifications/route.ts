// pages/api/ClientStats.ts//
import dbConnect from "@/lib/db";
import Assets from "@/models/Asset";
import Assignment from "@/models/Assignment";
import Notification from "@/models/Notification";
import User from "@/models/User";
import { AssetProps } from "@/types/asset";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const assets = await Assets.find();

    const expired: AssetProps[] = [];

    const notifications = await Notification.find({
      by: "system",
      status: "unread",
    });

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      const creationDate = asset.createdAt;
      const fiveYearsLater = new Date(creationDate);
      fiveYearsLater.setFullYear(creationDate.getFullYear() + 5);

      const isExpired = new Date() >= fiveYearsLater;
      if (isExpired) {
        expired.push({
          ...asset.toObject(), // Convert Mongoose document to plain object
          isExpired,
        });
      }
    }

    // Generate Notifications
    if (expired.length) {
      for (let i = 0; i < expired.length; i++) {
        const asset = expired[i];
        const assignment = await Assignment.findOne({ asset: asset._id });
        if (assignment) {
          const user = await User.findById(assignment.user);
          if (notifications.length > 0) {
            for (let i = 0; i < notifications.length; i++) {
              const notification = notifications[i];
              if (notification.asset == asset._id) {
                return;
              } else {
                // Notify the user that their asset has expired
                const userNotification = new Notification({
                  user: user._id,
                  title: "Asset has expired",
                  asset: asset._id,
                  for: user._id,
                  by: "system",
                  message: `Your ${asset.name} has expired. Please contact the maintenance team to a look if it needs replacing or fixing.`,
                });
                // Notify the admin that an asset has expired
                const adminNotification = new Notification({
                  user: user._id,
                  title: "Asset has expired",
                  asset: asset._id,
                  for: "admin",
                  by: "system",
                  message: `The ${asset.name} assigned to ${user.name} has expired. Please take a look if it needs replacing or fixing.`,
                });
                await userNotification.save();
                await adminNotification.save();
              }
            }
          } else {
            // Notify the user that their asset has expired
            const userNotification = new Notification({
              user: user._id,
              title: "Asset has expired",
              asset: asset._id,
              for: user._id,
              by: "system",
              message: `Your ${asset.name} has expired. Please contact the maintenance team to a look if it needs replacing or fixing.`,
            });
            // Notify the admin that an asset has expired
            const adminNotification = new Notification({
              user: user._id,
              title: "Asset has expired",
              asset: asset._id,
              for: "admin",
              by: "system",
              message: `The ${asset.name} assigned to ${user.name} has expired. Please take a look if it needs replacing or fixing.`,
            });
            await userNotification.save();
            await adminNotification.save();
          }
        }
      }
    }

    return NextResponse.json({ expired }, { status: 201 });
  } catch (error) {
    console.log("Zakanika no expiry => ", error);
    return NextResponse.json({
      status: false,
      message: `Error fetching User ${error}`,
    });
  }
}
