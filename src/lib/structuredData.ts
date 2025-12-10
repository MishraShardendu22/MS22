import { BaseURL } from "@/static/data";

export interface PersonSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  sameAs: string[];
  jobTitle: string;
  worksFor?: {
    "@type": string;
    name: string;
  };
  alumniOf?: {
    "@type": string;
    name: string;
  };
  image?: string;
  description?: string;
}

export interface WebSiteSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
  author: {
    "@type": string;
    name: string;
  };
  potentialAction?: {
    "@type": string;
    target:
      | string
      | {
          "@type": string;
          urlTemplate: string;
        };
    "query-input"?: string;
  };
}

export interface BreadcrumbSchema {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item?: string;
  }>;
}

export function generatePersonSchema(): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shardendu Mishra",
    url: BaseURL,
    sameAs: [
      "https://github.com/MishraShardendu22",
      "https://www.linkedin.com/in/mishrashardendu22/",
      "https://twitter.com/Shardendu_M",
      "https://leetcode.com/u/MishraShardendu22/",
      "https://blogs.mishrashardendu22.is-a.dev",
    ],
    jobTitle: "Software Developer and Engineer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Indian Institute of Information Technology Dharwad",
    },
    image: `${BaseURL}/professional.avif`,
    description:
      "Software Developer and Engineer passionate about building impactful applications with modern technologies. Specializing in Go, React, Next.js, TypeScript, and cloud-native solutions.",
  };
}

// Enhanced Professional Service Schema
export function generateProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Shardendu Mishra - Software Development Services",
    description: "Professional software development services specializing in Go, React, Next.js, TypeScript, and cloud-native solutions",
    url: BaseURL,
    image: `${BaseURL}/professional.avif`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Karnataka",
      addressLocality: "Bangalore",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "12.9716",
      longitude: "77.5946",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Stack Web Development",
            description: "Modern web applications using React, Next.js, TypeScript",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Backend Development",
            description: "Scalable backend systems using Go, Node.js, PostgreSQL",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cloud Native Development",
            description: "Docker, Kubernetes, and cloud infrastructure solutions",
          },
        },
      ],
    },
  };
}

// Profile Page Schema for better SEO
export function generateProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Shardendu Mishra",
      alternateName: ["MishraShardendu22", "ShardenduMishra22"],
      identifier: "mishrashardendu22",
      description: "Software Developer and Engineer specializing in Go, React, and cloud-native solutions",
      image: `${BaseURL}/professional.avif`,
      sameAs: [
        "https://github.com/MishraShardendu22",
        "https://www.linkedin.com/in/mishrashardendu22/",
        "https://twitter.com/Shardendu_M",
        "https://leetcode.com/u/MishraShardendu22/",
      ],
      knowsAbout: [
        "Go Programming",
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "Kubernetes",
        "Cloud Computing",
        "Web Development",
        "API Development",
        "System Design",
      ],
    },
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split('T')[0],
  };
}

export function generateWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shardendu Mishra Portfolio",
    url: BaseURL,
    description:
      "Software Developer and Engineer passionate about building impactful applications with modern technologies.",
    author: {
      "@type": "Person",
      name: "Shardendu Mishra",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BaseURL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>,
): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

export function generateProjectSchema(project: {
  name: string;
  description: string;
  url?: string;
  image?: string;
  dateCreated?: string;
  technologies?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    ...(project.url && { codeRepository: project.url }),
    ...(project.image && { image: project.image }),
    ...(project.dateCreated && { dateCreated: project.dateCreated }),
    author: {
      "@type": "Person",
      name: "Shardendu Mishra",
    },
    ...(project.technologies && {
      programmingLanguage: project.technologies.map((tech) => ({
        "@type": "ComputerLanguage",
        name: tech,
      })),
    }),
  };
}

export function generateOrganizationSchema(organization: {
  name: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.name,
    ...(organization.url && { url: organization.url }),
    employee: {
      "@type": "Person",
      name: "Shardendu Mishra",
      jobTitle: organization.position,
      description: organization.description,
    },
    ...(organization.startDate && {
      foundingDate: organization.startDate,
    }),
  };
}

export function generateCertificationSchema(certificate: {
  name: string;
  issuer: string;
  dateIssued: string;
  credentialUrl?: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: certificate.name,
    credentialCategory: "certificate",
    recognizedBy: {
      "@type": "Organization",
      name: certificate.issuer,
    },
    dateCreated: certificate.dateIssued,
    ...(certificate.credentialUrl && { url: certificate.credentialUrl }),
    ...(certificate.description && { description: certificate.description }),
    about: {
      "@type": "Person",
      name: "Shardendu Mishra",
    },
  };
}
