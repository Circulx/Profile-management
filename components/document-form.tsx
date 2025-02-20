"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FileUpload } from "./file-upload"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import { useProfile } from "@/context/ProfileContext"

const documentSchema = z.object({
  panCard: z.any().optional(),
  gstin: z.any().optional(),
  bankLetter: z.any().optional(),
  bankStatement: z.any().optional(),
  corporationCertificate: z.any().optional(),
  businessAddress: z.any().optional(),
  pickupAddressProof: z.any().optional(),
  signature: z.any().optional(),
  balanceSheet2223: z.any().optional(),
  balanceSheet2324: z.any().optional(),
})

type DocumentFormData = z.infer<typeof documentSchema>

export function DocumentForm() {
  const { isSubmitting, submitForm } = useFormSubmit("documents")
  const { setActiveTab } = useProfile()

  const form = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      panCard: undefined,
      gstin: undefined,
      bankLetter: undefined,
      bankStatement: undefined,
      corporationCertificate: undefined,
      businessAddress: undefined,
      pickupAddressProof: undefined,
      signature: undefined,
      balanceSheet2223: undefined,
      balanceSheet2324: undefined,
    },
  })

  async function onSubmit(data: DocumentFormData) {
    try {
      // Convert File objects to base64 strings before sending
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value)
        }
      })

      await submitForm(Object.fromEntries(formData))
    } catch (error) {
      console.error(error)
    }
  }

  const handleBack = () => {
    setActiveTab("bank")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="panCard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ID Proof (PAN Card)<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <FileUpload label="Upload PAN Card" value={field.value} onChange={(file) => field.onChange(file)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gstin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GSTIN</FormLabel>
                <FormControl>
                  <FileUpload label="Upload GSTIN" value={field.value} onChange={(file) => field.onChange(file)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Letter/Cancelled Cheque</FormLabel>
                <FormControl>
                  <FileUpload
                    label="Upload Bank Letter"
                    value={field.value}
                    onChange={(file) => field.onChange(file)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankStatement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Statement Copy</FormLabel>
                <FormControl>
                  <FileUpload
                    label="Upload Bank Statement"
                    value={field.value}
                    onChange={(file) => field.onChange(file)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="corporationCertificate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certificate of Corporation</FormLabel>
                <FormControl>
                  <FileUpload
                    label="Upload Corporation Certificate"
                    value={field.value}
                    onChange={(file) => field.onChange(file)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <FileUpload
                    label="Upload Business Address"
                    value={field.value}
                    onChange={(file) => field.onChange(file)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pickupAddressProof"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Address Proof</FormLabel>
                <FormControl>
                  <FileUpload
                    label="Upload Pickup Address Proof"
                    value={field.value}
                    onChange={(file) => field.onChange(file)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="signature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Signature</FormLabel>
                <FormControl>
                  <FileUpload label="Upload Signature" value={field.value} onChange={(file) => field.onChange(file)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="balanceSheet2223"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FY 2022-23 Balance sheet</FormLabel>
                <FormControl>
                  <FileUpload
                    label="Upload Balance Sheet 22-23"
                    value={field.value}
                    onChange={(file) => field.onChange(file)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="balanceSheet2324"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FY 2023-24 Balance sheet</FormLabel>
                <FormControl>
                  <FileUpload
                    label="Upload Balance Sheet 23-24"
                    value={field.value}
                    onChange={(file) => field.onChange(file)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

