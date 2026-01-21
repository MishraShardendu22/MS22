import type { Metadata } from "next";
import { Suspense } from "react";
import { ExperiencesFilterClient } from "@/component/Experience";
import { LoadingState } from "@/component/Loading";
import { Sidebar } from "@/component/Sidebar";
import { generatePageMetadata } from "@/lib/metadata";
import { experiencesAPI } from "@/static/api/api.request";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: "Work Experience",
  description:
    "Professional work experience as a Software Developer and Engineer. Explore my career journey, roles, responsibilities, and technical achievements in software development.",
  path: "/experiences",
  keywords: [
    "work experience",
    "professional experience",
    "software engineer experience",
    "developer career",
    "employment history",
    "professional journey",
    "tech career",
  ],
});

const ITEMS_PER_PAGE = 8;

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    techs?: string;
  }>;
}

async function ExperiencesContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(params.page || "1", 10));
  const searchQuery = params.search || "";
  const selectedTechs = params.techs ? params.techs.split(",") : [];

  let experiences: import("@/static/api/api.types").Experience[] = [];
  let totalPages = 1;
  let total = 0;
  let allTechnologies: string[] = [];

  try {
    const response = await experiencesAPI.getAllExperiences(
      currentPage,
      ITEMS_PER_PAGE,
    );
    if (response.status === 200 && response.data) {
      experiences = response.data.experiences || [];
      totalPages = response.data.total_pages || 1;
      total = response.data.total || 0;
    }

    // Fetch all for tech extraction (cached)
    const allResponse = await experiencesAPI.getAllExperiences(1, 500);
    if (allResponse.status === 200 && allResponse.data) {
      const techsSet = new Set<string>();
      for (const exp of allResponse.data.experiences || []) {
        for (const tech of exp.technologies ?? []) {
          techsSet.add(tech);
        }
      }
      allTechnologies = Array.from(techsSet).sort();
    }
  } catch (error) {
    console.error("Error fetching experiences:", error);
  }

  return (
    <ExperiencesFilterClient
      experiences={experiences}
      currentPage={currentPage}
      totalPages={totalPages}
      total={total}
      allTechnologies={allTechnologies}
      searchQuery={searchQuery}
      selectedTechs={selectedTechs}
    />
  );
}

export default async function ExperiencesPage({ searchParams }: PageProps) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Subtle Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500/8 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/8 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-6 relative z-10 max-w-[1600px]">
          <Suspense
            fallback={
              <LoadingState message="Loading experiences..." variant="blue" />
            }
          >
            <ExperiencesContent searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
