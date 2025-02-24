import mongoose from "mongoose"

// Business Details Schema (Parent)
const businessDetailsSchema = new mongoose.Schema(
  {
    businessId: {
      type: String,
      required: true,
      unique: true,
      // Generate a unique business ID with prefix BUS
      default: () => `BUS${Date.now().toString(36).toUpperCase()}`,
    },
    legalEntityName: { type: String, required: true },
    tradeName: { type: String, required: true },
    gstin: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    businessEntityType: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

// Contact Details Schema
const contactDetailsSchema = new mongoose.Schema(
  {
    contactId: {
      type: String,
      required: true,
      unique: true,
      default: () => `CON${Date.now().toString(36).toUpperCase()}`,
    },
    businessId: {
      type: String,
      required: true,
      ref: "BusinessDetails",
    },
    contactName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailId: { type: String, required: true },
    pickupTime: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

// Category and Brand Schema
const categoryBrandSchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
      default: () => `CAT${Date.now().toString(36).toUpperCase()}`,
    },
    businessId: {
      type: String,
      required: true,
      ref: "BusinessDetails",
    },
    categories: [{ type: String }],
    authorizedBrands: [{ type: String }],
  },
  {
    timestamps: true,
  },
)

// Address Schema
const addressSchema = new mongoose.Schema(
  {
    addressId: {
      type: String,
      required: true,
      unique: true,
      default: () => `ADD${Date.now().toString(36).toUpperCase()}`,
    },
    businessId: {
      type: String,
      required: true,
      ref: "BusinessDetails",
    },
    billingAddress: {
      country: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: String,
      phoneNumber: { type: String, required: true },
    },
    pickupAddress: {
      country: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: String,
      phoneNumber: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  },
)

// Bank Details Schema
const bankDetailsSchema = new mongoose.Schema(
  {
    bankId: {
      type: String,
      required: true,
      unique: true,
      default: () => `BNK${Date.now().toString(36).toUpperCase()}`,
    },
    businessId: {
      type: String,
      required: true,
      ref: "BusinessDetails",
    },
    accountHolderName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    bankName: { type: String, required: true },
    branch: { type: String, required: true },
    city: { type: String, required: true },
    bankLetter: String,
    accountType: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

// Document Details Schema
const documentDetailsSchema = new mongoose.Schema(
  {
    documentId: {
      type: String,
      required: true,
      unique: true,
      default: () => `DOC${Date.now().toString(36).toUpperCase()}`,
    },
    businessId: {
      type: String,
      required: true,
      ref: "BusinessDetails",
    },
    panCard: String,
    aadharCard: String, // Add this line
    gstin: String,
    
    signature: String,
   
  },
  {
    timestamps: true,
  },
)

// Create models if they don't exist
export const BusinessDetails =
  mongoose.models.BusinessDetails || mongoose.model("BusinessDetails", businessDetailsSchema)
export const ContactDetails = mongoose.models.ContactDetails || mongoose.model("ContactDetails", contactDetailsSchema)
export const CategoryBrand = mongoose.models.CategoryBrand || mongoose.model("CategoryBrand", categoryBrandSchema)
export const Address = mongoose.models.Address || mongoose.model("Address", addressSchema)
export const BankDetails = mongoose.models.BankDetails || mongoose.model("BankDetails", bankDetailsSchema)
export const DocumentDetails =
  mongoose.models.DocumentDetails || mongoose.model("DocumentDetails", documentDetailsSchema)

