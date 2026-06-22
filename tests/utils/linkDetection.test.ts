import { describe, expect, it } from "vitest";
import { detectLinkType, getLinkLabel } from "@/utils/linkDetection";

describe("detectLinkType", () => {
  it("detects github links", () => {
    expect(detectLinkType("https://github.com/user/repo")).toBe("github");
    expect(detectLinkType("https://user.github.io/repo")).toBe("github");
  });

  it("detects youtube links", () => {
    expect(detectLinkType("https://youtube.com/watch?v=123")).toBe("youtube");
    expect(detectLinkType("https://youtu.be/123")).toBe("youtube");
    expect(detectLinkType("https://www.youtube-nocookie.com/embed/123")).toBe(
      "youtube",
    );
  });

  it("detects linkedin links", () => {
    expect(detectLinkType("https://linkedin.com/in/user")).toBe("linkedin");
    expect(detectLinkType("https://www.linkedin.com/company/abc")).toBe(
      "linkedin",
    );
  });

  it("detects certificate links", () => {
    expect(detectLinkType("https://coursera.org/verify/123")).toBe(
      "certificate",
    );
    expect(detectLinkType("https://udemy.com/certificate/123")).toBe(
      "certificate",
    );
    expect(detectLinkType("https://credly.com/badges/123")).toBe("certificate");
    expect(detectLinkType("https://example.com/my-certificate")).toBe(
      "certificate",
    );
  });

  it("returns live-demo for other valid urls", () => {
    expect(detectLinkType("https://my-awesome-site.com")).toBe("live-demo");
    expect(detectLinkType("https://vercel.app/demo")).toBe("live-demo");
  });

  it("returns external for invalid urls", () => {
    expect(detectLinkType("invalid-url")).toBe("external");
    expect(detectLinkType("")).toBe("external");
  });
});

describe("getLinkLabel", () => {
  it("returns correct labels for specific types", () => {
    expect(getLinkLabel("github")).toBe("View Code");
    expect(getLinkLabel("youtube")).toBe("View Demo");
    expect(getLinkLabel("linkedin")).toBe("View Post");
    expect(getLinkLabel("live-demo")).toBe("View Demo");
    expect(getLinkLabel("certificate")).toBe("View Certificate");
    expect(getLinkLabel("external")).toBe("Open Link");
  });

  it("returns Open Link for unknown types", () => {
    // @ts-expect-error
    expect(getLinkLabel("unknown")).toBe("Open Link");
  });
});
