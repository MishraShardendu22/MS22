"use client";

import { CheckCircle2, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingState } from "@/component/Loading";
import { UnifiedCard } from "@/component/UnifiedCard";
import { certificatesAPI } from "@/static/api/api.request";
import type { Certificate } from "@/static/api/api.types";

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

export const CertificateCard = ({
  certificate,
  index,
}: CertificateCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const issueDate = formatDate(certificate.issue_date);

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
          <span>Expires {formatDate(certificate.expiry_date)}</span>
        </>
      ) : (
        <>
          <span>•</span>
          <span className="text-emerald-400 font-medium">No Expiration</span>
        </>
      )}
    </>
  );

  // Combine credential ID with description
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

export const CertificatesDisplay = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const certificatesPerPage = 4;

  const fetchCertificates = async (page: number) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setPaginationLoading(true);
      }
      setError(null);

      const response = await certificatesAPI.getAllCertificates(
        page,
        certificatesPerPage,
      );

      if (response.status === 200 && response.data) {
        const certs = response.data.certifications || [];
        // Sort by order if available, otherwise maintain API order
        const sortedCertificates = certs.sort((a, b) => {
          const orderA = a.order ?? 999;
          const orderB = b.order ?? 999;
          return orderA - orderB;
        });
        setCertificates(sortedCertificates);
        setTotalCertificates(response.data.total || sortedCertificates.length);
      } else {
        setCertificates([]);
        setTotalCertificates(0);
      }
    } catch (err) {
      console.error("Error fetching certificates:", err);
      setError("Failed to load certificates. Please try again later.");
      setCertificates([]);
      setTotalCertificates(0);
    } finally {
      setLoading(false);
      setPaginationLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalCertificates / certificatesPerPage);

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
      <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-4">
              Certifications
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              Professional certifications and achievements demonstrating
              expertise and continuous learning
            </p>
          </div>
          <div className="py-8">
            <LoadingState message="Loading certificates..." variant="cyan" />
          </div>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-4">
              Certifications
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              Professional certifications and achievements demonstrating
              expertise and continuous learning
            </p>
          </div>
          <div className="py-8">
            <ErrorState
              title="Error Loading Certificates"
              message={error}
              variant="red"
              onRetry={() => fetchCertificates(currentPage)}
            />
          </div>
        </div>
      </section>
    );

  if (certificates.length === 0)
    return (
      <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-4">
              Certifications
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              Professional certifications and achievements demonstrating
              expertise and continuous learning
            </p>
          </div>
          <div className="py-12 flex items-center justify-center">
            <p className="text-lg text-gray-400">
              No certifications available to display
            </p>
          </div>
        </div>
      </section>
    );

  return (
    <section className="relative py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
                  Certifications
                </h2>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap shrink-0">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1 || paginationLoading}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-emerald-500/30 text-gray-400 hover:text-emerald-400 transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-xs font-medium">Previous</span>
                </button>

                <span className="text-gray-400 text-xs font-medium px-2">
                  Page{" "}
                  <span className="text-emerald-400 font-bold">{currentPage}</span>{" "}
                  of{" "}
                  <span className="text-emerald-400 font-bold">{totalPages}</span>
                </span>

                <Link
                  href="/certificates"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-emerald-500/30 text-gray-400 hover:text-emerald-400 transition-colors duration-500"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-xs font-medium">View All</span>
                </Link>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages || paginationLoading}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-emerald-500/30 text-gray-400 hover:text-emerald-400 transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="text-xs font-medium">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
            </div>
            <p className="text-gray-400 text-base md:text-lg text-center lg:text-left max-w-3xl">
              Professional certifications and achievements demonstrating expertise
              and continuous learning
            </p>
          </div>
        </div>

        <div className="mb-6 min-h-[300px] relative">
          <div
            className={`min-h-[300px] flex items-center justify-center absolute inset-0 transition-opacity duration-300 ${paginationLoading ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}`}
          >
            <LoadingState message="Loading certificates..." variant="emerald" />
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${paginationLoading ? "opacity-0" : "opacity-100"}`}
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
          </div>
        </div>
      </div>
    </section>
  );
};
