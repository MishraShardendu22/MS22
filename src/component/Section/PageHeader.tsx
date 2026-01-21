"use client";

import type { ReactNode } from "react";

export type PageHeaderTheme = "cyan" | "blue" | "pink" | "purple";

interface PageHeaderProps {
  title: string;
  theme: PageHeaderTheme;
  // Search
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  // Filters
  showFilters: boolean;
  onToggleFilters: () => void;
  filterCount: number;
  filterLabel?: string;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  // Pagination
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  isPending?: boolean;
  // Results
  resultCount: number;
  resultLabel: string;
  // Filter content
  filterContent?: ReactNode;
}

const themeConfig: Record<
  PageHeaderTheme,
  {
    accentColor: string;
    accentBg: string;
    accentBorder: string;
    focusBorder: string;
    focusRing: string;
    hoverBorder: string;
    hoverText: string;
  }
> = {
  cyan: {
    accentColor: "text-cyan-400",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/40",
    focusBorder: "focus:border-cyan-500/50",
    focusRing: "focus:ring-cyan-500/20",
    hoverBorder: "hover:border-cyan-500/30",
    hoverText: "hover:text-cyan-400",
  },
  blue: {
    accentColor: "text-blue-400",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/40",
    focusBorder: "focus:border-blue-500/50",
    focusRing: "focus:ring-blue-500/20",
    hoverBorder: "hover:border-blue-500/30",
    hoverText: "hover:text-blue-400",
  },
  pink: {
    accentColor: "text-pink-400",
    accentBg: "bg-pink-500/10",
    accentBorder: "border-pink-500/40",
    focusBorder: "focus:border-pink-500/50",
    focusRing: "focus:ring-pink-500/20",
    hoverBorder: "hover:border-pink-500/30",
    hoverText: "hover:text-pink-400",
  },
  purple: {
    accentColor: "text-purple-400",
    accentBg: "bg-purple-500/10",
    accentBorder: "border-purple-500/40",
    focusBorder: "focus:border-purple-500/50",
    focusRing: "focus:ring-purple-500/20",
    hoverBorder: "hover:border-purple-500/30",
    hoverText: "hover:text-purple-400",
  },
};

export function PageHeader({
  title,
  theme,
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  showFilters,
  onToggleFilters,
  filterCount,
  filterLabel = "Filter",
  hasActiveFilters,
  onClearFilters,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  isPending = false,
  resultCount,
  resultLabel,
  filterContent,
}: PageHeaderProps) {
  const colors = themeConfig[theme];

  return (
    <div className="mb-6 space-y-4">
      {/* Header Row: Title + Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            <span className={`${colors.accentColor} font-medium`}>
              {resultCount}
            </span>{" "}
            {resultLabel}
            {isPending && (
              <span className={`${colors.accentColor} ml-2`}>•••</span>
            )}
          </p>
        </div>

        {/* Pagination - Landing page style */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onPrevPage}
              disabled={currentPage === 1 || isPending}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 ${colors.hoverBorder} text-gray-400 ${colors.hoverText} transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed`}
              aria-label="Previous page"
            >
              <span className="text-xs font-medium">← Previous</span>
            </button>

            <span className="text-gray-400 text-xs font-medium px-2">
              Page{" "}
              <span className={`${colors.accentColor} font-bold`}>
                {currentPage}
              </span>{" "}
              of{" "}
              <span className={`${colors.accentColor} font-bold`}>
                {totalPages}
              </span>
            </span>

            <button
              type="button"
              onClick={onNextPage}
              disabled={currentPage === totalPages || isPending}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 ${colors.hoverBorder} text-gray-400 ${colors.hoverText} transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed`}
              aria-label="Next page"
            >
              <span className="text-xs font-medium">Next →</span>
            </button>
          </div>
        )}
      </div>

      {/* Search and Filters Row */}
      <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className={`w-full px-4 py-2.5 bg-gray-900/80 border border-gray-800/50 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none ${colors.focusBorder} focus:ring-1 ${colors.focusRing} transition-all`}
          />
        </div>

        {/* Filter Toggle */}
        <button
          type="button"
          onClick={onToggleFilters}
          className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
            showFilters || filterCount > 0
              ? `${colors.accentBg} ${colors.accentColor} border ${colors.accentBorder}`
              : "bg-gray-900/80 text-gray-400 border border-gray-800/50 hover:border-gray-700 hover:text-gray-300"
          }`}
        >
          <span>{filterLabel}</span>
          {filterCount > 0 && (
            <span
              className={`ml-1 px-1.5 py-0.5 text-xs font-bold ${colors.accentBg} text-white rounded`}
            >
              {filterCount}
            </span>
          )}
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg font-medium text-sm bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all"
          >
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Filter Content */}
      {showFilters && filterContent && (
        <div className="p-3 bg-gray-900/90 border border-gray-800/50 rounded-lg">
          {filterContent}
        </div>
      )}
    </div>
  );
}
