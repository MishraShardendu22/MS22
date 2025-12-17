"use client";

import {
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  Heart,
  MapPin,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingState } from "@/component/Loading";
import { Sidebar } from "@/component/Sidebar";
import { volunteerAPI } from "@/static/api/api.request";
import type { Volunteer } from "@/static/api/api.types";

export default function VolunteerPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const limit = 9;

  useEffect(() => {
    fetchVolunteers();
  }, [currentPage]);

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await volunteerAPI.getAllVolunteers(currentPage, limit);

      if (response.status === 200 && response.data) {
        const volunteersData = response.data.volunteer_experiences || [];
        setVolunteers(volunteersData);
        setTotalPages(response.data.total_pages || 1);
      } else {
        throw new Error(
          response.message || "Failed to fetch volunteer experiences",
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const allTechnologies = useMemo(() => {
    const techsSet = new Set<string>();
    volunteers.forEach((vol) => {
      vol.technologies?.forEach((tech) => techsSet.add(tech));
    });
    return Array.from(techsSet).sort();
  }, [volunteers]);

  const filteredVolunteers = useMemo(() => {
    const filtered = volunteers.filter((vol) => {
      const matchesSearch =
        searchQuery === "" ||
        vol.organisation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vol.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vol.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTechs =
        selectedTechs.length === 0 ||
        selectedTechs.every((tech) => vol.technologies?.includes(tech));

      return matchesSearch && matchesTechs;
    });

    if (searchQuery || selectedTechs.length > 0) {
      setCurrentPage(1);
    }

    return filtered;
  }, [volunteers, searchQuery, selectedTechs]);

  const paginatedVolunteers = useMemo(() => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredVolunteers.slice(startIndex, endIndex);
  }, [filteredVolunteers, currentPage, limit]);

  const totalFilteredPages = Math.ceil(filteredVolunteers.length / limit);

  const toggleTechFilter = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTechs([]);
  };

  if (loading && volunteers.length === 0) {
    return <LoadingState />;
  }

  if (error && volunteers.length === 0) {
    return <ErrorState message={error} />;
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Header */}
        <div className="relative border-b border-gray-800/50 z-10">
          <div className="absolute inset-0 bg-linear-to-b from-pink-500/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 py-20 md:py-28 relative">
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm font-semibold mb-8 backdrop-blur-sm animate-fadeIn">
                <Heart className="w-4 h-4" />
                <span>Community Impact</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight animate-fadeInUp">
                Volunteer{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-500 to-cyan-600 animate-gradient">
                  Experience
                </span>
              </h1>
              <p className="text-gray-400 text-xl md:text-2xl max-w-3xl leading-relaxed animate-fadeInUp animation-delay-200">
                Explore my volunteer work and contributions to various
                communities and organizations
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-7xl mx-auto mb-10 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="flex-1 relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-pink-400 transition-colors" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by organization, position, or description..."
                    className="w-full pl-14 pr-5 py-4 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 focus:bg-gray-900 transition-all shadow-lg shadow-black/20"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-all shadow-lg relative group ${
                  showFilters || selectedTechs.length > 0
                    ? "bg-linear-to-r from-pink-500/20 to-purple-500/20 text-pink-400 border border-pink-500/40 shadow-pink-500/20"
                    : "bg-gray-900/80 backdrop-blur-xl text-gray-400 border border-gray-800/50 hover:border-gray-700 hover:text-gray-300 shadow-black/20"
                }`}
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                {selectedTechs.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 text-xs font-bold bg-linear-to-br from-pink-500 to-purple-600 text-white rounded-full shadow-lg shadow-pink-500/50 animate-pulse">
                    {selectedTechs.length}
                  </span>
                )}
              </button>
              {(searchQuery || selectedTechs.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold bg-linear-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/40 hover:from-red-500/30 hover:to-pink-500/30 transition-all shadow-lg shadow-red-500/20"
                >
                  <X className="w-5 h-5" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {showFilters && allTechnologies.length > 0 && (
              <div className="relative group animate-fadeIn">
                <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-50" />
                <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl space-y-5 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-linear-to-br from-pink-500/20 to-purple-500/20 rounded-lg">
                      <Filter className="w-5 h-5 text-pink-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      Filter by Technology
                    </h3>
                    <div className="ml-auto text-sm text-gray-500">
                      {allTechnologies.length} available
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {allTechnologies.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => toggleTechFilter(tech)}
                        className={`group/tech relative px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                          selectedTechs.includes(tech)
                            ? "bg-linear-to-r from-pink-500/20 to-purple-500/20 text-pink-400 border-2 border-pink-500/40 shadow-lg shadow-pink-500/20 scale-105"
                            : "bg-gray-800/50 text-gray-400 border-2 border-gray-700/50 hover:border-gray-600 hover:text-gray-300 hover:scale-105 hover:bg-gray-800/70"
                        }`}
                      >
                        {selectedTechs.includes(tech) && (
                          <div className="absolute inset-0 bg-linear-to-r from-pink-500/10 to-purple-500/10 rounded-xl animate-pulse" />
                        )}
                        <span className="relative">{tech}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-3 px-5 py-3 bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                  <span className="text-gray-400">Showing</span>
                  <span className="text-pink-400 font-bold text-lg">
                    {filteredVolunteers.length}
                  </span>
                  <span className="text-gray-400">of</span>
                  <span className="text-white font-bold text-lg">
                    {volunteers.length}
                  </span>
                  <span className="text-gray-400">volunteer experiences</span>
                </div>
              </div>
              {selectedTechs.length > 0 && (
                <div className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl">
                  <Filter className="w-4 h-4 text-pink-400" />
                  <span className="text-pink-400 font-semibold">
                    Filtered by {selectedTechs.length}{" "}
                    {selectedTechs.length !== 1 ? "technologies" : "technology"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {filteredVolunteers.length === 0 ? (
            <div className="max-w-7xl mx-auto text-center py-32">
              <div className="relative inline-flex mb-8">
                <div className="absolute inset-0 bg-linear-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-linear-to-br from-gray-900 to-gray-950 border-2 border-gray-800/50">
                  <Heart className="w-16 h-16 text-gray-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                No volunteer experiences found
              </h3>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                Try adjusting your search terms or filters
              </p>
              {(searchQuery || selectedTechs.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-pink-500/10 to-purple-500/10 text-pink-400 border-2 border-pink-500/30 rounded-xl hover:from-pink-500/20 hover:to-purple-500/20 transition-all font-semibold shadow-lg shadow-pink-500/10"
                >
                  <X className="w-5 h-5" />
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
              {paginatedVolunteers.map((volunteer, index) => (
                <VolunteerCard
                  key={volunteer._id || volunteer.inline?.id || index}
                  volunteer={volunteer}
                  index={index}
                />
              ))}
            </div>
          )}

          {filteredVolunteers.length > 0 && totalFilteredPages > 1 && (
            <div className="max-w-7xl mx-auto mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="group flex items-center gap-2 px-6 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:border-pink-500/40 hover:text-pink-400 transition-all shadow-lg disabled:hover:border-gray-800/50 disabled:hover:text-gray-400"
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
                            ? "bg-linear-to-r from-pink-500 to-purple-600 text-white scale-110 shadow-pink-500/50"
                            : "bg-gray-900/80 backdrop-blur-xl text-gray-400 border border-gray-800/50 hover:border-gray-700 hover:text-gray-300 hover:scale-105"
                        }`}
                      >
                        {currentPage === page && (
                          <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 rounded-xl blur opacity-50 animate-pulse" />
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
                className="group flex items-center gap-2 px-6 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:border-pink-500/40 hover:text-pink-400 transition-all shadow-lg disabled:hover:border-gray-800/50 disabled:hover:text-gray-400"
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

interface VolunteerCardProps {
  volunteer: Volunteer;
  index: number;
}

function VolunteerCard({ volunteer, index }: VolunteerCardProps) {
  const volunteerId = volunteer._id || volunteer.inline?.id || "";

  return (
    <Link href={`/volunteer/${volunteerId}`}>
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

        <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500 via-purple-500 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />

        <div className="relative h-full bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2 cursor-pointer">
          <div className="absolute inset-0 bg-linear-to-br from-pink-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-pink-500/10 group-hover:via-purple-500/5 group-hover:to-cyan-500/10 transition-all duration-500" />

          <div className="relative p-7 flex flex-col h-full">
            <div className="mb-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-pink-400 group-hover:to-purple-500 transition-all duration-300">
                      {volunteer.organisation}
                    </h3>
                  </div>
                  {volunteer.position && (
                    <p className="text-pink-400 text-sm font-semibold mb-2">
                      {volunteer.position}
                    </p>
                  )}
                </div>
                <div className="shrink-0 p-2 bg-gray-800/50 rounded-lg group-hover:bg-linear-to-br group-hover:from-pink-500/20 group-hover:to-purple-500/20 border border-gray-700/50 group-hover:border-pink-500/40 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-pink-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>

              {volunteer.description && (
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors">
                  {volunteer.description}
                </p>
              )}
            </div>

            <div className="flex-1 mb-5">
              {volunteer.location && (
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{volunteer.location}</span>
                </div>
              )}

              {volunteer.start_date && (
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {volunteer.start_date} -{" "}
                    {volunteer.end_date ||
                      (volunteer.current ? "Present" : "N/A")}
                  </span>
                </div>
              )}

              {volunteer.technologies && volunteer.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {volunteer.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs font-semibold bg-gray-800/70 text-gray-300 rounded-lg border border-gray-700/50 group-hover:border-gray-600 group-hover:bg-gray-800 transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {volunteer.technologies.length > 4 && (
                    <span className="px-3 py-1.5 text-xs font-semibold bg-linear-to-r from-pink-500/20 to-purple-500/20 text-pink-400 rounded-lg border border-pink-500/30 group-hover:from-pink-500/30 group-hover:to-purple-500/30 transition-all">
                      +{volunteer.technologies.length - 4}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-5 border-t border-gray-800/50 group-hover:border-gray-700/50 transition-colors">
              {volunteer.certificate_link && (
                <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-gray-800/50 text-gray-400 rounded-lg group-hover:bg-gray-800 group-hover:text-pink-400 transition-all duration-200">
                  <ExternalLink className="w-4 h-4" />
                  <span>Certificate</span>
                </div>
              )}
              {volunteer.current && (
                <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-green-500/20 text-green-400 rounded-lg border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Active</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
