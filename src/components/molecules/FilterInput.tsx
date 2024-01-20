'use client'

import { Input } from '@/components/ui'
import { useDebounce } from '@/utils/debounce'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function FilterInput () {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const [inputValue, setInputValue] = useState<string>('')
  const debouncedValue = useDebounce(inputValue, 300)

  useEffect(() => {
    router.push(`${pathname}?${createQueryString('search', debouncedValue)}`)
  }, [debouncedValue])

  return (
    <div>
      <Input placeholder='Search' id="search" name="search" onChange={(e) => { setInputValue(e.target.value) }} />
    </div>
  )
}
