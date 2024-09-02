import dbConnect from "@/lib/db";
import Asset from "@/models/Asset";
import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";
import qrcode from "qrcode"; // Import qrcode library
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.formData();
    const file = data.get("file") as unknown as File;
    const cost = data.get("cost") as unknown as string;
    const name = data.get("name") as unknown as string;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pathToPublic = join(process.cwd(), "public", "uploads");
    const path = join(pathToPublic, file.name);
    await writeFile(path, buffer);

    console.log(`Open ${path} to view image`);

    const newAsset = new Asset({
      name,
      cost,
      path: file.name,
    });

    const asset = await newAsset.save();
    if (asset) {
      // Generate JWT token with asset details
      const token = generateJwtToken(asset._id);

      // Generate QR code for the JWT token
      const qrCodeData = await qrcode.toDataURL(token);

      // Update the asset with the QR code data
      asset.qrCode = qrCodeData;
      const updateResult = await asset.save();

      if (!updateResult) {
        return NextResponse.json(
          {
            status: false,
            message: `Failed save the asset`,
            qrCodeData,
          },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          status: true,
          message: `Asset ${Asset.name} was successfully saved!`,
          qrCodeData,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Zakanika => ", error);
    return NextResponse.json({
      status: false,
      message: "Error creating Asset",
    });
  }
}

// Function to generate JWT token with asset details
function generateJwtToken(id: string) {
  const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key
  const token = jwt.sign({ id }, secretKey as string);
  return token;
}
