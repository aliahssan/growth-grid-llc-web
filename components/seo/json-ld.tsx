import { siteConfig } from '@/config/site'

interface JsonLdProps {
  type?: 'website' | 'organization' | 'article'
  data?: Record<string, unknown>
}

export function JsonLd({ type = 'website', data }: JsonLdProps) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type === 'website' ? 'WebSite' : type === 'organization' ? 'Organization' : 'Article',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  }

  if (type === 'organization') {
    Object.assign(baseData, {
      logo: `${siteConfig.url}/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phone,
        contactType: 'customer service',
        email: siteConfig.contact.email,
      },
    })
  }

  const jsonLd = { ...baseData, ...data }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  )
}