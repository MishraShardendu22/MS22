"use client";

import { useMemo } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingState } from "@/component/Loading";
import { PaginationControls } from "@/component/Pagination";
import { ContentGrid, SectionHeader, SectionWrapper } from "@/component/Section";
import { UnifiedCard } from "@/component/UnifiedCard";
import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
import { experiencesAPI } from "@/static/api/api.request";
import type { Experience } from "@/static/api/api.types";
import { formatDate } from "@/utils/formatDate";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const latestPosition = experience.experience_time_line[0];
  const startDate = formatDate(latestPosition?.start_date);
  const endDate = latestPosition?.end_date
    ? formatDate(latestPosition.end_date)
    : "Present";

  return (
    <UnifiedCard
      index={index}
      theme="blue"
      logo={experience.company_logo}
      logoAlt={experience.company_name}
      title={latestPosition?.position || "Position"}
      subtitle={experience.company_name}
      startDate={startDate}
      endDate={endDate}
      description={experience.description}
      technologies={experience.technologies}
      certificateUrl={experience.certificate_url}
      certificateLabel="Certificate"
    />
  );
};

const EXPERIENCES_PER_PAGE = 2;

export const ExperiencesDisplay = () => {
  const {
    items: experiences,
    loading,
    paginationLoading,
    error,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    retry,
  } = usePaginatedFetch<Experience>({
    fetchFn: experiencesAPI.getAllExperiences as any,
    itemsPerPage: EXPERIENCES_PER_PAGE,
    dataKey: "experiences",
  });

  const sectionContent = useMemo(() => {
    const headerContent = (
      <SectionHeader
        title="Professional Experience"
        description="My journey through various roles and companies that shaped my professional career"
        theme="blue"
      >
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={goToPrevPage}
          onNextPage={goToNextPage}
          isLoading={paginationLoading}
          theme="blue"
          viewAllHref="/experiences"
        />
      </SectionHeader>
    );

    if (loading) {
      return (
        <SectionWrapper theme="blue">
          {headerContent}
          <div className="py-8">
            <LoadingState message="Loading experiences..." variant="purple" />
          </div>
        </SectionWrapper>
      );
    }

    if (error) {
      return (
        <SectionWrapper theme="blue">
          {headerContent}
          <div className="py-8">
            <ErrorState
              title="Error Loading Experiences"
              message={error}
              variant="red"
              onRetry={retry}
            />
          </div>
        </SectionWrapper>
      );
    }

    if (experiences.length === 0) {
      return (
        <SectionWrapper theme="blue">
          {headerContent}
          <div className="py-12 flex items-center justify-center">
            <p className="text-lg text-gray-400">
              No professional experiences available to display
            </p>
          </div>
        </SectionWrapper>
      );
    }

    return (
      <SectionWrapper theme="blue">
        {headerContent}
        <ContentGrid
          isLoading={paginationLoading}
          loadingMessage="Loading experiences..."
          loadingVariant="purple"
          columns={2}
        >
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`${experience._id}-${index}`}
              experience={experience}
              index={index}
            />
          ))}
        </ContentGrid>
      </SectionWrapper>
    );
  }, [
    experiences,
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
