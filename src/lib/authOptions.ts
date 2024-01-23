import { PrismaAdapter } from '@auth/prisma-adapter'
import { type NextAuthOptions } from 'next-auth'
import { prisma } from './prisma'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GithubProvider({
      clientId: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`
    })
  ],
  callbacks: {
    async session ({ session, user }) {
      return await Promise.resolve({
        ...session,
        userId: user.id
      })
    }
  }
}
