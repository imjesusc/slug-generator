import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET (request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  if (!id) return NextResponse.json({ message: 'Something went wrong. Id not found' }, { status: 500 })

  try {
    const userSlugs = await prisma.user.findUnique({
      where: { id },
      include: {
        links: true
      }
    })

    if (userSlugs) return NextResponse.json({ message: 'User slugs successfully retrieved' }, { status: 200 })

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
