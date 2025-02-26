"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useProfile } from "@/context/ProfileContext"
import type { TabType } from "@/types/profile"

export function useFormSubmit(currentTab: TabType) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { businessId, setBusinessId, setActiveTab, markFormAsCompleted, setSubmissionComplete } = useProfile()

  const submitForm = async (data: any) => {
    if (!businessId && currentTab !== "business") {
      toast({
        title: "Error",
        description: "Business details must be saved first",
        variant: "destructive",
      })
      setActiveTab("business")
      return
    }

    try {
      setIsSubmitting(true)

      const url = currentTab === "business" ? "/api/profile/business" : `/api/profile/${businessId}/${currentTab}`

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to save data")
      }

      if (currentTab === "business" && result.data?.businessId) {
        setBusinessId(result.data.businessId)
      }

      markFormAsCompleted(currentTab)

      if (currentTab === "documents") {
        setSubmissionComplete(true)
      } else {
        const tabs: TabType[] = ["business", "contact", "category", "addresses", "bank", "documents"]
        const currentIndex = tabs.indexOf(currentTab)
        const nextTab = tabs[currentIndex + 1] || currentTab
        setActiveTab(nextTab)
      }

      toast({
        title: "Success",
        description: `${currentTab} details saved successfully`,
      })

      return { success: true, data: result.data }
    } catch (error: any) {
      console.error("Form submission error:", error)
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
      return { success: false, error: error.message }
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, submitForm }
}

