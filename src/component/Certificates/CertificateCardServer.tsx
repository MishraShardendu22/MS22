import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PaginationLinks } from "@/component/Pagination";
import {
  ContentGrid,
  SectionHeader,
  SectionWrapper,
} from "@/component/Section";
import { UnifiedCard } from "@/component/UnifiedCard";
import { certificatesAPI } from "@/static/api/api.request";
import type { Certificate } from "@/static/api/api.types";
import { formatDate } from "@/utils/formatDate";

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

export const CertificateCard = ({
  certificate,
  index,
}: CertificateCardProps) => {
  const issueDate = formatDate(certificate.issue_date, { fallback: "" });

  const badges = [];
  if (certificate.verified) {
    badges.push({
      label: "Verified",
      icon: <CheckCircle2 className="w-3 h-3" />,
    });
  }

  const extraInfo = (
    <>
      {certificate.expiry_date ? (
        <>
          <span>•</span>
          <span>
            Expires {formatDate(certificate.expiry_date, { fallback: "" })}
          </span>
        </>
      ) : (
        <>
          <span>•</span>
          <span className="text-emerald-400 font-medium">No Expiration</span>
        </>
      )}
    </>
  );

  const fullDescription = certificate.credential_id
    ? `${certificate.description || ""}\n\nCredential ID: ${certificate.credential_id}`.trim()
    : certificate.description;

  return (
    <UnifiedCard
      index={index}
      theme="emerald"
      title={certificate.title}
      subtitle={certificate.issuer}
      startDate={`Issued ${issueDate}`}
      description={fullDescription}
      technologies={certificate.skills}
      certificateUrl={certificate.certificate_url}
      certificateLabel="Certificate"
      badges={badges}
      extraInfo={extraInfo}
    />
  );
};

const CERTIFICATES_PER_PAGE = 4;

const sortByOrder = (items: Certificate[]) =>
  [...items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

// Mobile-optimized server component
export async function CertificatesDisplayMobile() {
  const response = await certificatesAPI.getAllCertificates(1, 4);
  const certificates = sortByOrder(response.data?.certifications || []);

  if (certificates.length === 0) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">
          Certifications
        </h2>
        <p className="text-gray-400 text-sm">No certificates available</p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-emerald-400">Certifications</h2>
        <Link
          href="/certificates"
          className="text-sm text-gray-400 hover:text-emerald-400"
        >
          View All →
        </Link>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        Professional certifications and credentials
      </p>
      <div className="space-y-4">
        {certificates.map((cert) => {
          const issueDate = formatDate(cert.issue_date, { fallback: "" });

          return (
            <div
              key={cert._id}
              className="bg-gray-900/80 border border-gray-800 rounded-xl p-4"
            >
              <h3 className="text-base font-bold text-white mb-1 line-clamp-1">
                {cert.title}
              </h3>
              <p className="text-sm text-gray-400 mb-2">{cert.issuer}</p>
              <p className="text-xs text-gray-500 mb-2">Issued {issueDate}</p>
              {cert.description && (
                <p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2">
                  {cert.description}
                </p>
              )}
              <div className="flex flex-wrap gap-1">
                {cert.skills?.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded"
                  >
                    {skill}
                  </span>
                ))}
                {(cert.skills?.length ?? 0) > 3 && (
                  <span className="px-2 py-0.5 text-xs bg-emerald-900/50 text-emerald-400 rounded">
                    +{(cert.skills?.length ?? 0) - 3}
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

interface CertificatesDisplayServerProps {
  searchParams?: Promise<{ certificatesPage?: string }>;
}

export async function CertificatesDisplayServer({
  searchParams,
}: CertificatesDisplayServerProps) {
  const params = await searchParams;
  const page = Number(params?.certificatesPage) || 1;

  const response = await certificatesAPI.getAllCertificates(
    page,
    CERTIFICATES_PER_PAGE,
  );

  if (!response.data) {
    throw new Error("Failed to load certificates");
  }

  const certificates = sortByOrder(response.data.certifications || []);
  const totalPages = response.data.total_pages || 1;
  const hasNext = response.data.has_next || false;
  const hasPrevious = response.data.has_previous || false;

  const headerContent = (
    <SectionHeader
      title="Certifications"
      description="Professional certifications and achievements demonstrating expertise and continuous learning"
      theme="emerald"
    >
      <PaginationLinks
        currentPage={page}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        baseHref="/#certifications"
        theme="emerald"
        viewAllHref="/certificates"
      />
    </SectionHeader>
  );

  if (certificates.length === 0) {
    return (
      <SectionWrapper theme="emerald">
        {headerContent}
        <div className="py-12 flex items-center justify-center">
          <p className="text-lg text-gray-400">
            No certifications available to display
          </p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper theme="emerald">
      {headerContent}
      <ContentGrid columns={2}>
        {certificates.map((certificate, index) => {
          const certId =
            certificate.inline?.id || certificate._id || `cert-${index}`;
          return (
            <CertificateCard
              key={certId}
              certificate={certificate}
              index={index}
            />
          );
        })}
      </ContentGrid>
    </SectionWrapper>
  );
}
