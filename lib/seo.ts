import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

type BuildMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path = "",
  image,
}: BuildMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const pageDescription = description ?? siteConfig.description;
  const canonicalUrl = new URL(path, siteConfig.url).toString();
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: siteConfig.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
  };
}

