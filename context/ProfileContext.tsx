"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { TabType } from "@/types/profile"

interface ProfileContextType {
  businessId: string | null
  setBusinessId: (id: string) => void
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  isFormCompleted: (tab: TabType) => boolean
  markFormAsCompleted: (tab: TabType) => void
  isSubmissionComplete: boolean
  setSubmissionComplete: (value: boolean) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [businessId, setBusinessId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>("business")
  const [completedForms, setCompletedForms] = useState<Set<TabType>>(new Set())
  const [isSubmissionComplete, setSubmissionComplete] = useState(false)

  // Load state from localStorage
  useEffect(() => {
    const savedBusinessId = localStorage.getItem("businessId")
    const savedCompletedForms = localStorage.getItem("completedForms")
    const savedSubmissionComplete = localStorage.getItem("submissionComplete")

    if (savedBusinessId) {
      setBusinessId(savedBusinessId)
    }
    if (savedCompletedForms) {
      setCompletedForms(new Set(JSON.parse(savedCompletedForms)))
    }
    if (savedSubmissionComplete) {
      setSubmissionComplete(JSON.parse(savedSubmissionComplete))
    }
  }, [])

  // Save state to localStorage
  useEffect(() => {
    if (businessId) {
      localStorage.setItem("businessId", businessId)
    }
    localStorage.setItem("completedForms", JSON.stringify([...completedForms]))
    localStorage.setItem("submissionComplete", JSON.stringify(isSubmissionComplete))
  }, [businessId, completedForms, isSubmissionComplete])

  const isFormCompleted = (tab: TabType) => completedForms.has(tab)

  const markFormAsCompleted = (tab: TabType) => {
    setCompletedForms((prev) => new Set([...prev, tab]))
  }

  return (
    <ProfileContext.Provider
      value={{
        businessId,
        setBusinessId,
        activeTab,
        setActiveTab,
        isFormCompleted,
        markFormAsCompleted,
        isSubmissionComplete,
        setSubmissionComplete,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}

