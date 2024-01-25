import { type NextRequest, NextResponse } from 'next/server'

export async function middleware (request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === '/') {
    return NextResponse.next()
  }

  if (pathname.includes('/api')) {
    return NextResponse.redirect('/')
  }

  const baseUrl = request.nextUrl.origin
  const customSlug = pathname.split('/').pop()

  try {
    // Fetching Custom Shortened Url
    const resCustomSlug = await fetch(`${baseUrl}/api/slugs/${customSlug}`)
    const dataCustomSlug = await resCustomSlug.json()

    // Custom Shortened Url
    if (dataCustomSlug?.userSlug?.url) {
      return NextResponse.redirect(new URL(dataCustomSlug.userSlug.url as string))
    }
  } catch (error) {
    console.error('Error fetching custom slug:', error)
  }

  try {
    // Fetching Simple Shortened Url
    const resSimpleSlug = await fetch(`${baseUrl}/api/slug?slug=${customSlug}`)
    const dataSimpleSlug = await resSimpleSlug.json()

    // Simple Shortened Url
    if (dataSimpleSlug?.getSimpleSlug?.originalUrl) {
      return NextResponse.redirect(new URL(dataSimpleSlug.getSimpleSlug.originalUrl as string))
    }
  } catch (error) {
    console.error('Error fetching simple slug:', error)
  }

  // If no matching slug is found, return a 404 response
  return NextResponse.json('Slug not found', { status: 404 })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|favicon-16x16.png|dashboard|404).*)']
}
