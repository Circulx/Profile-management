"use client"

import { useState, useEffect } from "react"
import { Upload } from "lucide-react"
import * as pdfjsLib from "pdfjs-dist"

interface FileUploadProps {
  label: string
  value?: File
  onChange: (file: File | undefined) => void
  className?: string
}

export function FileUpload({ label, value, onChange, className }: FileUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileType, setFileType] = useState<"image" | "pdf" | null>(null)

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
  }, [])

  const handleFileChange = async (file: File | undefined) => {
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
    <div className={className}>
      <label className="text-sm font-medium">
        {label}
        <span className="text-red-500">*</span>
      </label>
      <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary">
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          id={`file-${label}`}
          onChange={(e) => handleFileChange(e.target.files?.[0])}
        />
        <label htmlFor={`file-${label}`} className="cursor-pointer">
          {previewUrl ? (
            <div className="relative w-full aspect-video">
              <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="w-full h-full object-contain" />
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
    </div>
  )
}

