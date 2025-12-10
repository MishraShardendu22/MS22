"use client";

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
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingState } from "@/component/Loading";
import { Sidebar } from "@/component/Sidebar";
import { certificatesAPI } from "@/static/api/api.request";
import type { Certificate } from "@/static/api/api.types";

export default function CertificateDetailPage() {
  const params = useParams();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        setError(null);

        const id = params.id as string;
        if (!id) {
          throw new Error("Certificate ID is required");
        }

        const response = await certificatesAPI.getCertificateById(id);

        if (response.status === 200 && response.data) {
          setCertificate(response.data);
        } else {
          throw new Error(
            response.message || "Failed to fetch certificate details",
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [params.id]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !certificate) {
    return <ErrorState message={error || "Certificate not found"} />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

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

        <div className="container mx-auto px-4 py-8 relative z-10">
          <Link href="/certificates">
            <button className="group flex items-center gap-2 mb-8 px-6 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 rounded-xl hover:border-cyan-500/40 hover:text-cyan-400 transition-all shadow-lg">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Certificates</span>
            </button>
          </Link>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Hero Card */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                  <div className="relative p-10 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-3xl">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-500/30">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-800/50">
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
                              {formatDate(certificate.issue_date)}
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
                              {formatDate(certificate.expiry_date)}
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
                </div>

                {/* Description */}
                {certificate.description && (
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
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
                  </div>
                )}

                {/* Images */}
                {certificate.images && certificate.images.length > 0 && (
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                      <h2 className="text-2xl font-bold text-white mb-6">
                        Certificate Images
                      </h2>
                      <div className="grid grid-cols-1 gap-4">
                        {certificate.images.map((image, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-[16/11] rounded-xl overflow-hidden border border-gray-800/50 hover:border-cyan-500/40 transition-all group/img"
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
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Skills */}
                {certificate.skills && certificate.skills.length > 0 && (
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-50" />
                    <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                      <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-cyan-400" />
                        Skills Covered
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {certificate.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-2 text-sm font-semibold bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 rounded-lg border border-cyan-500/30 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all"
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
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-50" />
                  <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl space-y-3">
                    <h3 className="text-lg font-bold text-white mb-4">
                      Actions
                    </h3>

                    {certificate.certificate_url && (
                      <Link
                        href={certificate.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 rounded-xl hover:from-cyan-500/30 hover:to-blue-500/30 transition-all font-semibold shadow-lg shadow-cyan-500/20"
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
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-50" />
                    <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-purple-400" />
                        Related Projects
                      </h3>
                      <div className="space-y-2">
                        {certificate.projects.map((project, idx) => (
                          <div
                            key={idx}
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
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-50" />
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
                            {certificate.verified ? "Verified" : "Not Verified"}
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
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
      </main>
    </>
  );
}
