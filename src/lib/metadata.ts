import type { Metadata } from 'next';
import { BaseURL } from '@/static/data';

export function generatePageMetadata({
  title,
  description,
  path = '',
  keywords = [],
  images = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  images?: Array<{ url: string; width: number; height: number; alt: string }>;
}): Metadata {
  const url = `${BaseURL}${path}`;
  const defaultImages = images.length > 0 ? images : [
    {
      url: `${BaseURL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: `${title} - Shardendu Mishra`,
    },
  ];

  return {
    title,
    description,
    keywords: [...keywords, 'Shardendu Mishra', 'Software Developer', 'Portfolio'],
    openGraph: {
      title,
      description,
      url,
      siteName: 'Shardendu Mishra Portfolio',
      images: defaultImages,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@Shardendu_M',
      images: defaultImages.map(img => img.url),
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
