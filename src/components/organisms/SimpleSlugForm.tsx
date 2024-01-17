"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button, 
  Form,
   Input
} from "@/components/ui"

const formSchema = z.object({
  originalUrl: z.string().refine((url) => /^(https?|ssh):\/\/[^\s\/$.?#].[^\s]*$/.test(url)),
  slug: z.string().refine((value) => /^[a-zA-Z0-9_.-]+$/.test(value))
})
export const SimpleSlugForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: "",
      slug: "",
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-4 grid-cols-2">
        <FormField
          control={form.control}
          name="originalUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter url here</FormLabel>
              <FormControl>
                <Input type="text" placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom slug</FormLabel>
              <FormControl>
                <Input type="text" placeholder="imjesus" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
        <div className="col-span-2">
          <Button>Generate</Button>
        </div>
      </form>
    </Form>
  )
}
