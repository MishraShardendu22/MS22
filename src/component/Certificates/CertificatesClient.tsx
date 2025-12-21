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
import { useState } from "react";
import type { Certificate } from "@/static/api/api.types";

interface CertificatesClientProps {
  initialCertificates: Certificate[];
}

export function CertificatesClient({
  initialCertificates,
}: CertificatesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const limit = 9;

  const allSkills = (() => {
    const skillsSet = new Set<string>();
    initialCertificates.forEach((cert) => {
      cert.skills?.forEach((skill) => skillsSet.add(skill));
    });
    return Array.from(skillsSet).sort();
  })();

  const filteredCertificates = initialCertificates.filter((cert) => {
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

  const paginatedCertificates = (() => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredCertificates.slice(startIndex, endIndex);
  })();

  const totalFilteredPages = Math.ceil(filteredCertificates.length / limit);

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-12 relative z-10">
      <div className="max-w-7xl mx-auto mb-10 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by title, issuer, or credential ID..."
                className="w-full pl-14 pr-5 py-4 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:bg-gray-900 transition-all shadow-lg shadow-black/20"
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-all shadow-lg relative group ${
              showFilters || selectedSkills.length > 0
                ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 shadow-cyan-500/20"
                : "bg-gray-900/80 backdrop-blur-xl text-gray-400 border border-gray-800/50 hover:border-gray-700 hover:text-gray-300 shadow-black/20"
            }`}
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            {selectedSkills.length > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 text-xs font-bold bg-linear-to-br from-cyan-500 to-blue-600 text-white rounded-full shadow-lg shadow-cyan-500/50 animate-pulse">
                {selectedSkills.length}
              </span>
            )}
          </button>
          {(searchQuery || selectedSkills.length > 0) && (
            <button
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold bg-linear-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/40 hover:from-red-500/30 hover:to-pink-500/30 transition-all shadow-lg shadow-red-500/20"
            >
              <X className="w-5 h-5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {showFilters && allSkills.length > 0 && (
          <div className="relative group animate-fadeIn">
            <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-50" />
            <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl space-y-5 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
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
                        ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/20 scale-105"
                        : "bg-gray-800/50 text-gray-400 border-2 border-gray-700/50 hover:border-gray-600 hover:text-gray-300 hover:scale-105 hover:bg-gray-800/70"
                    }`}
                  >
                    {selectedSkills.includes(skill) && (
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-xl animate-pulse" />
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
                {initialCertificates.length}
              </span>
              <span className="text-gray-400">certificates</span>
            </div>
          </div>
          {selectedSkills.length > 0 && (
            <div className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-semibold">
                {selectedSkills.length} filter
                {selectedSkills.length > 1 ? "s" : ""} active
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {paginatedCertificates.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {paginatedCertificates.map((certificate, index) => (
                <Link
                  key={certificate._id}
                  href={`/certificates/${certificate._id}`}
                  className="group relative animate-fadeInUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-50 transition duration-500" />
                  <div className="relative h-full p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-3xl hover:border-cyan-500/40 transition-all overflow-hidden">
                    <div className="flex items-start justify-between gap-3 mb-6">
                      <div className="p-3 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-500/30">
                        <Award className="w-6 h-6 text-cyan-400" />
                      </div>
                      {certificate.verified && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 text-xs font-semibold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Verified
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-black text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all">
                      {certificate.title}
                    </h3>

                    <p className="text-cyan-400 font-semibold text-base mb-4">
                      {certificate.issuer}
                    </p>

                    {certificate.description && (
                      <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                        {certificate.description}
                      </p>
                    )}

                    {certificate.skills && certificate.skills.length > 0 && (
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {certificate.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1.5 bg-gray-800/50 text-gray-300 text-xs font-semibold rounded-lg border border-gray-700/50"
                            >
                              {skill}
                            </span>
                          ))}
                          {certificate.skills.length > 3 && (
                            <span className="px-3 py-1.5 bg-cyan-500/10 text-cyan-400 text-xs font-semibold rounded-lg border border-cyan-500/30">
                              +{certificate.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {certificate.issue_date && (
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                        <Calendar className="w-4 h-4" />
                        <span>Issued {certificate.issue_date}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-3 transition-all">
                      <span>View Details</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalFilteredPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="group flex items-center gap-2 px-6 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 rounded-xl hover:border-cyan-500/40 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-800/50 disabled:hover:text-gray-400 transition-all shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-semibold">Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: totalFilteredPages },
                    (_, i) => i + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-11 h-11 rounded-xl font-bold transition-all shadow-lg ${
                        currentPage === page
                          ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/30 scale-110"
                          : "bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 hover:border-cyan-500/40 hover:text-cyan-400"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(totalFilteredPages, prev + 1),
                    )
                  }
                  disabled={currentPage === totalFilteredPages}
                  className="group flex items-center gap-2 px-6 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 rounded-xl hover:border-cyan-500/40 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-800/50 disabled:hover:text-gray-400 transition-all shadow-lg"
                >
                  <span className="font-semibold">Next</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 mb-6">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No certificates found
            </h3>
            <p className="text-gray-400 mb-8">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
            {(searchQuery || selectedSkills.length > 0) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 rounded-xl hover:from-cyan-500/30 hover:to-blue-500/30 font-semibold transition-all shadow-lg shadow-cyan-500/20"
              >
                <X className="w-5 h-5" />
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
