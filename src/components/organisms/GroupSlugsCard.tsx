import { getServerSession } from 'next-auth'
import SlugCard from '../molecules/SlugCard'
import { type CustomSlugInterface } from '@/models/custom-slug.interface'
import { authOptions } from '@/lib/authOptions'

const getSlugsData = async (userId: string, query?: string) => {
  const res = await fetch(`http://localhost:3000/api/slugs/${userId}?search=${query}`)
  const resData = await res.json()
  return resData.userSlugs
}

export const GroupSlugsCard = async ({ search }: { search: string }) => {
  const session = await getServerSession(authOptions)
  if (!session?.userId) return
  const slugsData = await getSlugsData(session?.userId, search)

  return (

     <div className='grid tablet:grid-cols-3 gap-4'>
     {slugsData?.length > 0
       ? (
           slugsData?.map((slug: CustomSlugInterface) => (
            <SlugCard key={slug.id} id={slug.id} url={slug.url} slug={slug.slug} description={slug.description} />
           ))
         )
       : <div className='col-span-3 gap-5  grid place-content-center text-center my-10'>
            <p className='text-sm'>No slugs found. Create a new one.</p>
        </div>}
    </div>
  )
}
