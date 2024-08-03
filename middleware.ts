import { NextResponse, NextRequest } from 'next/server'
import { COOKIE_NAME } from './utils/constants'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  try {
    if (pathname.startsWith('/s') && !request.cookies.has(COOKIE_NAME)) {
      if (pathname !== '/sign-in') {
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }
    }

    if (pathname.startsWith('/sign-in') && request.cookies.has(COOKIE_NAME)) {
      return NextResponse.redirect(new URL('/s', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.error()
  }
}

export const config = {
  matcher: ['/s/:path*', '/', '/sign-in'],
}
