"use client"
import { cn } from "@/lib/utils"
import { BusinessForm } from "@/components/business-form"
import { ContactForm } from "@/components/contact-form"
import { CategoryBrandForm } from "@/components/category-brand-form"
import { AddressForm } from "@/components/address-form"
import { BankForm } from "@/components/bank-form"
import { DocumentForm } from "@/components/document-form"
import type { TabType } from "@/types/profile"
import { useProfile } from "@/context/ProfileContext"

const tabs: { label: string; value: TabType }[] = [
  { label: "Business Details", value: "business" },
  { label: "Contact Details", value: "contact" },
  { label: "Category and Brand", value: "category" },
  { label: "Addresses", value: "addresses" },
  { label: "Bank Details", value: "bank" },
  { label: "Documents", value: "documents" },
]

export function ProfilePage() {
  const { activeTab, setActiveTab, businessId, isFormCompleted } = useProfile()

  const handleTabClick = (tab: TabType) => {
    // Only allow navigation to completed forms or the next form in sequence
    const currentIndex = tabs.findIndex((t) => t.value === activeTab)
    const clickedIndex = tabs.findIndex((t) => t.value === tab)

    if (isFormCompleted(tab) || clickedIndex === currentIndex + 1) {
      setActiveTab(tab)
    }
  }

  const handleBack = () => {
    const currentIndex = tabs.findIndex((tab) => tab.value === activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].value)
    }
  }

  // Don't allow access to other forms until business details are completed
  if (!businessId && activeTab !== "business") {
    setActiveTab("business")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Management</h1>
          <p className="text-muted-foreground">Update your business and personal information here.</p>
        </div>

        <div className="mb-8">
          <nav className="flex space-x-4 border-b overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabClick(tab.value)}
                disabled={
                  !isFormCompleted(tab.value) &&
                  tabs.findIndex((t) => t.value === tab.value) > tabs.findIndex((t) => t.value === activeTab)
                }
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors hover:text-orange-600 whitespace-nowrap",
                  "border-b-2 -mb-px",
                  activeTab === tab.value
                    ? "border-orange-600 text-orange-600"
                    : "border-transparent text-muted-foreground",
                  !isFormCompleted(tab.value) &&
                    tabs.findIndex((t) => t.value === tab.value) > tabs.findIndex((t) => t.value === activeTab) &&
                    "opacity-50 cursor-not-allowed",
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="max-w-2xl mx-auto">
          {activeTab === "business" && <BusinessForm />}
          {activeTab === "contact" && <ContactForm />}
          {activeTab === "category" && <CategoryBrandForm />}
          {activeTab === "addresses" && <AddressForm />}
          {activeTab === "bank" && <BankForm />}
          {activeTab === "documents" && <DocumentForm />}
        </div>
      </div>
    </div>
  )
}

