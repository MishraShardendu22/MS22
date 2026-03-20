import Image from "next/image";
import Link from "next/link";
import { PaginationLinks } from "@/component/Pagination";
import {
  ContentGrid,
  SectionHeader,
  SectionWrapper,
} from "@/component/Section";
import { UnifiedCard } from "@/component/UnifiedCard";
import { experiencesAPI } from "@/static/api/api.request";
import type { Experience } from "@/static/api/api.types";
import { EXPERIENCES_PER_PAGE } from "@/static/pagination";
import { formatDate } from "@/utils/formatDate";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const latestPosition = experience.experience_time_line?.[0];
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

// Mobile-optimized server component
export async function ExperiencesDisplayMobile() {
  let experiences: Experience[] = [];

  try {
    const response = await experiencesAPI.getAllExperiences(1, 2);
    experiences = response.data?.experiences || [];
  } catch (error) {
    console.error("Error loading mobile experiences:", error);
    // Fallback to empty state when backend is rate-limited or unavailable.
  }

  if (experiences.length === 0) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Experience</h2>
        <p className="text-gray-400 text-sm">No experiences available</p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-400">Experience</h2>
        <Link
          href="/experiences"
          className="text-sm text-gray-400 hover:text-blue-400"
        >
          View All →
        </Link>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        My professional journey and career milestones
      </p>
      <div className="space-y-4">
        {experiences.map((experience) => {
          const latestPosition = experience.experience_time_line?.[0];
          const startDate = formatDate(latestPosition?.start_date);
          const endDate = latestPosition?.end_date
            ? formatDate(latestPosition.end_date)
            : "Present";

          return (
            <div
              key={experience.inline?.id}
              className="bg-gray-900/80 border border-gray-800 rounded-xl p-4"
            >
              <div className="flex items-start gap-3 mb-3">
                {experience.company_logo && (
                  <Image
                    src={experience.company_logo}
                    alt={experience.company_name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-lg object-contain bg-white/5 p-1"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-white line-clamp-1">
                    {latestPosition?.position || "Position"}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {experience.company_name}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                {startDate} - {endDate}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2">
                {experience.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {experience.technologies?.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {(experience.technologies?.length ?? 0) > 3 && (
                  <span className="px-2 py-0.5 text-xs bg-blue-900/50 text-blue-400 rounded">
                    +{(experience.technologies?.length ?? 0) - 3}
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

interface ExperiencesDisplayServerProps {
  searchParams?: Promise<{ experiencesPage?: string }>;
}

export async function ExperiencesDisplayServer({
  searchParams,
}: ExperiencesDisplayServerProps) {
  const params = await searchParams;
  const page = Number(params?.experiencesPage) || 1;

  let experiences: Experience[] = [];
  let totalPages = 1;
  let hasNext = false;
  let hasPrevious = false;

  try {
    const response = await experiencesAPI.getAllExperiences(
      page,
      EXPERIENCES_PER_PAGE,
    );
    experiences = response.data?.experiences || [];
    totalPages = response.data?.total_pages || 1;
    hasNext = response.data?.has_next || false;
    hasPrevious = response.data?.has_previous || false;
  } catch (error) {
    console.error("Error loading experiences:", error);
    // Fallback to empty state when backend is rate-limited or unavailable.
  }

  const headerContent = (
    <SectionHeader
      title="Professional Experience"
      description="My journey through various roles and companies that shaped my professional career"
      theme="blue"
    >
      <PaginationLinks
        currentPage={page}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        baseHref="/#experience"
        theme="blue"
        viewAllHref="/experiences"
        pageParam="experiencesPage"
      />
    </SectionHeader>
  );

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
      <ContentGrid columns={2}>
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.inline?.id ?? String(index)}
            experience={experience}
            index={index}
          />
        ))}
      </ContentGrid>
    </SectionWrapper>
  );
}
