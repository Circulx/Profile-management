"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { useProfile } from "@/context/ProfileContext"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { BusinessDetails } from "@/types/profile"
import { useToast } from "@/components/ui/use-toast"

const businessSchema = z.object({
  legalEntityName: z.string().min(2, "Legal Entity Name is required"),
  tradeName: z.string().min(2, "Trade Name is required"),
  gstin: z.string().min(15, "GSTIN must be 15 characters").max(15),
  country: z.string().min(2, "Country is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  businessEntityType: z.string().min(1, "Business Entity Type is required"),
})

export function BusinessForm() {
  const { setBusinessId, setActiveTab, markFormAsCompleted } = useProfile()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<BusinessDetails>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      legalEntityName: "",
      tradeName: "",
      gstin: "",
      country: "",
      pincode: "",
      state: "",
      city: "",
      businessEntityType: "",
    },
  })

  async function onSubmit(data: BusinessDetails) {
    try {
      setIsSubmitting(true)

      const response = await fetch("/api/profile/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error)
      }

      setBusinessId(result.data.businessId)
      markFormAsCompleted("business")
      setActiveTab("contact")

      toast({
        title: "Success",
        description: "Business details saved successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="legalEntityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Legal Entity Name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., ABC Industries Pvt Ltd" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tradeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Trade Name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., Manufacturer, Supplier, Distributor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="gstin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  GSTIN<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 22AAAAA0000A1Z5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Country<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., India" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Pincode<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 400001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  State<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Maharashtra" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  City<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Mumbai" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessEntityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Business Entity Type<span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="private-limited">Private Limited</SelectItem>
                    <SelectItem value="proprietorship">Proprietorship</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button variant="outline" type="button">
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

