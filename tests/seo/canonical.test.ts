import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { generatePageMetadata } from "@/lib/metadata";
import { BackendURL, BaseURL } from "@/static/data";

function hasDoubleSlash(url: string): boolean {
  const stripped = url.replace(/^https?:\/\//, "");
  return stripped.includes("//");
}

function isAbsolute(url: string): boolean {
  return /^https?:\/\//.test(url);
}

function extractMetaUrls(meta: Record<string, unknown>): string[] {
  const alternates = meta.alternates as { canonical?: string | null } | null;
  const openGraph = meta.openGraph as { url?: string | null } | null;
  const other = meta.other as Record<string, unknown> | null;
  const urls: string[] = [];
  if (alternates?.canonical) urls.push(alternates.canonical);
  if (openGraph?.url) urls.push(openGraph.url);
  if (other?.["og:url"] && typeof other["og:url"] === "string") {
    urls.push(other["og:url"] as string);
  }
  if (other?.["twitter:url"] && typeof other["twitter:url"] === "string") {
    urls.push(other["twitter:url"] as string);
  }
  return urls;
}

function normalizeImageUrls(value: unknown): string[] {
  if (!value) return [];
  const items = Array.isArray(value) ? value : [value];
  return items
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object" && "url" in item) {
        return String((item as { url?: string }).url || "");
      }
      return "";
    })
    .filter((url) => Boolean(url));
}

describe("canonical URL normalization", () => {
  it("BaseURL and BackendURL are normalized", () => {
    expect(BaseURL.endsWith("/")).toBe(false);
    expect(BackendURL.endsWith("/")).toBe(false);
  });

  it("generates normalized canonical URLs", () => {
    const metaWithSlash = generatePageMetadata({
      title: "Projects",
      description: "Projects list",
      path: "/projects",
    });

    const metaWithoutSlash = generatePageMetadata({
      title: "Projects",
      description: "Projects list",
      path: "projects",
    });

    const canonicalWithSlash = metaWithSlash.alternates?.canonical as string;
    const canonicalWithoutSlash = metaWithoutSlash.alternates
      ?.canonical as string;

    expect(canonicalWithSlash).toBe(`${BaseURL}/projects`);
    expect(canonicalWithoutSlash).toBe(`${BaseURL}/projects`);
    expect(hasDoubleSlash(canonicalWithSlash)).toBe(false);
    expect(hasDoubleSlash(canonicalWithoutSlash)).toBe(false);
  });

  it("prevents duplicate slashes in generated URLs", () => {
    const meta = generatePageMetadata({
      title: "Home",
      description: "Home page",
      path: "/",
    });

    const canonical = meta.alternates?.canonical as string;
    expect(hasDoubleSlash(canonical)).toBe(false);
  });

  it("canonical URLs are absolute and unique across primary routes", () => {
    const routes = [
      "/",
      "/projects",
      "/experiences",
      "/certificates",
      "/volunteer",
      "/links",
      "/contact",
    ];

    const canonicals = routes.map((route) => {
      const meta = generatePageMetadata({
        title: "Route",
        description: "Route",
        path: route,
      });
      return meta.alternates?.canonical as string;
    });

    canonicals.forEach((canonical) => {
      expect(isAbsolute(canonical)).toBe(true);
      expect(canonical.startsWith(BaseURL)).toBe(true);
      expect(hasDoubleSlash(canonical)).toBe(false);
    });

    expect(new Set(canonicals).size).toBe(canonicals.length);
  });

  it("metadata URL fields are normalized and defined", () => {
    const meta = generatePageMetadata({
      title: "Links",
      description: "Links",
      path: "/links",
    });

    const urls = extractMetaUrls(meta as Record<string, unknown>);
    expect(urls.length).toBeGreaterThan(0);

    for (const url of urls) {
      expect(isAbsolute(url)).toBe(true);
      expect(hasDoubleSlash(url)).toBe(false);
      expect(url.includes("undefined")).toBe(false);
      expect(url.includes("null")).toBe(false);
    }
  });

  it("open graph and twitter images are unique", () => {
    const meta = generatePageMetadata({
      title: "OG",
      description: "OG",
      path: "/og",
    });

    const ogImages = normalizeImageUrls(meta.openGraph?.images);
    const twitterImages = normalizeImageUrls(meta.twitter?.images);

    expect(new Set(ogImages).size).toBe(ogImages.length);
    expect(new Set(twitterImages).size).toBe(twitterImages.length);
  });

  it("metadataBase uses normalized BaseURL", () => {
    const layoutPath = path.join(process.cwd(), "src", "app", "layout.tsx");
    const contents = fs.readFileSync(layoutPath, "utf8");

    expect(contents).toMatch(/metadataBase:\s*new URL\(BaseURL\)/);
    expect(BaseURL.endsWith("/")).toBe(false);
  });

  it("respects robots index and follow flags", () => {
    const meta = generatePageMetadata({
      title: "Draft",
      description: "Draft page",
      path: "/draft",
      noIndex: true,
      follow: true,
    });

    const robots = meta.robots as { index?: boolean; follow?: boolean };
    expect(robots.index).toBe(false);
    expect(robots.follow).toBe(true);
  });

  it("robots directives are valid for indexable pages", () => {
    const meta = generatePageMetadata({
      title: "Indexable",
      description: "Indexable page",
      path: "/indexable",
    });

    const robots = meta.robots as {
      index?: boolean;
      follow?: boolean;
      googleBot?: { index?: boolean; follow?: boolean };
    };

    expect(robots.index).toBe(true);
    expect(robots.follow).toBe(true);
    expect(robots.googleBot?.index).toBe(true);
    expect(robots.googleBot?.follow).toBe(true);
  });
});
