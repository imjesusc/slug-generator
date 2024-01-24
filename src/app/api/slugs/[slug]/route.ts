import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET (request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  if (!slug) return NextResponse.json({ message: 'Something went wrong. Id not found' }, { status: 500 })
  try {
    const userSlug = await prisma.link.findFirst({
      where: {
        slug
      }
    })

    return NextResponse.json({ message: 'User slugs successfully retrieved', userSlug }, { status: 200 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
