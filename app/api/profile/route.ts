import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { BusinessDetails as Profile } from "@/models/Profile";
import { handleApiError } from "@/middleware/error-handler";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Basic validation
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Request body is required" }, { status: 400 });
    }

    const profile = await Profile.create(body);
    return NextResponse.json(
      {
        message: "Profile created successfully",
        data: profile,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return handleApiError(error);
  }
}

export async function GET() {
  try {
    await dbConnect();
    const profiles = await Profile.find({}).sort({ createdAt: -1 });
    return NextResponse.json({
      message: "Profiles retrieved successfully",
      data: profiles,
    });
  } catch (error: any) {
    return handleApiError(error);
  }
}
