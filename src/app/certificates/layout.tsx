import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Certifications',
  description: 'View my professional certifications and credentials in software development, cloud computing, programming languages, and technology. Certified in various modern technologies and frameworks.',
  path: '/certificates',
  keywords: [
    'Certifications',
    'Professional Certificates',
    'Technology Certificates',
    'Programming Certifications',
    'Developer Certifications',
    'Software Certificates',
    'Cloud Certifications',
    'Technical Credentials',
    'Learning Credentials',
    'Professional Development',
  ],
});

export default function CertificatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
