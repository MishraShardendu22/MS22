"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { LoadingState } from "@/component/Loading/LoadingState";
import { skillsAPI } from "@/static/api/api.request";
import { ErrorState } from "../Error";

/**
 * Mobile-optimized Skills Display
 * - No background blur effects
 * - No hover animations
 * - Simplified DOM structure
 */
export function SkillsDisplayMobile() {
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const skillsPerPage = 15;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await skillsAPI.getSkills(currentPage, skillsPerPage);
        setSkills(response.data.skills);
        setTotalPages(response.data.total_pages);
        setHasNext(response.data.has_next);
        setHasPrevious(response.data.has_previous);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [currentPage]);

  const nextPage = () => {
    if (hasNext) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (hasPrevious) setCurrentPage(currentPage - 1);
  };

  return (
    <section className="relative py-6 px-4 bg-gray-950 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">
              Technical Skills
            </h2>
            <p className="text-gray-400 text-xs px-4">
              Technologies and tools I work with
            </p>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={prevPage}
                disabled={!hasPrevious}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 disabled:opacity-30 text-xs"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <span className="text-gray-400 text-xs">
                <span className="text-cyan-400">{currentPage}</span>/{totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={!hasNext}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 disabled:opacity-30 text-xs"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Skills Grid */}
        <div className="mb-4">
          {loading ? (
            <div className="py-6 text-center text-gray-400 text-sm">Loading skills...</div>
          ) : error ? (
            <div className="py-6 text-center text-red-400 text-sm">{error}</div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2 px-2">
              {skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function SkillsDisplay() {
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const skillsPerPage = 15;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await skillsAPI.getSkills(currentPage, skillsPerPage);
        setSkills(response.data.skills);
        setTotalPages(response.data.total_pages);
        setHasNext(response.data.has_next);
        setHasPrevious(response.data.has_previous);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [currentPage]);

  const nextPage = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (hasPrevious) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="relative py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Technical Skills
                </h2>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 flex-wrap shrink-0">
                <button
                  onClick={prevPage}
                  disabled={!hasPrevious}
                  className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-2.5 md:px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-medium hidden sm:inline">Previous</span>
                  <span className="font-medium sm:hidden">Prev</span>
                </button>

                <span className="text-gray-400 text-xs font-medium px-1 sm:px-2">
                  <span className="hidden sm:inline">Page </span>
                  <span className="text-cyan-400 font-bold">{currentPage}</span><span className="hidden sm:inline"> of </span><span className="sm:hidden">/</span>
                  <span className="text-cyan-400 font-bold">{totalPages}</span>
                </span>

                <button
                  onClick={nextPage}
                  disabled={!hasNext}
                  className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-2.5 md:px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                >
                  <span className="font-medium">Next</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            )}
            </div>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg text-center lg:text-left max-w-3xl px-4 lg:px-0">
              Technologies and tools I work with to build innovative solutions
            </p>
          </div>
        </div>

        {/* Skills Grid or Loading/Error State */}
        <div className="mb-4 md:mb-6">
          {loading ? (
            <div className="py-6 md:py-8">
              <LoadingState message="Loading skills..." variant="cyan" />
            </div>
          ) : error ? (
            <div className="py-6 md:py-8">
              <ErrorState
                title="Error Loading Skills"
                message={error}
                variant="red"
              />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 md:gap-3 content-start px-2">
              {skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="skill-badge group px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg md:rounded-xl bg-linear-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm border border-gray-800 hover:border-cyan-500/50 text-gray-300 hover:text-cyan-400 font-semibold text-xs sm:text-sm md:text-base shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transition-colors duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
