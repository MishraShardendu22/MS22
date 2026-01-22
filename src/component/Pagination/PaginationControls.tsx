import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import {
  PAGINATION_THEME_CONFIG,
  type PaginationTheme,
} from "@/constants/theme";

export type { PaginationTheme } from "@/constants/theme";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  isLoading?: boolean;
  theme?: PaginationTheme;
  viewAllHref?: string;
  showViewAll?: boolean;
}

const themeClasses = PAGINATION_THEME_CONFIG;

export function PaginationControls({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  isLoading = false,
  theme = "cyan",
  viewAllHref,
  showViewAll = true,
}: PaginationControlsProps) {
  const colors = themeClasses[theme];

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap shrink-0">
      <button
        type="button"
        onClick={onPrevPage}
        disabled={currentPage === 1 || isLoading}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 ${colors.hoverBorder} text-gray-400 ${colors.hoverText} transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="text-xs font-medium">Previous</span>
      </button>

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

      <button
        type="button"
        onClick={onNextPage}
        disabled={currentPage === totalPages || isLoading}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 ${colors.hoverBorder} text-gray-400 ${colors.hoverText} transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Next page"
      >
        <span className="text-xs font-medium">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
