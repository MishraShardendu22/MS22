import type { Metadata } from "next";
import { Suspense } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingState } from "@/component/Loading";
import { ProjectsFilterClient } from "@/component/Projects";
import { Sidebar } from "@/component/Sidebar";
import { generatePageMetadata } from "@/lib/metadata";
import { projectsAPI } from "@/static/api/api.request";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: "Projects",
  description:
    "Explore my portfolio of software development projects including web applications, APIs, and open-source contributions. Built with Go, React, Next.js, TypeScript, and modern technologies.",
  path: "/projects",
  keywords: [
    "projects",
    "portfolio",
    "web development",
    "software projects",
    "Go projects",
    "React projects",
    "Next.js applications",
    "TypeScript projects",
    "open source",
    "GitHub projects",
  ],
});

const ITEMS_PER_PAGE = 8;

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    skills?: string;
  }>;
}

async function ProjectsContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(params.page || "1", 10));
  const searchQuery = params.search || "";
  const selectedSkills = params.skills ? params.skills.split(",") : [];

  let projects: import("@/static/api/api.types").Project[] = [];
  let totalPages = 1;
  let total = 0;
  let allSkills: string[] = [];
  let error: string | null = null;

  try {
    const response = await projectsAPI.getAllProjects(
      currentPage,
      ITEMS_PER_PAGE,
    );

    if (response.status === 200 && response.data) {
      projects = response.data.projects || [];
      totalPages = response.data.total_pages || 1;
      total = response.data.total || 0;
    } else {
      throw new Error(response.message || "Failed to fetch projects");
    }

    // Fetch all for skills extraction (cached)
    const allResponse = await projectsAPI.getAllProjects(1, 500);
    if (allResponse.status === 200 && allResponse.data) {
      const skillsSet = new Set<string>();
      for (const project of allResponse.data.projects || []) {
        for (const skill of project.skills) {
          skillsSet.add(skill);
        }
      }
      allSkills = Array.from(skillsSet).sort();
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "An error occurred";
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <ProjectsFilterClient
      projects={projects}
      currentPage={currentPage}
      totalPages={totalPages}
      total={total}
      allSkills={allSkills}
      searchQuery={searchQuery}
      selectedSkills={selectedSkills}
    />
  );
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Subtle Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500/8 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/8 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-6 relative z-10 max-w-[1600px]">
          <Suspense
            fallback={
              <LoadingState message="Loading projects..." variant="cyan" />
            }
          >
            <ProjectsContent searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
