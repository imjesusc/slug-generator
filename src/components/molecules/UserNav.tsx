import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui'
import { type UserNavProps } from '@/models/UserNav.interface'
import { ExternalLinkIcon, GitHubLogoIcon, PlusIcon, StarIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { type FC } from 'react'
import { signOut } from 'next-auth/react'
import { ControlsForm } from '.'

export const UserNav: FC<UserNavProps> = ({ user }) => {
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/'
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <Avatar className='w-5 h-5 mr-2 grayscale'>
            <AvatarImage src="https://avatar.vercel.sh/personal.png" alt='@shadcn' />
            <AvatarFallback className='text-sm'>CN</AvatarFallback>
          </Avatar>
          {user.name.split(' ')[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuGroup className='font-sans'>
          <ControlsForm action='Create'>
            <div className='relative flex hover:bg-accent items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground  cursor-pointer'>
              Create a new link
              <span className='ml-auto text-xs tracking-widest opacity-60'>
                <PlusIcon />
              </span>
            </div>
          </ControlsForm>
          <Link target='_blank' href={'https://github.com/imjesusc/slug-generator/issues/new'}>
            <DropdownMenuItem className='cursor-pointer'>
              Report a bug
              <DropdownMenuShortcut>
                <ExternalLinkIcon />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>

          <Link target='_blank' href={'https://github.com/imjesusc/slug-generator/issues/new'}>
            <DropdownMenuItem className='cursor-pointer'>
              Star on GitHub
              <DropdownMenuShortcut>
                <StarIcon />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>

          <Link target='_blank' href='https://github.com/imjesusc/slug-generator'>
            <DropdownMenuItem className='cursor-pointer'>
              Repository
              <DropdownMenuShortcut>
                <GitHubLogoIcon />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer font-medium'>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
