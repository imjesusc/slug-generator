import { SimpleSlugForm, SimpleSlugTable } from '@/components/organisms'
export default function Home() {
  return (
    <main className="w-screen h-auto  my-10 laptop:mt-20 container grid gap-10 place-content-center">
      <h1 className="text-4xl text-balance font-bold">Open Source Custom Slug Generator</h1>
      <SimpleSlugForm />
      <SimpleSlugTable />
    </main>
  )
}
