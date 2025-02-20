import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import { BusinessDetails } from "@/models/Profile"
import { handleApiError } from "@/middleware/error-handler"

export async function POST(req: Request) {
  try {
    await dbConnect()
    const body = await req.json()

    const businessDetails = await BusinessDetails.create(body)

    return NextResponse.json(
      {
        message: "Business details created successfully",
        data: businessDetails,
      },
      { status: 201 },
    )
  } catch (error) {
    return handleApiError(error)
  }
}

