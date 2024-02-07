import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className="fixed bottom-0 h-16 w-screen grid items-start bg-white">
      <footer className="m-auto flex justify-between container">
        <span className="text-muted-foreground text-sm">
          Built by{' '}
          <Link target="_blank" href="https://github.com/imjesusc" className="hover:underline">
            imjesusc
          </Link>
          . The source code is available on{' '}
          <Link target="_blank" href="https://github.com/imjesusc/slug-generator" className="hover:underline">
            Github.
          </Link>
        </span>
      </footer>
    </div>
  )
}
