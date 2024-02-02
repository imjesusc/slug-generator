'use client'

import { Button, Input } from '@/components/ui'
import { useDebounce } from '@/utils/debounce'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { ControlsForm } from '.'

export default function FilterInput() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const [filterValue, setFilterValue] = useState<string>(searchParams.get('search') ?? '')
  const debouncedValue = useDebounce(filterValue, 300)

  useEffect(() => {
    router.push(`${pathname}?${createQueryString('search', debouncedValue)}`)
  }, [debouncedValue])

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search"
        value={filterValue}
        id="search"
        name="search"
        onChange={(e) => {
          setFilterValue(e.target.value)
        }}
      />
      <ControlsForm action="Create">
        <Button variant="outline">Create</Button>
      </ControlsForm>
    </div>
  )
}
