import { buttonVariants } from '@/components/ui'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="h-screen w-screen absolute top-0 left-0 -z-10 bg-gray-100 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">404</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">Sorry we couldn&apos;t find this page. </p>
          <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>

          <Link className={cn(buttonVariants({ variant: 'outline' }))} href={'/'}>
            Go Home
          </Link>
        </div>
        <div className="max-w-lg">
          <Image src="/not-found.svg" alt="404" width={400} height={400} />
        </div>
      </div>
    </div>
  )
}
