"use client"

import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useProfile } from "@/context/ProfileContext"

export function SuccessPage() {
  const router = useRouter()
  const { businessId } = useProfile()

  // Redirect to home if no businessId exists
  useEffect(() => {
    if (!businessId) {
      router.replace("/")
    }
  }, [businessId, router])

  if (!businessId) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Your profile has been submitted successfully
          </h1>
          <p className="text-muted-foreground text-lg">Your profile will get verified in 24-36 hours</p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-6 w-72">
            <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
              <CheckCircle className="text-orange-500 h-5 w-5" />
              <span className="text-sm">Business Details Submitted</span>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
              <CheckCircle className="text-orange-500 h-5 w-5" />
              <span className="text-sm">Documents Uploaded</span>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
              <CheckCircle className="text-orange-500 h-5 w-5" />
              <span className="text-sm">Profile Under Review</span>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-[300px] h-[400px] ml-32">
              <Image src="/pic.png" alt="Success Illustration" fill className="object-contain" priority />
            </div>
          </div>
        </div>

        <div className="pt-8">
          <Button onClick={() => router.push("/")} className="bg-orange-600 hover:bg-orange-700">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

