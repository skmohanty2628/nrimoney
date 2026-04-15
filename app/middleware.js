import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Block /admin from ALL bots including Googlebot
  if (pathname.startsWith('/admin')) {
    const userAgent = request.headers.get('user-agent') || ''
    const isBot = /bot|crawl|spider|googlebot|bingbot|slurp|duckduck/i.test(userAgent)

    if (isBot) {
      return new NextResponse('Forbidden', { status: 403 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}