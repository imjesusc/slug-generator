import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'

interface DataCustomSlug {
  userSlug: {
    url: string
  }
}

interface DataSimpleSlug {
  originalUrl: string
}
export async function middleware (request: NextRequest, ev: NextFetchEvent) {
  const { pathname } = request.nextUrl
  const baseUrl = process.env.NEXTAUTH_URL
  const customSlug = pathname.split('/').pop()

  // Fetching Custom Shortened Url
  const resCustomSlug = await fetch(`${baseUrl}/api/slugs/${customSlug}`)
  const dataCustomSlug: DataCustomSlug = await resCustomSlug?.json()

  // Fetching Simple Shortened Url
  const resSimpleSlug = await fetch(`${baseUrl}/api/slug?slug=${customSlug}`)
  const dataSimpleSlug: DataSimpleSlug = await resSimpleSlug?.json()

  // Custom Shortened Url
  if (dataCustomSlug?.userSlug?.url) {
    return NextResponse.redirect(dataCustomSlug?.userSlug?.url)
  }

  // Simple Shortened Url
  if (dataSimpleSlug?.originalUrl) {
    return NextResponse.redirect(dataSimpleSlug?.originalUrl)
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|dashboard).*)']
}
