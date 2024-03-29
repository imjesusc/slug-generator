'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Button, Form, Input } from '@/components/ui'
import useLinkStore from '@/store/linkStore'
import { simpleFormSchema } from '@/lib/validations/simpleFormSchema'
import { type ReactNode, useState } from 'react'
import { toast } from 'sonner'
import { type SimpleSlugInterface } from '@/models'

export const SimpleSlugForm = () => {
  const { links, setLinks } = useLinkStore()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof simpleFormSchema>>({
    resolver: zodResolver(simpleFormSchema),
    defaultValues: {
      originalUrl: '',
      customSlug: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof simpleFormSchema>) => {
    setIsLoading(true)
    try {
      const OPTIONS = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
        },
        body: JSON.stringify(data),
      }

      const response = await fetch('/api/slug', OPTIONS)

      if (!response.ok) {
        const errorData = await response.json()
        console.log(errorData)
        toast.error(errorData.message as ReactNode)
      } else {
        const resData = await response.json()
        setLinks([...links, resData as SimpleSlugInterface])
        toast.success('Custom slug created!.', {
          icon: '🎉',
        })
        form.reset()
      }
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 tablet:grid-cols-2 w-full">
        <FormField
          control={form.control}
          name="originalUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter url here</FormLabel>
              <FormControl>
                <Input type="text" placeholder="https://custom-slug.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customSlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom slug</FormLabel>
              <FormControl>
                <Input type="text" placeholder="custom-slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant={'shadow'} size={'sm'}>
          {isLoading ? '...' : 'Create'}
        </Button>
      </form>
    </Form>
  )
}
