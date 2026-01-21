import type { Metadata } from "next";
import { Suspense } from "react";
import { CertificatesFilterClient } from "@/component/Certificates";
import { LoadingState } from "@/component/Loading";
import { Sidebar } from "@/component/Sidebar";
import { generatePageMetadata } from "@/lib/metadata";
import { certificatesAPI } from "@/static/api/api.request";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: "Certifications & Achievements",
  description:
    "Professional certifications, technical credentials, and achievements in software development. View my verified skills and qualifications in programming, cloud technologies, and software engineering.",
  path: "/certificates",
  keywords: [
    "certifications",
    "achievements",
    "professional credentials",
    "technical certifications",
    "developer certifications",
    "programming certificates",
    "cloud certifications",
    "verified skills",
  ],
});

const ITEMS_PER_PAGE = 8;

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    skills?: string;
  }>;
}

async function CertificatesContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(params.page || "1", 10));
  const searchQuery = params.search || "";
  const selectedSkills = params.skills ? params.skills.split(",") : [];

  let certificates: import("@/static/api/api.types").Certificate[] = [];
  let totalPages = 1;
  let total = 0;
  let allSkills: string[] = [];

  try {
    // Fetch paginated data from server
    const response = await certificatesAPI.getAllCertificates(
      currentPage,
      ITEMS_PER_PAGE,
    );
    if (response.status === 200 && response.data) {
      certificates = response.data.certifications || [];
      totalPages = response.data.total_pages || 1;
      total = response.data.total || 0;
    }

    // Fetch all for skills extraction (cached separately)
    const allResponse = await certificatesAPI.getAllCertificates(1, 500);
    if (allResponse.status === 200 && allResponse.data) {
      const skillsSet = new Set<string>();
      for (const cert of allResponse.data.certifications || []) {
        for (const skill of cert.skills ?? []) {
          skillsSet.add(skill);
        }
      }
      allSkills = Array.from(skillsSet).sort();
    }
  } catch (error) {
    console.error("Error fetching certificates:", error);
  }

  return (
    <CertificatesFilterClient
      certificates={certificates}
      currentPage={currentPage}
      totalPages={totalPages}
      total={total}
      allSkills={allSkills}
      searchQuery={searchQuery}
      selectedSkills={selectedSkills}
    />
  );
}

export default async function CertificatesPage({ searchParams }: PageProps) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Subtle Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500/8 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/8 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-6 relative z-10 max-w-400">
          <Suspense
            fallback={
              <LoadingState
                message="Loading certifications..."
                variant="cyan"
              />
            }
          >
            <CertificatesContent searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
