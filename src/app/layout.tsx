import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { BaseURL as BASE_URL } from "@/static/data";

const archivo = Archivo({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | Shardendu Mishra",
    default: "Shardendu Mishra | Software Developer and Engineer",
  },
  description:
    "Software Developer and Engineer passionate about building impactful applications with modern technologies. Specializing in Go, React, and cloud-native solutions.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
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
    "Full Stack Developer",
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
      "Software Developer and Engineer passionate about building impactful applications with modern technologies. Specializing in Go, Fiber, React, Next.js, TypeScript, Tailwind CSS, MongoDB, PostgreSQL, Docker, Kubernetes, and cloud-native solutions. Portfolio showcasing projects, experience, skills, and certifications.",
    siteName: "Shardendu Mishra Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shardendu Mishra - Software Developer Portfolio",
      },
      {
        url: "/Professional.avif",
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
      "Software Developer and Engineer passionate about building impactful applications. Specializing in Go, Fiber, React, Next.js, TypeScript, Tailwind CSS, MongoDB, Docker, Kubernetes. Portfolio with projects, experience, and skills.",
    site: "@Shardendu_M",
    creator: "@Shardendu_M",
    images: [
      {
        url: "/og-image.png",
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
    "author": "Shardendu Mishra",
    "copyright": "Copyright 2025 Shardendu Mishra",
    "linkedin:owner": "shardendu-mishra",
    "rating": "General",
    "distribution": "Global",
    "revisit-after": "7 days",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="canonical" href={BASE_URL} />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body className={`${archivo.variable} ${inter.variable} antialiased`}>
        <Analytics />
        <SpeedInsights />
        <div className="flex min-h-screen">{children}</div>
      </body>
    </html>
  );
}
