'use client'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form, DialogClose } from '@/components/ui'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import { type ReactNode, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { type ControlsFormProps } from '@/models'
import { controlsFormData } from '@/lib/validations'
import { useRouter } from 'next/navigation'

export const EditForm = ({ slugData, setStatus }: ControlsFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data } = useSession()
  const router = useRouter()

  const form = useForm<z.infer<typeof controlsFormData>>({
    resolver: zodResolver(controlsFormData),
    defaultValues: {
      url: slugData?.url ?? '',
      slug: slugData?.slug ?? '',
      description: slugData?.description ?? '',
      userId: data?.userId,
    },
  })

  const onSubmit = async (dataToSend: z.infer<typeof controlsFormData>) => {
    setIsLoading(true)

    const putData = {
      url: dataToSend.url,
      slug: dataToSend.slug,
      description: dataToSend.description,
      userId: data?.userId,
      id: slugData.id,
    }

    const OPTIONS = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
      },
      body: JSON.stringify(putData),
    }

    try {
      const res = await fetch('/api/slugs', OPTIONS)

      if (!res.ok) {
        const errorData = await res.json()
        toast.error(errorData.message as ReactNode)
        return
      }

      router.refresh()
      toast.success('Custom slug updated!', {
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

          <Button variant={'shadow'} size={'lg'}>
            {isLoading ? <span className="animate-pulse">...</span> : <span>{'Update'}</span>}
          </Button>
        </div>
      </form>
    </Form>
  )
}
