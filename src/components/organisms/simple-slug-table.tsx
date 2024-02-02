'use client'

import { type SimpleSlugInterface } from '@/models'
import useLinkStore from '@/store/linkStore'
import { useEffect, useState } from 'react'
import { SlugsTable } from '../molecules'

export function SimpleSlugTable() {
  const { links } = useLinkStore()
  const [data, setData] = useState<SimpleSlugInterface[]>([])

  useEffect(() => {
    const reversedLinks = links.slice().reverse()
    setData(reversedLinks)
  }, [links])

  return (
    <div className="border rounded-lg tablet:min-w-[600px]">
      <SlugsTable links={data ?? []} />
    </div>
  )
}
