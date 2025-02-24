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
  aadharCard: z.any().optional(),
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
      aadharCard: undefined,
      gstin: undefined,
      
      signature: undefined,
      
    },
  })

  async function onSubmit(data: DocumentFormData) {
    try {
      // Convert all File objects to base64 strings
      const processedData: Record<string, string> = {}

      for (const [key, value] of Object.entries(data)) {
        if (value instanceof File) {
          const base64String = await new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => {
              const base64 = reader.result as string
              resolve(base64)
            }
            reader.readAsDataURL(value)
          })
          processedData[key] = base64String
        }
      }

      await submitForm(processedData)
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
            name="aadharCard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Aadhar Card<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <FileUpload
                    label="Upload Aadhar Card"
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

