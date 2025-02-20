"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Upload } from "lucide-react"
import { useState, useEffect } from "react"
import * as pdfjsLib from "pdfjs-dist"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { BankDetails } from "../types/profile"
import { ACCOUNT_TYPES } from "../types/profile"

const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB

const bankSchema = z.object({
  accountHolderName: z.string().min(2, "Account holder name is required"),
  accountNumber: z.string().min(8, "Valid account number required"),
  ifscCode: z.string().min(11, "Valid IFSC code required"),
  bankName: z.string().min(2, "Bank name is required"),
  branch: z.string().min(2, "Branch name is required"),
  city: z.string().min(2, "City is required"),
  accountType: z.string().min(1, "Account type is required"),
  bankLetter: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 25MB")
    .optional(),
})

export function BankForm() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileType, setFileType] = useState<"image" | "pdf" | null>(null)

  const form = useForm<BankDetails>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      branch: "",
      city: "",
      accountType: "",
    },
  })

  function onSubmit(data: BankDetails) {
    console.log(data)
  }

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
  }, [])

  const handleFileChange = async (file: File | undefined, onChange: (file: File) => void) => {
    if (file) {
      onChange(file)

      if (file.type === "application/pdf") {
        setFileType("pdf")
        const pdfData = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise
        const page = await pdf.getPage(1)
        const viewport = page.getViewport({ scale: 1 })
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")
        canvas.height = viewport.height
        canvas.width = viewport.width
        await page.render({ canvasContext: context!, viewport: viewport }).promise
        setPreviewUrl(canvas.toDataURL())
      } else {
        setFileType("image")
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Account Holder Name<span className="text-red-500">*</span>
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
              name="ifscCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    IFSC Code/Swift Code<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ABCD0001234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Branch<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., HDFC Bank" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankLetter"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>
                    Bank Letter/Cancelled Cheque<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        id="bankLetter"
                        onChange={(e) => {
                          handleFileChange(e.target.files?.[0], onChange)
                        }}
                        {...field}
                      />
                      <label htmlFor="bankLetter" className="cursor-pointer">
                        {previewUrl ? (
                          <div className="relative w-full aspect-video">
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-full object-contain"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              {fileType === "pdf" ? "PDF Preview (First Page)" : "Image Preview"} - Click to change file
                            </p>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                            <p className="text-sm text-muted-foreground">Click to Upload or drag and drop</p>
                            <p className="text-xs text-muted-foreground mt-1">(Max file size 25 MB)</p>
                          </>
                        )}
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Account Number<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1234 5678 9012" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Bank Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., HDFC Bank" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Account Type<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ACCOUNT_TYPES.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" type="button">
            Back
          </Button>
          <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
}

