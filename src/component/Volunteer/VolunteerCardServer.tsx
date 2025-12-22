import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PaginationLinks } from "@/component/Pagination";
import {
  ContentGrid,
  SectionHeader,
  SectionWrapper,
} from "@/component/Section";
import { UnifiedCard } from "@/component/UnifiedCard";
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
    { fallback: "" },
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

// Mobile-optimized server component
export async function VolunteerDisplayMobile() {
  const response = await volunteerAPI.getAllVolunteers(1, 4);
  const volunteers = sortByOrder(response.data?.volunteer_experiences || []);

  if (volunteers.length === 0) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-pink-400 mb-4">Volunteer</h2>
        <p className="text-gray-400 text-sm">
          No volunteer experiences available
        </p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-pink-400">Volunteer</h2>
        <Link
          href="/volunteer"
          className="text-sm text-gray-400 hover:text-pink-400"
        >
          View All →
        </Link>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        Community service and meaningful contributions
      </p>
      <div className="space-y-4">
        {volunteers.map((vol) => {
          const latestTimeline =
            vol.volunteer_time_line?.[vol.volunteer_time_line.length - 1];
          const position =
            latestTimeline?.position || vol.position || "Volunteer";
          const startDate = formatDate(
            latestTimeline?.start_date || vol.start_date,
            { fallback: "" },
          );
          const endDate = latestTimeline?.end_date
            ? formatDate(latestTimeline.end_date, { fallback: "" })
            : vol.end_date
              ? formatDate(vol.end_date, { fallback: "" })
              : "Present";

          return (
            <div
              key={vol._id}
              className="bg-gray-900/80 border border-gray-800 rounded-xl p-4"
            >
              <div className="flex items-start gap-3 mb-3">
                {vol.organisation_logo && (
                  <Image
                    src={vol.organisation_logo}
                    alt={vol.organisation}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-lg object-contain bg-white/5 p-1"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-white line-clamp-1">
                    {position}
                  </h3>
                  <p className="text-sm text-gray-400">{vol.organisation}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                {startDate} - {endDate}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2">
                {vol.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {vol.technologies?.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {(vol.technologies?.length ?? 0) > 3 && (
                  <span className="px-2 py-0.5 text-xs bg-pink-900/50 text-pink-400 rounded">
                    +{(vol.technologies?.length ?? 0) - 3}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

interface VolunteerDisplayServerProps {
  searchParams?: Promise<{ volunteerPage?: string }>;
}

export async function VolunteerDisplayServer({
  searchParams,
}: VolunteerDisplayServerProps) {
  const params = await searchParams;
  const page = Number(params?.volunteerPage) || 1;

  const response = await volunteerAPI.getAllVolunteers(
    page,
    VOLUNTEERS_PER_PAGE,
  );

  if (!response.data) {
    throw new Error("Failed to load volunteer experiences");
  }

  const volunteers = sortByOrder(response.data.volunteer_experiences || []);
  const totalPages = response.data.total_pages || 1;
  const hasNext = response.data.has_next || false;
  const hasPrevious = response.data.has_previous || false;

  const headerContent = (
    <SectionHeader
      title="Volunteer Experience"
      description="Making a difference through community service and meaningful contributions"
      theme="pink"
    >
      <PaginationLinks
        currentPage={page}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        baseHref="/#volunteer"
        theme="pink"
        viewAllHref="/volunteer"
      />
    </SectionHeader>
  );

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
      <ContentGrid columns={2}>
        {volunteers.map((volunteer, index) => {
          const volId = volunteer.inline?.id || volunteer._id || `vol-${index}`;
          return (
            <VolunteerCard key={volId} volunteer={volunteer} index={index} />
          );
        })}
      </ContentGrid>
    </SectionWrapper>
  );
}
