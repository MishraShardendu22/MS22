"use client";

import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Experience } from "@/static/api/api.types";

interface ExperiencesFilterClientProps {
  initialExperiences: Experience[];
}

/**
 * Client-side filter component for experiences
 * Only handles search and filtering - data is fetched on the server
 */
export function ExperiencesFilterClient({
  initialExperiences,
}: ExperiencesFilterClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const limit = 9;

  // Get all unique technologies from experiences
  const allTechnologies = (() => {
    const techsSet = new Set<string>();
    for (const exp of initialExperiences) {
      for (const tech of exp.technologies ?? []) {
        techsSet.add(tech);
      }
    }
    return Array.from(techsSet).sort();
  })();

  // Filter experiences based on search and selected technologies
  const filteredExperiences = initialExperiences.filter((exp) => {
    const matchesSearch =
      searchQuery === "" ||
      exp.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.experience_time_line.some((timeline) =>
        timeline.position.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesTechs =
      selectedTechs.length === 0 ||
      selectedTechs.every((tech) => exp.technologies?.includes(tech));

    return matchesSearch && matchesTechs;
  });

  const paginatedExperiences = (() => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredExperiences.slice(startIndex, endIndex);
  })();

  const totalFilteredPages = Math.ceil(filteredExperiences.length / limit);

  const toggleTechFilter = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTechs([]);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-12 relative z-10">
      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto mb-10 space-y-6">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by company, position, or description..."
                className="w-full pl-14 pr-5 py-4 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:bg-gray-900 transition-all shadow-lg shadow-black/20"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-all shadow-lg relative group ${
              showFilters || selectedTechs.length > 0
                ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 shadow-cyan-500/20"
                : "bg-gray-900/80 backdrop-blur-xl text-gray-400 border border-gray-800/50 hover:border-gray-700 hover:text-gray-300 shadow-black/20"
            }`}
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            {selectedTechs.length > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 text-xs font-bold bg-linear-to-br from-cyan-500 to-blue-600 text-white rounded-full shadow-lg shadow-cyan-500/50 animate-pulse">
                {selectedTechs.length}
              </span>
            )}
          </button>
          {(searchQuery || selectedTechs.length > 0) && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold bg-linear-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/40 hover:from-red-500/30 hover:to-pink-500/30 transition-all shadow-lg shadow-red-500/20"
            >
              <X className="w-5 h-5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Technology Filters */}
        {showFilters && allTechnologies.length > 0 && (
          <div className="relative group animate-fadeIn">
            <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-50" />
            <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                Filter by Technology
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTechnologies.map((tech) => (
                  <button
                    type="button"
                    key={tech}
                    onClick={() => toggleTechFilter(tech)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      selectedTechs.includes(tech)
                        ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                        : "bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700/50"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-400">
            Showing{" "}
            <span className="text-white font-semibold">
              {filteredExperiences.length}
            </span>{" "}
            {filteredExperiences.length === 1 ? "experience" : "experiences"}
          </p>
          {(searchQuery || selectedTechs.length > 0) && (
            <p className="text-cyan-400 font-medium">
              {selectedTechs.length > 0 &&
                `${selectedTechs.length} filter${selectedTechs.length > 1 ? "s" : ""} active`}
            </p>
          )}
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="max-w-7xl mx-auto">
        {paginatedExperiences.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {paginatedExperiences.map((experience, index) => {
                const experienceId = experience._id || "";
                return (
                <Link
                  key={experienceId}
                  href={`/experiences/${experienceId}`}
                  className="group relative animate-fadeInUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 via-cyan-500 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-50 transition duration-500" />
                  <div className="relative h-full p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-3xl hover:border-cyan-500/40 transition-all overflow-hidden">
                    {/* Company Badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30">
                        <Building2 className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-black text-white truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all">
                          {experience.company_name}
                        </h3>
                      </div>
                    </div>

                    {/* Position */}
                    {experience.experience_time_line &&
                      experience.experience_time_line.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-start gap-2 text-cyan-400 font-semibold text-lg">
                            <Briefcase className="w-5 h-5 mt-0.5 shrink-0" />
                            <p className="line-clamp-2">
                              {experience.experience_time_line[0].position}
                            </p>
                          </div>
                        </div>
                      )}

                    {/* Timeline */}
                    {experience.experience_time_line &&
                      experience.experience_time_line.length > 0 && (
                        <div className="mb-6 space-y-2">
                          {experience.experience_time_line
                            .slice(0, 2)
                            .map((timeline) => (
                              <div
                                key={`${timeline.start_date}-${timeline.end_date || "present"}`}
                                className="flex items-center gap-2 text-sm text-gray-400"
                              >
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {timeline.start_date} -{" "}
                                  {timeline.end_date || "Present"}
                                </span>
                              </div>
                            ))}
                        </div>
                      )}

                    {/* Description */}
                    <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                      {experience.description}
                    </p>

                    {/* Technologies */}
                    {experience.technologies &&
                      experience.technologies.length > 0 && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1.5 bg-gray-800/50 text-gray-300 text-xs font-semibold rounded-lg border border-gray-700/50"
                              >
                                {tech}
                              </span>
                            ))}
                            {experience.technologies.length > 3 && (
                              <span className="px-3 py-1.5 bg-cyan-500/10 text-cyan-400 text-xs font-semibold rounded-lg border border-cyan-500/30">
                                +{experience.technologies.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                    {/* View Details Link */}
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-3 transition-all">
                      <span>View Details</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              );
              })}
            </div>

            {/* Pagination */}
            {totalFilteredPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="group flex items-center gap-2 px-6 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 rounded-xl hover:border-cyan-500/40 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-800/50 disabled:hover:text-gray-400 transition-all shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-semibold">Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: totalFilteredPages },
                    (_, i) => i + 1,
                  ).map((page) => (
                    <button
                      type="button"
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-11 h-11 rounded-xl font-bold transition-all shadow-lg ${
                        currentPage === page
                          ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/30 scale-110"
                          : "bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 hover:border-cyan-500/40 hover:text-cyan-400"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(totalFilteredPages, prev + 1),
                    )
                  }
                  disabled={currentPage >= totalFilteredPages}
                  className="group flex items-center gap-2 px-6 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 rounded-xl hover:border-cyan-500/40 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-800/50 disabled:hover:text-gray-400 transition-all shadow-lg"
                >
                  <span className="font-semibold">Next</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 mb-6">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No experiences found
            </h3>
            <p className="text-gray-400 mb-8">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
            {(searchQuery || selectedTechs.length > 0) && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 rounded-xl hover:from-cyan-500/30 hover:to-blue-500/30 font-semibold transition-all shadow-lg shadow-cyan-500/20"
              >
                <X className="w-5 h-5" />
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
