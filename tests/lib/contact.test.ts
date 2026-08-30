import { describe, expect, it } from "vitest";
import {
  CONTACT_LIMITS,
  escapeHtml,
  validateContactPayload,
} from "@/lib/contact";
import {
  checkContactRateLimit,
  clearContactRateLimitsForTest,
} from "@/lib/contactRateLimit";

describe("contact validation", () => {
  it("normalizes valid contact input", () => {
    expect(
      validateContactPayload({
        name: " Ada ",
        email: "ada@example.com ",
        subject: "Hello",
        message: "This is a valid message.",
      }),
    ).toEqual({
      data: {
        name: "Ada",
        email: "ada@example.com",
        subject: "Hello",
        message: "This is a valid message.",
      },
      errors: {},
    });
  });

  it("rejects oversized and invalid input", () => {
    const result = validateContactPayload({
      name: "n".repeat(CONTACT_LIMITS.name + 1),
      email: "invalid",
      subject: "s".repeat(CONTACT_LIMITS.subject + 1),
      message: "m".repeat(CONTACT_LIMITS.message + 1),
    });

    expect(result.data).toBeUndefined();
    expect(result.errors.name).toContain("at most");
    expect(result.errors.email).toBe("Invalid email format");
    expect(result.errors.subject).toContain("at most");
    expect(result.errors.message).toContain("at most");
  });

  it("escapes HTML email content", () => {
    expect(escapeHtml(`<img src=x onerror="alert('x')">`)).toBe(
      "&lt;img src=x onerror=&quot;alert(&#39;x&#39;)&quot;&gt;",
    );
  });
});

describe("contact rate limit", () => {
  it("allows five requests then returns a retry window", () => {
    clearContactRateLimitsForTest();
    const now = 1_000;
    for (let index = 0; index < 5; index++) {
      expect(checkContactRateLimit("127.0.0.1", now).allowed).toBe(true);
    }
    const blocked = checkContactRateLimit("127.0.0.1", now);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(600);
  });
});
