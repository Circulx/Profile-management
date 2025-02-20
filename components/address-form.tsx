"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { AddressDetails } from "../types/profile"

const addressSchema = z.object({
  billingAddress: z.object({
    country: z.string().min(2, "Country is required"),
    state: z.string().min(2, "State is required"),
    city: z.string().min(2, "City is required"),
    addressLine1: z.string().min(5, "Address Line 1 is required"),
    addressLine2: z.string().optional(),
    phoneNumber: z.string().min(10, "Valid phone number required"),
  }),
  pickupAddress: z.object({
    country: z.string().min(2, "Country is required"),
    state: z.string().min(2, "State is required"),
    city: z.string().min(2, "City is required"),
    addressLine1: z.string().min(5, "Address Line 1 is required"),
    addressLine2: z.string().optional(),
    phoneNumber: z.string().min(10, "Valid phone number required"),
  }),
})

export function AddressForm() {
  const form = useForm<AddressDetails>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      billingAddress: {
        country: "",
        state: "",
        city: "",
        addressLine1: "",
        addressLine2: "",
        phoneNumber: "",
      },
      pickupAddress: {
        country: "",
        state: "",
        city: "",
        addressLine1: "",
        addressLine2: "",
        phoneNumber: "",
      },
    },
  })

  function onSubmit(data: AddressDetails) {
    console.log(data)
  }

  const AddressFields = ({ prefix }: { prefix: "billingAddress" | "pickupAddress" }) => (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={`${prefix}.country`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Country<span className="text-red-500">*</span>
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
        name={`${prefix}.state`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              State<span className="text-red-500">*</span>
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
        name={`${prefix}.city`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              City<span className="text-red-500">*</span>
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
        name={`${prefix}.addressLine1`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Address Line 1<span className="text-red-500">*</span>
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
        name={`${prefix}.addressLine2`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address Line 2</FormLabel>
            <FormControl>
              <Input placeholder="e.g., ABC Industries Pvt Ltd" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${prefix}.phoneNumber`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Phone Number<span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g., ABC Industries Pvt Ltd" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium mb-4">Add Billing Address</h3>
            <AddressFields prefix="billingAddress" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Add Pickup Address</h3>
            <AddressFields prefix="pickupAddress" />
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" type="button">
            Back
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  )
}

