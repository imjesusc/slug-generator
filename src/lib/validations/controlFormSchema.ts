import { z } from 'zod'

export const controlsFormData = z.object({
  url: z.string().refine((url) => /^(https?|ssh):\/\/[^\s/$.?#].[^\s]*$/.test(url)),
  slug: z.string().refine((value) => /^[a-zA-Z0-9_.-]+$/.test(value)),
  description: z.string(),
  userId: z.string(),
})
