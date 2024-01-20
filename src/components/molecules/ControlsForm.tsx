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
  Form
} from '@/components/ui'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { type ReactNode, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { toast } from 'sonner'

const controlsFormData = z.object({
  url: z.string().refine((url) => /^(https?|ssh):\/\/[^\s/$.?#].[^\s]*$/.test(url)),
  slug: z.string().refine((value) => /^[a-zA-Z0-9_.-]+$/.test(value)),
  description: z.string(),
  userId: z.string()
})

export function ControlsForm ({ action, variant }: { action: string, variant: any }) {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(true)
  const form = useForm<z.infer<typeof controlsFormData>>({
    resolver: zodResolver(controlsFormData),
    defaultValues: {
      url: '',
      slug: '',
      description: '',
      userId: 'clrl44ii600009gdyydzvvham'
    }
  })

  const onSubmit = async (data: z.infer<typeof controlsFormData>) => {
    setIsLoading(true)
    const OPTIONS = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    try {
      const response = await fetch('/api/slugs', OPTIONS)
      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message as ReactNode)
        return
      }

      setStatus(false)
      form.reset()
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
      <DialogTrigger asChild>
        <Button variant="outline">{action ?? 'Action'} slug</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{action} Custom Slug</DialogTitle>
        </DialogHeader>

        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit) as any}
      className="grid gap-4 w-full">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter url here</FormLabel>
              <FormControl>
                <Input type="text" placeholder="https://page-link-ds.vercel.app/eyJuYW1lIjoiSmaWFRlc3RCBl6biBlzWplc3BzOi8vZ2l0aHViLm" {...field} />
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
              <FormLabel>Custom slug</FormLabel>
              <FormControl>
                <Textarea className='max-h-[130px]' placeholder="This custom slug is for my page..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div >
          <Button variant={variant ?? 'default'} className="w-full">
            {isLoading ? 'Creating...' : <span>{action ?? 'Confirm'}</span> }
          </Button>
        </div>
      </form>
    </Form>
      </DialogContent>
    </Dialog>
  )
}
