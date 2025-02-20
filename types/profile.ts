export interface BusinessDetails {
  legalEntityName: string
  tradeName: string
  gstin: string
  country: string
  pincode: string
  state: string
  city: string
  businessEntityType: string
}

export interface ContactDetails {
  contactName: string
  phoneNumber: string
  emailId: string
  pickupTime: string
}

export type TabType = "business" | "contact" | "category" | "addresses" | "bank" | "documents"

export interface CategoryAndBrand {
  categories: string[]
  authorizedBrands: string[]
}

export const AVAILABLE_CATEGORIES = [
  "Agrochemicals",
  "Material Handling & Packagings",
  "Office Furniture & Decor",
  "Packaging Bags",
  "Raw Materials",
  "Plumbing & Bathroom Fittings",
  "Custom Manufacturing",
  "Gardening & Landscaping",
] as string[]

export const AVAILABLE_BRANDS = [
  "AS Medisteel",
  "Aerospace",
  "Aeropress",
  "Agni Devices",
  "Ajay Syscon",
  "Aktion Aarvee",
  "Allen-Bradley",
  "Amar Transformers",
] as string[]

export interface Address {
  country: string
  state: string
  city: string
  addressLine1: string
  addressLine2?: string
  phoneNumber: string
}

export interface AddressDetails {
  billingAddress: Address
  pickupAddress: Address
}

export interface BankDetails {
  accountHolderName: string
  accountNumber: string
  ifscCode: string
  bankName: string
  branch: string
  city: string
  bankLetter?: File
  accountType: string
}

export const ACCOUNT_TYPES = [
  "Escrow Account",
  "Current Account",
  "Saving Account",
  "Joint Account",
  "Cash Credit/Overdraft",
] as const

export interface DocumentDetails {
  panCard?: File
  gstin?: File
  bankLetter?: File
  bankStatement?: File
  corporationCertificate?: File
  businessAddress?: File
  pickupAddressProof?: File
  signature?: File
  balanceSheet2223?: File
  balanceSheet2324?: File
}

// Update TabType to be more specific for navigation
export const TAB_ORDER: TabType[] = ["business", "contact", "category", "addresses", "bank", "documents"] as const

