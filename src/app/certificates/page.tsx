"use client";

import {
  ArrowUpRight,
  Award,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  Search,
  Shield,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingState } from "@/component/Loading";
import { Sidebar } from "@/component/Sidebar";
import { certificatesAPI } from "@/static/api/api.request";
import type { Certificate } from "@/static/api/api.types";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const limit = 9;

  useEffect(() => {
    fetchCertificates();
  }, [currentPage]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await certificatesAPI.getAllCertificates(
        currentPage,
        limit,
      );

      if (response.status === 200 && response.data) {
        const certificatesData = response.data.certifications || [];
        setCertificates(certificatesData);
        setTotalPages(response.data.total_pages || 1);
      } else {
        throw new Error(response.message || "Failed to fetch certificates");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    certificates.forEach((cert) => {
      cert.skills?.forEach((skill) => skillsSet.add(skill));
    });
    return Array.from(skillsSet).sort();
  }, [certificates]);

  const filteredCertificates = useMemo(() => {
    const filtered = certificates.filter((cert) => {
      const matchesSearch =
        searchQuery === "" ||
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.credential_id?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.every((skill) => cert.skills?.includes(skill));

      return matchesSearch && matchesSkills;
    });

    if (searchQuery || selectedSkills.length > 0) {
      setCurrentPage(1);
    }

    return filtered;
  }, [certificates, searchQuery, selectedSkills]);

  const paginatedCertificates = useMemo(() => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredCertificates.slice(startIndex, endIndex);
  }, [filteredCertificates, currentPage, limit]);

  const totalFilteredPages = Math.ceil(filteredCertificates.length / limit);

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
  };

  if (loading && certificates.length === 0) {
    return <LoadingState />;
  }

  if (error && certificates.length === 0) {
    return <ErrorState message={error} />;
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Header */}
        <div className="relative border-b border-gray-800/50 z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 py-20 md:py-28 relative">
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-semibold mb-8 backdrop-blur-sm animate-fadeIn">
                <Award className="w-4 h-4" />
                <span>Professional Credentials</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight animate-fadeInUp">
                Certifications &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
                  Awards
                </span>
              </h1>
              <p className="text-gray-400 text-xl md:text-2xl max-w-3xl leading-relaxed animate-fadeInUp animation-delay-200">
                Verified certifications and professional credentials from
                leading technology organizations
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-7xl mx-auto mb-10 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="flex-1 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, issuer, or credential ID..."
                    className="w-full pl-14 pr-5 py-4 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:bg-gray-900 transition-all shadow-lg shadow-black/20"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-all shadow-lg relative group ${
                  showFilters || selectedSkills.length > 0
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 shadow-cyan-500/20"
                    : "bg-gray-900/80 backdrop-blur-xl text-gray-400 border border-gray-800/50 hover:border-gray-700 hover:text-gray-300 shadow-black/20"
                }`}
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                {selectedSkills.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 text-xs font-bold bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full shadow-lg shadow-cyan-500/50 animate-pulse">
                    {selectedSkills.length}
                  </span>
                )}
              </button>
              {(searchQuery || selectedSkills.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/40 hover:from-red-500/30 hover:to-pink-500/30 transition-all shadow-lg shadow-red-500/20"
                >
                  <X className="w-5 h-5" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {showFilters && allSkills.length > 0 && (
              <div className="relative group animate-fadeIn">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-50" />
                <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl space-y-5 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
                      <Filter className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      Filter by Skill
                    </h3>
                    <div className="ml-auto text-sm text-gray-500">
                      {allSkills.length} available
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {allSkills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleSkillFilter(skill)}
                        className={`group/skill relative px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                          selectedSkills.includes(skill)
                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/20 scale-105"
                            : "bg-gray-800/50 text-gray-400 border-2 border-gray-700/50 hover:border-gray-600 hover:text-gray-300 hover:scale-105 hover:bg-gray-800/70"
                        }`}
                      >
                        {selectedSkills.includes(skill) && (
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl animate-pulse" />
                        )}
                        <span className="relative">{skill}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-3 px-5 py-3 bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="text-gray-400">Showing</span>
                  <span className="text-cyan-400 font-bold text-lg">
                    {filteredCertificates.length}
                  </span>
                  <span className="text-gray-400">of</span>
                  <span className="text-white font-bold text-lg">
                    {certificates.length}
                  </span>
                  <span className="text-gray-400">certificates</span>
                </div>
              </div>
              {selectedSkills.length > 0 && (
                <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl">
                  <Filter className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 font-semibold">
                    Filtered by {selectedSkills.length}{" "}
                    {selectedSkills.length !== 1 ? "skills" : "skill"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {filteredCertificates.length === 0 ? (
            <div className="max-w-7xl mx-auto text-center py-32">
              <div className="relative inline-flex mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-gray-800/50">
                  <Award className="w-16 h-16 text-gray-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                No certificates found
              </h3>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                Try adjusting your search terms or filters
              </p>
              {(searchQuery || selectedSkills.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border-2 border-cyan-500/30 rounded-xl hover:from-cyan-500/20 hover:to-blue-500/20 transition-all font-semibold shadow-lg shadow-cyan-500/10"
                >
                  <X className="w-5 h-5" />
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
              {paginatedCertificates.map((certificate, index) => (
                <CertificateCard
                  key={certificate._id || certificate.inline?.id || index}
                  certificate={certificate}
                  index={index}
                />
              ))}
            </div>
          )}

          {filteredCertificates.length > 0 && totalFilteredPages > 1 && (
            <div className="max-w-7xl mx-auto mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="group flex items-center gap-2 px-6 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:border-cyan-500/40 hover:text-cyan-400 transition-all shadow-lg disabled:hover:border-gray-800/50 disabled:hover:text-gray-400"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold">Previous</span>
              </button>

              <div className="flex gap-3 flex-wrap justify-center">
                {Array.from(
                  { length: Math.min(totalFilteredPages, 7) },
                  (_, i) => {
                    let page;
                    if (totalFilteredPages <= 7) {
                      page = i + 1;
                    } else if (currentPage <= 4) {
                      page = i + 1;
                    } else if (currentPage >= totalFilteredPages - 3) {
                      page = totalFilteredPages - 6 + i;
                    } else {
                      page = currentPage - 3 + i;
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative min-w-12 px-5 py-3 rounded-xl font-bold transition-all shadow-lg ${
                          currentPage === page
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white scale-110 shadow-cyan-500/50"
                            : "bg-gray-900/80 backdrop-blur-xl text-gray-400 border border-gray-800/50 hover:border-gray-700 hover:text-gray-300 hover:scale-105"
                        }`}
                      >
                        {currentPage === page && (
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-50 animate-pulse" />
                        )}
                        <span className="relative">{page}</span>
                      </button>
                    );
                  },
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(totalFilteredPages, prev + 1),
                  )
                }
                disabled={currentPage === totalFilteredPages}
                className="group flex items-center gap-2 px-6 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:border-cyan-500/40 hover:text-cyan-400 transition-all shadow-lg disabled:hover:border-gray-800/50 disabled:hover:text-gray-400"
              >
                <span className="font-semibold">Next</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>

        <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animation-delay-200 { animation-delay: 0.2s; animation-fill-mode: both; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
      `}</style>
      </main>
    </>
  );
}

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

function CertificateCard({ certificate, index }: CertificateCardProps) {
  const certificateId = certificate._id || certificate.inline?.id || "";

  return (
    <Link href={`/certificates/${certificateId}`}>
      <div
        className="group relative h-full"
        style={{ animation: `cardFadeIn 0.6s ease-out ${index * 0.08}s both` }}
      >
        <style jsx>{`
          @keyframes cardFadeIn {
            from { opacity: 0; transform: translateY(40px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />

        <div className="relative h-full bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-blue-500/5 group-hover:to-purple-500/10 transition-all duration-500" />

          <div className="relative p-7 flex flex-col h-full">
            <div className="mb-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-cyan-400" />
                    {certificate.verified && (
                      <Shield className="w-4 h-4 text-green-400" />
                    )}
                    <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
                      {certificate.title}
                    </h3>
                  </div>
                  <p className="text-cyan-400 text-sm font-semibold mb-2">
                    {certificate.issuer}
                  </p>
                </div>
                <div className="shrink-0 p-2 bg-gray-800/50 rounded-lg group-hover:bg-gradient-to-br group-hover:from-cyan-500/20 group-hover:to-blue-500/20 border border-gray-700/50 group-hover:border-cyan-500/40 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>

              {certificate.description && (
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors mb-4">
                  {certificate.description}
                </p>
              )}
            </div>

            <div className="flex-1 mb-5">
              {certificate.issue_date && (
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    Issued:{" "}
                    {new Date(certificate.issue_date).toLocaleDateString(
                      "en-US",
                      { month: "short", year: "numeric" },
                    )}
                  </span>
                  {certificate.expiry_date && (
                    <span className="text-gray-600">
                      • Expires:{" "}
                      {new Date(certificate.expiry_date).toLocaleDateString(
                        "en-US",
                        { month: "short", year: "numeric" },
                      )}
                    </span>
                  )}
                </div>
              )}

              {certificate.credential_id && (
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <span className="font-mono bg-gray-800/50 px-2 py-1 rounded border border-gray-700/50">
                    ID: {certificate.credential_id}
                  </span>
                </div>
              )}

              {certificate.skills && certificate.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs font-semibold bg-gray-800/70 text-gray-300 rounded-lg border border-gray-700/50 group-hover:border-gray-600 group-hover:bg-gray-800 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                  {certificate.skills.length > 4 && (
                    <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-lg border border-cyan-500/30 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                      +{certificate.skills.length - 4}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-5 border-t border-gray-800/50 group-hover:border-gray-700/50 transition-colors">
              {certificate.verified && (
                <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-green-500/20 text-green-400 rounded-lg border border-green-500/30">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified</span>
                </div>
              )}
              {certificate.certificate_url && (
                <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-gray-800/50 text-gray-400 rounded-lg group-hover:bg-gray-800 group-hover:text-cyan-400 transition-all duration-200">
                  <ExternalLink className="w-4 h-4" />
                  <span>View</span>
                </div>
              )}
              {!certificate.expiry_date && (
                <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
                  <Calendar className="w-4 h-4" />
                  <span>No Expiry</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
