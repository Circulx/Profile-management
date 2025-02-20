"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import { useProfile } from "@/context/ProfileContext"

const contactSchema = z.object({
  contactName: z.string().min(2, "Contact name is required"),
  phoneNumber: z.string().min(10, "Valid phone number required"),
  emailId: z.string().email("Valid email required"),
  pickupTime: z.string().min(1, "Pickup time is required"),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const { isSubmitting, submitForm } = useFormSubmit("contact")
  const { setActiveTab } = useProfile()

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      contactName: "",
      phoneNumber: "",
      emailId: "",
      pickupTime: "",
    },
  })

  async function onSubmit(data: ContactFormData) {
    try {
      await submitForm(data)
    } catch (error) {
      // Error is handled by the hook
      console.error(error)
    }
  }

  const handleBack = () => {
    setActiveTab("business")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Contact Name<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone Number<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 9876543210" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="emailId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email ID<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., john@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pickupTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Pickup Time<span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pickup time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="11:00-14:00">11:00 AM - 02:00 PM</SelectItem>
                    <SelectItem value="14:00-17:00">02:00 PM - 05:00 PM</SelectItem>
                    <SelectItem value="17:00-20:00">05:00 PM - 08:00 PM</SelectItem>
                  </SelectContent>
                </Select>
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

