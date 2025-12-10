import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Work Experience",
  description:
    "Discover my professional work experience as a Software Developer and Engineer. Learn about my roles, contributions, and technologies I have worked with across various companies and projects.",
  path: "/experiences",
  keywords: [
    "Work Experience",
    "Professional Experience",
    "Software Engineer Experience",
    "Developer Experience",
    "Career History",
    "Job History",
    "Tech Companies",
    "Software Development Jobs",
    "Engineering Roles",
    "Professional Background",
  ],
});

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
