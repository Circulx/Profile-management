import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import { ContactDetails, CategoryBrand, Address, BankDetails, DocumentDetails, BusinessDetails } from "@/models/Profile"
import { handleApiError } from "@/middleware/error-handler"

const models = {
  contact: ContactDetails,
  category: CategoryBrand,
  addresses: Address,
  bank: BankDetails,
  documents: DocumentDetails,
}

export async function POST(req: Request, { params }: { params: { businessId: string; section: string } }) {
  try {
    await dbConnect()

    // Verify business exists
    const business = await BusinessDetails.findOne({ businessId: params.businessId })
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    const body = await req.json()

    const Model = models[params.section as keyof typeof models]
    if (!Model) {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 })
    }

    // Check if entry already exists
    const existing = await Model.findOne({ businessId: params.businessId })
    let data

    if (existing) {
      // Update existing entry
      data = await Model.findOneAndUpdate(
        { businessId: params.businessId },
        { ...body },
        { new: true, runValidators: true },
      )
    } else {
      // Create new entry
      data = await Model.create({
        ...body,
        businessId: params.businessId,
      })
    }

    return NextResponse.json(
      {
        message: `${params.section} details saved successfully`,
        data,
      },
      { status: 201 },
    )
  } catch (error: any) {
    return handleApiError(error)
  }
}

