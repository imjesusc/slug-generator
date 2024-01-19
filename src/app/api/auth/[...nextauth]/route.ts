import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GithubProvider({
      clientId: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`
    })
  ]
})

export { handler as GET, handler as POST }
