import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { simpleFormSchema } from '@/lib/validations'

export async function GET(request: Request) {
  const apiKey = request.headers.get('x-api-key')

  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })
  }

  const url = new URL(request.url)
  const customSlug = url.searchParams.get('slug')
  if (customSlug === '') return NextResponse.json({ message: 'Something went wrong. Slug not found.' }, { status: 500 })

  if (!customSlug) return NextResponse.json({ message: 'Something went wrong. Slug not found.' }, { status: 500 })

  try {
    const getSimpleSlug = await prisma.simpleShortenedUrl.findUnique({
      where: {
        customSlug,
      },
    })

    return NextResponse.json({ message: 'User slugs successfully retrieved.', getSimpleSlug }, { status: 200 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
      return NextResponse.json({ message: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get('x-api-key')

    if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })
    }

    const body = await request.json()

    const { originalUrl, customSlug } = simpleFormSchema.parse(body)
    const existingSlug = await prisma.simpleShortenedUrl.findUnique({
      where: { customSlug },
    })

    if (existingSlug) {
      return NextResponse.json({ message: 'Slug already exists.' }, { status: 400 })
    }

    const createdSlug = await prisma.simpleShortenedUrl.create({
      data: {
        originalUrl,
        customSlug,
      },
    })

    return NextResponse.json(
      {
        shortenedUrl: `${request.headers.get('x-forwarded-proto')}://${request.headers.get('host')}/s/${customSlug}`,
        customSlug: createdSlug.customSlug,
        message: 'Slug created successfully.',
      },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
      return NextResponse.json({ message: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const apiKey = request.headers.get('x-api-key')

    if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })
    }

    const url = new URL(request.url)
    const customSlug = url.searchParams.get('slug')

    if (customSlug === '')
      return NextResponse.json({ message: 'Something went wrong. Slug not found.' }, { status: 500 })

    if (!customSlug) return NextResponse.json({ message: 'Something went wrong. Slug not found.' }, { status: 500 })
    const getSimpleSlug = await prisma.simpleShortenedUrl.findUnique({
      where: {
        customSlug,
      },
    })

    if (!getSimpleSlug?.customSlug) {
      return NextResponse.json({ message: 'Slug not found.' }, { status: 404 })
    }

    await prisma.simpleShortenedUrl.delete({
      where: {
        customSlug,
      },
    })

    return NextResponse.json({ message: 'User slugs successfully removed.' }, { status: 200 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
      return NextResponse.json({ message: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 })
  }
}
