import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Volunteer Experience',
  description: 'Learn about my volunteer work and community contributions in the tech space. Discover how I give back to the developer community through mentorship, open source, and tech events.',
  path: '/volunteer',
  keywords: [
    'Volunteer Experience',
    'Community Service',
    'Tech Volunteer',
    'Open Source Contribution',
    'Community Work',
    'Tech Community',
    'Mentorship',
    'Developer Community',
    'Social Impact',
    'Volunteering',
  ],
});

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
