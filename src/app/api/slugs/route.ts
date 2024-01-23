import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET (request: Request) {
  return NextResponse.json({ message: 'Hello World from slugs!' })
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
        userId
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
        userId
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
