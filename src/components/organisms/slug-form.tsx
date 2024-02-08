'use client'

import React, { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, Input, FormMessage, Button } from '../ui'
import { Textarea } from '../ui/textarea'
import { controlsFormData } from '@/lib/validations'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { DialogClose } from '@radix-ui/react-dialog'

export const SlugForm = ({ setStatus }: any) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data } = useSession()
  const router = useRouter()

  const form = useForm<z.infer<typeof controlsFormData>>({
    resolver: zodResolver(controlsFormData),
    defaultValues: {
      url: '',
      slug: '',
      description: '',
      userId: data?.userId,
    },
  })

  const onSubmit = async (dataToSend: z.infer<typeof controlsFormData>) => {
    setIsLoading(true)

    try {
      const OPTIONS = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
        },
        body: JSON.stringify(dataToSend),
      }

      const response = await fetch('/api/slugs', OPTIONS)
      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message as ReactNode)
        return
      }

      router.refresh()
      form.reset()
      toast.success('Custom slug created!', {
        icon: '🎉',
      })

      setStatus(false)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 w-full">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter url here</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="https://page-link-ds.vercel.app/eyJuYW1lIjoiSmaWFRlc3RCBl6biBlzWplc3BzOi8vZ2l0aHViLm"
                  {...field}
                />
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
                <Input type="text" placeholder="page-link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[120px] max-h-[120px]"
                  placeholder="This custom slug is for my page..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-4">
          <DialogClose asChild>
            <Button variant={'ghost'}>Cancel</Button>
          </DialogClose>

          <Button variant={'shadow'}>
            {isLoading ? <span className="animate-pulse">...</span> : <span>{'Create'}</span>}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SlugForm
