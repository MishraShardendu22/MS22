import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Projects",
  description:
    "Explore my software development projects including web applications, backend systems, and open-source contributions. Built with modern technologies like Go, React, Next.js, and more.",
  path: "/projects",
  keywords: [
    "Software Projects",
    "Web Development Projects",
    "Go Projects",
    "React Projects",
    "Next.js Projects",
    "Open Source",
    "GitHub Projects",
    "Full Stack Projects",
    "Portfolio Projects",
    "TypeScript Projects",
    "Backend Projects",
    "Frontend Projects",
  ],
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
