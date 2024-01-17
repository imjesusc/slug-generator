import { SimpleSlugForm } from '@/components/organisms'

export default function Home () {
  return <main className='w-screen h-screen grid gap-10 place-content-center'>
    <h1 className='text-3xl font-bold'>Generate a custom slug</h1>
    <SimpleSlugForm />
  </main>
}
