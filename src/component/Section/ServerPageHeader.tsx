import Link from "next/link";
import type { ReactNode } from "react";
import { HeaderSearchButton, SearchModalContent } from "@/component/Search";
import {
  PAGE_HEADER_THEME_CONFIG,
  type PageHeaderTheme,
} from "@/constants/theme";
import type { SearchResultType } from "@/static/api/api.types";

export type { PageHeaderTheme } from "@/constants/theme";

// Map theme to search filter type
const themeToSearchFilter: Record<PageHeaderTheme, SearchResultType> = {
  cyan: "project",
  blue: "experience",
  purple: "certificate",
  pink: "volunteer",
};

interface ServerPageHeaderProps {
  title: string;
  theme: PageHeaderTheme;
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
  resultCount: number;
  resultLabel: string;
  children?: ReactNode;
}

const themeConfig = PAGE_HEADER_THEME_CONFIG;

function buildUrl(
  basePath: string,
  params: Record<string, string>,
  updates: Record<string, string | undefined>,
): string {
  const newParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) newParams.set(key, value);
  }

  for (const [key, value] of Object.entries(updates)) {
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
  }

  const queryString = newParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

export function ServerPageHeader({
  title,
  theme,
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
  resultCount,
  resultLabel,
  children,
}: ServerPageHeaderProps) {
  const colors = themeConfig[theme];

  const prevPageUrl = buildUrl(basePath, searchParams, {
    page: String(currentPage - 1),
  });
  const nextPageUrl = buildUrl(basePath, searchParams, {
    page: String(currentPage + 1),
  });

  const searchFilterType = themeToSearchFilter[theme];

  return (
    <div className="mb-6 space-y-4">
      {/* Header Row */}
      <div className="flex flex-col gap-4">
        {/* Title, Search, and Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="text-sm text-gray-500 mt-1">
              <span className={`${colors.accentColor} font-medium`}>
                {resultCount}
              </span>{" "}
              {resultLabel}
              {totalPages > 1 && (
                <span className="ml-2 text-gray-600">
                  • Page {currentPage} of {totalPages}
                </span>
              )}
            </p>
          </div>

          {/* Search and Pagination */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Button */}
            <HeaderSearchButton
              filterType={searchFilterType}
              label={`Search ${title}`}
              theme={theme}
            />

            {/* Pagination */}
            <div className="flex items-center gap-2">
              {currentPage > 1 ? (
                <Link
                  href={prevPageUrl}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 ${colors.hoverBorder} text-gray-400 ${colors.hoverText} transition-colors duration-300`}
                >
                  <span className="text-xs font-medium">← Prev</span>
                </Link>
              ) : (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 text-gray-600 cursor-not-allowed opacity-50">
                  <span className="text-xs font-medium">← Prev</span>
                </span>
              )}

              <span className="text-gray-400 text-xs font-medium px-2">
                <span className={`${colors.accentColor} font-bold`}>
                  {currentPage}
                </span>
                {" / "}
                <span className={`${colors.accentColor} font-bold`}>
                  {totalPages}
                </span>
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={nextPageUrl}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 ${colors.hoverBorder} text-gray-400 ${colors.hoverText} transition-colors duration-300`}
                >
                  <span className="text-xs font-medium">Next →</span>
                </Link>
              ) : (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 text-gray-600 cursor-not-allowed opacity-50">
                  <span className="text-xs font-medium">Next →</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModalContent />

      {children}
    </div>
  );
}
