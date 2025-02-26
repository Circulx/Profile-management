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

    // Verify business exists
    const business = await BusinessDetails.findOne({
      businessId: params.businessId,
    })

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    let body
    const contentType = req.headers.get("content-type") || ""

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()
      body = Object.fromEntries(formData)
    } else {
      body = await req.json()
    }

    const Model = models[params.section]

    if (!Model) {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 })
    }

    // Create or update the document
    const data = await Model.findOneAndUpdate(
      { businessId: params.businessId },
      {
        ...body,
        businessId: params.businessId,
        updatedAt: new Date(),
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    )

    // If this is the documents section (final step), update business status
    if (params.section === "documents") {
      await BusinessDetails.findOneAndUpdate(
        { businessId: params.businessId },
        { status: "under_review" },
        { new: true },
      )
    }

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

