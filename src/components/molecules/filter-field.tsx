'use client'

import { Button, Input } from '@/components/ui'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { CreateForm } from '.'
export const FilterField = () => {
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search"
        defaultValue={searchParams.get('search')?.toString()}
        id="search"
        name="search"
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
      />
      <CreateForm>
        <Button variant="outline">Create</Button>
      </CreateForm>
    </div>
  )
}
