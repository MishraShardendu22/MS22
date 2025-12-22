import type { Metadata } from "next";
import { BaseURL } from "@/static/data";

export function generatePageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  images = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  images?: Array<{ url: string; width: number; height: number; alt: string }>;
  noIndex?: boolean;
}): Metadata {
  const url = `${BaseURL}${path}`;
  const defaultImages =
    images.length > 0
      ? images
      : [
          {
            url: `${BaseURL}/opengraph-image`,
            width: 1200,
            height: 630,
            alt: `${title} - Shardendu Mishra`,
          },
        ];

  return {
    title,
    description,
    keywords: [
      ...keywords,
      "Shardendu Mishra",
      "Software Developer",
      "Portfolio",
    ],
    authors: [{ name: "Shardendu Mishra", url: BaseURL }],
    creator: "Shardendu Mishra",
    publisher: "Shardendu Mishra",
    openGraph: {
      title,
      description,
      url,
      siteName: "Shardendu Mishra Portfolio",
      images: defaultImages,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@Shardendu_M",
      site: "@Shardendu_M",
      images: defaultImages.map((img) => img.url),
    },
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
      },
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "og:url": url,
      "og:type": "website",
      "article:author": "Shardendu Mishra",
      "twitter:domain": BaseURL.replace(/^https?:\/\//, ""),
      "twitter:url": url,
    },
  };
}
