"use client";

import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  Filter,
  Github,
  Play,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/static/api/api.types";

interface ProjectsFilterClientProps {
  initialProjects: Project[];
}

export function ProjectsFilterClient({
  initialProjects,
}: ProjectsFilterClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allSkills = (() => {
    const skillsSet = new Set<string>();
    for (const project of initialProjects) {
      for (const skill of project.skills) {
        skillsSet.add(skill);
      }
    }
    return Array.from(skillsSet).sort();
  })();

  const filteredProjects = (() => {
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
  })();

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
  };

  return (
    <>
      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto mb-6 space-y-4">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, description, or technology..."
                className="w-full pl-11 pr-4 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:bg-gray-900 transition-all shadow-lg shadow-black/20"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg relative group ${
              showFilters || selectedSkills.length > 0
                ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 shadow-cyan-500/20"
                : "bg-gray-900/80 backdrop-blur-xl text-gray-400 border border-gray-800/50 hover:border-gray-700 hover:text-gray-300 shadow-black/20"
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {selectedSkills.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 text-xs font-bold bg-linear-to-br from-cyan-500 to-blue-600 text-white rounded-full shadow-lg shadow-cyan-500/50">
                {selectedSkills.length}
              </span>
            )}
          </button>
          {(searchQuery || selectedSkills.length > 0) && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-linear-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/40 hover:from-red-500/30 hover:to-pink-500/30 transition-all shadow-lg shadow-red-500/20"
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Skills Filter */}
        {showFilters && (
          <div className="relative group animate-fadeIn">
            <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur opacity-50" />
            <div className="relative p-5 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-xl space-y-3 shadow-2xl">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
                  <Filter className="w-4 h-4 text-cyan-400" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  Filter by Technology
                </h3>
                <div className="ml-auto text-xs text-gray-500">
                  {allSkills.length} available
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => toggleSkillFilter(skill)}
                    className={`group/skill relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 ${
                      selectedSkills.includes(skill)
                        ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/20 scale-105"
                        : "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600 hover:text-gray-300 hover:scale-105 hover:bg-gray-800/70"
                    }`}
                  >
                    {selectedSkills.includes(skill) && (
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-lg animate-pulse" />
                    )}
                    <span className="relative">{skill}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-lg">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
              <span className="text-gray-400">Showing</span>
              <span className="text-cyan-400 font-bold">
                {filteredProjects.length}
              </span>
              <span className="text-gray-400">of</span>
              <span className="text-white font-bold">
                {initialProjects.length}
              </span>
              <span className="text-gray-400">projects</span>
            </div>
          </div>
          {selectedSkills.length > 0 && (
            <div className="flex items-center gap-1.5 px-4 py-2 bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
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
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="relative inline-flex mb-6">
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-gray-900 to-gray-950 border-2 border-gray-800/50">
              <Code2 className="w-12 h-12 text-gray-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            No projects found
          </h3>
          <p className="text-gray-400 text-base mb-6 max-w-md mx-auto">
            Try adjusting your search terms or filters to discover more projects
          </p>
          {(searchQuery || selectedSkills.length > 0) && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg hover:from-cyan-500/20 hover:to-blue-500/20 transition-all font-semibold text-sm shadow-lg shadow-cyan-500/10"
            >
              <X className="w-4 h-4" />
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project._id || project.id || index}
              project={project}
              index={index}
            />
          ))}
        </div>
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
          animation: `cardFadeIn 0.5s ease-out ${index * 0.05}s both`,
        }}
      >
        <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500" />

        <div className="relative h-full bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-xl overflow-hidden transition-all duration-500 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-1 cursor-pointer">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-blue-500/5 group-hover:to-purple-500/10 transition-all duration-500" />

          <div className="relative p-5 flex flex-col h-full">
            <div className="mb-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
                  {project.project_name}
                </h3>
                <div className="shrink-0 p-1.5 bg-gray-800/50 rounded-lg group-hover:bg-linear-to-br group-hover:from-cyan-500/20 group-hover:to-blue-500/20 border border-gray-700/50 group-hover:border-cyan-500/40 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors">
                {project.small_description}
              </p>
            </div>

            <div className="flex-1 mb-4">
              <div className="flex flex-wrap gap-1.5">
                {project.skills.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs font-semibold bg-gray-800/70 text-gray-300 rounded-md border border-gray-700/50 group-hover:border-gray-600 group-hover:bg-gray-800 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
                {project.skills.length > 5 && (
                  <span className="px-2 py-1 text-xs font-semibold bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-md border border-cyan-500/30 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                    +{project.skills.length - 5}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 pt-4 /50 group-hover:border-gray-700/50 transition-colors">
              {project.project_repository && (
                <div className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-gray-800/50 text-gray-400 rounded-md group-hover:bg-gray-800 group-hover:text-cyan-400 transition-all duration-200">
                  <Github className="w-3.5 h-3.5" />
                  <span>Code</span>
                </div>
              )}
              {project.project_live_link && (
                <div className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-gray-800/50 text-gray-400 rounded-md group-hover:bg-gray-800 group-hover:text-blue-400 transition-all duration-200">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live</span>
                </div>
              )}
              {project.project_video && (
                <div className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-gray-800/50 text-gray-400 rounded-md group-hover:bg-gray-800 group-hover:text-purple-400 transition-all duration-200">
                  <Play className="w-3.5 h-3.5" />
                  <span>Demo</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
