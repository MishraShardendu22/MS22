# Shardendu Mishra - Portfolio Website

<div align="center">
  
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Go](https://img.shields.io/badge/Go-Backend-00ADD8?logo=go)](https://go.dev/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Professional portfolio website showcasing software development projects, experience, skills, and certifications.**

[Live Demo](https://mishrashardendu22.is-a.dev) • [Blog](https://blogs.mishrashardendu22.is-a.dev/read) • [Admin Panel](http://admin.mishrashardendu22.is-a.dev) • [Backend Repo](https://github.com/MishraShardendu22/MishraShardendu22-Backend-PersonalWebsite)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Ecosystem](#-ecosystem)
- [Performance](#-performance)
- [SEO](#-seo)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

A modern, high-performance portfolio website built with Next.js 16 and React 19. Features a Go/Fiber backend API, real-time GitHub and LeetCode stats integration, dynamic content management, and comprehensive project showcase. Optimized for performance, accessibility, and SEO.

### Key Highlights

- ⚡ **Blazing Fast**: Next.js 16 with App Router and Server Components
- 🎨 **Modern UI**: Tailwind CSS 4 with custom animations using Anime.js
- 📊 **Live Stats**: Real-time GitHub and LeetCode profile integration
- 🔐 **Secure Backend**: Go/Fiber API with JWT authentication
- 📱 **Fully Responsive**: Mobile-first design with PWA support
- ♿ **Accessible**: WCAG 2.1 AA compliant
- 🚀 **Optimized**: Lighthouse scores 90+ across all metrics
- 🔍 **SEO Ready**: Comprehensive meta tags and structured data

---

## ✨ Features

### Portfolio Features

- **Dynamic Project Showcase** - Filterable project gallery with detailed views, live demos, and source code links
- **Experience Timeline** - Professional work experience with company logos, technologies, and achievements
- **Skills Matrix** - Comprehensive tech stack visualization organized by categories
- **Certifications** - Professional certifications and courses with verification links
- **Volunteer Work** - Community involvement and open-source contributions
- **Contact Form** - EmailJS integration for direct communication

### Technical Features

- **Server-Side Rendering** - Optimized page loads with Next.js SSR
- **Static Generation** - Pre-rendered pages for maximum performance
- **Incremental Static Regeneration** - Auto-updating content without redeployment
- **Image Optimization** - Next.js Image component with AVIF/WebP support
- **Code Splitting** - Automatic bundle optimization
- **API Route Handlers** - Serverless API endpoints
- **Real-time Stats** - GitHub commits, repositories, stars, LeetCode rankings
- **Dark Mode** - Elegant dark theme with smooth transitions
- **PWA Support** - Installable web app with offline capabilities
- **Analytics** - Vercel Analytics and Speed Insights integration

### Developer Experience

- **TypeScript** - Full type safety across the codebase
- **Biome** - Fast linter and formatter
- **React 19** - Latest features including React Compiler
- **Hot Module Replacement** - Instant feedback during development
- **Error Boundaries** - Graceful error handling with custom error pages

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.0.7 | React framework with App Router |
| React | 19.2.0 | UI library with concurrent features |
| TypeScript | 5.0+ | Type-safe development |
| Tailwind CSS | 4.0+ | Utility-first CSS framework |
| Anime.js | 4.2.2 | Smooth animations and transitions |
| Lucide React | 0.556.0 | Modern icon library |
| Recharts | 3.5.1 | Data visualization for stats |

### Backend & APIs

| Technology | Purpose |
|-----------|---------|
| Go/Fiber | High-performance REST API |
| MongoDB | NoSQL database for portfolio data |
| EmailJS | Contact form email delivery |
| Axios | HTTP client with timeout handling |

### DevOps & Tools

| Technology | Purpose |
|-----------|---------|
| Vercel | Deployment and hosting |
| Biome | Code linting and formatting |
| pnpm | Fast package manager |
| Git | Version control |

### External Integrations

- **GitHub API** - Repository stats, commits, profile data
- **LeetCode API** - Coding problem statistics
- **Vercel Analytics** - Web analytics
- **Vercel Speed Insights** - Performance monitoring

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.0.0 or higher
- **pnpm** 10.0.0 or higher
- **Git** for version control

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/MishraShardendu22/MS22.git
cd MS22/MishraShardendu22
```

1. **Install dependencies**

```bash
pnpm install
```

1. **Set up environment variables**

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your credentials
nano .env  # or use your preferred editor
```

1. **Run development server**

```bash
pnpm dev
```

1. **Open your browser**

```
Navigate to http://localhost:3000
```

### Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start

# Or use preview command
pnpm preview
```

### Code Quality Commands

```bash
# Lint code
pnpm lint

# Lint and fix issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check

# Type check
pnpm type-check

# Clean build artifacts
pnpm clean
```

---

## 📁 Project Structure

```md
MishraShardendu22/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout with metadata
│   │   ├── globals.css        # Global styles
│   │   ├── projects/          # Projects pages
│   │   │   ├── page.tsx       # Projects list
│   │   │   └── [id]/          # Dynamic project detail
│   │   ├── experiences/       # Experience pages
│   │   ├── certificates/      # Certificates pages
│   │   └── volunteer/         # Volunteer work pages
│   │
│   ├── component/             # React components
│   │   ├── Certificates/      # Certificate cards
│   │   ├── Error/             # Error states
│   │   ├── Experience/        # Experience cards
│   │   ├── Footer/            # Footer component
│   │   ├── Hero/              # Hero section
│   │   ├── Loading/           # Loading states
│   │   ├── Projects/          # Project cards
│   │   ├── Sidebar/           # Navigation sidebar
│   │   ├── Skill/             # Skills display
│   │   ├── Stats/             # GitHub/LeetCode stats
│   │   ├── Timeline/          # Timeline component
│   │   ├── UnifiedCard/       # Reusable card component
│   │   └── Volunteer/         # Volunteer cards
│   │
│   ├── lib/                   # Utility libraries
│   │   ├── metadata.ts        # SEO metadata generation
│   │   ├── structuredData.ts  # JSON-LD schemas
│   │   └── fetchStats.ts      # Stats fetching utilities
│   │
│   ├── static/                # Static data and APIs
│   │   ├── data.ts            # Configuration constants
│   │   ├── api/               # API request functions
│   │   └── info/              # Static information
│   │
│   ├── types/                 # TypeScript type definitions
│   │   └── stats.ts           # Stats interface types
│   │
│   └── hooks/                 # Custom React hooks
│       └── useAnimeOnMount.ts # Animation hook
│
├── public/                    # Static assets
│   ├── icons/                 # App icons (192x192, 512x512)
│   ├── favicon.ico            # Favicon
│   ├── manifest.json          # PWA manifest
│   ├── robots.txt             # SEO crawler config
│   ├── security.txt           # Security policy
│   └── *.avif                 # Optimized images
│
├── biome.json                 # Biome configuration
├── next.config.ts             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS config
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Base URLs
NEXT_PUBLIC_BASE_URL=https://mishrashardendu22.is-a.dev
NEXT_PUBLIC_BACKEND_URL=https://portfolio-backend-2iw4.onrender.com

# GitHub Configuration
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
NEXT_PUBLIC_GITHUB_USERNAME=MishraShardendu22

# LeetCode Configuration
NEXT_PUBLIC_LEETCODE_USERNAME=your_leetcode_username

# EmailJS Configuration (Contact Form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Analytics (Optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=auto
```

See `.env.example` for a template with all available options.

---

## 🌐 Ecosystem

This portfolio is part of a complete ecosystem:

| Project | Technology | Purpose | URL |
|---------|-----------|---------|-----|
| **Portfolio** (This repo) | Next.js 16 | Main portfolio website | [mishrashardendu22.is-a.dev](https://mishrashardendu22.is-a.dev) |
| **Blog** | Svelte 5 | Technical blog | [blogs.mishrashardendu22.is-a.dev](https://blogs.mishrashardendu22.is-a.dev/read) |
| **Admin Panel** | Preact | Content management | [admin.mishrashardendu22.is-a.dev](http://admin.mishrashardendu22.is-a.dev) |
| **Backend API** | Go/Fiber | Portfolio REST API | [GitHub Repo](https://github.com/MishraShardendu22/MishraShardendu22-Backend-PersonalWebsite) |

---

## ⚡ Performance

### Lighthouse Scores

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Core Web Vitals

- **LCP** (Largest Contentful Paint): < 1.5s
- **FID** (First Input Delay): < 50ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Optimization Techniques

- Image optimization with Next.js Image component
- AVIF format for 50% smaller image sizes
- Code splitting and lazy loading
- Font optimization with variable fonts
- Preloading critical resources
- Efficient caching strategies
- Bundle size optimization with tree shaking

---

## 🔍 SEO

### Implementation

- **Meta Tags**: Comprehensive title, description, keywords
- **Open Graph**: Social media preview cards (Twitter, Facebook, LinkedIn)
- **Structured Data**: JSON-LD schemas for Person, Organization, Website
- **Sitemap**: Auto-generated XML sitemap at `/sitemap.xml`
- **Robots.txt**: Search engine crawler configuration
- **Canonical URLs**: Duplicate content prevention
- **Semantic HTML**: Proper heading hierarchy (H1-H6)
- **Alt Text**: All images have descriptive alt attributes
- **Schema.org**: Rich snippets for enhanced search results

### Keywords Targeting

Software Developer, Go Developer, React Developer, Next.js, TypeScript, Software Engineer, IIIT Dharwad, Portfolio, Web Development, Cloud Native, LeetCode, Competitive Programming, MongoDB, PostgreSQL, Docker, Kubernetes, System Design, API Development

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on the code of conduct and the process for submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 📧 Contact

**Shardendu Mishra**

- **Email**: <mishrashardendu221@gmail.com>
- **Website**: [mishrashardendu22.is-a.dev](https://mishrashardendu22.is-a.dev)
- **LinkedIn**: [linkedin.com/in/shardendu-mishra](https://linkedin.com/in/shardendu-mishra)
- **GitHub**: [@MishraShardendu22](https://github.com/MishraShardendu22)
- **Twitter**: [@Shardendu_M](https://twitter.com/Shardendu_M)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vercel](https://vercel.com/) - Deployment and hosting platform
- [Lucide](https://lucide.dev/) - Beautiful icon library
- [Anime.js](https://animejs.com/) - JavaScript animation library
- [Biome](https://biomejs.dev/) - Fast code formatter and linter

---

<div align="center">

Made with ❤️ by [Shardendu Mishra](https://github.com/MishraShardendu22)

⭐ Star this repo if you find it helpful!

</div>
