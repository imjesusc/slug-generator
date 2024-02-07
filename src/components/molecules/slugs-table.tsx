'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { type SimpleSlugInterface, type SlugsTableProps } from '@/models'
import Link from 'next/link'
import { ReactNode, type FC } from 'react'
import { Button } from '../ui'
import { cn } from '@/lib/utils'
import { copyToClipboard } from '@/utils/copy-to-clipboard'
import { CopyIcon, ScissorsIcon } from '@radix-ui/react-icons'
import useLinkStore from '@/store/linkStore'
import { toast } from 'sonner'
export const SlugsTable: FC<SlugsTableProps> = ({ links }) => {
  const { setLinks } = useLinkStore()
  const handleRemove = async (slug: string) => {
    try {
      const OPTIONS = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      // Fetching Simple Shortened Url
      const res = await fetch(`/api/slug?slug=${slug}`, OPTIONS)
      console.log(res)
      if (!res.ok) {
        const errorData = await res.json()
        toast.error(errorData.message as ReactNode)
      }

      toast.success('Custom slug deleted!.', {
        icon: <ScissorsIcon className="w-5 h-5" />,
      })

      const newLinks = links.filter((link: SimpleSlugInterface) => link.customSlug !== slug)
      setLinks(newLinks)
    } catch (error) {
      console.error('Error fetching simple slug:', error)
    }
  }
  return (
    <Table className="w-full overflow-hidden">
      <TableCaption>A list of your recent custom slugs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="truncate w-[200px] tablet:w-[150px]">Custom Slug</TableHead>
          <TableHead className="truncate">Complete URL</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {links.map((link: SimpleSlugInterface, index) => (
          <TableRow key={link.customSlug} className={cn(index === 0 && 'bg-pink-100 hover:opacity-80')}>
            <TableCell>
              <Link
                prefetch={false}
                className="hover:underline font-medium"
                target="_blank"
                title={link.customSlug}
                rel="noreferrer"
                href={`${link.url}`}
              >
                {link.customSlug}
              </Link>
            </TableCell>
            <TableCell className="truncate  max-w-10 tablet:max-w-[300px]">{link.url}</TableCell>
            <TableCell className="flex items-end gap-4 justify-end">
              <Button
                variant="outline"
                onClick={async () => {
                  await copyToClipboard(`${link.url}`)
                }}
              >
                <CopyIcon />
              </Button>

              <Button
                variant="outline"
                onClick={async () => {
                  await handleRemove(`${link.customSlug}`)
                }}
              >
                <ScissorsIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
