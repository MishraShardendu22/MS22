"use client";

import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Code2,
  Eye,
  ExternalLink,
  Github,
  Play,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingState } from "@/component/Loading";
import { projectsAPI } from "@/static/api/api.request";
import type { Project } from "@/static/api/api.types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <div
      className="group relative"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`,
      }}
    >
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="relative bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative p-4 md:p-5">
          <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3 line-clamp-1 group-hover:text-cyan-400 transition-colors duration-300">
            {project.project_name}
          </h3>

          <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
            {project.small_description}
          </p>

          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
            {project.skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 md:px-2.5 py-0.5 md:py-1 text-xs font-medium bg-gray-800/50 text-gray-300 rounded-md border border-gray-700/50 hover:border-gray-600 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
            {project.skills.length > 4 && (
              <span className="px-2 md:px-2.5 py-0.5 md:py-1 text-xs font-medium bg-cyan-500/10 text-cyan-400 rounded-md border border-cyan-500/30">
                +{project.skills.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2 md:pt-3 border-t border-gray-800/50 flex-wrap">
            {project.project_repository && (
              <Link
                href={project.project_repository}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 text-xs font-medium bg-gray-800/40 hover:bg-gray-800/60 text-gray-400 hover:text-cyan-400 rounded-lg transition-all duration-200 group/icon"
                aria-label="View repository"
              >
                <Github className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span>Code</span>
              </Link>
            )}
            {project.project_live_link && (
              <Link
                href={project.project_live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 text-xs font-medium bg-gray-800/40 hover:bg-gray-800/60 text-gray-400 hover:text-blue-400 rounded-lg transition-all duration-200 group/icon"
                aria-label="View live project"
              >
                <ExternalLink className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span>Live</span>
              </Link>
            )}
            {project.project_video && (
              <Link
                href={project.project_video}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 text-xs font-medium bg-gray-800/40 hover:bg-gray-800/60 text-gray-400 hover:text-purple-400 rounded-lg transition-all duration-200 group/icon"
                aria-label="Watch video"
              >
                <Play className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span>Demo</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsDisplay = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const projectsPerPage = 4;

  const fetchProjects = async (page: number) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setPaginationLoading(true);
      }
      setError(null);

      const response = await projectsAPI.getAllProjects(page, projectsPerPage);

      if (response.status === 200 && response.data) {
        const sortedProjects = response.data.projects.sort(
          (a, b) => a.order - b.order,
        );
        setProjects(sortedProjects);
        setTotalProjects(response.data.total || sortedProjects.length);
      } else {
        setError("Failed to load projects");
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
      setPaginationLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  if (loading)
    return (
      <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Projects
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              A curated showcase of my work, from scalable web applications to
              innovative open-source contributions
            </p>
          </div>
          <div className="py-8">
            <LoadingState message="Loading projects..." variant="cyan" />
          </div>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Projects
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              A curated showcase of my work, from scalable web applications to
              innovative open-source contributions
            </p>
          </div>
          <div className="py-8">
            <ErrorState
              title="Error Loading Projects"
              message={error}
              variant="red"
              onRetry={() => fetchProjects(currentPage)}
            />
          </div>
        </div>
      </section>
    );

  if (projects.length === 0) {
    return (
      <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]" />
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Projects
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              A curated showcase of my work, from scalable web applications to
              innovative open-source contributions
            </p>
          </div>
          <div className="py-12 flex items-center justify-center">
            <p className="text-lg text-gray-400">
              No projects available to display
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-8 md:py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Projects
                </h2>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap shrink-0">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1 || paginationLoading}
                  className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs md:text-sm"
                >
                  <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="font-medium">Previous</span>
                </button>

                <span className="text-gray-400 text-xs md:text-sm font-medium px-2">
                  Page{" "}
                  <span className="text-cyan-400 font-bold">{currentPage}</span> of{" "}
                  <span className="text-cyan-400 font-bold">{totalPages}</span>
                </span>

                <Link
                  href="/projects"
                  className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-xs md:text-sm"
                >
                  <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="font-medium">View All</span>
                </Link>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages || paginationLoading}
                  className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs md:text-sm"
                >
                  <span className="font-medium">Next</span>
                  <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
            )}
            </div>
            <p className="text-gray-400 text-sm md:text-base text-center lg:text-left max-w-3xl">
              A curated showcase of my work, from scalable web applications to
              innovative open-source contributions
            </p>
          </div>
        </div>

        <div className="mb-6 min-h-[300px] relative">
          <div
            className={`min-h-[300px] flex items-center justify-center absolute inset-0 transition-opacity duration-300 ${paginationLoading ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}`}
          >
            <LoadingState message="Loading projects..." variant="cyan" />
          </div>
          <div
            className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 transition-opacity duration-300 ${paginationLoading ? "opacity-0" : "opacity-100"}`}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={`${project._id}-${index}`}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
