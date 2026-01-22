/**
 * Centralized theme configuration
 * Used across components for consistent color theming
 */

// Base theme colors
export const THEME_COLORS = [
  "cyan",
  "blue",
  "pink",
  "purple",
  "emerald",
] as const;
export type ThemeColor = (typeof THEME_COLORS)[number];

// Common theme types for different components
export type ListCardTheme = "cyan" | "blue" | "pink" | "purple";
export type PageHeaderTheme = "cyan" | "blue" | "pink" | "purple";
export type PaginationTheme = "cyan" | "blue" | "emerald" | "pink" | "purple";
export type SectionTheme = "cyan" | "blue" | "emerald" | "pink" | "purple";
export type DetailTreeTheme = "cyan" | "blue" | "purple" | "pink";

// Shared active/status badge styles (green for active status)
export const ACTIVE_BADGE_STYLES = {
  activeBg: "bg-green-500/10",
  activeText: "text-green-400",
  activeBorder: "border-green-500/25",
} as const;

// List card theme configuration
export interface ListCardThemeConfig {
  border: string;
  gradientBg: string;
  titleHover: string;
  subtitleColor: string;
  techExtraBg: string;
  techExtraText: string;
  techExtraBorder: string;
  viewColor: string;
  activeBg: string;
  activeText: string;
  activeBorder: string;
}

export const LIST_CARD_THEME_CONFIG: Record<
  ListCardTheme,
  ListCardThemeConfig
> = {
  cyan: {
    border: "hover:border-cyan-500/40",
    gradientBg: "from-cyan-500 via-blue-500 to-purple-600",
    titleHover: "group-hover:text-cyan-400",
    subtitleColor: "text-cyan-400/80",
    techExtraBg: "bg-cyan-500/10",
    techExtraText: "text-cyan-400",
    techExtraBorder: "border-cyan-500/25",
    viewColor: "text-cyan-400",
    ...ACTIVE_BADGE_STYLES,
  },
  blue: {
    border: "hover:border-blue-500/40",
    gradientBg: "from-blue-500 via-purple-500 to-pink-500",
    titleHover: "group-hover:text-blue-400",
    subtitleColor: "text-blue-400/80",
    techExtraBg: "bg-blue-500/10",
    techExtraText: "text-blue-400",
    techExtraBorder: "border-blue-500/25",
    viewColor: "text-blue-400",
    ...ACTIVE_BADGE_STYLES,
  },
  pink: {
    border: "hover:border-pink-500/40",
    gradientBg: "from-pink-500 via-purple-500 to-cyan-500",
    titleHover: "group-hover:text-pink-400",
    subtitleColor: "text-pink-400/80",
    techExtraBg: "bg-pink-500/10",
    techExtraText: "text-pink-400",
    techExtraBorder: "border-pink-500/25",
    viewColor: "text-pink-400",
    ...ACTIVE_BADGE_STYLES,
  },
  purple: {
    border: "hover:border-purple-500/40",
    gradientBg: "from-purple-500 via-pink-500 to-cyan-500",
    titleHover: "group-hover:text-purple-400",
    subtitleColor: "text-purple-400/80",
    techExtraBg: "bg-purple-500/10",
    techExtraText: "text-purple-400",
    techExtraBorder: "border-purple-500/25",
    viewColor: "text-purple-400",
    ...ACTIVE_BADGE_STYLES,
  },
};

// Page header theme configuration
export interface PageHeaderThemeConfig {
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  focusBorder: string;
  focusRing: string;
  hoverBorder: string;
  hoverText: string;
}

export const PAGE_HEADER_THEME_CONFIG: Record<
  PageHeaderTheme,
  PageHeaderThemeConfig
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

// Empty state theme configuration
export const EMPTY_STATE_THEME_CONFIG: Record<ListCardTheme, string> = {
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20",
  pink: "bg-pink-500/10 text-pink-400 border-pink-500/30 hover:bg-pink-500/20",
  purple:
    "bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20",
};

export const EMPTY_STATE_DEFAULT_ICONS: Record<ListCardTheme, string> = {
  cyan: "📁",
  blue: "💼",
  pink: "❤️",
  purple: "🏆",
};

// Pagination theme configuration
export interface PaginationThemeConfig {
  hoverBorder: string;
  hoverText: string;
  activeText: string;
}

export const PAGINATION_THEME_CONFIG: Record<
  PaginationTheme,
  PaginationThemeConfig
> = {
  cyan: {
    hoverBorder: "hover:border-cyan-500/30",
    hoverText: "hover:text-cyan-400",
    activeText: "text-cyan-400",
  },
  blue: {
    hoverBorder: "hover:border-blue-500/30",
    hoverText: "hover:text-blue-400",
    activeText: "text-blue-400",
  },
  emerald: {
    hoverBorder: "hover:border-emerald-500/30",
    hoverText: "hover:text-emerald-400",
    activeText: "text-emerald-400",
  },
  pink: {
    hoverBorder: "hover:border-pink-500/30",
    hoverText: "hover:text-pink-400",
    activeText: "text-pink-400",
  },
  purple: {
    hoverBorder: "hover:border-purple-500/30",
    hoverText: "hover:text-purple-400",
    activeText: "text-purple-400",
  },
};
