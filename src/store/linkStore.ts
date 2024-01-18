import { type SimpleSlugInterface } from '@/models'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LinkStoreProps {
  links: SimpleSlugInterface[]
  setLinks: (links: SimpleSlugInterface[]) => void
}

const useLinkStore = create(
  persist<LinkStoreProps>(
    (set, get) => ({
      links: [],
      setLinks: (links) => {
        set((state) => ({
          ...state,
          links
        }))
      }
    }),
    {
      name: 'links'
    }
  )
)

export default useLinkStore
