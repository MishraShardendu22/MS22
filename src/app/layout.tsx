import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";

// Use environment variable or fallback to localhost for development
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

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
    "Shardendu Mishra - Software Developer & Engineer specializing in Go, React, Next.js, TypeScript, Docker & Kubernetes. Building scalable web applications.",
  applicationName: "Shardendu Mishra Portfolio",
  keywords: [
    "Shardendu Mishra",
    "Software Developer",
    "Software Engineer",
    "Go Developer",
    "Golang Expert",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Software Engineer",
    "IIIT Dharwad",
    "Indian Institute of Information Technology",
    "Portfolio",
    "Web Development",
    "Software Engineering",
    "Cloud Native Development",
    "Open Source Contributor",
    "LeetCode",
    "Competitive Programming",
    "Developer Portfolio",
    "Software Projects",
    "Programming Projects",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "Linux",
    "Git",
    "GitHub",
    "System Design",
    "Data Structures",
    "Algorithms",
    "Backend Development",
    "Frontend Development",
    "API Development",
    "Database Design",
    "ShardenduMishra22",
    "MishraShardendu22",
    "Code",
    "Programming",
    "Technology",
    "Innovation",
    "Student Developer",
    "India",
    "Bangalore",
    "Software Architecture",
    "Microservices",
    "RESTful APIs",
    "GraphQL",
    "DevOps",
    "CI/CD",
    "Version Control",
    "Agile Development",
    // Additional SEO Keywords
    "Fiber Framework",
    "Svelte",
    "Preact",
    "Tailwind CSS",
    "PWA",
    "Progressive Web App",
    "Server-Side Rendering",
    "SSR",
    "Static Site Generation",
    "SSG",
    "Cloud Computing",
    "AWS",
    "Vercel",
    "Netlify",
    "Redis",
    "NoSQL",
    "SQL",
    "Axios",
    "REST API",
    "JSON",
    "Web Performance",
    "SEO Optimization",
    "Responsive Design",
    "Mobile Development",
    "Animations",
    "Anime.js",
    "Recharts",
    "Data Visualization",
    "Real-time Data",
    "GitHub API",
    "LeetCode Stats",
    "Code Quality",
    "Best Practices",
    "Clean Code",
    "SOLID Principles",
    "Design Patterns",
    "Technical Blog",
    "Coding Interview",
    "Problem Solving",
  ],
  authors: [{ name: "Shardendu Mishra", url: BASE_URL }],
  creator: "Shardendu Mishra",
  publisher: "Shardendu Mishra",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
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
        url: "/icons/icon-192.png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Shardendu Mishra - Software Developer and Engineer",
    description:
      "Shardendu Mishra - Software Developer & Engineer specializing in Go, React, Next.js, TypeScript, Docker & Kubernetes. Building scalable web applications.",
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
        url: "/professional.avif",
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
      "Shardendu Mishra - Software Developer & Engineer specializing in Go, React, Next.js, TypeScript, Docker & Kubernetes. Building scalable web applications.",
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
    startupImage: "/icons/icon-512.png",
  },
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
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
    "google-site-verification": "pending",
    author: "Shardendu Mishra",
    copyright: "Copyright 2025 Shardendu Mishra",
    "linkedin:owner": "shardendu-mishra",
    rating: "General",
    distribution: "Global",
    "revisit-after": "7 days",
    // Additional SEO meta tags
    "geo.region": "IN-KA",
    "geo.placename": "Bangalore",
    "geo.position": "12.9716;77.5946",
    ICBM: "12.9716, 77.5946",
    "dc.title": "Shardendu Mishra - Software Developer Portfolio",
    "dc.creator": "Shardendu Mishra",
    "dc.subject": "Software Development, Web Development, Portfolio",
    "dc.description":
      "Software Developer and Engineer passionate about building impactful applications with modern technologies",
    "dc.publisher": "Shardendu Mishra",
    "dc.language": "en",
    "dc.coverage": "Worldwide",
    "dc.rights": "Copyright 2025 Shardendu Mishra",
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
    image: `${BASE_URL}/professional.avif`,
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
      "https://github.com/MishraShardendu22",
      "https://linkedin.com/in/shardendu-mishra",
      "https://twitter.com/Shardendu_M",
      "https://leetcode.com/MishraShardendu22",
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
        <script
          type="application/ld+json"
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
        <div className="flex min-h-screen">{children}</div>
      </body>
    </html>
  );
}
