import { ExternalLink, Github, Play } from "lucide-react";
import Link from "next/link";
import { PaginationLinks } from "@/component/Pagination";
import {
  ContentGrid,
  SectionHeader,
  SectionWrapper,
} from "@/component/Section";
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
        opacity: 0,
        animation: `fadeInUp 0.3s ease-out ${Math.min(index * 0.05, 0.3)}s forwards`,
        contain: "layout style paint",
      }}
    >
      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: CSS animation keyframes - static trusted content
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `,
        }}
      />

      <div className="relative bg-linear-to-br from-gray-900/50 to-gray-950/50 border border-gray-800/50 rounded-xl md:rounded-2xl overflow-hidden transition-colors duration-200 hover:border-cyan-500/40">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        <div className="relative p-4 md:p-5">
          <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3 line-clamp-1 group-hover:text-cyan-400 transition-colors duration-300">
            {project.project_name}
          </h3>

          <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
            {project.small_description}
          </p>

          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
            {project.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
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

// Mobile-optimized server component
export async function ProjectsDisplayMobile() {
  const response = await projectsAPI.getAllProjects(1, 4);
  const projects = sortByOrder(response.data?.projects || []);

  if (projects.length === 0) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Projects</h2>
        <p className="text-gray-400 text-sm">No projects available</p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-cyan-400">Projects</h2>
        <Link
          href="/projects"
          className="text-sm text-gray-400 hover:text-cyan-400"
        >
          View All →
        </Link>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        A showcase of my work and open-source contributions
      </p>
      <div className="space-y-4">
        {projects.map((project, _idx) => (
          <div
            key={project._id}
            className="bg-gray-900/80 border border-gray-800 rounded-xl p-4"
          >
            <h3 className="text-base font-bold text-white mb-2 line-clamp-1">
              {project.project_name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">
              {project.small_description}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {project.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded"
                >
                  {skill}
                </span>
              ))}
              {project.skills.length > 3 && (
                <span className="px-2 py-0.5 text-xs bg-cyan-900/50 text-cyan-400 rounded">
                  +{project.skills.length - 3}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-800">
              {project.project_repository && (
                <Link
                  href={project.project_repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded"
                >
                  <Github className="w-3 h-3" />
                  <span>Code</span>
                </Link>
              )}
              {project.project_live_link && (
                <Link
                  href={project.project_live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Live</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

interface ProjectsDisplayServerProps {
  searchParams?: Promise<{ projectsPage?: string }>;
}

export async function ProjectsDisplayServer({
  searchParams,
}: ProjectsDisplayServerProps) {
  const params = await searchParams;
  const page = Number(params?.projectsPage) || 1;

  const response = await projectsAPI.getAllProjects(page, PROJECTS_PER_PAGE);

  if (!response.data) {
    throw new Error("Failed to load projects");
  }

  const projects = sortByOrder(response.data.projects || []);
  const totalPages = response.data.total_pages || 1;
  const hasNext = response.data.has_next || false;
  const hasPrevious = response.data.has_previous || false;

  const headerContent = (
    <SectionHeader
      title="Projects"
      description="A curated showcase of my work, from scalable web applications to innovative open-source contributions"
      theme="cyan"
    >
      <PaginationLinks
        currentPage={page}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        baseHref="/#projects"
        theme="cyan"
        viewAllHref="/projects"
        pageParam="projectsPage"
      />
    </SectionHeader>
  );

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
      <ContentGrid columns={2}>
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
}
