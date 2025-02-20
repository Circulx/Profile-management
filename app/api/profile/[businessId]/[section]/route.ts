import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import { ContactDetails, CategoryBrand, Address, BankDetails, DocumentDetails, BusinessDetails } from "@/models/Profile"

const models: any = {
  contact: ContactDetails,
  category: CategoryBrand,
  addresses: Address,
  bank: BankDetails,
  documents: DocumentDetails,
}

export async function POST(req: Request, { params }: { params: { businessId: string; section: string } }) {
  try {
    await dbConnect()
    const body = await req.json()

    // Verify business exists first
    const business = await BusinessDetails.findOne({
      businessId: params.businessId,
    })

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    const Model = models[params.section]
    if (!Model) {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 })
    }

    // Create or update the section data
    const data = await Model.findOneAndUpdate(
      { businessId: params.businessId },
      { ...body, businessId: params.businessId },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    )

    return NextResponse.json({
      success: true,
      message: `${params.section} details saved successfully`,
      data,
    })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Something went wrong",
      },
      { status: 500 },
    )
  }
}

