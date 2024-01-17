import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'


export async function middleware(request: NextRequest, ev: NextFetchEvent) {
  const slug = request.nextUrl.pathname.split('/').pop()

  const apiURL = request.nextUrl.origin
  const res = await fetch(`${apiURL}/api/slug/${slug}`)
  if (res.status === 404) {
    return NextResponse.redirect(new URL('/'));
  }
  
  const data = await res.json()
  console.log(data)

 if(data) {
  return NextResponse.redirect(data.originalUrl)
 }

}

export const config = {
  matcher: '/cs/:slug*',
}