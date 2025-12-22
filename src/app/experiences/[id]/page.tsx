import {
  ArrowLeft,
  Award,
  Briefcase,
  Building2,
  Calendar,
  Code2,
  ExternalLink,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sidebar } from "@/component/Sidebar";
import { generatePageMetadata } from "@/lib/metadata";
import { experiencesAPI } from "@/static/api/api.request";
import type { Experience } from "@/static/api/api.types";
import { formatDate } from "@/utils/formatDate";

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
    const response = await experiencesAPI.getExperienceById(id);

    if (response.status === 200 && response.data) {
      const experience = response.data;
      const position =
        experience.experience_time_line?.[0]?.position || "Professional";
      const description = `${position} at ${experience.company_name}. ${experience.description?.substring(0, 120) || "View my professional experience and contributions."}`;

      return generatePageMetadata({
        title: `${position} at ${experience.company_name}`,
        description,
        path: `/experiences/${id}`,
        keywords: [
          experience.company_name,
          position,
          "work experience",
          "professional experience",
          "career",
        ],
      });
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return generatePageMetadata({
    title: "Experience Details",
    description:
      "View detailed information about this professional experience.",
    path: `/experiences/${id}`,
  });
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  try {
    const response = await experiencesAPI.getExperienceById(params.id);

    if (response.status !== 200 || !response.data) {
      notFound();
    }

    const experience: Experience = response.data;

    return (
      <>
        <Sidebar />
        <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
          {/* Animated Background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
            <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
          </div>

          <article className="container mx-auto px-4 py-8 relative z-10">
            <nav>
              <Link href="/experiences">
                <button
                  type="button"
                  className="group flex items-center gap-2 mb-8 px-6 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 rounded-xl hover:border-blue-500/40 hover:text-blue-400 transition-all shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-semibold">Back to Experiences</span>
                </button>
              </Link>
            </nav>

            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Hero Card */}
                  <section className="relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 via-purple-500 to-cyan-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                    <div className="relative p-10 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-3xl">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-4 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30">
                          <Building2 className="w-8 h-8 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h1 className="text-4xl font-black text-white mb-3 leading-tight">
                            {experience.company_name}
                          </h1>
                          {experience.experience_time_line &&
                            experience.experience_time_line.length > 0 && (
                              <p className="text-xl text-blue-400 font-semibold mb-2">
                                {experience.experience_time_line[0].position}
                              </p>
                            )}
                        </div>
                      </div>

                      {experience.experience_time_line &&
                        experience.experience_time_line.length > 0 && (
                          <div className="space-y-3 pt-6 border-t border-gray-800/50">
                            {experience.experience_time_line.map(
                              (timeline, idx) => (
                                <div
                                  key={`${experience._id}-timeline-${timeline.position}-${timeline.start_date}-${idx}`}
                                  className="flex items-center gap-3 text-sm"
                                >
                                  <div className="p-2 bg-gray-800/50 rounded-lg">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                  </div>
                                  <div>
                                    <p className="text-white font-semibold">
                                      {timeline.position}
                                    </p>
                                    <p className="text-gray-400">
                                      {formatDate(timeline.start_date, {
                                        style: "long",
                                      })}{" "}
                                      -{" "}
                                      {formatDate(timeline.end_date, {
                                        style: "long",
                                        fallback: "Present",
                                      })}
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
                  {experience.description && (
                    <section className="relative group">
                      <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                          <Briefcase className="w-6 h-6 text-blue-400" />
                          About the Role
                        </h2>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {experience.description}
                          </p>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Images */}
                  {experience.images && experience.images.length > 0 && (
                    <section className="relative group">
                      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">
                          Gallery
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                          {experience.images.map((image, idx) => (
                            <div
                              key={`${experience._id}-image-${image}-${idx}`}
                              className="relative aspect-video rounded-xl overflow-hidden border border-gray-800/50 hover:border-blue-500/40 transition-all group/img"
                            >
                              <Image
                                src={image}
                                alt={`Experience image ${idx + 1}`}
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
                  {experience.technologies &&
                    experience.technologies.length > 0 && (
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-50" />
                        <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                            <Code2 className="w-5 h-5 text-blue-400" />
                            Technologies Used
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech, idx) => (
                              <span
                                key={`${experience._id}-tech-${tech}-${idx}`}
                                className="px-3 py-2 text-sm font-semibold bg-linear-to-r from-blue-500/10 to-purple-500/10 text-blue-400 rounded-lg border border-blue-500/30 hover:from-blue-500/20 hover:to-purple-500/20 transition-all"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                  {/* Certificate Link */}
                  {experience.certificate_url && (
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-50" />
                      <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-cyan-400" />
                          Certificate
                        </h3>
                        <Link
                          href={experience.certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 rounded-xl hover:from-cyan-500/30 hover:to-blue-500/30 transition-all font-semibold shadow-lg shadow-cyan-500/20"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Certificate
                        </Link>
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

                      {experience.company_name && (
                        <div className="flex items-start gap-3">
                          <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                              Company
                            </p>
                            <p className="text-white font-semibold">
                              {experience.company_name}
                            </p>
                          </div>
                        </div>
                      )}

                      {experience.experience_time_line &&
                        experience.experience_time_line.length > 0 && (
                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                Roles
                              </p>
                              <p className="text-white font-semibold">
                                {experience.experience_time_line.length}{" "}
                                Position
                                {experience.experience_time_line.length !== 1
                                  ? "s"
                                  : ""}
                              </p>
                            </div>
                          </div>
                        )}

                      {experience.technologies &&
                        experience.technologies.length > 0 && (
                          <div className="flex items-start gap-3">
                            <Code2 className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                Technologies
                              </p>
                              <p className="text-white font-semibold">
                                {experience.technologies.length} Tech
                                {experience.technologies.length !== 1
                                  ? "s"
                                  : ""}
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
