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

// Error state theme configuration
export type ErrorStateTheme = "red" | "orange" | "yellow";

export interface ErrorStateThemeConfig {
  bg: string;
  ring: string;
  icon: string;
  button: string;
  shadow: string;
  border: string;
  text: string;
}

export const ERROR_STATE_THEME_CONFIG: Record<
  ErrorStateTheme,
  ErrorStateThemeConfig
> = {
  red: {
    bg: "from-red-500/20 to-orange-500/20",
    ring: "ring-red-500/30",
    icon: "text-red-400",
    button:
      "from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600",
    shadow: "shadow-orange-500/30",
    border: "border-red-900/30",
    text: "text-red-400",
  },
  orange: {
    bg: "from-orange-500/20 to-yellow-500/20",
    ring: "ring-orange-500/30",
    icon: "text-orange-400",
    button:
      "from-orange-500 via-yellow-500 to-amber-500 hover:from-orange-600 hover:via-yellow-600 hover:to-amber-600",
    shadow: "shadow-orange-500/30",
    border: "border-orange-900/30",
    text: "text-orange-400",
  },
  yellow: {
    bg: "from-yellow-500/20 to-amber-500/20",
    ring: "ring-yellow-500/30",
    icon: "text-yellow-400",
    button:
      "from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600",
    shadow: "shadow-yellow-500/30",
    border: "border-yellow-900/30",
    text: "text-yellow-400",
  },
};

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

export interface DetailTreeThemeConfig {
  text: string;
  textHover: string;
  border: string;
  bg: string;
  bgHover: string;
  bullet: string;
  line: string;
}

export const DETAIL_TREE_THEME_CONFIG: Record<
  DetailTreeTheme,
  DetailTreeThemeConfig
> = {
  cyan: {
    text: "text-cyan-400",
    textHover: "hover:text-cyan-300",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    bgHover: "hover:bg-cyan-500/5",
    bullet: "bg-cyan-500",
    line: "border-cyan-500/20",
  },
  blue: {
    text: "text-blue-400",
    textHover: "hover:text-blue-300",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    bgHover: "hover:bg-blue-500/5",
    bullet: "bg-blue-500",
    line: "border-blue-500/20",
  },
  purple: {
    text: "text-purple-400",
    textHover: "hover:text-purple-300",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    bgHover: "hover:bg-purple-500/5",
    bullet: "bg-purple-500",
    line: "border-purple-500/20",
  },
  pink: {
    text: "text-pink-400",
    textHover: "hover:text-pink-300",
    border: "border-pink-500/30",
    bg: "bg-pink-500/10",
    bgHover: "hover:bg-pink-500/5",
    bullet: "bg-pink-500",
    line: "border-pink-500/20",
  },
};

// Detail tree view theme configuration (for detail pages)
export interface DetailTreeViewThemeConfig {
  accent: string;
  border: string;
  bg: string;
  hover: string;
  gradient: string;
  glow: string;
  linkBg: string;
  linkBorder: string;
  linkHover: string;
  headerBg: string;
  headerBorder: string;
}

export const DETAIL_TREE_VIEW_THEME_CONFIG: Record<
  DetailTreeTheme,
  DetailTreeViewThemeConfig
> = {
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
    gradient: "from-pink-500 via-rose-500 to-orange-600",
    glow: "from-pink-500/10 to-rose-500/10",
    linkBg: "bg-linear-to-r from-pink-500/20 to-rose-500/20",
    linkBorder: "border-pink-500/40",
    linkHover: "hover:from-pink-500/30 hover:to-rose-500/30",
    headerBg: "bg-pink-950/20",
    headerBorder: "border-pink-500/20",
  },
};

// Loading state theme configuration
export type LoadingStateTheme = "cyan" | "blue" | "purple" | "pink" | "emerald";

export interface LoadingStateThemeConfig {
  gradient: string;
  text: string;
}

export const LOADING_STATE_THEME_CONFIG: Record<
  LoadingStateTheme,
  LoadingStateThemeConfig
> = {
  cyan: {
    gradient: "from-cyan-400 via-blue-400 to-cyan-400",
    text: "text-cyan-400/70",
  },
  blue: {
    gradient: "from-blue-400 via-indigo-400 to-blue-400",
    text: "text-blue-400/70",
  },
  purple: {
    gradient: "from-purple-400 via-pink-400 to-purple-400",
    text: "text-purple-400/70",
  },
  pink: {
    gradient: "from-pink-400 via-rose-400 to-pink-400",
    text: "text-pink-400/70",
  },
  emerald: {
    gradient: "from-emerald-400 via-teal-400 to-emerald-400",
    text: "text-emerald-400/70",
  },
};

