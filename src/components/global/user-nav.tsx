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
  DropdownMenuTrigger,
} from '@/components/ui'
import { type UserNavProps } from '@/models/UserNav.interface'
import { ExternalLinkIcon, GitHubLogoIcon, PlusIcon, StarIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { type FC } from 'react'
import { signOut } from 'next-auth/react'
import { CreateForm } from '../molecules/create-form'

const menuItems = [
  {
    label: 'Report a bug',
    link: 'https://github.com/imjesusc/slug-generator/issues/new',
    icon: <ExternalLinkIcon />,
  },
  {
    label: 'Star on GitHub',
    link: 'https://github.com/imjesusc/slug-generator',
    icon: <StarIcon />,
  },
  {
    label: 'Repository',
    link: 'https://github.com/imjesusc/slug-generator',
    icon: <GitHubLogoIcon />,
  },
]

export const UserNav: FC<UserNavProps> = ({ user }) => {
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/',
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Avatar className="w-5 h-5 mr-2 grayscale">
            <AvatarImage src="https://avatar.vercel.sh/personal.png" alt="@shadcn" />
            <AvatarFallback className="text-sm">{user.name[0]}</AvatarFallback>
          </Avatar>
          {user.name.split(' ')[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuGroup className="font-sans">
          <CreateForm>
            <div className="relative flex hover:bg-accent items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground  cursor-pointer">
              Create a new link
              <span className="ml-auto text-xs tracking-widest opacity-60">
                <PlusIcon />
              </span>
            </div>
          </CreateForm>
          {menuItems.map((item) => (
            <Link key={item.label} target="_blank" href={item.link}>
              <DropdownMenuItem className="cursor-pointer">
                {item.label}
                <DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
