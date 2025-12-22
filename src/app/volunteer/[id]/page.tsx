import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Code2,
  ExternalLink,
  Heart,
  MapPin,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sidebar } from "@/component/Sidebar";
import { generatePageMetadata } from "@/lib/metadata";
import { volunteerAPI } from "@/static/api/api.request";
import type { Volunteer } from "@/static/api/api.types";

// Use dynamic rendering to avoid rate limiting during build
export const dynamic = "force-dynamic";
export const revalidate = 3600;

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await volunteerAPI.getVolunteerById(id);

    if (response.status === 200 && response.data) {
      const volunteer = response.data;
      const description = `${volunteer.position} at ${volunteer.organisation}. ${volunteer.description?.substring(0, 120) || "View volunteer experience and community contributions."}`;

      return generatePageMetadata({
        title: `${volunteer.position} at ${volunteer.organisation}`,
        description,
        path: `/volunteer/${id}`,
        keywords: [
          volunteer.organisation,
          volunteer.position || "volunteer",
          "volunteer",
          "community service",
          "social impact",
        ].filter((keyword): keyword is string => Boolean(keyword)),
      });
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return generatePageMetadata({
    title: "Volunteer Experience Details",
    description: "View detailed information about this volunteer experience.",
    path: `/volunteer/${id}`,
  });
}

