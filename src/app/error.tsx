'use client'

import { Button } from '@/components/ui'

export default function GlobalError ({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error(error)
  return (
    <html>
      <body className="w-screen h-screen grid place-content-center gap-5">
      <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn&apos;t find this page.</p>
            <p className="mt-4 mb-8 dark:text-gray-400">But dont worry, you can find plenty of other things on our homepage.</p>
            <Button onClick={reset}>Volver a la página de inicio</Button>

          </div>
        </div>
      </section>
      </body>
    </html>
  )
}
