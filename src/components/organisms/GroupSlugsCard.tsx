import { type SimpleSlugInterface } from '@/models'
import SlugCard from '../molecules/SlugCard'

const getSlugsData = async (userId: string, query?: string) => {
  const res = await fetch(`http://localhost:3000/api/slugs/${userId}?search=${query}`)
  const data = await res.json()

  return data.userSlugs
}

export const GroupSlugsCard = async ({ search }: { search: string }) => {
  const slugsData = await getSlugsData('clrl44ii600009gdyydzvvham', search)

  return (

     <div className='grid grid-cols-3 gap-4'>
     {slugsData?.length > 0
       ? (
           slugsData?.map((slug: SimpleSlugInterface) => (
            <SlugCard key={slug.id} url={slug.url} slug={slug.slug} description={slug.description} />
           ))
         )
       : <p className='col-span-3 text-center'>No slugs found</p>}
    </div>
  )
}
