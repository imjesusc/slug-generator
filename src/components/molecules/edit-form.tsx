'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui'
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

export const EditForm = ({ slugData, variant, children }: ControlsFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data } = useSession()
  const router = useRouter()

  const [status, setStatus] = useState(false)
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
    <Dialog open={status} onOpenChange={setStatus}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Custom Slug</DialogTitle>
        </DialogHeader>

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
                    <Textarea className="max-h-[130px]" placeholder="This custom slug is for my page..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button
                variant={variant ?? 'default'}
                className="w-full text-foreground bg-[#adfa1d] hover:bg-[#adfa1d]/70"
              >
                {isLoading ? <span className="animate-pulse">...</span> : <span>Edit slug</span>}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}