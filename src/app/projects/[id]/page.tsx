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
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sidebar } from "@/component/Sidebar";
import { generatePageMetadata } from "@/lib/metadata";
import { projectsAPI } from "@/static/api/api.request";
import type { Project } from "@/static/api/api.types";

// Use dynamic rendering to avoid rate limiting during build
export const dynamic = "force-dynamic";
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await projectsAPI.getProjectById(id);

    if (response.status === 200 && response.data) {
      const project = response.data;
      const shortDesc =
        project.description
          .split("\n")
          .find(
            (line) =>
              line.trim() && !line.startsWith("#") && !line.startsWith("**"),
          )
          ?.trim() || project.description.substring(0, 160);

      return generatePageMetadata({
        title: project.project_name,
        description: shortDesc,
        path: `/projects/${id}`,
        keywords: [
          ...project.skills,
          "project",
          "software development",
          project.project_name.toLowerCase(),
        ],
      });
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return generatePageMetadata({
    title: "Project Details",
    description:
      "View detailed information about this software development project.",
    path: `/projects/${id}`,
  });
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

  // Extract YouTube embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("watch?v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const hasVideo = Boolean(project.project_video);
  const hasLiveLink = Boolean(project.project_live_link);

  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Minimal Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl" />
        </div>

        {/* Compact Sticky Header */}
        <div className="sticky top-0 z-50 border-b border-gray-800/30 bg-gray-950/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-gray-400 text-xs hover:text-cyan-400 transition-all group bg-gray-900/30 hover:bg-gray-900/60 rounded-md border border-gray-800/30 hover:border-cyan-500/30"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-medium">Back</span>
            </Link>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5">
              {project.project_live_link && (
                <Link
                  href={project.project_live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-md font-medium hover:bg-cyan-500/20 transition-all border border-cyan-500/30"
                >
                  <ExternalLink className="w-3 h-3" />
                  Live
                </Link>
              )}
              {project.project_repository && (
                <Link
                  href={project.project_repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-800/60 text-gray-300 text-xs border border-gray-700/40 rounded-md font-medium hover:text-white transition-all"
                >
                  <Github className="w-3 h-3" />
                  Code
                </Link>
              )}
              {project.project_video && (
                <Link
                  href={project.project_video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-500/10 text-purple-400 text-xs border border-purple-500/30 rounded-md font-medium hover:bg-purple-500/20 transition-all"
                >
                  <Play className="w-3 h-3" />
                  Demo
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-4">
              {/* Project Title & Description */}
              <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/30 rounded-lg p-4">
                <h1 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">
                  {project.project_name}
                </h1>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.small_description}
                </p>
              </div>

              {/* Live Preview iframe */}
              {hasLiveLink && project.project_live_link && (
                <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                    <h2 className="text-sm font-bold text-white">
                      Live Preview
                    </h2>
                    <Link
                      href={project.project_live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-xs text-cyan-400 hover:underline"
                    >
                      Open in new tab ↗
                    </Link>
                  </div>
                  <div className="aspect-video rounded-md overflow-hidden bg-gray-950 border border-gray-800/50">
                    <iframe
                      src={project.project_live_link}
                      className="w-full h-full"
                      title={`${project.project_name} Live Preview`}
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </div>
                </div>
              )}

              {/* Video Demo */}
              {hasVideo && project.project_video && (
                <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Play className="w-3.5 h-3.5 text-purple-400" />
                    <h2 className="text-sm font-bold text-white">Video Demo</h2>
                  </div>
                  <div className="aspect-video rounded-md overflow-hidden bg-gray-950 border border-gray-800/50">
                    {project.project_video.includes("youtube.com") ||
                    project.project_video.includes("youtu.be") ? (
                      <iframe
                        src={getYouTubeEmbedUrl(project.project_video)}
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
                      >
                        <track kind="captions" />
                      </video>
                    )}
                  </div>
                </div>
              )}

              {/* Content Sections */}
              {sections.map((section, idx) => (
                <div
                  key={`section-${section.title}-${idx}`}
                  className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/30 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1 bg-cyan-500/10 rounded">
                      {idx === 0 ? (
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                      ) : idx === 1 ? (
                        <GitBranch className="w-3 h-3 text-cyan-400" />
                      ) : idx === 2 ? (
                        <Zap className="w-3 h-3 text-cyan-400" />
                      ) : (
                        <Shield className="w-3 h-3 text-cyan-400" />
                      )}
                    </div>
                    <h2 className="text-sm font-bold text-white">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-1.5">
                    {section.content.map((item, itemIdx) => {
                      const isListItem =
                        item.trim().startsWith("-") || item.includes("**");
                      const itemKey = `${section.title}-${itemIdx}`;

                      if (isListItem) {
                        return (
                          <div key={itemKey} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0 mt-0.5" />
                            <div
                              className="text-gray-300 text-xs leading-relaxed"
                              // biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted API content
                              dangerouslySetInnerHTML={{
                                __html: formatListItem(item),
                              }}
                            />
                          </div>
                        );
                      }

                      return (
                        <p
                          key={itemKey}
                          className="text-gray-300 text-xs leading-relaxed"
                          // biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted API content
                          dangerouslySetInnerHTML={{
                            __html: formatListItem(item),
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-4">
              {/* Tech Stack */}
              <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/30 rounded-lg p-4 sticky top-16">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-3.5 h-3.5 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs font-medium bg-gray-800/60 text-gray-300 rounded border border-gray-700/40 hover:border-cyan-500/40 hover:text-cyan-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  <h3 className="text-sm font-bold text-white">Links</h3>
                </div>
                <div className="space-y-2">
                  {project.project_live_link && (
                    <Link
                      href={project.project_live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-gray-800/40 hover:bg-cyan-500/10 border border-gray-700/40 hover:border-cyan-500/30 rounded-md transition-all group"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-xs font-medium text-gray-300 group-hover:text-cyan-400 transition-colors">
                        Live Demo
                      </span>
                    </Link>
                  )}
                  {project.project_repository && (
                    <Link
                      href={project.project_repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-gray-800/40 hover:bg-gray-700/40 border border-gray-700/40 hover:border-gray-600 rounded-md transition-all group"
                    >
                      <Github className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
                      <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                        Source Code
                      </span>
                    </Link>
                  )}
                  {project.project_video && (
                    <Link
                      href={project.project_video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-gray-800/40 hover:bg-purple-500/10 border border-gray-700/40 hover:border-purple-500/30 rounded-md transition-all group"
                    >
                      <Play className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-xs font-medium text-gray-300 group-hover:text-purple-400 transition-colors">
                        Video Demo
                      </span>
                    </Link>
                  )}
                </div>
              </div>

              {/* GitHub Repository Embed */}
              {project.project_repository?.includes("github.com") && (
                <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Github className="w-3.5 h-3.5 text-gray-400" />
                    <h3 className="text-sm font-bold text-white">Repository</h3>
                  </div>
                  <div className="aspect-4/3 rounded-md overflow-hidden bg-gray-950 border border-gray-800/50">
                    <iframe
                      src={`${project.project_repository}?tab=readme`}
                      className="w-full h-full"
                      title={`${project.project_name} Repository`}
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
