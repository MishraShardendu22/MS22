import { BaseURL } from '@/static/data';

export interface PersonSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  sameAs: string[];
  jobTitle: string;
  worksFor?: {
    '@type': string;
    name: string;
  };
  alumniOf?: {
    '@type': string;
    name: string;
  };
  image?: string;
  description?: string;
}

export interface WebSiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  author: {
    '@type': string;
    name: string;
  };
  potentialAction?: {
    '@type': string;
    target: string | {
      '@type': string;
      urlTemplate: string;
    };
    'query-input'?: string;
  };
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item?: string;
  }>;
}

export function generatePersonSchema(): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shardendu Mishra',
    url: BaseURL,
    sameAs: [
      'https://github.com/MishraShardendu22',
      'https://www.linkedin.com/in/mishrashardendu22/',
      'https://twitter.com/Shardendu_M',
      'https://leetcode.com/u/MishraShardendu22/',
    ],
    jobTitle: 'Software Developer and Engineer',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Indian Institute of Information Technology Dharwad',
    },
    image: `${BaseURL}/professional.avif`,
    description:
      'Software Developer and Engineer passionate about building impactful applications with modern technologies. Specializing in Go, React, and cloud-native solutions.',
  };
}

export function generateWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shardendu Mishra Portfolio',
    url: BaseURL,
    description:
      'Software Developer and Engineer passionate about building impactful applications with modern technologies.',
    author: {
      '@type': 'Person',
      name: 'Shardendu Mishra',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BaseURL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
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
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.name,
    description: project.description,
    ...(project.url && { codeRepository: project.url }),
    ...(project.image && { image: project.image }),
    ...(project.dateCreated && { dateCreated: project.dateCreated }),
    author: {
      '@type': 'Person',
      name: 'Shardendu Mishra',
    },
    ...(project.technologies && {
      programmingLanguage: project.technologies.map(tech => ({
        '@type': 'ComputerLanguage',
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
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    ...(organization.url && { url: organization.url }),
    employee: {
      '@type': 'Person',
      name: 'Shardendu Mishra',
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
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    name: certificate.name,
    credentialCategory: 'certificate',
    recognizedBy: {
      '@type': 'Organization',
      name: certificate.issuer,
    },
    dateCreated: certificate.dateIssued,
    ...(certificate.credentialUrl && { url: certificate.credentialUrl }),
    ...(certificate.description && { description: certificate.description }),
    about: {
      '@type': 'Person',
      name: 'Shardendu Mishra',
    },
  };
}
