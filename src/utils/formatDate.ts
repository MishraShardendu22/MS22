/**
 * Format a date string to a human-readable format
 * @param dateString - ISO date string or undefined
 * @param options - Formatting options
 * @returns Formatted date string
 */

type DateFormatStyle = "short" | "long";

interface FormatDateOptions {
  /** Format style: "short" = "Jan 2024", "long" = "January 2024" */
  style?: DateFormatStyle;
  /** Fallback string when date is undefined/null */
  fallback?: string;
}

const DATE_FORMAT_OPTIONS: Record<DateFormatStyle, Intl.DateTimeFormatOptions> =
  {
    short: { month: "short", year: "numeric" },
    long: { month: "long", year: "numeric" },
  } as const;

/**
 * Formats a date string to locale format
 * @example formatDate("2024-01-15") // "Jan 2024"
 * @example formatDate("2024-01-15", { style: "long" }) // "January 2024"
 * @example formatDate(undefined) // "Present"
 * @example formatDate(undefined, { fallback: "" }) // ""
 */
export const formatDate = (
  dateString?: string | null,
  options: FormatDateOptions = {},
): string => {
  const { style = "short", fallback = "Present" } = options;

  if (!dateString) return fallback;

  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return fallback;
    return date.toLocaleDateString("en-US", DATE_FORMAT_OPTIONS[style]);
  } catch {
    return fallback;
  }
};

/**
 * Format a date range (start to end)
 * @example formatDateRange("2024-01-01", "2024-06-01") // "Jan 2024 - Jun 2024"
 * @example formatDateRange("2024-01-01", undefined) // "Jan 2024 - Present"
 */
export const formatDateRange = (
  startDate?: string | null,
  endDate?: string | null,
  options: FormatDateOptions = {},
): string => {
  const start = formatDate(startDate, { ...options, fallback: "" });
  const end = formatDate(endDate, options);

  if (!start) return end;
  return `${start} - ${end}`;
};
