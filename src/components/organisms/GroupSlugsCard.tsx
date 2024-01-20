import SlugCard from '../molecules/SlugCard'
import { ControlsForm } from '../molecules'
import { type CustomSlugInterface } from '@/models/custom-slug.interface'

const getSlugsData = async (userId: string, query?: string) => {
  const res = await fetch(`http://localhost:3000/api/slugs/${userId}?search=${query}`, { next: { revalidate: 200 } })
  const data = await res.json()

  return data.userSlugs
}

export const GroupSlugsCard = async ({ search }: { search: string }) => {
  const slugsData = await getSlugsData('clrl44ii600009gdyydzvvham', search)

  return (

     <div className='grid tablet:grid-cols-3 gap-4'>
     {slugsData?.length > 0
       ? (
           slugsData?.map((slug: CustomSlugInterface) => (
            <SlugCard key={slug.id} url={slug.url} slug={slug.slug} description={slug.description} />
           ))
         )
       : <div className='col-span-3 gap-5  grid place-content-center text-center my-10'>
            {slugsData?.length < 0 && <ControlsForm action='Create' variant='primary' />}
            <p className='text-sm'>No slugs found</p>
        </div>}
    </div>
  )
}
