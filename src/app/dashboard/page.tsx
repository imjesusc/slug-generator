import { FilterInput } from '@/components/molecules'
import { GroupSlugsCard } from '@/components/organisms'
import { GroupSlugsCardSkeleton } from '@/components/ui'
import { Suspense } from 'react'

export default function DashboardPage({ searchParams }: { searchParams: { search: string } }) {
  return (
    <main className="container my-10 gap-4">
      <div className="grid gap-4">
        <FilterInput />
        <Suspense key={searchParams.search} fallback={<GroupSlugsCardSkeleton />}>
          <GroupSlugsCard search={searchParams.search} />
        </Suspense>
      </div>
    </main>
  )
}
