"use client";

import { ExternalLink, Github, Play } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingState } from "@/component/Loading";
import { PaginationControls } from "@/component/Pagination";
import { ContentGrid, SectionHeader, SectionWrapper } from "@/component/Section";
import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
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

const PROJECTS_PER_PAGE = 4;

const sortByOrder = (items: Project[]) =>
  [...items].sort((a, b) => a.order - b.order);

export const ProjectsDisplay = () => {
  const {
    items: projects,
    loading,
    paginationLoading,
    error,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    retry,
  } = usePaginatedFetch<Project>({
    fetchFn: projectsAPI.getAllProjects as any,
    itemsPerPage: PROJECTS_PER_PAGE,
    dataKey: "projects",
    transform: sortByOrder,
  });

  const sectionContent = useMemo(() => {
    const headerContent = (
      <SectionHeader
        title="Projects"
        description="A curated showcase of my work, from scalable web applications to innovative open-source contributions"
        theme="cyan"
      >
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={goToPrevPage}
          onNextPage={goToNextPage}
          isLoading={paginationLoading}
          theme="cyan"
          viewAllHref="/projects"
        />
      </SectionHeader>
    );

    if (loading) {
      return (
        <SectionWrapper theme="cyan">
          {headerContent}
          <div className="py-8">
            <LoadingState message="Loading projects..." variant="cyan" />
          </div>
        </SectionWrapper>
      );
    }

    if (error) {
      return (
        <SectionWrapper theme="cyan">
          {headerContent}
          <div className="py-8">
            <ErrorState
              title="Error Loading Projects"
              message={error}
              variant="red"
              onRetry={retry}
            />
          </div>
        </SectionWrapper>
      );
    }

    if (projects.length === 0) {
      return (
        <SectionWrapper theme="cyan">
          {headerContent}
          <div className="py-12 flex items-center justify-center">
            <p className="text-lg text-gray-400">
              No projects available to display
            </p>
          </div>
        </SectionWrapper>
      );
    }

    return (
      <SectionWrapper theme="cyan">
        {headerContent}
        <ContentGrid
          isLoading={paginationLoading}
          loadingMessage="Loading projects..."
          loadingVariant="cyan"
          columns={2}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={`${project._id}-${index}`}
              project={project}
              index={index}
            />
          ))}
        </ContentGrid>
      </SectionWrapper>
    );
  }, [
    projects,
    loading,
    paginationLoading,
    error,
    currentPage,
    totalPages,
    goToPrevPage,
    goToNextPage,
    retry,
  ]);

  return sectionContent;
};
