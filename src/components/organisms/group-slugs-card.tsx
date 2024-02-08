import { getServerSession } from 'next-auth'
import { type CustomSlugInterface } from '@/models/custom-slug.interface'
import { authOptions } from '@/lib/authOptions'
import { SlugCard } from '../molecules'

const getSlugsData = async (userId: string, query?: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/slugs?userId=${userId}&search=${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
    },
  })
  const resData = await res.json()
  return resData.userSlugs
}

export const GroupSlugsCard = async ({ search }: { search: string }) => {
  const session = await getServerSession(authOptions)
  if (!session?.userId) return
  const slugsData = await getSlugsData(session?.userId, search)

  return (
    <div className="grid tablet:grid-cols-3 gap-4">
      {slugsData?.length > 0 ? (
        slugsData?.map((slug: CustomSlugInterface) => (
          <SlugCard
            key={slug.id}
            shortUrl={slug.shortUrl}
            id={slug.id}
            url={slug.url}
            slug={slug.slug}
            description={slug.description}
          />
        ))
      ) : (
        <div className="col-span-3 gap-5  grid place-content-center text-center my-10">
          <p className="text-sm">No slugs found.</p>
        </div>
      )}
    </div>
  )
}
