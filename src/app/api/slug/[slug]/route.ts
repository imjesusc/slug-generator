import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET (request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const slugUrl = `/ss/${slug}`

  try {
    const getSimpleSlug = await prisma.simpleShortenedUrl.findUnique({
      where: { customSlug: slugUrl }
    })

    return NextResponse.json(getSimpleSlug)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      )
    }
  }
}
