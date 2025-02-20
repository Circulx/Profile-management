"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CheckboxList } from "./checkbox-list"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import { useProfile } from "@/context/ProfileContext"
import { AVAILABLE_CATEGORIES, AVAILABLE_BRANDS } from "@/types/profile"

const categorySchema = z.object({
  categories: z.array(z.string()).min(1, "Select at least one category"),
  authorizedBrands: z.array(z.string()).min(1, "Select at least one brand"),
})

type CategoryFormData = z.infer<typeof categorySchema>

export function CategoryBrandForm() {
  const { isSubmitting, submitForm } = useFormSubmit("category")
  const { setActiveTab } = useProfile()

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categories: [],
      authorizedBrands: [],
    },
  })

  async function onSubmit(data: CategoryFormData) {
    try {
      await submitForm(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleBack = () => {
    setActiveTab("contact")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Categories<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <CheckboxList
                    items={AVAILABLE_CATEGORIES}
                    selectedItems={field.value}
                    onItemToggle={(item) => {
                      const newValue = field.value.includes(item)
                        ? field.value.filter((i) => i !== item)
                        : [...field.value, item]
                      field.onChange(newValue)
                    } } title={""}                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="authorizedBrands"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Authorized Brands<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <CheckboxList
                    items={AVAILABLE_BRANDS}
                    selectedItems={field.value}
                    onItemToggle={(item) => {
                      const newValue = field.value.includes(item)
                        ? field.value.filter((i) => i !== item)
                        : [...field.value, item]
                      field.onChange(newValue)
                    } } title={""}                  />
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

