'use client'

import { SessionProvider } from 'next-auth/react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

// export function ProtectedRoute ({ children }: { children: React.ReactNode }) {
//   const router = useRouter()
//   const { status } = useSession()

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/')
//     }
//   }, [status, router])

//   if (status === 'unauthenticated') return null

//   return (
//     <>{children}</>
//   )
// }

// const protectedBeforeRoutes = ['/']

// const BeforeAuth = ({ children }: { children: React.ReactNode }) => {
//   const router = useRouter()
//   const { status } = useSession()
//   const pathname = usePathname()

//   useEffect(() => {
//     if (status === 'authenticated' && protectedBeforeRoutes.includes(pathname)) {
//       router.push('/dashboard')
//     }
//   }, [status, router])

//   if (status === 'authenticated') return null

//   return (
//     <>{children}</>
//   )
// }

// const protectedRoutes = ['/dashboard']

// export function AuthWrapper ({ children }: { children: React.ReactNode }) {
//   const { status } = useSession()
//   const pathname = usePathname()

//   if (status === 'loading') return null
//   return (
//     <>{protectedRoutes.includes(pathname) ? <ProtectedRoute>{children}</ProtectedRoute> : <BeforeAuth>{children}</BeforeAuth>}</>
//   )
// }
