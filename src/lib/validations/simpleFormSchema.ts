import { z } from 'zod'

export const simpleFormSchema = z.object({
  originalUrl: z.string().refine((url) => /^(https?|ssh):\/\/[^\s/$.?#].[^\s]*$/.test(url)),
  customSlug: z.string().refine((value) => /^[a-zA-Z0-9_.-]+$/.test(value)),
})
