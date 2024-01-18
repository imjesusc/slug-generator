import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import React from 'react'
import { Toaster } from '@/components/ui'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Custom slug generator',
  description: 'Open source custom slug generator—create unique and memorable slugs for any purpose.',
  icons: {
		icon: '/favicon.ico?v=1',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png'
	},
}



export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
