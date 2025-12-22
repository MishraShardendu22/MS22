import { Award } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { CertificatesFilterClient } from "@/component/Certificates";
import { LoadingState } from "@/component/Loading";
import { Sidebar } from "@/component/Sidebar";
import { generatePageMetadata } from "@/lib/metadata";
import { certificatesAPI } from "@/static/api/api.request";
import type { Certificate } from "@/static/api/api.types";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: "Certifications & Achievements",
  description:
    "Professional certifications, technical credentials, and achievements in software development. View my verified skills and qualifications in programming, cloud technologies, and software engineering.",
  path: "/certificates",
  keywords: [
    "certifications",
    "achievements",
    "professional credentials",
    "technical certifications",
    "developer certifications",
    "programming certificates",
    "cloud certifications",
    "verified skills",
  ],
});

async function CertificatesContent() {
  let certificates: Certificate[] = [];
  try {
    const response = await certificatesAPI.getAllCertificates(1, 500);
    certificates =
      response.status === 200 && response.data
        ? response.data.certifications || []
        : [];
  } catch (error) {
    console.error("Error fetching certificates:", error);
  }

  return <CertificatesFilterClient initialCertificates={certificates} />;
}

export default function CertificatesPage() {
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
        <header className="relative border-b border-gray-800/50 z-10">
          <div className="absolute inset-0 bg-linear-to-b from-cyan-500/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 py-20 md:py-28 relative">
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-semibold mb-8 backdrop-blur-sm animate-fadeIn">
                <Award className="w-4 h-4" />
                <span>Professional Credentials</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight animate-fadeInUp">
                Certifications &{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
                  Awards
                </span>
              </h1>
              <p className="text-gray-400 text-xl md:text-2xl max-w-3xl leading-relaxed animate-fadeInUp animation-delay-200">
                Verified certifications and professional credentials from
                leading technology organizations
              </p>
            </div>
          </div>
        </header>

        <Suspense fallback={<LoadingState />}>
          <CertificatesContent />
        </Suspense>
      </main>
    </>
  );
}
