"use client";

import { CheckCircle2 } from "lucide-react";
import { useMemo } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingState } from "@/component/Loading";
import { PaginationControls } from "@/component/Pagination";
import { ContentGrid, SectionHeader, SectionWrapper } from "@/component/Section";
import { UnifiedCard } from "@/component/UnifiedCard";
import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
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
          <span>Expires {formatDate(certificate.expiry_date, { fallback: "" })}</span>
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

export const CertificatesDisplay = () => {
  const {
    items: certificates,
    loading,
    paginationLoading,
    error,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    retry,
  } = usePaginatedFetch<Certificate>({
    fetchFn: certificatesAPI.getAllCertificates,
    itemsPerPage: CERTIFICATES_PER_PAGE,
    dataKey: "certifications",
    transform: sortByOrder,
  });

  const sectionContent = useMemo(() => {
    const headerContent = (
      <SectionHeader
        title="Certifications"
        description="Professional certifications and achievements demonstrating expertise and continuous learning"
        theme="emerald"
      >
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={goToPrevPage}
          onNextPage={goToNextPage}
          isLoading={paginationLoading}
          theme="emerald"
          viewAllHref="/certificates"
        />
      </SectionHeader>
    );

    if (loading) {
      return (
        <SectionWrapper theme="emerald">
          {headerContent}
          <div className="py-8">
            <LoadingState message="Loading certificates..." variant="cyan" />
          </div>
        </SectionWrapper>
      );
    }

    if (error) {
      return (
        <SectionWrapper theme="emerald">
          {headerContent}
          <div className="py-8">
            <ErrorState
              title="Error Loading Certificates"
              message={error}
              variant="red"
              onRetry={retry}
            />
          </div>
        </SectionWrapper>
      );
    }

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
        <ContentGrid
          isLoading={paginationLoading}
          loadingMessage="Loading certificates..."
          loadingVariant="emerald"
          columns={2}
        >
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
  }, [
    certificates,
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
