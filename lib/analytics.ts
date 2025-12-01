import { NextWebVitalsMetric } from 'next/app'

export function trackWebVitals(metric: NextWebVitalsMetric) {
  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value,
      id: metric.id,
      label: metric.label,
    })

    // Example: Send to Google Analytics, Vercel Analytics, etc.
    // gtag('event', metric.name, {
    //   event_category: 'Web Vitals',
    //   event_label: metric.id,
    //   value: Math.round(metric.value),
    //   custom_map: { metric_value: metric.value },
    //   non_interaction: true,
    // })
  }
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'production') {
    console.log('Event:', name, properties)
    // Send to analytics service
  }
}

export function trackPageView(url: string) {
  if (process.env.NODE_ENV === 'production') {
    console.log('Page view:', url)
    // Send page view to analytics service
  }
}