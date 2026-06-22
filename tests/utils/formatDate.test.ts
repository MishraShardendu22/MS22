import { describe, expect, it } from "vitest";
import { formatDate, formatDateRange } from "@/utils/formatDate";

describe("formatDate", () => {
  it("formats a valid date string with default style (short)", () => {
    expect(formatDate("2024-01-15")).toBe("Jan 2024");
  });

  it("formats a valid date string with long style", () => {
    expect(formatDate("2024-01-15", { style: "long" })).toBe("January 2024");
  });

  it("returns fallback for undefined date", () => {
    expect(formatDate(undefined)).toBe("Present");
  });

  it("returns custom fallback for undefined date", () => {
    expect(formatDate(undefined, { fallback: "Unknown" })).toBe("Unknown");
  });

  it("returns fallback for null date", () => {
    expect(formatDate(null)).toBe("Present");
  });

  it("returns fallback for invalid date string", () => {
    expect(formatDate("invalid-date")).toBe("Present");
  });

  it("returns fallback when Date constructor throws/errors", () => {
    // Though new Date() won't throw directly, it returns an invalid date
    // Test that the try-catch or invalid date check works
    expect(formatDate("invalid")).toBe("Present");
  });
});

describe("formatDateRange", () => {
  it("formats a valid start and end date range", () => {
    expect(formatDateRange("2024-01-01", "2024-06-01")).toBe(
      "Jan 2024 - Jun 2024",
    );
  });

  it("formats with long style options", () => {
    expect(formatDateRange("2024-01-01", "2024-06-01", { style: "long" })).toBe(
      "January 2024 - June 2024",
    );
  });

  it("returns Present for undefined end date", () => {
    expect(formatDateRange("2024-01-01", undefined)).toBe("Jan 2024 - Present");
  });

  it("returns end date only if start date is undefined", () => {
    expect(formatDateRange(undefined, "2024-06-01")).toBe("Jun 2024");
  });

  it("handles both undefined start and end", () => {
    expect(formatDateRange(undefined, undefined)).toBe("Present");
  });
});
