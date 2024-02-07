import { SimpleSlugForm, SimpleSlugTable } from '@/components/organisms'
export default function Home() {
  return (
    <main className="w-screen h-auto my-10  container grid gap-10 place-content-center">
      <h1 className="text-5xl text-balance font-bold font-sans">Slug Generator</h1>
      <SimpleSlugForm />
      <SimpleSlugTable />
    </main>
  )
}
