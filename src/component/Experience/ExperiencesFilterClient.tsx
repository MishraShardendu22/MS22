"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { EmptyState, ListCard, PageHeader } from "@/component/Section";
import type { Experience } from "@/static/api/api.types";

interface ExperiencesFilterClientProps {
  experiences: Experience[];
  currentPage: number;
  totalPages: number;
  total: number;
  allTechnologies: string[];
  searchQuery: string;
  selectedTechs: string[];
}

export function ExperiencesFilterClient({
  experiences,
  currentPage,
  totalPages,
  total,
  allTechnologies,
  searchQuery: initialSearch,
  selectedTechs: initialTechs,
}: ExperiencesFilterClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showFilters, setShowFilters] = useState(initialTechs.length > 0);

  const updateURL = useCallback(
    (params: Record<string, string | undefined>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      }

      startTransition(() => {
        router.push(`/experiences?${newParams.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);
      updateURL({ search: value || undefined, page: "1" });
    },
    [updateURL],
  );

  const toggleTechFilter = useCallback(
    (tech: string) => {
      const updated = initialTechs.includes(tech)
        ? initialTechs.filter((t) => t !== tech)
        : [...initialTechs, tech];
      updateURL({
        techs: updated.length > 0 ? updated.join(",") : undefined,
        page: "1",
      });
    },
    [initialTechs, updateURL],
  );

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    updateURL({ search: undefined, techs: undefined, page: "1" });
  }, [updateURL]);

  const handlePageChange = useCallback(
    (page: number) => {
      updateURL({ page: page.toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateURL],
  );

  const hasActiveFilters = searchQuery.length > 0 || initialTechs.length > 0;

  return (
    <div className="w-full relative z-10">
      {/* Header with Pagination */}
      <PageHeader
        title="Work Experience"
        theme="blue"
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        searchPlaceholder="Search experiences..."
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        filterCount={initialTechs.length}
        filterLabel="Technologies"
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={() => handlePageChange(currentPage - 1)}
        onNextPage={() => handlePageChange(currentPage + 1)}
        isPending={isPending}
        resultCount={total}
        resultLabel="experiences"
        filterContent={
          allTechnologies.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {allTechnologies.map((tech) => (
                <button
                  type="button"
                  key={tech}
                  onClick={() => toggleTechFilter(tech)}
                  className={`px-2 py-1 text-xs font-medium rounded-lg transition-all ${
                    initialTechs.includes(tech)
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                      : "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600 hover:text-gray-300"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          ) : null
        }
      />

      {/* Experiences Grid - 4 columns, 2 rows max */}
      {experiences.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {experiences.map((experience) => {
            // Access ID from inline.id or fallback to _id
            const experienceId = experience.inline?.id || experience._id || "";
            if (!experienceId) return null;

            const latestPosition = experience.experience_time_line?.[0];
            const position = latestPosition?.position;
            const startDate = latestPosition?.start_date;
            const endDate = latestPosition?.end_date;
            const dateRange = startDate
              ? `${startDate} - ${endDate || "Present"}`
              : undefined;

            return (
              <ListCard
                key={experienceId}
                id={experienceId}
                href={`/experiences/${experienceId}`}
                theme="blue"
                logo={experience.company_logo}
                title={experience.company_name}
                subtitle={position}
                description={experience.description}
                dateRange={dateRange}
                technologies={experience.technologies}
                maxTechDisplay={3}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No experiences found"
          description="Try adjusting your search or filters"
          hasFilters={hasActiveFilters}
          onClearFilters={clearFilters}
          theme="blue"
        />
      )}
    </div>
  );
}
