export const siteConfig = {
  name: "Growth Grid",
  tagline: "Data-driven growth playbooks for modern service brands.",
  description:
    "Secure, SEO-first platform for showcasing offers, publishing content, capturing leads, and running campaigns from one operational hub.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-image.png",
  keywords: [
    "growth marketing",
    "next.js consulting",
    "seo agency",
    "b2b saas",
    "demand generation",
  ],
  contact: {
    email: "hello@growthgrid.dev",
    phone: "+1 (555) 010-9919",
    address: "108 W 13th St, Wilmington, DE 19801",
    availability: "Mon–Fri · 9am–6pm EST",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/growthgrid",
    x: "https://x.com/growthgrid",
    youtube: "https://youtube.com/@growthgrid",
  },
  links: {
    about: "/about",
    contact: "/contact",
    privacy: "/privacy",
    terms: "/terms",
  },
  highlights: [
    "End-to-end funnel diagnostics",
    "AI-assisted content workflows",
    "Realtime analytics + CRM sync",
  ],
};

export type SiteConfig = typeof siteConfig;

