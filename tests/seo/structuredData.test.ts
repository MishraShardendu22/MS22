import { describe, expect, it } from "vitest";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePersonSchema,
  generateProfessionalServiceSchema,
  generateProfilePageSchema,
  generateWebSiteSchema,
} from "@/lib/structuredData";
import { BaseURL } from "@/static/data";

function hasDoubleSlash(url: string): boolean {
  const stripped = url.replace(/^https?:\/\//, "");
  return stripped.includes("//");
}

function isAbsolute(url: string): boolean {
  return /^https?:\/\//.test(url);
}

function containsSearchAction(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  if (Array.isArray(value)) {
    return value.some((item) => containsSearchAction(item));
  }

  const record = value as Record<string, unknown>;
  if (record["@type"] === "SearchAction") return true;
  return Object.values(record).some((item) => containsSearchAction(item));
}

describe("structured data validity", () => {
  it("omits SearchAction schema", () => {
    const schema = generateWebSiteSchema();
    expect("potentialAction" in schema).toBe(false);
    expect(containsSearchAction(schema)).toBe(false);
  });

  it("generates core schema objects", () => {
    const person = generatePersonSchema();
    const professionalService = generateProfessionalServiceSchema();
    const profile = generateProfilePageSchema();
    const faq = generateFAQSchema();

    expect(person["@type"]).toBe("Person");
    expect(person.url).toBe(BaseURL);
    expect(Array.isArray(person.sameAs)).toBe(true);

    expect(professionalService["@type"]).toBe("ProfessionalService");
    expect(profile["@type"]).toBe("ProfilePage");
    expect(faq["@type"]).toBe("FAQPage");
  });

  it("normalizes breadcrumb URLs", () => {
    const schema = generateBreadcrumbSchema([
      { name: "Home", url: BaseURL },
      { name: "Projects", url: `${BaseURL}/projects` },
    ]);

    const items = schema.itemListElement
      .map((item) => item.item)
      .filter((item): item is string => Boolean(item));

    expect(items.length).toBeGreaterThan(0);

    for (const url of items) {
      expect(isAbsolute(url)).toBe(true);
      expect(hasDoubleSlash(url)).toBe(false);
      expect(url.includes("undefined")).toBe(false);
      expect(url.includes("null")).toBe(false);
    }
  });
});
