import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import {BusinessDetails as Profile} from "@/models/Profile"
import { handleApiError } from "@/middleware/error-handler"
import mongoose from "mongoose"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid profile ID" }, { status: 400 })
    }

    const profile = await Profile.findById(params.id)
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Profile retrieved successfully",
      data: profile,
    })
  } catch (error: any) {
    return handleApiError(error)
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid profile ID" }, { status: 400 })
    }

    const body = await req.json()

    // Basic validation
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Request body is required" }, { status: 400 })
    }

    const profile = await Profile.findByIdAndUpdate(params.id, { $set: body }, { new: true, runValidators: true })

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      data: profile,
    })
  } catch (error: any) {
    return handleApiError(error)
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid profile ID" }, { status: 400 })
    }

    const profile = await Profile.findByIdAndDelete(params.id)
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Profile deleted successfully",
    })
  } catch (error: any) {
    return handleApiError(error)
  }
}

