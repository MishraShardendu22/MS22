import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingState } from "@/component/Loading";
import { Sidebar } from "@/component/Sidebar";
import { VolunteerFilterClient } from "@/component/Volunteer";
import { generatePageMetadata } from "@/lib/metadata";
import { volunteerAPI } from "@/static/api/api.request";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: "Volunteer Experience",
  description:
    "Community involvement and volunteer work. Discover my contributions to open-source projects, tech communities, and social initiatives. Making a positive impact through technology.",
  path: "/volunteer",
  keywords: [
    "volunteer work",
    "community service",
    "open source contributions",
    "tech community",
    "social impact",
    "community involvement",
    "volunteer experience",
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

async function VolunteerContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(params.page || "1", 10));
  const searchQuery = params.search || "";
  const selectedTechs = params.techs ? params.techs.split(",") : [];

  let volunteers: import("@/static/api/api.types").Volunteer[] = [];
  let totalPages = 1;
  let total = 0;
  let allTechnologies: string[] = [];

  try {
    const response = await volunteerAPI.getAllVolunteers(
      currentPage,
      ITEMS_PER_PAGE,
    );
    if (response.status === 200 && response.data) {
      volunteers = response.data.volunteer_experiences || [];
      totalPages = response.data.total_pages || 1;
      total = response.data.total || 0;
    }

    // Fetch all for tech extraction (cached)
    const allResponse = await volunteerAPI.getAllVolunteers(1, 500);
    if (allResponse.status === 200 && allResponse.data) {
      const techsSet = new Set<string>();
      for (const vol of allResponse.data.volunteer_experiences || []) {
        for (const tech of vol.technologies ?? []) {
          techsSet.add(tech);
        }
      }
      allTechnologies = Array.from(techsSet).sort();
    }
  } catch (error) {
    console.error("Error fetching volunteers:", error);
  }

  return (
    <VolunteerFilterClient
      volunteers={volunteers}
      currentPage={currentPage}
      totalPages={totalPages}
      total={total}
      allTechnologies={allTechnologies}
      searchQuery={searchQuery}
      selectedTechs={selectedTechs}
    />
  );
}

export default async function VolunteerPage({ searchParams }: PageProps) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Subtle Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-pink-500/8 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/8 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-6 relative z-10 max-w-400">
          <Suspense
            fallback={
              <LoadingState
                message="Loading volunteer experiences..."
                variant="pink"
              />
            }
          >
            <VolunteerContent searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
