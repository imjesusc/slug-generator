import { z } from 'zod'

const notValidSlugs = [
  'api',
  'dashboard',
  'not-found.svg',
  '404',
  'favicon-32x32.png',
  'favicon-16x16.png',
  'favicon.ico',
]

export const controlsFormData = z.object({
  url: z.string().refine((url) => /^(https?|ssh):\/\/[^\s/$.?#].[^\s]*$/.test(url)),
  slug: z
    .string()
    .min(2)
    .refine((value) => {
      return value !== '' && !notValidSlugs.includes(value) && !/^[-]{2,}$/.test(value) && !/^-/.test(value)
    })
    .refine((value) => {
      return /^[a-z-0-9_.-]+$/.test(value)
    }),
  description: z.string().max(100).optional(),
  userId: z.string(),
})
