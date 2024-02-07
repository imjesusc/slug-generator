import Footer from '@/components/global/footer'
import { SimpleSlugForm, SimpleSlugTable } from '@/components/organisms'
export default function Home() {
  return (
    <div className="w-screen relative">
      <main className="tablet:min-w-[500px] max-w-[800px] mx-auto my-10 pb-20  container flex gap-6 flex-col">
        <h1 className="text-5xl text-balance font-bold font-sans">Slug Generator</h1>
        <SimpleSlugForm />
        <SimpleSlugTable />
      </main>
      <Footer />
    </div>
  )
}
