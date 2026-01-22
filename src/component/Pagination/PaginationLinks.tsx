import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import {
  PAGINATION_THEME_CONFIG,
  type PaginationTheme,
} from "@/constants/theme";

export type { PaginationTheme } from "@/constants/theme";

interface PaginationLinksProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  baseHref?: string;
  theme?: PaginationTheme;
  viewAllHref?: string;
  showViewAll?: boolean;
  pageParam?: string;
}

const themeClasses = PAGINATION_THEME_CONFIG;

export function PaginationLinks({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  baseHref = "",
  theme = "cyan",
  viewAllHref,
  showViewAll = true,
  pageParam = "page",
}: PaginationLinksProps) {
  const colors = themeClasses[theme];

  if (totalPages <= 1) return null;

  // Split baseHref into path and hash (e.g., "/#experience" -> "/" + "#experience")
  const [basePath, hash] = baseHref.includes("#")
    ? baseHref.split("#")
    : [baseHref, ""];

  const prevHref = hash
    ? `${basePath}?${pageParam}=${currentPage - 1}#${hash}`
    : `${basePath}?${pageParam}=${currentPage - 1}`;
  const nextHref = hash
    ? `${basePath}?${pageParam}=${currentPage + 1}#${hash}`
    : `${basePath}?${pageParam}=${currentPage + 1}`;

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap shrink-0">
      {hasPrevious ? (
        <Link
          href={prevHref}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 ${colors.hoverBorder} text-gray-400 ${colors.hoverText} transition-colors duration-300`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs font-medium">Previous</span>
        </Link>
      ) : (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 text-gray-400 opacity-30 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs font-medium">Previous</span>
        </span>
      )}

      <span className="text-gray-400 text-xs font-medium px-2">
        Page{" "}
        <span className={`${colors.activeText} font-bold`}>{currentPage}</span>{" "}
        of{" "}
        <span className={`${colors.activeText} font-bold`}>{totalPages}</span>
      </span>

      {showViewAll && viewAllHref && (
        <Link
          href={viewAllHref}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 ${colors.hoverBorder} text-gray-400 ${colors.hoverText} transition-colors duration-300`}
        >
          <Eye className="w-4 h-4" />
          <span className="text-xs font-medium">View All</span>
        </Link>
      )}

      {hasNext ? (
        <Link
          href={nextHref}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 ${colors.hoverBorder} text-gray-400 ${colors.hoverText} transition-colors duration-300`}
          aria-label="Next page"
        >
          <span className="text-xs font-medium">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 text-gray-400 opacity-30 cursor-not-allowed">
          <span className="text-xs font-medium">Next</span>
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </div>
  );
}
