import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingState } from "@/component/Loading";
import { EmptyState, ListCard, ServerPageHeader } from "@/component/Section";
import { generatePageMetadata } from "@/lib/metadata";
import { certificatesAPI } from "@/static/api/api.request";
import type { Certificate } from "@/static/api/api.types";

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
    filter?: string;
  }>;
}

async function CertificatesContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(params.page || "1", 10));

  let certificates: Certificate[] = [];
  let totalPages = 1;
  let total = 0;

  try {
    // Fetch all certificates for pagination
    const allResponse = await certificatesAPI.getAllCertificates(1, 500);
    if (allResponse.status === 200 && allResponse.data) {
      const allCertificates = allResponse.data?.certifications || [];

      // Calculate pagination
      total = allCertificates.length;
      totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

      // Get current page slice
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      certificates = allCertificates.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE,
      );
    }
  } catch (error) {
    console.error("Error fetching certificates:", error);
  }

  return (
    <div className="w-full relative z-10">
      {/* Server-rendered Header with Link-based pagination */}
      <ServerPageHeader
        title="Certifications & Awards"
        theme="purple"
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/certificates"
        resultCount={total}
        resultLabel="certifications"
      />

      {/* Certificates Grid */}
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
          description="No certifications available at the moment"
          theme="purple"
        />
      )}
    </div>
  );
}

export default async function CertificatesPage({ searchParams }: PageProps) {
  return (
    <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500/8 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/8 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10 max-w-400">
        <Suspense
          fallback={
            <LoadingState message="Loading certifications..." variant="cyan" />
          }
        >
          <CertificatesContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
