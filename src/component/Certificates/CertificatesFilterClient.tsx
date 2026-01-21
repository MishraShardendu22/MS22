"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { EmptyState, ListCard, PageHeader } from "@/component/Section";
import type { Certificate } from "@/static/api/api.types";

interface CertificatesFilterClientProps {
  certificates: Certificate[];
  currentPage: number;
  totalPages: number;
  total: number;
  allSkills: string[];
  searchQuery: string;
  selectedSkills: string[];
}

export function CertificatesFilterClient({
  certificates,
  currentPage,
  totalPages,
  total,
  allSkills,
  searchQuery: initialSearch,
  selectedSkills: initialSkills,
}: CertificatesFilterClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showFilters, setShowFilters] = useState(initialSkills.length > 0);

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
        router.push(`/certificates?${newParams.toString()}`, { scroll: false });
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

  const toggleSkillFilter = useCallback(
    (skill: string) => {
      const updated = initialSkills.includes(skill)
        ? initialSkills.filter((s) => s !== skill)
        : [...initialSkills, skill];
      updateURL({
        skills: updated.length > 0 ? updated.join(",") : undefined,
        page: "1",
      });
    },
    [initialSkills, updateURL],
  );

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    updateURL({ search: undefined, skills: undefined, page: "1" });
  }, [updateURL]);

  const handlePageChange = useCallback(
    (page: number) => {
      updateURL({ page: page.toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateURL],
  );

  const hasActiveFilters = searchQuery.length > 0 || initialSkills.length > 0;

  return (
    <div className="w-full relative z-10">
      {/* Header with Pagination */}
      <PageHeader
        title="Certifications & Awards"
        theme="purple"
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        searchPlaceholder="Search certifications..."
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        filterCount={initialSkills.length}
        filterLabel="Skills"
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={() => handlePageChange(currentPage - 1)}
        onNextPage={() => handlePageChange(currentPage + 1)}
        isPending={isPending}
        resultCount={total}
        resultLabel="certifications"
        filterContent={
          allSkills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {allSkills.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkillFilter(skill)}
                  className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                    initialSkills.includes(skill)
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/40"
                      : "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600 hover:text-gray-300"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          ) : null
        }
      />

      {/* Certificates Grid - 4 columns, 2 rows max */}
      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {certificates.map((certificate) => {
            const certificateId =
              certificate._id || certificate.inline?.id || "";
            const dateRange = certificate.issue_date
              ? certificate.expiry_date
                ? `${certificate.issue_date} - ${certificate.expiry_date}`
                : `Issued: ${certificate.issue_date}`
              : undefined;

            // Build links
            const links: Array<{ label: string; url: string }> = [];
            if (certificate.certificate_url) {
              links.push({
                label: "View Certificate",
                url: certificate.certificate_url,
              });
            }

            return (
              <ListCard
                key={certificateId}
                id={certificateId}
                href={`/certificates/${certificateId}`}
                theme="purple"
                title={certificate.title}
                subtitle={certificate.issuer}
                description={certificate.description}
                dateRange={dateRange}
                technologies={certificate.skills}
                links={links}
                maxTechDisplay={3}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No certifications found"
          description="Try adjusting your search or filters"
          hasFilters={hasActiveFilters}
          onClearFilters={clearFilters}
          theme="purple"
        />
      )}
    </div>
  );
}
