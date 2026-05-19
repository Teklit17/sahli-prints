import { NextResponse } from "next/server";
import { configureCloudinary } from "@/src/lib/cloudinary";

export async function POST() {
  try {
    const cloudinary = configureCloudinary();
    const timestamp = Math.round(Date.now() / 1000);
    const folder = process.env.CLOUDINARY_UPLOAD_FOLDER ?? "sahli-prints";

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET ?? "",
    );

    return NextResponse.json({
      timestamp,
      folder,
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload setup failed." },
      { status: 500 },
    );
  }
}
