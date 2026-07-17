import { Award, Briefcase, FolderGit2, Heart } from "lucide-react";
import type { PageHeaderTheme } from "@/constants/theme";
import type { SearchResultType } from "@/static/api/api.types";

export const FILTER_CONFIG = {
  project: {
    icon: FolderGit2,
    label: "Projects",
    color: "text-violet-400",
    bgColor: "bg-violet-500/15",
    borderColor: "border-violet-500/50",
  },
  experience: {
    icon: Briefcase,
    label: "Experience",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/15",
    borderColor: "border-emerald-500/50",
  },
  certificate: {
    icon: Award,
    label: "Certificates",
    color: "text-purple-400",
    bgColor: "bg-purple-500/15",
    borderColor: "border-purple-500/50",
  },
  volunteer: {
    icon: Heart,
    label: "Volunteer",
    color: "text-rose-400",
    bgColor: "bg-rose-500/15",
    borderColor: "border-rose-500/50",
  },
} as const;

export const FILTER_TYPES = Object.keys(FILTER_CONFIG) as SearchResultType[];

export function getPageFilter(pathname: string): SearchResultType | undefined {
  if (pathname.startsWith("/projects")) return "project";
  if (pathname.startsWith("/experiences")) return "experience";
  if (pathname.startsWith("/certificates")) return "certificate";
  if (pathname.startsWith("/volunteer")) return "volunteer";
  return undefined;
}

export const THEME_TO_SEARCH_FILTER: Record<PageHeaderTheme, SearchResultType> =
  {
    blue: "experience",
    pink: "volunteer",
    purple: "certificate",
    violet: "project",
  };
