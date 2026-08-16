import { describe, expect, it } from "vitest";
import { canRetryRequest, getRetryAfterMs } from "@/static/api/api.response";

describe("API retry policy", () => {
  it("retries idempotent requests within the deadline", () => {
    expect(
      canRetryRequest({
        method: "get",
        status: 503,
        retryCount: 0,
        startedAt: 1_000,
        now: 2_000,
      }),
    ).toBe(true);
  });

  it("does not retry mutations or expired requests", () => {
    expect(
      canRetryRequest({
        method: "post",
        status: 503,
        retryCount: 0,
        startedAt: 1_000,
        now: 2_000,
      }),
    ).toBe(false);
    expect(
      canRetryRequest({
        method: "get",
        status: 503,
        retryCount: 0,
        startedAt: 1_000,
        now: 9_000,
      }),
    ).toBe(false);
  });

  it("parses Retry-After seconds", () => {
    expect(getRetryAfterMs("3")).toBe(3_000);
  });
});
