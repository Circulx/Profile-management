"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { BusinessForm } from "@/components/business-form"
import { ContactForm } from "@/components/contact-form"
import { CategoryBrandForm } from "@/components/category-brand-form"
import { AddressForm } from "@/components/address-form"
import { BankForm } from "@/components/bank-form"
import { DocumentForm } from "@/components/document-form"
import { Button } from "@/components/ui/button"
import type { TabType } from "@/types/profile"

const tabs: { label: string; value: TabType }[] = [
  { label: "Business Details", value: "business" },
  { label: "Contact Details", value: "contact" },
  { label: "Category and Brand", value: "category" },
  { label: "Addresses", value: "addresses" },
  { label: "Bank Details", value: "bank" },
  { label: "Documents", value: "documents" },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("business")

  const handleBack = () => {
    const currentIndex = tabs.findIndex((tab) => tab.value === activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].value)
    }
  }

  const renderForm = () => {
    switch (activeTab) {
      case "business":
        return <BusinessForm />
      case "contact":
        return <ContactForm />
      case "category":
        return <CategoryBrandForm />
      case "addresses":
        return <AddressForm />
      case "bank":
        return <BankForm />
      case "documents":
        return <DocumentForm />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile Management</h1>
        <p className="text-muted-foreground">Update your business and personal information here.</p>
      </div>

      <div className="mb-8">
        <nav className="flex space-x-4 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors hover:text-orange-600",
                "border-b-2 -mb-px",
                activeTab === tab.value
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-muted-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="max-w-2xl">
        {renderForm()}
        <div className="mt-6 flex gap-4">
          {activeTab !== "business" && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button type="submit" form={`${activeTab}-form`} className="bg-orange-600 hover:bg-orange-700 text-white">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

