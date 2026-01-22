import Link from "next/link";
import {
  EMPTY_STATE_DEFAULT_ICONS,
  EMPTY_STATE_THEME_CONFIG,
  type ListCardTheme,
} from "@/constants/theme";

type ThemeType = ListCardTheme;

export interface EmptyStateProps {
  title: string;
  description: string;
  hasFilters?: boolean;
  onClearFilters?: () => void;
  clearFiltersHref?: string;
  theme: ThemeType;
  icon?: string;
}

const themeClasses = EMPTY_STATE_THEME_CONFIG;
const defaultIcons = EMPTY_STATE_DEFAULT_ICONS;

export function EmptyState({
  title,
  description,
  hasFilters = false,
  onClearFilters,
  clearFiltersHref,
  theme,
  icon,
}: EmptyStateProps) {
  const displayIcon = icon ?? defaultIcons[theme];

  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-900/80 border border-gray-800/50 mb-4">
        <span className="text-2xl">{displayIcon}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-4">{description}</p>
      {hasFilters && clearFiltersHref && (
        <Link
          href={clearFiltersHref}
          className={`inline-flex items-center gap-2 px-4 py-2 ${themeClasses[theme]} border rounded-lg font-medium text-sm transition-all`}
        >
          Clear filters
        </Link>
      )}
      {hasFilters && onClearFilters && !clearFiltersHref && (
        <button
          type="button"
          onClick={onClearFilters}
          className={`inline-flex items-center gap-2 px-4 py-2 ${themeClasses[theme]} border rounded-lg font-medium text-sm transition-all`}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
