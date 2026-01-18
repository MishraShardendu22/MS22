import type { Metadata } from "next";
import { Suspense } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingState } from "@/component/Loading";
import { ProjectsFilterClient } from "@/component/Projects";
import { Sidebar } from "@/component/Sidebar";
import { generatePageMetadata } from "@/lib/metadata";
import { projectsAPI } from "@/static/api/api.request";
import type { Project } from "@/static/api/api.types";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

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

async function ProjectsContent() {
  let projects: Project[] = [];
  let error: string | null = null;

  try {
    const response = await projectsAPI.getAllProjects(1, 500);

    if (response.status === 200 && response.data) {
      projects = response.data.projects || [];
    } else {
      throw new Error(response.message || "Failed to fetch projects");
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "An error occurred";
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return <ProjectsFilterClient initialProjects={projects} />;
}

export default async function ProjectsPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500/8 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/8 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        </div>

        {/* Compact Header */}
        <div className="relative border-b border-gray-800/50 z-10">
          <div className="absolute inset-0 bg-linear-to-b from-cyan-500/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 py-6 relative">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">
                My{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600">
                  Projects
                </span>
              </h1>
              <p className="text-gray-500 text-sm max-w-2xl">
                Explore my portfolio of innovative projects showcasing
                cutting-edge technologies and creative solutions
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4 relative z-10">
          <Suspense
            fallback={
              <LoadingState message="Loading projects..." variant="cyan" />
            }
          >
            <ProjectsContent />
          </Suspense>
        </div>
      </main>
    </>
  );
}
