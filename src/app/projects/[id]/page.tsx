import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Github,
  Play,
  Shield,
  Sparkles,
  Tag,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ErrorState } from "@/component/Error";
import { Sidebar } from "@/component/Sidebar";
import { projectsAPI } from "@/static/api/api.request";
import type { Project } from "@/static/api/api.types";

// Use dynamic rendering to avoid rate limiting during build
export const dynamic = "force-dynamic";
export const revalidate = 3600;

interface PageProps {
  params: { id: string };
}

function parseDescription(description: string) {
  const lines = description.split("\n");
  const sections: { title: string; content: string[] }[] = [];
  let currentSection: { title: string; content: string[] } | null = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("###")) {
      if (currentSection) sections.push(currentSection);
      currentSection = { title: trimmed.replace(/^###\s*/, ""), content: [] };
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      if (currentSection) sections.push(currentSection);
      currentSection = { title: trimmed.replace(/\*\*/g, ""), content: [] };
    } else if (currentSection && trimmed) {
      currentSection.content.push(trimmed);
    } else if (!currentSection && trimmed) {
      if (!sections.find((s) => s.title === "Overview")) {
        sections.push({ title: "Overview", content: [trimmed] });
      } else {
        sections[0].content.push(trimmed);
      }
    }
  });

  if (currentSection) sections.push(currentSection);
  return sections;
}

