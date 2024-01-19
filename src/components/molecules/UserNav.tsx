import {
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
import { ExternalLinkIcon, GitHubLogoIcon, PlusIcon } from '@radix-ui/react-icons'
import { UserCog } from 'lucide-react'
import Link from 'next/link'
import { type FC } from 'react'
import { signOut } from 'next-auth/react'

export const UserNav: FC<UserNavProps> = ({ user }) => {
  const handleSignOut = () => {
    signOut({
      callbackUrl: '/'
    })
      .then(() => {
        // Handle success
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <Button variant={'outline'}>
            <UserCog className='mr-2'/>
            {user.name.split(' ')[0]}
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuGroup className='font-sans'>
          <DropdownMenuItem className='cursor-pointer'>
            Create a new link
            <DropdownMenuShortcut><PlusIcon /></DropdownMenuShortcut>
          </DropdownMenuItem>
            <Link target='_blank' href={'https://github.com/imjesusc/slug-generator/issues/new'}>
              <DropdownMenuItem className='cursor-pointer'>
                Report a bug
                <DropdownMenuShortcut><ExternalLinkIcon /></DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link >

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
        <DropdownMenuItem
         onClick={handleSignOut}
          className='cursor-pointer'>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
