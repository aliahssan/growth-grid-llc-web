'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import { trackPageView } from '@/lib/analytics'

export function WebVitals() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page views
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    trackPageView(url)
  }, [pathname, searchParams])

  // Web vitals tracking would go here with web-vitals library
  // For now, we'll track basic page views

  return null
}