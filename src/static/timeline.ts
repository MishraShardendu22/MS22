export const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const WORK_COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#0ea5e9",
  "#2563eb",
  "#6366f1",
  "#0891b2",
  "#1d4ed8",
] as const;

export const VOLUNTEER_COLORS = [
  "#10b981",
  "#059669",
  "#14b8a6",
  "#0d9488",
  "#06b6d4",
  "#0891b2",
  "#047857",
  "#0f766e",
] as const;

export const MOBILE_QUERY = "(max-width: 767px)";

export const DATE_FORMAT_OPTIONS = {
  short: { month: "short", year: "numeric" } as Intl.DateTimeFormatOptions,
  long: { month: "long", year: "numeric" } as Intl.DateTimeFormatOptions,
} as const;
