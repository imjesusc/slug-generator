'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuItem,
} from '../ui'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui'
import { ScissorsIcon, MixerHorizontalIcon, CopyIcon } from '@radix-ui/react-icons'
import { type CustomSlugInterface } from '@/models/custom-slug.interface'
import { toast } from 'sonner'
import { useState, type ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { copyToClipboard } from '@/utils/copy-to-clipboard'
import { EditForm } from '.'

export const SlugCard = ({ id, url, shortUrl, slug, description }: CustomSlugInterface) => {
  const { data } = useSession()
  const router = useRouter()
  const [status, setStatus] = useState(false)
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
    <Card className=" bg-white backdrop-blur-lg shadow-medium border-transparent">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between gap-4">
          <div className="grid gap-1">
            <div className="flex items-center gap-3">
              <Link
                prefetch={false}
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

          <Dialog open={status} onOpenChange={setStatus}>
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

                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      Edit
                      <span className="ml-auto text-xs tracking-widest opacity-60">
                        <MixerHorizontalIcon />
                      </span>
                    </DropdownMenuItem>
                  </DialogTrigger>
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

            <DialogContent className="tablet:min-w-[650px]">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
              </DialogHeader>
              <EditForm setStatus={setStatus} slugData={{ url, id, slug, description }} />
            </DialogContent>
          </Dialog>
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
