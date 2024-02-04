'use client'

import { Button } from '../ui'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { signIn, useSession } from 'next-auth/react'
import { UserNav } from './user-nav'
import { type UserNavProps } from '@/models/UserNav.interface'

export function NavBar() {
  const { data, status } = useSession()

  const userData: UserNavProps = {
    user: {
      name: data?.user?.name ?? 'Anonymous',
      email: data?.user?.email ?? 'Unknown',
    },
    image: data?.user?.image ?? '',
  }

  const handleSignIn = async () => {
    await signIn('github', {
      callbackUrl: '/dashboard',
    })
  }

  return (
    <header className="w-screen grid place-content-center h-16">
      <nav className="flex w-screen container justify-between">
        <div className="flex items-center gap-2">
          <p className="text-base font-medium">Slug Generator</p>
        </div>
        <div>
          {status !== 'loading' ? (
            <>
              {status === 'authenticated' && (
                <div className="flex items-center gap-5">
                  <UserNav user={userData?.user} image={userData?.image} />
                </div>
              )}

              {status !== 'authenticated' && (
                <Button variant={'outline'} className="gap-2" onClick={handleSignIn}>
                  Sign with
                  <GitHubLogoIcon />
                </Button>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </header>
  )
}
