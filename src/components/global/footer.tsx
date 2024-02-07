import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className="absolute bottom-0 h-20 w-screen grid items-start">
      <footer className="m-auto flex justify-between container">
        <span className="text-muted-foreground text-sm">
          Built by{' '}
          <Link href="https://github.com/imjesusc" className="hover:underline">
            imjesusc
          </Link>
          . The source code is available on{' '}
          <Link href="https://github.com/imjesusc/slug-generator" className="hover:underline">
            Github.
          </Link>
        </span>
      </footer>
    </div>
  )
}
