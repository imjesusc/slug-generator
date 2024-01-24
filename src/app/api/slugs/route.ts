import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET (request: Request) {
  const url = new URL(request.url)
  const searchQuery = url.searchParams.get('search')
  const userId = url.searchParams.get('userId')

  if (!userId) return NextResponse.json({ message: 'Something went wrong. Id not found' }, { status: 500 })

  try {
    const userSlugs = await prisma.link.findMany({
      where: {
        userId,
        slug: {
          contains: searchQuery || ''
        }
      }

    })

    if (userSlugs) return NextResponse.json({ message: 'User slugs successfully retrieved', userSlugs }, { status: 200 })

    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 })
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

export async function POST (request: Request) {
  try {
    const { url, slug, description, userId } = await request.json()

    // Primero verificamos que el slug no exista

    const existingSlug = await prisma.link.findUnique({
      where: {
        slug
      }
    })

    if (existingSlug) {
      return NextResponse.json(
        { message: 'Slug already exists.' },
        { status: 400 }
      )
    }

    const createdSlug = await prisma.link.create({
      data: {
        url,
        slug,
        description,
        userId,
        shortUrl: `${request.headers.get('x-forwarded-proto')}://${request.headers.get('host')}/${slug}`
      }
    })

    if (createdSlug) return NextResponse.json({ message: 'Slug created successfully.' }, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
      return NextResponse.json({ message: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}

export async function PUT (request: Request) {
  try {
    const { url, slug, description, userId, id } = await request.json()

    // Primero verificamos que el id del slug exista
    const existingSlug = await prisma.link.findUnique({
      where: {
        id,
        userId
      }
    })

    if (!existingSlug) {
      return NextResponse.json(
        { message: 'Slug does not exist.' },
        { status: 400 }
      )
    }

    const createdSlug = await prisma.link.update({
      where: {
        id
      },
      data: {
        url,
        slug,
        description,
        userId,
        shortUrl: `${request.headers.get('x-forwarded-proto')}://${request.headers.get('host')}/${slug}`
      }
    })

    if (createdSlug) return NextResponse.json({ message: 'Slug updated successfully.' }, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
      return NextResponse.json({ message: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}

export async function DELETE (request: Request) {
  const url = new URL(request.url)
  const userId = url.searchParams.get('userId')
  const slugId = url.searchParams.get('slugId')

  if (!userId || !slugId) {
    return NextResponse.json({ message: 'Invalid userId or link id.' }, { status: 400 })
  }

  const existingLink = await prisma.link.findUnique({
    where: {
      userId,
      id: Number(slugId)
    }
  })

  if (!existingLink) {
    return NextResponse.json({ message: 'Link not found.' }, { status: 404 })
  }

  try {
    const deletedLink = await prisma.link.delete({
      where: {
        userId,
        id: Number(slugId)
      }
    })
    return NextResponse.json({ message: 'Link deleted successfully.', deletedLink }, { status: 200 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
      return NextResponse.json({ message: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 })
  }
}
