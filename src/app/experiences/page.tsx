import { Briefcase } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ExperiencesFilterClient } from "@/component/Experience";
import { LoadingState } from "@/component/Loading";
import { Sidebar } from "@/component/Sidebar";
import { generatePageMetadata } from "@/lib/metadata";
import { experiencesAPI } from "@/static/api/api.request";
import type { Experience } from "@/static/api/api.types";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: "Work Experience",
  description:
    "Professional work experience as a Software Developer and Engineer. Explore my career journey, roles, responsibilities, and technical achievements in software development.",
  path: "/experiences",
  keywords: [
    "work experience",
    "professional experience",
    "software engineer experience",
    "developer career",
    "employment history",
    "professional journey",
    "tech career",
  ],
});

async function ExperiencesContent() {
  let experiences: Experience[] = [];
  try {
    const response = await experiencesAPI.getAllExperiences(1, 500);
    experiences =
      response.status === 200 && response.data
        ? response.data.experiences || []
        : [];
  } catch (error) {
    console.error("Error fetching experiences:", error);
    // Return empty array on error - client will handle
  }

  return <ExperiencesFilterClient initialExperiences={experiences} />;
}

export default function ExperiencesPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Header */}
        <header className="relative border-b border-gray-800/50 z-10">
          <div className="absolute inset-0 bg-linear-to-b from-cyan-500/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 py-20 md:py-28 relative">
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-semibold mb-8 backdrop-blur-sm animate-fadeIn">
                <Briefcase className="w-4 h-4" />
                <span>Professional Journey</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight animate-fadeInUp">
                Work{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
                  Experience
                </span>
              </h1>
              <p className="text-gray-400 text-xl md:text-2xl max-w-3xl leading-relaxed animate-fadeInUp animation-delay-200">
                Explore my professional journey and career milestones across
                various organizations
              </p>
            </div>
          </div>
        </header>

        <Suspense fallback={<LoadingState />}>
          <ExperiencesContent />
        </Suspense>
      </main>
    </>
  );
}