// Section header theme configuration
export const SECTION_HEADER_GRADIENTS: Record<SectionTheme, string> = {
  pink: "from-pink-400 via-rose-400 to-red-400",
  cyan: "from-cyan-400 via-blue-400 to-purple-400",
  blue: "from-blue-400 via-indigo-400 to-purple-400",
  emerald: "from-emerald-400 via-teal-400 to-green-400",
  purple: "from-purple-400 via-violet-400 to-indigo-400",
};

// Section wrapper theme configuration
export interface SectionWrapperThemeConfig {
  primary: string;
  secondary: string;
}

export const SECTION_WRAPPER_THEME_CONFIG: Record<
  SectionTheme,
  SectionWrapperThemeConfig
> = {
  cyan: { primary: "bg-cyan-500/5", secondary: "bg-blue-500/5" },
  blue: { primary: "bg-blue-500/5", secondary: "bg-indigo-500/5" },
  emerald: { primary: "bg-emerald-500/5", secondary: "bg-teal-500/5" },
  pink: { primary: "bg-pink-500/5", secondary: "bg-rose-500/5" },
  purple: { primary: "bg-purple-500/5", secondary: "bg-violet-500/5" },
};

// Unified card theme configuration
export type UnifiedCardTheme = "blue" | "pink" | "emerald" | "purple";

export interface UnifiedCardThemeConfig {
  border: string;
  shadow: string;
  gradient: string;
  titleHover: string;
  certificateBg: string;
  certificateText: string;
  certificateBorder: string;
  techExtraBg: string;
  techExtraText: string;
  techExtraBorder: string;
}

export const UNIFIED_CARD_THEME_CONFIG: Record<
  UnifiedCardTheme,
  UnifiedCardThemeConfig
> = {
  blue: {
    border: "hover:border-blue-500/40",
    shadow: "hover:shadow-blue-500/10",
    gradient: "from-blue-500/5 via-transparent to-indigo-500/5",
    titleHover: "group-hover:text-blue-400",
    certificateBg: "bg-blue-500/10 hover:bg-blue-500/20",
    certificateText: "text-blue-400 hover:text-blue-300",
    certificateBorder: "border-blue-500/30",
    techExtraBg: "bg-blue-500/10",
    techExtraText: "text-blue-400",
    techExtraBorder: "border-blue-500/30",
  },
  pink: {
    border: "hover:border-pink-500/40",
    shadow: "hover:shadow-pink-500/10",
    gradient: "from-pink-500/5 via-transparent to-rose-500/5",
    titleHover: "group-hover:text-pink-400",
    certificateBg: "bg-pink-500/10 hover:bg-pink-500/20",
    certificateText: "text-pink-400 hover:text-pink-300",
    certificateBorder: "border-pink-500/30",
    techExtraBg: "bg-pink-500/10",
    techExtraText: "text-pink-400",
    techExtraBorder: "border-pink-500/30",
  },
  emerald: {
    border: "hover:border-emerald-500/40",
    shadow: "hover:shadow-emerald-500/10",
    gradient: "from-emerald-500/5 via-transparent to-teal-500/5",
    titleHover: "group-hover:text-emerald-400",
    certificateBg: "bg-emerald-500/10 hover:bg-emerald-500/20",
    certificateText: "text-emerald-400 hover:text-emerald-300",
    certificateBorder: "border-emerald-500/30",
    techExtraBg: "bg-emerald-500/10",
    techExtraText: "text-emerald-400",
    techExtraBorder: "border-emerald-500/30",
  },
  purple: {
    border: "hover:border-purple-500/40",
    shadow: "hover:shadow-purple-500/10",
    gradient: "from-purple-500/5 via-transparent to-violet-500/5",
    titleHover: "group-hover:text-purple-400",
    certificateBg: "bg-purple-500/10 hover:bg-purple-500/20",
    certificateText: "text-purple-400 hover:text-purple-300",
    certificateBorder: "border-purple-500/30",
    techExtraBg: "bg-purple-500/10",
    techExtraText: "text-purple-400",
    techExtraBorder: "border-purple-500/30",
  },
};

// Search button theme configuration
export type SearchButtonTheme = "cyan" | "blue" | "purple" | "pink";

export const SEARCH_BUTTON_THEME_CONFIG: Record<SearchButtonTheme, string> = {
  cyan: "hover:border-cyan-500/50 hover:text-cyan-400",
  blue: "hover:border-blue-500/50 hover:text-blue-400",
  purple: "hover:border-purple-500/50 hover:text-purple-400",
  pink: "hover:border-pink-500/50 hover:text-pink-400",
};

export const VARIANT_COLORS = {
  cyan: { gradient: "from-cyan-400 to-blue-400", text: "text-cyan-400" },
  blue: { gradient: "from-blue-400 to-purple-400", text: "text-blue-400" },
  purple: { gradient: "from-purple-400 to-pink-400", text: "text-purple-400" },
  pink: { gradient: "from-pink-400 to-rose-400", text: "text-pink-400" },
  emerald: {
    gradient: "from-emerald-400 to-cyan-400",
    text: "text-emerald-400",
  },
};
