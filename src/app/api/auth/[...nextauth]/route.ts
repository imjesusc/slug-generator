import NextAuth from 'next-auth'
import { authOptions } from '@/lib/authOptions'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    userId: string
  }
}