function formatListItem(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  let formatted = text
    .replace(/^\*\*([^*]+)\*\*:?\s*/, "<strong>$1:</strong> ")
    .replace(/^\s*-\s*/, "")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  formatted = formatted.replace(
    urlRegex,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300 underline">$1</a>',
  );

  return formatted;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  let project: Project | null = null;
  let error: string | null = null;

  try {
    const response = await projectsAPI.getProjectById(id);

    if (response.status === 200 && response.data) {
      project = response.data;
    } else {
      error = response.message || "Failed to fetch project";
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "An error occurred";
  }

  if (error || !project) {
    notFound();
  }

  const sections = parseDescription(project.description);

  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-50 border-b border-gray-800/30 bg-gray-950/95 backdrop-blur-xl">
          <div className="px-6 py-2">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-gray-400 text-sm hover:text-cyan-400 transition-all group bg-gray-900/30 hover:bg-gray-900/60 rounded-lg border border-gray-800/30 hover:border-cyan-500/30"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-semibold">Back to Projects</span>
            </Link>
          </div>
        </div>

        <div className="px-6 py-8">
          {/* Hero Section */}
          <article className="relative mb-8 animate-fadeInUp">
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-xl blur-lg opacity-50" />

            <div className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-800/30 rounded-xl overflow-hidden">
              <div className="p-8">
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3 tracking-tight">
                  {project.project_name}
                </h1>

                <p className="text-sm text-gray-300 leading-relaxed mb-6 max-w-3xl">
                  {project.small_description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.project_live_link && (
                    <Link
                      href={project.project_live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white text-sm rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                      Live Project
                    </Link>
                  )}
                  {project.project_repository && (
                    <Link
                      href={project.project_repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-4 py-2 bg-gray-800/60 text-gray-300 text-sm border border-gray-700/40 rounded-lg font-bold hover:border-gray-600 hover:text-white transition-all"
                    >
                      <Github className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      Source Code
                    </Link>
                  )}
                  {project.project_video && (
                    <Link
                      href={project.project_video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 text-sm border border-purple-500/30 rounded-lg font-bold hover:bg-purple-500/30 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      Watch Demo
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </article>

          {/* 3 Column Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Overview */}
            {sections[0] && (
              <section
                className="group relative animate-fadeInUp"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-800/30 rounded-xl p-5 hover:border-gray-700/30 transition-all h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <h2 className="text-base font-black text-white">
                      {sections[0].title}
                    </h2>
                  </div>

                  <div className="space-y-2">
                    {sections[0].content.slice(0, 4).map((item, itemIdx) => {
                      const isListItem =
                        item.trim().startsWith("-") || item.includes("**");

                      if (isListItem) {
                        return (
                          <div
                            key={itemIdx}
                            className="flex items-start gap-2 group/item"
                          >
                            <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                            <div
                              className="text-gray-300 text-xs leading-relaxed flex-1"
                              dangerouslySetInnerHTML={{
                                __html: formatListItem(item),
                              }}
                            />
                          </div>
                        );
                      }

                      return (
                        <p
                          key={itemIdx}
                          className="text-gray-300 text-xs leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: formatListItem(item),
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* Tech Stack */}
            <section
              className="group relative animate-fadeInUp"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-800/30 rounded-xl p-5 hover:border-gray-700/30 transition-all h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
                    <Tag className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <h3 className="text-base font-black text-white">
                    Tech Stack
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-bold bg-gray-800/60 text-gray-300 rounded-lg border border-gray-700/40 hover:border-cyan-500/40 hover:text-cyan-400 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Links */}
            <section
              className="group relative animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-800/30 rounded-xl p-5 hover:border-gray-700/30 transition-all h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <h3 className="text-base font-black text-white">
                    Quick Links
                  </h3>
                </div>

                <nav className="space-y-2">
                  {project.project_live_link && (
                    <Link
                      href={project.project_live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-2 p-2 bg-gray-800/40 hover:bg-blue-500/20 border border-gray-700/40 hover:border-blue-500/30 rounded-lg transition-all"
                    >
                      <ExternalLink className="w-3 h-3 text-blue-400 shrink-0" />
                      <span className="text-xs font-bold text-gray-300 group-hover/link:text-blue-400 transition-colors">
                        Live Demo
                      </span>
                    </Link>
                  )}
                  {project.project_repository && (
                    <Link
                      href={project.project_repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-2 p-2 bg-gray-800/40 hover:bg-gray-700/40 border border-gray-700/40 hover:border-gray-600 rounded-lg transition-all"
                    >
                      <Github className="w-3 h-3 text-gray-400 shrink-0 group-hover/link:text-white transition-colors" />
                      <span className="text-xs font-bold text-gray-300 group-hover/link:text-white transition-colors">
                        Source Code
                      </span>
                    </Link>
                  )}
                  {project.project_video && (
                    <Link
                      href={project.project_video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-2 p-2 bg-gray-800/40 hover:bg-purple-500/20 border border-gray-700/40 hover:border-purple-500/30 rounded-lg transition-all"
                    >
                      <Play className="w-3 h-3 text-purple-400 shrink-0" />
                      <span className="text-xs font-bold text-gray-300 group-hover/link:text-purple-400 transition-colors">
                        Video Demo
                      </span>
                    </Link>
                  )}
                </nav>
              </div>
            </section>
          </div>

          {/* Remaining Sections */}
          {sections.slice(1).map((section, idx) => (
            <section
              key={idx}
              className="group relative animate-fadeInUp mb-6"
              style={{ animationDelay: `${0.25 + idx * 0.05}s` }}
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-800/30 rounded-xl p-5 hover:border-gray-700/30 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
                    {idx === 0 ? (
                      <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                    ) : idx === 1 ? (
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <Shield className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                  </div>
                  <h2 className="text-base font-black text-white">
                    {section.title}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
                  {section.content.map((item, itemIdx) => {
                    const isListItem =
                      item.trim().startsWith("-") || item.includes("**");

                    if (isListItem) {
                      return (
                        <div
                          key={itemIdx}
                          className="flex items-start gap-2 group/item"
                        >
                          <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                          <div
                            className="text-gray-300 text-xs leading-relaxed flex-1"
                            dangerouslySetInnerHTML={{
                              __html: formatListItem(item),
                            }}
                          />
                        </div>
                      );
                    }

                    return (
                      <p
                        key={itemIdx}
                        className="text-gray-300 text-xs leading-relaxed md:col-span-2"
                        dangerouslySetInnerHTML={{
                          __html: formatListItem(item),
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          ))}

          {/* Video - Professional Size */}
          {project.project_video && (
            <section
              className="group relative animate-fadeInUp mb-6"
              style={{ animationDelay: `${0.25 + sections.length * 0.05}s` }}
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-800/30 rounded-xl p-5 hover:border-gray-700/30 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                    <Play className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <h2 className="text-base font-black text-white">
                    Project Demo
                  </h2>
                </div>

                <div className="max-w-4xl mx-auto">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-950/50 border border-gray-800/30 shadow-2xl">
                    {project.project_video.includes("youtube.com") ||
                    project.project_video.includes("youtu.be") ? (
                      <iframe
                        src={project.project_video.replace(
                          "watch?v=",
                          "embed/",
                        )}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`${project.project_name} Demo`}
                      />
                    ) : (
                      <video
                        src={project.project_video}
                        controls
                        className="w-full h-full"
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Bottom Nav */}
          <nav className="pt-6 border-t border-gray-800/30">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/60 text-gray-300 text-sm border border-gray-800/30 rounded-lg hover:border-cyan-500/30 hover:text-cyan-400 transition-all group font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              View All Projects
            </Link>
          </nav>
        </div>
      </main>
    </>
  );
}
