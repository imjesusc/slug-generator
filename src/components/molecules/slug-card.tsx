'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui'
import { ScissorsIcon, MixerHorizontalIcon, CopyIcon } from '@radix-ui/react-icons'
import { type CustomSlugInterface } from '@/models/custom-slug.interface'
import { toast } from 'sonner'
import { type ReactNode } from 'react'
import { ControlsForm } from '.'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { copyToClipboard } from '@/utils/copy-to-clipboard'

export const SlugCard = ({ id, url, shortUrl, slug, description }: CustomSlugInterface) => {
  const { data } = useSession()
  const router = useRouter()
  const handleDelete = async (userId: string | undefined, slugId: number | undefined) => {
    const res = await fetch(`/api/slugs?userId=${userId}&slugId=${slugId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const errorData = await res.json()
      toast.error(errorData.message as ReactNode)
      console.log(errorData)
      return
    }

    router.refresh()
    toast.success('Custom slug deleted!')
  }

  return (
    <Card className="hover:bg-accent transition-colors">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between gap-4">
          <div className="grid gap-1">
            <div className="flex items-center gap-3">
              <Link
                href={shortUrl ?? ''}
                target="_blank"
                className="hover:underline underline-offset-1"
                rel="noopener noreferrer"
              >
                <CardTitle>{slug}</CardTitle>
              </Link>
              <CopyIcon
                className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-accent-foreground   active:scale-105"
                onClick={async () => {
                  await copyToClipboard(shortUrl ?? '')
                }}
              />
            </div>
            <CardDescription className="truncate">{url}</CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="relative rounded-full " variant="outline">
                Controls
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36" align="end" forceMount>
              <DropdownMenuGroup className="font-sans">
                <DropdownMenuItem
                  onClick={async () => {
                    await copyToClipboard(shortUrl ?? '')
                  }}
                  className="cursor-pointer"
                >
                  Copy
                  <DropdownMenuShortcut>
                    <CopyIcon />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <ControlsForm slugData={{ url, id, slug, description }} action="Update">
                  <div className="relative flex hover:bg-accent items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground  cursor-pointer">
                    Edit
                    <span className="ml-auto text-xs tracking-widest opacity-60">
                      <MixerHorizontalIcon />
                    </span>
                  </div>
                </ControlsForm>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={async () => {
                    await handleDelete(data?.userId, id)
                  }}
                >
                  Delete
                  <DropdownMenuShortcut>
                    <ScissorsIcon />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription className="h-[40px] max-h-[40px] overflow-hidden">
          {description || 'No description.'}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
