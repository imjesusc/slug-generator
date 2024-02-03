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
    <main className="container my-10 gap-4">
      <div className="grid gap-4">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-balance">Create and manage your slugs in one place 🎉.</p>
          </div>

          {/* <CreateForm>
            <Button variant="outline">Create</Button>
          </CreateForm> */}
        </div>
        <FilterField />
        <Suspense key={searchParams.search} fallback={<GroupSlugsCardSkeleton />}>
          <GroupSlugsCard search={search} />
        </Suspense>
      </div>
    </main>
  )
}
