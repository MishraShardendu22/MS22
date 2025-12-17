"use client";

import { MapPin } from "lucide-react";
import { useMemo } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingState } from "@/component/Loading";
import { PaginationControls } from "@/component/Pagination";
import { ContentGrid, SectionHeader, SectionWrapper } from "@/component/Section";
import { UnifiedCard } from "@/component/UnifiedCard";
import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
import { volunteerAPI } from "@/static/api/api.request";
import type { Volunteer } from "@/static/api/api.types";
import { formatDate } from "@/utils/formatDate";

interface VolunteerCardProps {
  volunteer: Volunteer;
  index: number;
}

export const VolunteerCard = ({ volunteer, index }: VolunteerCardProps) => {
  const latestTimeline =
    volunteer.volunteer_time_line?.[volunteer.volunteer_time_line.length - 1];
  const position =
    latestTimeline?.position || volunteer.position || "Volunteer";
  const startDate = formatDate(
    latestTimeline?.start_date || volunteer.start_date,
    { fallback: "" }
  );
  const endDate = latestTimeline?.end_date
    ? formatDate(latestTimeline.end_date, { fallback: "" })
    : volunteer.end_date
      ? formatDate(volunteer.end_date, { fallback: "" })
      : "Present";
  const isCurrent = !latestTimeline?.end_date && !volunteer.end_date;

  const badges = [];
  if (isCurrent) {
    badges.push({ label: "Active" });
  }

  const extraInfo = volunteer.location ? (
    <>
      <span>•</span>
      <div className="flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5" />
        <span>{volunteer.location}</span>
      </div>
    </>
  ) : null;

  return (
    <UnifiedCard
      index={index}
      theme="pink"
      logo={volunteer.organisation_logo}
      logoAlt={volunteer.organisation}
      title={position}
      subtitle={volunteer.organisation}
      startDate={startDate}
      endDate={endDate}
      description={volunteer.description}
      technologies={volunteer.technologies}
      certificateUrl={volunteer.certificate_link}
      certificateLabel="Certificate"
      badges={badges}
      extraInfo={extraInfo}
    />
  );
};

const VOLUNTEERS_PER_PAGE = 4;

const sortByOrder = (items: Volunteer[]) =>
  [...items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

export const VolunteerDisplay = () => {
  const {
    items: volunteers,
    loading,
    paginationLoading,
    error,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    retry,
  } = usePaginatedFetch<Volunteer>({
    fetchFn: volunteerAPI.getAllVolunteers,
    itemsPerPage: VOLUNTEERS_PER_PAGE,
    dataKey: "volunteer_experiences",
    transform: sortByOrder,
  });

  const sectionContent = useMemo(() => {
    const headerContent = (
      <SectionHeader
        title="Volunteer Experience"
        description="Making a difference through community service and meaningful contributions"
        theme="pink"
      >
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={goToPrevPage}
          onNextPage={goToNextPage}
          isLoading={paginationLoading}
          theme="pink"
          viewAllHref="/volunteer"
        />
      </SectionHeader>
    );

    if (loading) {
      return (
        <SectionWrapper theme="pink">
          {headerContent}
          <div className="py-8">
            <LoadingState
              message="Loading volunteer experiences..."
              variant="pink"
            />
          </div>
        </SectionWrapper>
      );
    }

    if (error) {
      return (
        <SectionWrapper theme="pink">
          {headerContent}
          <div className="py-8">
            <ErrorState
              title="Error Loading Volunteers"
              message={error}
              variant="red"
              onRetry={retry}
            />
          </div>
        </SectionWrapper>
      );
    }

    if (volunteers.length === 0) {
      return (
        <SectionWrapper theme="pink">
          {headerContent}
          <div className="py-12 flex items-center justify-center">
            <p className="text-lg text-gray-400">
              No volunteer experiences available to display
            </p>
          </div>
        </SectionWrapper>
      );
    }

    return (
      <SectionWrapper theme="pink">
        {headerContent}
        <ContentGrid
          isLoading={paginationLoading}
          loadingMessage="Loading volunteer experiences..."
          loadingVariant="pink"
          columns={2}
        >
          {volunteers.map((volunteer, index) => {
            const volId =
              volunteer.inline?.id || volunteer._id || `vol-${index}`;
            return (
              <VolunteerCard key={volId} volunteer={volunteer} index={index} />
            );
          })}
        </ContentGrid>
      </SectionWrapper>
    );
  }, [
    volunteers,
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
