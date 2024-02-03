import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const tokenName =
    process.env.NODE_ENV === 'development' ? 'next-auth.session-token' : process.env.NEXT_AUTH_TOKEN_NAME_PROD
  const nextAuthToken = cookieStore.get(tokenName as string)

  const { pathname } = request.nextUrl
  const baseUrl = request.nextUrl.origin
  const customSlug = pathname.split('/').pop()

  const protectedRoutes = ['/dashboard']

  if (!nextAuthToken && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (nextAuthToken && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (nextAuthToken) {
    const user = cookieStore.get('id')
    const userId = user?.value

    try {
      // Fetching Custom Shortened Url
      const resCustomSlug = await fetch(`${baseUrl}/api/slugs/${userId}?slug=${customSlug}`)
      const dataCustomSlug = await resCustomSlug.json()
      // Custom Shortened Url
      if (dataCustomSlug?.userSlug?.url) {
        return NextResponse.redirect(new URL(dataCustomSlug.userSlug.url as string))
      }
    } catch (error) {
      console.error('Error fetching custom slug:', error)
    }
  }

  if (!nextAuthToken) {
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
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|favicon-16x16.png|404).*)'],
}
