import type { Metadata } from "next";
import { Suspense } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingState } from "@/component/Loading";
import { EmptyState, ListCard, ServerPageHeader } from "@/component/Section";
import { generatePageMetadata } from "@/lib/metadata";
import { projectsAPI } from "@/static/api/api.request";
import type { Project } from "@/static/api/api.types";

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
    filter?: string;
  }>;
}

async function ProjectsContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(params.page || "1", 10));

  let projects: Project[] = [];
  let totalPages = 1;
  let total = 0;
  let error: string | null = null;

  try {
    // Fetch all projects using proper pagination
    const { projects: allProjects, total: totalCount } =
      await projectsAPI.getAllProjectsPaginated();

    // Calculate pagination
    total = totalCount;
    totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

    // Get current page slice
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    projects = allProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  } catch (err) {
    error = err instanceof Error ? err.message : "An error occurred";
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="w-full relative z-10">
      {/* Server-rendered Header with Link-based pagination */}
      <ServerPageHeader
        title="Projects"
        theme="cyan"
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/projects"
        resultCount={total}
        resultLabel="projects"
      />

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.map((project) => {
            const projectId =
              project._id ||
              project.id ||
              project.inline?.id ||
              project.inline?._id ||
              "";

            // Build links array from available URLs
            const links: Array<{ label: string; url: string }> = [];
            if (project.project_live_link) {
              links.push({
                label: "Live Demo",
                url: project.project_live_link,
              });
            }
            if (project.project_repository) {
              links.push({
                label: "Repository",
                url: project.project_repository,
              });
            }
            if (project.project_video) {
              links.push({ label: "Video", url: project.project_video });
            }

            return (
              <ListCard
                key={projectId}
                id={projectId}
                href={`/projects/${projectId}`}
                theme="cyan"
                title={project.project_name}
                description={project.small_description}
                technologies={project.skills}
                links={links}
                maxTechDisplay={3}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No projects found"
          description="No projects available at the moment"
          theme="cyan"
        />
      )}
    </div>
  );
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  return (
    <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500/8 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-500/8 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10 max-w-400">
        <Suspense
          fallback={
            <LoadingState message="Loading projects..." variant="cyan" />
          }
        >
          <ProjectsContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
