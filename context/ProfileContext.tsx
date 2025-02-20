"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { TabType } from "@/types/profile";

interface ProfileContextType {
  businessId: string | null;
  setBusinessId: (id: string) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isFormCompleted: (tab: TabType) => boolean;
  markFormAsCompleted: (tab: TabType) => void;
  canProceed: boolean;
  setCanProceed: (value: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("business");
  const [completedForms, setCompletedForms] = useState<Set<TabType>>(new Set());
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBusinessId = localStorage.getItem("businessId");
      const savedCompletedForms = localStorage.getItem("completedForms");

      if (savedBusinessId) {
        setBusinessId(savedBusinessId);
      }

      if (savedCompletedForms) {
        setCompletedForms(new Set(JSON.parse(savedCompletedForms)));
      }
    }
  }, []);

  useEffect(() => {
    if (businessId && typeof window !== "undefined") {
      localStorage.setItem("businessId", businessId);
    }
  }, [businessId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("completedForms", JSON.stringify([...completedForms]));
    }
  }, [completedForms]);

  const isFormCompleted = (tab: TabType) => completedForms.has(tab);

  const markFormAsCompleted = (tab: TabType) => {
    setCompletedForms((prev) => new Set([...prev, tab]));
  };

  return (
    <ProfileContext.Provider
      value={{
        businessId,
        setBusinessId,
        activeTab,
        setActiveTab,
        isFormCompleted,
        markFormAsCompleted,
        canProceed,
        setCanProceed,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
