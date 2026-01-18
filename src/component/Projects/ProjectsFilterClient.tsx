"use client";

import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  Filter,
  Github,
  Play,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/static/api/api.types";

interface ProjectsFilterClientProps {
  initialProjects: Project[];
}

const PROJECTS_PER_PAGE = 10;

export function ProjectsFilterClient({
  initialProjects,
}: ProjectsFilterClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    for (const project of initialProjects) {
      for (const skill of project.skills) {
        skillsSet.add(skill);
      }
    }
    return Array.from(skillsSet).sort();
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.project_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        project.small_description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.every((skill) => project.skills.includes(skill));

      return matchesSearch && matchesSkills;
    });
  }, [initialProjects, searchQuery, selectedSkills]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <>
      {/* Compact Search and Filters */}
      <div className="max-w-7xl mx-auto mb-4 space-y-3">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-9 pr-3 py-2 bg-gray-900/80 border border-gray-800/50 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-sm transition-all relative ${
              showFilters || selectedSkills.length > 0
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/40"
                : "bg-gray-900/80 text-gray-400 border border-gray-800/50 hover:border-gray-700 hover:text-gray-300"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
            {selectedSkills.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-bold bg-cyan-500 text-white rounded">
                {selectedSkills.length}
              </span>
            )}
          </button>
          {(searchQuery || selectedSkills.length > 0) && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-sm bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Skills Filter - Compact */}
        {showFilters && (
          <div className="p-3 bg-gray-900/90 border border-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <h3 className="text-xs font-bold text-white">
                Filter by Technology
              </h3>
              <span className="ml-auto text-xs text-gray-500">
                {allSkills.length} available
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {allSkills.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkillFilter(skill)}
                  className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                    selectedSkills.includes(skill)
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                      : "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600 hover:text-gray-300"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-lg">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
              <span className="text-gray-400">Page</span>
              <span className="text-cyan-400 font-bold">{currentPage}</span>
              <span className="text-gray-400">of</span>
              <span className="text-white font-bold">{totalPages || 1}</span>
              <span className="text-gray-500 mx-1">•</span>
              <span className="text-cyan-400 font-bold">
                {filteredProjects.length}
              </span>
              <span className="text-gray-400">projects</span>
            </div>
          </div>
          {selectedSkills.length > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-400 font-semibold">
                Filtered by {selectedSkills.length}{" "}
                {selectedSkills.length !== 1 ? "technologies" : "technology"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="max-w-7xl mx-auto text-center py-12">
          <div className="relative inline-flex mb-4">
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-gray-900 to-gray-950 border-2 border-gray-800/50">
              <Code2 className="w-8 h-8 text-gray-600" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-400 text-sm mb-4 max-w-md mx-auto">
            Try adjusting your search terms or filters to discover more projects
          </p>
          {(searchQuery || selectedSkills.length > 0) && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg hover:from-cyan-500/20 hover:to-blue-500/20 transition-all font-semibold text-sm"
            >
              <X className="w-4 h-4" />
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Compact Grid - 5 columns on large screens */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {paginatedProjects.map((project, index) => (
              <ProjectCard
                key={project._id || project.id || index}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="max-w-7xl mx-auto mt-6 flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-gray-800/60 text-gray-300 border border-gray-700/50 hover:border-cyan-500/40 hover:text-cyan-400 disabled:hover:border-gray-700/50 disabled:hover:text-gray-300"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>

              <div className="flex items-center gap-1 mx-2">
                {getPageNumbers().map((page, idx) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-before-${idx > 1 ? "end" : "start"}`}
                      className="px-2 text-gray-500"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      type="button"
                      key={`page-${page}`}
                      onClick={() => goToPage(page as number)}
                      className={`min-w-8 h-8 text-sm font-bold rounded-lg transition-all ${
                        currentPage === page
                          ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                          : "bg-gray-800/60 text-gray-400 border border-gray-700/50 hover:border-cyan-500/40 hover:text-cyan-400"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-gray-800/60 text-gray-300 border border-gray-700/50 hover:border-cyan-500/40 hover:text-cyan-400 disabled:hover:border-gray-700/50 disabled:hover:text-gray-300"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const projectId =
    project._id ||
    project.id ||
    project.inline?.id ||
    project.inline?._id ||
    "";

  return (
    <Link href={`/projects/${projectId}`}>
      <div
        className="group relative h-full"
        style={{
          animation: `cardFadeIn 0.3s ease-out ${index * 0.03}s both`,
        }}
      >
        <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300" />

        <div className="relative h-full bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/3 group-hover:to-purple-500/5 transition-all duration-300" />

          <div className="relative p-3 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-1.5 mb-2">
              <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors flex-1">
                {project.project_name}
              </h3>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-cyan-400 shrink-0 transition-colors" />
            </div>

            {/* Description */}
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-2 group-hover:text-gray-400 transition-colors">
              {project.small_description}
            </p>

            {/* Skills - compact */}
            <div className="flex flex-wrap gap-1 mb-2 flex-1">
              {project.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-1.5 py-0.5 text-[10px] font-medium bg-gray-800/60 text-gray-400 rounded border border-gray-700/40"
                >
                  {skill}
                </span>
              ))}
              {project.skills.length > 3 && (
                <span className="px-1.5 py-0.5 text-[10px] font-medium text-cyan-500">
                  +{project.skills.length - 3}
                </span>
              )}
            </div>

            {/* Links - icon only */}
            <div className="flex items-center gap-1.5 pt-2 border-t border-gray-800/40">
              {project.project_repository && (
                <div className="p-1 bg-gray-800/40 rounded text-gray-500 group-hover:text-cyan-400 transition-colors">
                  <Github className="w-3 h-3" />
                </div>
              )}
              {project.project_live_link && (
                <div className="p-1 bg-gray-800/40 rounded text-gray-500 group-hover:text-blue-400 transition-colors">
                  <ExternalLink className="w-3 h-3" />
                </div>
              )}
              {project.project_video && (
                <div className="p-1 bg-gray-800/40 rounded text-gray-500 group-hover:text-purple-400 transition-colors">
                  <Play className="w-3 h-3" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
