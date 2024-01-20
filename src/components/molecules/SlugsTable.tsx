import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { type SimpleSlugInterface, type SlugsTableProps } from '@/models'
import Link from 'next/link'
import { type FC } from 'react'
import { Button } from '../ui'
import { cn } from '@/lib/utils'
import { copyToClipboard } from '@/utils/copyToClipboard'
export const SlugsTable: FC<SlugsTableProps> = ({ links }) => {
  return (
    <Table className="w-full overflow-hidden">
    <TableCaption>A list of your recent custom slugs.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="truncate w-[180px] max-w-[300px]">Custom url slug</TableHead>
        <TableHead className="truncate">Complete URL</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {links.map((link: SimpleSlugInterface, index) => (
        <TableRow key={link.customSlug} className={cn(index === 0 && 'bg-[#adfa1d] hover:bg-[#adfa1d] hover:opacity-80')}>
          <TableCell>
            <Link
            className="hover:underline font-medium"
            target="_blank"
            title={link.customSlug}
            rel="noopener noreferrer"
            href={`${link.url}`}>
              {link.customSlug}
            </Link>
            </TableCell>
          <TableCell className="truncate text-black/50 max-w-10 tablet:max-w-[300px]">
            {link.originalUrl}
          </TableCell>
          <TableCell className="grid justify-end">
            <Button
              className={cn(index === 0 && 'bg-[#adfa1d] hover:bg-[#adfa1d] hover:opacity-80')}
              variant="outline"
              onClick={async () => { await copyToClipboard(`${link.url}`) }}
              >
                Copy
              </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  )
}
