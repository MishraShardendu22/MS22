import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageSearch } from "@/component/Search";
import type { DetailTreeData } from "@/types/detailTree";
import { getLinkLabel } from "@/utils/linkDetection";
import { ExpandableTreeSection } from "./ExpandableTreeSection";
import { TreeContainer } from "./TreeContainer";

interface DetailTreeViewProps {
  data: DetailTreeData;
}

const themeColors = {
  cyan: {
    accent: "text-cyan-400",
    border: "border-cyan-500/40",
    bg: "bg-cyan-500/10",
    hover: "hover:border-cyan-500/50",
    gradient: "from-cyan-500 via-blue-500 to-purple-600",
    glow: "from-cyan-500/10 to-purple-500/10",
    linkBg: "bg-linear-to-r from-cyan-500/20 to-blue-500/20",
    linkBorder: "border-cyan-500/40",
    linkHover: "hover:from-cyan-500/30 hover:to-blue-500/30",
    headerBg: "bg-cyan-950/20",
    headerBorder: "border-cyan-500/20",
  },
  blue: {
    accent: "text-blue-400",
    border: "border-blue-500/40",
    bg: "bg-blue-500/10",
    hover: "hover:border-blue-500/50",
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    glow: "from-blue-500/10 to-purple-500/10",
    linkBg: "bg-linear-to-r from-blue-500/20 to-indigo-500/20",
    linkBorder: "border-blue-500/40",
    linkHover: "hover:from-blue-500/30 hover:to-indigo-500/30",
    headerBg: "bg-blue-950/20",
    headerBorder: "border-blue-500/20",
  },
  purple: {
    accent: "text-purple-400",
    border: "border-purple-500/40",
    bg: "bg-purple-500/10",
    hover: "hover:border-purple-500/50",
    gradient: "from-purple-500 via-pink-500 to-rose-600",
    glow: "from-purple-500/10 to-pink-500/10",
    linkBg: "bg-linear-to-r from-purple-500/20 to-pink-500/20",
    linkBorder: "border-purple-500/40",
    linkHover: "hover:from-purple-500/30 hover:to-pink-500/30",
    headerBg: "bg-purple-950/20",
    headerBorder: "border-purple-500/20",
  },
  pink: {
    accent: "text-pink-400",
    border: "border-pink-500/40",
    bg: "bg-pink-500/10",
    hover: "hover:border-pink-500/50",
    gradient: "from-pink-500 via-rose-500 to-purple-600",
    glow: "from-pink-500/10 to-purple-500/10",
    linkBg: "bg-linear-to-r from-pink-500/20 to-rose-500/20",
    linkBorder: "border-pink-500/40",
    linkHover: "hover:from-pink-500/30 hover:to-rose-500/30",
    headerBg: "bg-pink-950/20",
    headerBorder: "border-pink-500/20",
  },
};

const badgeVariants = {
  default: "bg-gray-500/10 border-gray-500/20 text-gray-400",
  success: "bg-green-500/10 border-green-500/20 text-green-400",
  info: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
};

export function DetailTreeView({ data }: DetailTreeViewProps) {
  const colors = themeColors[data.theme];
  const hasTree = data.tree && data.tree.length > 0;
  const hasSections = data.sections && data.sections.length > 0;

  return (
    <div className="h-screen flex flex-col relative z-10">
      {/* VS Code-style Header Bar */}
      <header
        className={`shrink-0 px-4 py-3 ${colors.headerBg} border-b ${colors.headerBorder} backdrop-blur-sm`}
      >
        <div className="max-w-screen-2xl flex items-center gap-4">
          {/* Back Navigation */}
          <Link href={data.backLink.href}>
            <button
              type="button"
              className={`flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-900/60 border border-gray-700/50 text-gray-400 rounded-md ${colors.hover} ${colors.accent} transition-all`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{data.backLink.label}</span>
            </button>
          </Link>

          {/* Title Block */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {data.logo && (
              <div className="w-8 h-8 rounded-md bg-gray-800/50 border border-gray-700/50 flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src={data.logo}
                  alt={data.title}
                  width={32}
                  height={32}
                  className="object-contain p-1"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg font-semibold text-white truncate">
                  {data.title}
                </h1>
                {data.badge && (
                  <span
                    className={`px-2 py-0.5 text-xs font-medium border rounded-full ${badgeVariants[data.badge.variant]}`}
                  >
                    {data.badge.label}
                  </span>
                )}
              </div>
              {data.subtitle && (
                <p className={`text-sm ${colors.accent} truncate`}>
                  {data.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          {data.links.length > 0 && (
            <div className="hidden md:flex items-center gap-2">
              {data.links.slice(0, 3).map((link) => {
                const label = getLinkLabel(link.type);
                return (
                  <Link
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium ${colors.bg} ${colors.accent} border ${colors.border} rounded-md hover:bg-opacity-20 transition-colors`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>{link.label || label}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Page Search Button */}
          <PageSearch defaultFilter={data.entityType} />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Tree View */}
        <main className="flex-1 flex flex-col min-w-0 bg-gray-950">
          {/* VS Code-style Tab Bar */}
          <div className="shrink-0 flex items-center px-3 h-9 bg-gray-900/60 border-b border-gray-800/50">
            <div
              className={`flex items-center gap-2 px-3 py-1 text-sm ${colors.accent} bg-gray-950 border-t-2 ${colors.border} rounded-t-sm -mb-px`}
            >
              <span className="w-3 h-3 opacity-60">
                {data.entityType === "project" && "📁"}
                {data.entityType === "certificate" && "📜"}
                {data.entityType === "experience" && "💼"}
                {data.entityType === "volunteer" && "🤝"}
              </span>
              <span className="truncate max-w-50">{data.title}</span>
            </div>
          </div>

          {/* Tree Content */}
          <div className="flex-1 overflow-hidden">
            {hasTree ? (
              <TreeContainer nodes={data.tree} theme={data.theme} />
            ) : hasSections ? (
              /* Fallback to legacy sections */
              <div className="p-4 space-y-4 overflow-auto h-full">
                {data.sections?.map((section) => (
                  <ExpandableTreeSection
                    key={section.id}
                    section={section}
                    theme={data.theme}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No content available
              </div>
            )}
          </div>
        </main>

        {/* Right Panel - Sidebar (Desktop only) */}
        <aside className="hidden lg:flex w-72 xl:w-80 shrink-0 flex-col border-l border-gray-800/50 bg-gray-900/40">
          <div className="shrink-0 h-9 flex items-center px-4 border-b border-gray-800/50 bg-gray-900/60">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Details
            </span>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-6">
            {/* Quick Meta */}
            {data.quickMeta && data.quickMeta.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Summary
                </h3>
                {data.quickMeta.map((field) => (
                  <div key={field.label} className="flex flex-col gap-0.5">
                    <span className="text-xs text-gray-500">{field.label}</span>
                    <span className="text-sm text-gray-200">{field.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Links (mobile fallback + full list) */}
            {data.links.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Links
                </h3>
                <div className="space-y-2">
                  {data.links.map((link) => {
                    const label = getLinkLabel(link.type);
                    return (
                      <Link
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-3 py-2 text-sm ${colors.bg} ${colors.accent} border ${colors.border} rounded-lg hover:bg-opacity-20 transition-colors`}
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{link.label || label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Technologies */}
            {data.technologies && data.technologies.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 text-xs font-medium ${colors.bg} ${colors.accent} rounded border ${colors.border}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
