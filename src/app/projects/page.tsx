import { Sidebar } from "@/component/Sidebar";
import { ProjectsClient } from "@/component/Projects/ProjectsClient";
import { projectsAPI } from "@/static/api/api.request";
import { ErrorState } from "@/component/Error";
import type { Project } from "@/static/api/api.types";

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function ProjectsPage() {
  let projects: Project[] = [];
  let totalPages = 1;
  let error: string | null = null;

  try {
    const response = await projectsAPI.getAllProjects(1, 500);
    
    if (response.status === 200 && response.data) {
      projects = response.data.projects || [];
      totalPages = response.data.total_pages || 1;
    } else {
      throw new Error(response.message || "Failed to fetch projects");
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "An error occurred";
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Header */}
        <div className="relative border-b border-gray-800/50 z-10">
          <div className="absolute inset-0 bg-linear-to-b from-cyan-500/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 py-10 relative">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
                My{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
                  Projects
                </span>
              </h1>
              <p className="text-gray-400 text-base md:text-lg max-w-3xl leading-relaxed">
                Explore my portfolio of innovative projects showcasing
                cutting-edge technologies and creative solutions
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <ProjectsClient initialProjects={projects} totalPages={totalPages} />
        </div>
      </main>
    </>
  );
}
