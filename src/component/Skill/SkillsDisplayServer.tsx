import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { skillsAPI } from "@/static/api/api.request";

interface SkillsDisplayProps {
  searchParams?: Promise<{ page?: string }>;
}

const SKILLS_PER_PAGE = 15;

async function SkillsDisplayMobileServer({
  page,
  skills,
  hasNext,
  totalPages,
  hasPrevious,
}: {
  page: number;
  skills: string[];
  hasNext: boolean;
  totalPages: number;
  hasPrevious: boolean;
}) {
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
              {hasPrevious ? (
                <Link
                  href={`?page=${page - 1}#skills`}
                  scroll={false}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 text-xs hover:border-cyan-500/30 hover:text-cyan-400 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </Link>
              ) : (
                <span className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 text-xs opacity-30">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </span>
              )}
              <span className="text-gray-400 text-xs">
                <span className="text-cyan-400">{page}</span>/{totalPages}
              </span>
              {hasNext ? (
                <Link
                  href={`?page=${page + 1}#skills`}
                  scroll={false}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 text-xs hover:border-cyan-500/30 hover:text-cyan-400 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <span className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 text-xs opacity-30">
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
          )}
        </div>

        {/* Skills Grid */}
        <div className="mb-4">
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
        </div>
      </div>
    </section>
  );
}

export async function SkillsDisplayMobile({
  searchParams,
}: SkillsDisplayProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  const response = await skillsAPI.getSkills(page, SKILLS_PER_PAGE);
  const skills = response.data?.skills || [];
  const totalPages = response.data?.total_pages || 1;
  const hasNext = response.data?.has_next || false;
  const hasPrevious = response.data?.has_previous || false;

  return (
    <SkillsDisplayMobileServer
      page={page}
      skills={skills}
      totalPages={totalPages}
      hasNext={hasNext}
      hasPrevious={hasPrevious}
    />
  );
}

export default async function SkillsDisplay({
  searchParams,
}: SkillsDisplayProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  const response = await skillsAPI.getSkills(page, SKILLS_PER_PAGE);

  if (!response.data) {
    throw new Error("Failed to load skills");
  }

  const { skills, total_pages, has_next, has_previous } = response.data;

  return (
    <section className="relative py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      {/* Background Effects - Optimized for performance */}
      <div className="absolute inset-0 pointer-events-none will-change-auto">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-80 md:h-80 bg-cyan-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-80 md:h-80 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f06_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f06_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
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
              {total_pages > 1 && (
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 flex-wrap shrink-0">
                  {has_previous ? (
                    <Link
                      href={`?page=${page - 1}#skills`}
                      scroll={false}
                      className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-2.5 md:px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="font-medium hidden sm:inline">
                        Previous
                      </span>
                      <span className="font-medium sm:hidden">Prev</span>
                    </Link>
                  ) : (
                    <span className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-2.5 md:px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 text-gray-400 opacity-30 cursor-not-allowed text-xs">
                      <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="font-medium hidden sm:inline">
                        Previous
                      </span>
                      <span className="font-medium sm:hidden">Prev</span>
                    </span>
                  )}

                  <span className="text-gray-400 text-xs font-medium px-1 sm:px-2">
                    <span className="hidden sm:inline">Page </span>
                    <span className="text-cyan-400 font-bold">{page}</span>
                    <span className="hidden sm:inline"> of </span>
                    <span className="sm:hidden">/</span>
                    <span className="text-cyan-400 font-bold">
                      {total_pages}
                    </span>
                  </span>

                  {has_next ? (
                    <Link
                      href={`?page=${page + 1}#skills`}
                      scroll={false}
                      className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-2.5 md:px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-xs"
                    >
                      <span className="font-medium">Next</span>
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  ) : (
                    <span className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-2.5 md:px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 text-gray-400 opacity-30 cursor-not-allowed text-xs">
                      <span className="font-medium">Next</span>
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  )}
                </div>
              )}
            </div>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg text-center lg:text-left max-w-3xl px-4 lg:px-0">
              Technologies and tools I work with to build innovative solutions
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-4 md:mb-6">
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
        </div>
      </div>
    </section>
  );
}
