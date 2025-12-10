"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingState } from "@/component/Loading";
import { UnifiedCard } from "@/component/UnifiedCard";
import { experiencesAPI } from "@/static/api/api.request";
import type { Experience } from "@/static/api/api.types";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

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

export const ExperiencesDisplay = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalExperiences, setTotalExperiences] = useState(0);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const experiencesPerPage = 2;

  const fetchExperiences = async (page: number) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setPaginationLoading(true);
      }
      setError(null);

      const response = await experiencesAPI.getAllExperiences(
        page,
        experiencesPerPage,
      );

      if (response.status === 200 && response.data) {
        setExperiences(response.data.experiences);
        setTotalExperiences(
          response.data.total || response.data.experiences.length,
        );
      } else {
        setExperiences([]);
        setTotalExperiences(0);
      }
    } catch (err) {
      console.error("Error fetching experiences:", err);
      setError("Failed to load experiences. Please try again later.");
      setExperiences([]);
      setTotalExperiences(0);
    } finally {
      setLoading(false);
      setPaginationLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalExperiences / experiencesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading)
    return (
      <section className="relative py-8 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
              Professional Experience
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              My journey through various roles and companies that shaped my
              professional career
            </p>
          </div>
          <div className="py-8">
            <LoadingState message="Loading experiences..." variant="purple" />
          </div>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="relative py-8 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
              Professional Experience
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              My journey through various roles and companies that shaped my
              professional career
            </p>
          </div>
          <div className="py-8">
            <ErrorState
              title="Error Loading Experiences"
              message={error}
              variant="red"
              onRetry={() => fetchExperiences(currentPage)}
            />
          </div>
        </div>
      </section>
    );

  if (experiences.length === 0)
    return (
      <section className="relative py-8 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
              Professional Experience
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              My journey through various roles and companies that shaped my
              professional career
            </p>
          </div>
          <div className="py-12 flex items-center justify-center">
            <p className="text-lg text-gray-400">
              No professional experiences available to display
            </p>
          </div>
        </div>
      </section>
    );

  return (
    <section className="relative py-8 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Professional Experience
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            My journey through various roles and companies that shaped my
            professional career
          </p>
        </div>

        <div className="mb-6 min-h-[300px] relative">
          <div
            className={`min-h-[300px] flex items-center justify-center absolute inset-0 transition-opacity duration-300 ${paginationLoading ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}`}
          >
            <LoadingState message="Loading experiences..." variant="purple" />
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${paginationLoading ? "opacity-0" : "opacity-100"}`}
          >
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`${experience._id}-${index}`}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1 || paginationLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-blue-500/30 text-gray-400 hover:text-blue-400 transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Previous</span>
            </button>

            <span className="text-gray-400 text-sm font-medium px-2">
              Page{" "}
              <span className="text-blue-400 font-bold">{currentPage}</span> of{" "}
              <span className="text-blue-400 font-bold">{totalPages}</span>
            </span>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || paginationLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-blue-500/30 text-gray-400 hover:text-blue-400 transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="text-sm font-medium">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
