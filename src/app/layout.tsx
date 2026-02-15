import "./globals.css";
import "./hindu-traditional.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { SidebarWrapper } from "@/component/Sidebar/SidebarWrapper";
import { ThemeProvider } from "@/component/ThemeToggle";
import { MobileThemeToggle } from "@/component/ThemeToggle/MobileThemeToggle";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const CDN_ICON_PNG =
  "https://res.cloudinary.com/dkxw15and/image/upload/v1770811006/image-upload-app/ehth0fbefclihy2a2qmj.png";
const CDN_PROFESSIONAL_AVIF =
  "https://res.cloudinary.com/dkxw15and/image/upload/v1770811228/image-upload-app/iyeqraabcu6gn77dg48d.avif";

const archivo = Archivo({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
});

// Separate viewport export (Next.js 14+ best practice)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0d11" },
    { media: "(prefers-color-scheme: light)", color: "#0a0d11" },
  ],
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | Shardendu Mishra",
    default: "Shardendu Mishra | Software Developer and Engineer",
  },
  description:
    "Software Developer specializing in Go, React, Next.js & TypeScript. Building scalable web applications with Docker, Kubernetes & cloud-native tech.",
  applicationName: "Shardendu Mishra Portfolio",
  keywords: [
    "Shardendu Mishra",
    "Software Engineer",
    "Software Developer",
    "Go Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Portfolio",
    "Web Development",
    "IIIT Dharwad",
    "Full Stack Developer",
    "Cloud Native Development",
    "Docker",
    "Kubernetes",
  ],
  authors: [{ name: "Shardendu Mishra", url: BASE_URL }],
  creator: "Shardendu Mishra",
  publisher: "Shardendu Mishra",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: CDN_ICON_PNG, sizes: "192x192", type: "image/png" },
      { url: CDN_ICON_PNG, sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: CDN_ICON_PNG, sizes: "192x192", type: "image/png" },
      { url: CDN_ICON_PNG, sizes: "512x512", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "48x48",
        url: "/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: CDN_ICON_PNG,
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Shardendu Mishra - Software Developer and Engineer",
    description:
      "Software Developer specializing in Go, React, Next.js & TypeScript. Building scalable web applications with Docker, Kubernetes & cloud-native tech.",
    siteName: "Shardendu Mishra Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Shardendu Mishra - Software Developer Portfolio",
        type: "image/png",
      },
      {
        url: CDN_PROFESSIONAL_AVIF,
        width: 512,
        height: 512,
        alt: "Shardendu Mishra Professional Photo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shardendu Mishra - Software Developer and Engineer",
    description:
      "Software Developer specializing in Go, React, Next.js & TypeScript. Building scalable web applications with Docker, Kubernetes & cloud-native tech.",
    site: "@Shardendu_M",
    creator: "@Shardendu_M",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Shardendu Mishra - Software Developer Portfolio",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
  category: "technology",
  classification: "Portfolio Website",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Shardendu Portfolio",
    startupImage: CDN_ICON_PNG,
  },
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
    },
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "RSS Feed" }],
    },
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Shardendu Portfolio",
    "application-name": "Shardendu Portfolio",
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
    author: "Shardendu Mishra",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shardendu Mishra",
    url: BASE_URL,
    image: CDN_PROFESSIONAL_AVIF,
    jobTitle: "Software Developer and Engineer",
    worksFor: {
      "@type": "Organization",
      name: "IIIT Dharwad",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Indian Institute of Information Technology Dharwad",
    },
    sameAs: [
      "https://twitter.com/Shardendu_M",
      "https://github.com/MishraShardendu22",
      "https://leetcode.com/MishraShardendu22",
      "https://linkedin.com/in/shardendu-mishra",
    ],
    knowsAbout: [
      "Software Development",
      "Go Programming",
      "React",
      "Next.js",
      "TypeScript",
      "Web Development",
      "Cloud Computing",
    ],
  };

  return (
    <html lang="en" dir="ltr" className="scroll-smooth">
      <head>
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for Shardendu Mishra"
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML - content is safe static data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${archivo.variable} ${inter.variable} antialiased`}>
        <noscript>
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              backgroundColor: "#1a1a1a",
              color: "#fff",
            }}
          >
            <h1>Shardendu Mishra - Software Developer</h1>
            <p>
              Please enable JavaScript to view the full portfolio experience.
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:mishrashardendu22@gmail.com"
                style={{ color: "#06b6d4" }}
              >
                mishrashardendu22@gmail.com
              </a>
            </p>
          </div>
        </noscript>
        <Analytics />
        <SpeedInsights />
        <ThemeProvider>
          <div className="flex min-h-screen">
            <SidebarWrapper />
            {children}
          </div>
          <MobileThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
