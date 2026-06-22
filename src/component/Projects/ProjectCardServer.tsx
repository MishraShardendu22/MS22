import Link from "next/link";
import { PaginationLinks } from "@/component/Pagination";
import {
  ContentGrid,
  SectionHeader,
  SectionWrapper,
} from "@/component/Section";
import { UnifiedCard } from "@/component/UnifiedCard";
import { projectsAPI } from "@/static/api/api.request";
import type { Project } from "@/static/api/api.types";
import { PROJECTS_PER_PAGE } from "@/static/pagination";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const extraInfo = (
    <div className="flex items-center gap-2 mt-1 flex-wrap">
      {project.project_repository && (
        <Link
          href={project.project_repository}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-zinc-800/60 hover:bg-violet-500/10 text-zinc-400 hover:text-violet-400 rounded-md border border-zinc-700/50 hover:border-violet-500/30 transition-all duration-200"
          aria-label="View repository"
        >
          <span>Code</span>
        </Link>
      )}
      {project.project_live_link && (
        <Link
          href={project.project_live_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-zinc-800/60 hover:bg-indigo-500/10 text-zinc-400 hover:text-indigo-400 rounded-md border border-zinc-700/50 hover:border-indigo-500/30 transition-all duration-200"
          aria-label="View live project"
        >
          <span>Live</span>
        </Link>
      )}
      {project.project_video && (
        <Link
          href={project.project_video}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-zinc-800/60 hover:bg-violet-500/10 text-zinc-400 hover:text-violet-400 rounded-md border border-zinc-700/50 hover:border-violet-500/30 transition-all duration-200"
          aria-label="Watch video"
        >
          <span>Demo</span>
        </Link>
      )}
    </div>
  );

  return (
    <UnifiedCard
      index={index}
      theme="violet"
      title={project.project_name}
      description={project.small_description}
      technologies={project.skills}
      extraInfo={extraInfo}
    />
  );
};

const sortByOrder = (items: Project[]) =>
  [...items].sort((a, b) => a.order - b.order);

// Mobile-optimized server component
export async function ProjectsDisplayMobile() {
  let projects: Project[] = [];

  try {
    const response = await projectsAPI.getAllProjects(1, 4);
    projects = sortByOrder(response.data?.projects || []);
  } catch (error) {
    console.error("Error loading mobile projects:", error);
    // Fallback to empty state when backend is rate-limited or unavailable.
  }

  if (projects.length === 0) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-violet-400 mb-4">Projects</h2>
        <p className="text-zinc-400 text-sm">No projects available</p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-violet-400">Projects</h2>
        <Link
          href="/projects"
          className="text-sm text-zinc-400 hover:text-violet-400 transition-colors"
        >
          View All →
        </Link>
      </div>
      <p className="text-zinc-400 text-sm mb-4">
        A showcase of my work and open-source contributions
      </p>
      <div className="space-y-3">
        {projects.map((project, _idx) => (
          <div
            key={project.inline?.id}
            className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 hover:border-violet-500/30 transition-colors duration-300"
          >
            <h3 className="text-base font-bold text-zinc-100 mb-2 line-clamp-1">
              {project.project_name}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-3 line-clamp-2">
              {project.small_description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-xs bg-zinc-800 text-zinc-300 rounded"
                >
                  {skill}
                </span>
              ))}
              {project.skills.length > 3 && (
                <span className="px-2 py-0.5 text-xs bg-violet-900/30 text-violet-400 rounded">
                  +{project.skills.length - 3}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-zinc-800/50">
              {project.project_repository && (
                <Link
                  href={project.project_repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded hover:bg-violet-500/10 hover:text-violet-400 transition-colors"
                >
                  <span>Code</span>
                </Link>
              )}
              {project.project_live_link && (
                <Link
                  href={project.project_live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors"
                >
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

  let projects: Project[] = [];
  let totalPages = 1;
  let hasNext = false;
  let hasPrevious = false;

  try {
    const response = await projectsAPI.getAllProjects(page, PROJECTS_PER_PAGE);
    projects = sortByOrder(response.data?.projects || []);
    totalPages = response.data?.total_pages || 1;
    hasNext = response.data?.has_next || false;
    hasPrevious = response.data?.has_previous || false;
  } catch (error) {
    console.error("Error loading projects:", error);
    // Fallback to empty state when backend is rate-limited or unavailable.
  }

  const headerContent = (
    <SectionHeader
      title="Projects"
      description="A curated showcase of my work, from scalable web applications to innovative open-source contributions"
      theme="violet"
    >
      <PaginationLinks
        currentPage={page}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        baseHref="/#projects"
        theme="violet"
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
            key={project.inline?.id ?? String(index)}
            project={project}
            index={index}
          />
        ))}
      </ContentGrid>
    </SectionWrapper>
  );
}
