import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

// Rate limiting store (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const windowKey = `${key}:${Math.floor(now / windowMs)}`

  const current = rateLimitMap.get(windowKey) || { count: 0, resetTime: now + windowMs }

  if (current.count >= limit) {
    return true
  }

  current.count++
  rateLimitMap.set(windowKey, current)

  // Clean up old entries
  for (const [k, v] of rateLimitMap.entries()) {
    if (v.resetTime < now) {
      rateLimitMap.delete(k)
    }
  }

  return false
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // API rate limiting
  if (pathname.startsWith('/api/')) {
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const limit = pathname.startsWith('/api/auth/') ? 10 : 100
    const windowMs = 60 * 1000 // 1 minute

    if (isRateLimited(`${clientIP}:${pathname}`, limit, windowMs)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }
  }

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (session.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Redirect authenticated users away from login
  if (pathname === '/login') {
    const session = await auth()
    if (session?.user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Security headers
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // CSP for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'none'; object-src 'none'"
    )
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}