export default async function VolunteerDetailPage({ params }: PageProps) {
  try {
    const response = await volunteerAPI.getVolunteerById(params.id);

    if (response.status !== 200 || !response.data) {
      notFound();
    }

    const volunteer: Volunteer = response.data;

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

          <article className="container mx-auto px-4 py-8 relative z-10">
            <nav>
              <Link href="/volunteer">
                <button
                  type="button"
                  className="group flex items-center gap-2 mb-8 px-6 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 rounded-xl hover:border-pink-500/40 hover:text-pink-400 transition-all shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-semibold">
                    Back to Volunteer Experiences
                  </span>
                </button>
              </Link>
            </nav>

            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Hero Card */}
                  <section className="relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500 via-purple-500 to-cyan-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                    <div className="relative p-10 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-3xl">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-4 bg-linear-to-br from-pink-500/20 to-purple-500/20 rounded-2xl border border-pink-500/30">
                          <Heart className="w-8 h-8 text-pink-400" />
                        </div>
                        <div className="flex-1">
                          <h1 className="text-4xl font-black text-white mb-3 leading-tight">
                            {volunteer.organisation}
                          </h1>
                          {volunteer.position && (
                            <p className="text-xl text-pink-400 font-semibold mb-2">
                              {volunteer.position}
                            </p>
                          )}
                          {volunteer.current && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 text-sm font-semibold">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              Active Position
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-800/50">
                        {volunteer.location && (
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-800/50 rounded-lg">
                              <MapPin className="w-4 h-4 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide">
                                Location
                              </p>
                              <p className="text-white font-semibold">
                                {volunteer.location}
                              </p>
                            </div>
                          </div>
                        )}

                        {volunteer.start_date && (
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-800/50 rounded-lg">
                              <Calendar className="w-4 h-4 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide">
                                Duration
                              </p>
                              <p className="text-white font-semibold">
                                {volunteer.start_date} -{" "}
                                {volunteer.end_date ||
                                  (volunteer.current ? "Present" : "N/A")}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {volunteer.volunteer_time_line &&
                        volunteer.volunteer_time_line.length > 0 && (
                          <div className="space-y-3 pt-6 mt-6 border-t border-gray-800/50">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                              Timeline
                            </h3>
                            {volunteer.volunteer_time_line.map(
                              (timeline, idx) => (
                                <div
                                  key={`${volunteer._id}-timeline-${timeline.position}-${timeline.start_date}-${idx}`}
                                  className="flex items-center gap-3 text-sm p-3 bg-gray-800/30 rounded-lg"
                                >
                                  <Briefcase className="w-4 h-4 text-pink-400" />
                                  <div>
                                    <p className="text-white font-semibold">
                                      {timeline.position}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                      {timeline.start_date} -{" "}
                                      {timeline.end_date || "Present"}
                                    </p>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        )}
                    </div>
                  </section>

                  {/* Description */}
                  {volunteer.description && (
                    <section className="relative group">
                      <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                          <Users className="w-6 h-6 text-pink-400" />
                          About the Experience
                        </h2>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {volunteer.description}
                          </p>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Images */}
                  {volunteer.images && volunteer.images.length > 0 && (
                    <section className="relative group">
                      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">
                          Gallery
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                          {volunteer.images.map((image, idx) => (
                            <div
                              key={`${volunteer._id}-image-${image}-${idx}`}
                              className="relative aspect-16/11 rounded-xl overflow-hidden border border-gray-800/50 hover:border-pink-500/40 transition-all group/img"
                            >
                              <Image
                                src={image}
                                alt={`Volunteer work image ${idx + 1}`}
                                fill
                                className="object-cover bg-gray-950 group-hover/img:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                  {/* Technologies */}
                  {volunteer.technologies &&
                    volunteer.technologies.length > 0 && (
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500/20 to-purple-500/20 rounded-2xl blur opacity-50" />
                        <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                            <Code2 className="w-5 h-5 text-pink-400" />
                            Technologies Used
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {volunteer.technologies.map((tech, idx) => (
                              <span
                                key={`${volunteer._id}-tech-${tech}-${idx}`}
                                className="px-3 py-2 text-sm font-semibold bg-linear-to-r from-pink-500/10 to-purple-500/10 text-pink-400 rounded-lg border border-pink-500/30 hover:from-pink-500/20 hover:to-purple-500/20 transition-all"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                  {/* Certificate Link */}
                  {volunteer.certificate_link && (
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/20 to-pink-500/20 rounded-2xl blur opacity-50" />
                      <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <ExternalLink className="w-5 h-5 text-cyan-400" />
                          Certificate
                        </h3>
                        <Link
                          href={volunteer.certificate_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-linear-to-r from-cyan-500/20 to-pink-500/20 text-cyan-400 border border-cyan-500/40 rounded-xl hover:from-cyan-500/30 hover:to-pink-500/30 transition-all font-semibold shadow-lg shadow-cyan-500/20"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Certificate
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {volunteer.projects && volunteer.projects.length > 0 && (
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-50" />
                      <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                        <h3 className="text-lg font-bold text-white mb-4">
                          Related Projects
                        </h3>
                        <div className="space-y-2">
                          {volunteer.projects.map((project, idx) => (
                            <div
                              key={`${volunteer._id}-project-${project}-${idx}`}
                              className="p-3 bg-gray-800/50 rounded-lg text-gray-300 text-sm"
                            >
                              {project}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Info */}
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-50" />
                    <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl space-y-4">
                      <h3 className="text-lg font-bold text-white mb-4">
                        Quick Info
                      </h3>

                      {volunteer.organisation && (
                        <div className="flex items-start gap-3">
                          <Heart className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                              Organization
                            </p>
                            <p className="text-white font-semibold">
                              {volunteer.organisation}
                            </p>
                          </div>
                        </div>
                      )}

                      {volunteer.technologies &&
                        volunteer.technologies.length > 0 && (
                          <div className="flex items-start gap-3">
                            <Code2 className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                Technologies
                              </p>
                              <p className="text-white font-semibold">
                                {volunteer.technologies.length} Tech
                                {volunteer.technologies.length !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                        )}

                      {volunteer.projects && volunteer.projects.length > 0 && (
                        <div className="flex items-start gap-3">
                          <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                              Projects
                            </p>
                            <p className="text-white font-semibold">
                              {volunteer.projects.length} Project
                              {volunteer.projects.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </article>
        </main>
      </>
    );
  } catch {
    notFound();
  }
}
