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

interface SimpleSlugInterface {
  id?: number
  url: string
  slug: string
  description: string
  createdAt?: string
  userId?: string
}

export default function SlugCard ({ url, slug, description }: SimpleSlugInterface) {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className='flex justify-between gap-4'>
        <div className='grid gap-1'>
        <CardTitle>{slug}</CardTitle>
        <CardDescription className='truncate'>{url}</CardDescription>
        </div>

          <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Button className='flex gap-2 h-10' variant='outline'>
                Controls
              </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36" align="end" forceMount>
            <DropdownMenuGroup className='font-sans'>
              <DropdownMenuItem onClick={async () => { await copyToClipboard(`http://localhost:3000/cs/${slug}`) }}className='cursor-pointer'>
                Copy
                <DropdownMenuShortcut><CopyIcon /></DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer'>
                Edit
                <DropdownMenuShortcut><MixerHorizontalIcon /></DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer'>
                Delete
                <DropdownMenuShortcut><ScissorsIcon /></DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription className='h-[40px] max-h-[40px] overflow-hidden'>
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
