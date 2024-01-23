'use client'

import { copyToClipboard } from '@/utils/copyToClipboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui'
import { ScissorsIcon, MixerHorizontalIcon, CopyIcon } from '@radix-ui/react-icons'
import { type CustomSlugInterface } from '@/models/custom-slug.interface'
import { toast } from 'sonner'
import { type ReactNode } from 'react'
import { ControlsForm } from '.'
import { useSession } from 'next-auth/react'
const handleDelete = async (userId: string | undefined, slugId: number | undefined) => {
  const res = await fetch(`/api/slugs?userId=${userId}&slugId=${slugId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    const errorData = await res.json()
    toast.error(errorData.message as ReactNode)
    console.log(errorData)
    return
  }

  toast.success('Custom slug deleted!')
}

export default function SlugCard ({ id, url, slug, description }: CustomSlugInterface) {
  const { data } = useSession()
  return (
    <Card className='hover:bg-accent transition-colors'>
      <CardHeader className='flex justify-between'>
        <div className='flex justify-between gap-4'>
          <div className='grid gap-1'>
            <div className='flex items-center gap-2'>
              <CardTitle>{slug}</CardTitle><CopyIcon className='w-4 h-4 cursor-pointer  active:scale-105' onClick={async () => {
                await copyToClipboard(`http://localhost:3000/cs/${slug}`)
              }} />
            </div>
            <CardDescription className='truncate'>{url}</CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='flex gap-2 h-10 ' variant='outline'>
                Controls
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-36' align='end' forceMount>
              <DropdownMenuGroup className='font-sans'>
                <DropdownMenuItem
                  onClick={async () => {
                    await copyToClipboard(`http://localhost:3000/cs/${slug}`)
                  }}
                  className='cursor-pointer'
                >
                  Copy
                  <DropdownMenuShortcut>
                    <CopyIcon />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <ControlsForm slugData={{ url, id, slug, description }} action='Update'>
                  <div className='relative flex hover:bg-accent items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground  cursor-pointer'>
                    Edit
                    <span className='ml-auto text-xs tracking-widest opacity-60'>
                      <MixerHorizontalIcon />
                    </span>
                  </div>
                </ControlsForm>

                <DropdownMenuItem
                  className='cursor-pointer'
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
        <CardDescription className='h-[40px] max-h-[40px] overflow-hidden'>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
