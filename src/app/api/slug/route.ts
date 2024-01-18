import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  const { originalUrl, customSlug } = await request.json()
  const slugUrl = `/ss/${customSlug}`
 
  try {
    const existingSlug = await prisma.simpleShortenedUrl.findUnique({
      where: { customSlug: slugUrl},
    })

    if (existingSlug) {
      return NextResponse.json(
        { message: 'Slug already exists' }, 
        { status: 400 }
        )
    }

    await prisma.simpleShortenedUrl.create({
      data: {
        originalUrl,
        customSlug: slugUrl
      },
    })

    return NextResponse.json(
      { originalUrl,
        url: `${request.headers.get('x-forwarded-proto')}://${request.headers.get('host')}/ss/${customSlug}`,
        customSlug: slugUrl, 
        message: 'Slug created successfully' },
    );

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
