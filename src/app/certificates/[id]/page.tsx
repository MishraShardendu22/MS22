import {
  ArrowLeft,
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  Code2,
  ExternalLink,
  FileText,
  Shield,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sidebar } from "@/component/Sidebar";
import { generatePageMetadata } from "@/lib/metadata";
import { certificatesAPI } from "@/static/api/api.request";
import type { Certificate } from "@/static/api/api.types";
import { formatDate } from "@/utils/formatDate";

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
    const response = await certificatesAPI.getCertificateById(id);

    if (response.status === 200 && response.data) {
      const certificate = response.data;
      const description = `${certificate.title} certification issued by ${certificate.issuer}. ${certificate.description?.substring(0, 120) || "View certification details and credentials."}`;

      return generatePageMetadata({
        title: certificate.title,
        description,
        path: `/certificates/${id}`,
        keywords: [
          certificate.title,
          certificate.issuer,
          "certification",
          "credential",
          "professional development",
        ],
      });
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return generatePageMetadata({
    title: "Certificate Details",
    description:
      "View detailed information about this professional certification.",
    path: `/certificates/${id}`,
  });
}

export default async function CertificateDetailPage({ params }: PageProps) {
  try {
    const response = await certificatesAPI.getCertificateById(params.id);

    if (response.status !== 200 || !response.data) {
      notFound();
    }

    const certificate: Certificate = response.data;

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

          <article className="container mx-auto px-4 py-8 relative z-10">
            <nav>
              <Link href="/certificates">
                <button
                  type="button"
                  className="group flex items-center gap-2 mb-8 px-6 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 rounded-xl hover:border-cyan-500/40 hover:text-cyan-400 transition-all shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-semibold">Back to Certificates</span>
                </button>
              </Link>
            </nav>

            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Hero Card */}
                  <section className="relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                    <div className="relative p-10 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-3xl">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-4 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-500/30">
                          <Award className="w-8 h-8 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <h1 className="text-4xl font-black text-white leading-tight flex-1">
                              {certificate.title}
                            </h1>
                            {certificate.verified && (
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 text-sm font-semibold">
                                <Shield className="w-4 h-4" />
                                Verified
                              </div>
                            )}
                          </div>
                          <p className="text-xl text-cyan-400 font-semibold mb-4">
                            {certificate.issuer}
                          </p>

                          {certificate.credential_id && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/70 rounded-lg border border-gray-700/50">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-mono text-gray-300">
                                ID: {certificate.credential_id}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 /50">
                        {certificate.issue_date && (
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-800/50 rounded-lg">
                              <Calendar className="w-4 h-4 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide">
                                Issued
                              </p>
                              <p className="text-white font-semibold">
                                {formatDate(certificate.issue_date, {
                                  style: "long",
                                  fallback: "",
                                })}
                              </p>
                            </div>
                          </div>
                        )}

                        {certificate.expiry_date ? (
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-800/50 rounded-lg">
                              <Calendar className="w-4 h-4 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide">
                                Expires
                              </p>
                              <p className="text-white font-semibold">
                                {formatDate(certificate.expiry_date, {
                                  style: "long",
                                  fallback: "",
                                })}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                              <CheckCircle className="w-4 h-4 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide">
                                Validity
                              </p>
                              <p className="text-blue-400 font-semibold">
                                No Expiration
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Description */}
                  {certificate.description && (
                    <section className="relative group">
                      <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                          <FileText className="w-6 h-6 text-cyan-400" />
                          About this Certification
                        </h2>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {certificate.description}
                          </p>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Images */}
                  {certificate.images && certificate.images.length > 0 && (
                    <section className="relative group">
                      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">
                          Certificate Images
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                          {certificate.images.map((image, idx) => (
                            <div
                              key={`${certificate._id}-image-${image}-${idx}`}
                              className="relative aspect-16/11 rounded-xl overflow-hidden border border-gray-800/50 hover:border-cyan-500/40 transition-all group/img"
                            >
                              <Image
                                src={image}
                                alt={`Certificate image ${idx + 1}`}
                                fill
                                className="object-contain bg-gray-950 group-hover/img:scale-105 transition-transform duration-500"
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
                  {/* Skills */}
                  {certificate.skills && certificate.skills.length > 0 && (
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-50" />
                      <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                        <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                          <Code2 className="w-5 h-5 text-cyan-400" />
                          Skills Covered
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {certificate.skills.map((skill, idx) => (
                            <span
                              key={`${certificate._id}-skill-${skill}-${idx}`}
                              className="px-3 py-2 text-sm font-semibold bg-linear-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 rounded-lg border border-cyan-500/30 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-50" />
                    <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl space-y-3">
                      <h3 className="text-lg font-bold text-white mb-4">
                        Actions
                      </h3>

                      {certificate.certificate_url && (
                        <Link
                          href={certificate.certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 rounded-xl hover:from-cyan-500/30 hover:to-blue-500/30 transition-all font-semibold shadow-lg shadow-cyan-500/20"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Certificate
                        </Link>
                      )}

                      {certificate.verified && (
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-5 h-5 text-green-400" />
                            <span className="font-bold text-green-400">
                              Verified Certificate
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            This certificate has been verified and authenticated
                            by the issuer.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Projects */}
                  {certificate.projects && certificate.projects.length > 0 && (
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-50" />
                      <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-purple-400" />
                          Related Projects
                        </h3>
                        <div className="space-y-2">
                          {certificate.projects.map((project, idx) => (
                            <div
                              key={`${certificate._id}-project-${project}-${idx}`}
                              className="p-3 bg-gray-800/50 rounded-lg text-gray-300 text-sm border border-gray-700/50 hover:border-gray-600 transition-colors"
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

                      {certificate.issuer && (
                        <div className="flex items-start gap-3">
                          <Award className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                              Issued By
                            </p>
                            <p className="text-white font-semibold">
                              {certificate.issuer}
                            </p>
                          </div>
                        </div>
                      )}

                      {certificate.skills && certificate.skills.length > 0 && (
                        <div className="flex items-start gap-3">
                          <Code2 className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                              Skills
                            </p>
                            <p className="text-white font-semibold">
                              {certificate.skills.length} Skill
                              {certificate.skills.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      )}

                      {certificate.verified !== undefined && (
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                              Verification Status
                            </p>
                            <p
                              className={`font-semibold ${certificate.verified ? "text-green-400" : "text-gray-400"}`}
                            >
                              {certificate.verified
                                ? "Verified"
                                : "Not Verified"}
                            </p>
                          </div>
                        </div>
                      )}

                      {certificate.credential_id && (
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                              Credential ID
                            </p>
                            <p className="text-white font-mono text-xs break-all">
                              {certificate.credential_id}
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
