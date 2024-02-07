import { FilterField } from '@/components/molecules'
import { GroupSlugsCard } from '@/components/organisms'
import { GroupSlugsCardSkeleton } from '@/components/ui'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Dashboard | Slug generator',
}

export default function DashboardPage({ searchParams }: { searchParams: { search: string } }) {
  const search = searchParams.search || ''

  return (
    <main className="container my-3 gap-4">
      <div className="grid gap-4">
        <header>
          <h1 className="tracking-tight font-sans font-semibold text-[2.5rem]  bg-clip-text">Dashboard</h1>
          <p className="text-balance text-muted-foreground">Create and manage your slugs in one place 🎉.</p>
        </header>

        <div className="mb-4">
          <FilterField />
        </div>
        <Suspense key={searchParams.search} fallback={<GroupSlugsCardSkeleton />}>
          <GroupSlugsCard search={search} />
        </Suspense>
      </div>
    </main>
  )
}
