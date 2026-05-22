import { describe, expect, it, vi } from "vitest";
import { BaseURL } from "@/static/data";

vi.mock("@/static/api/api.request", () => ({
  projectsAPI: {
    getAllProjects: vi.fn().mockResolvedValue({
      data: {
        projects: [
          {
            inline: { id: "proj-1", updated_at: "2024-01-01" },
            order: 1,
            skills: [],
            description: "Project description",
            project_name: "Project One",
            small_description: "Project summary",
          },
        ],
      },
    }),
  },
  experiencesAPI: {
    getAllExperiences: vi.fn().mockResolvedValue({
      data: {
        experiences: [
          {
            inline: { id: "exp-1" },
            description: "Experience description",
            company_name: "Company",
            experience_time_line: [],
          },
        ],
      },
    }),
  },
  certificatesAPI: {
    getAllCertificates: vi.fn().mockResolvedValue({
      data: {
        certifications: [
          {
            inline: { id: "cert-1", updated_at: "2024-01-02" },
            title: "Certificate",
            issuer: "Issuer",
            issue_date: "2024-01-01",
          },
        ],
      },
    }),
  },
  volunteerAPI: {
    getAllVolunteers: vi.fn().mockResolvedValue({
      data: {
        volunteer_experiences: [
          {
            inline: { id: "vol-1", updated_at: "2024-01-03" },
            organisation: "Org",
          },
        ],
      },
    }),
  },
}));

function hasDoubleSlash(url: string): boolean {
  const stripped = url.replace(/^https?:\/\//, "");
  return stripped.includes("//");
}

describe("sitemap generation", () => {
  it("generates valid, normalized URLs", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const routes = await sitemap();

    expect(routes.length).toBeGreaterThan(0);

    for (const route of routes) {
      expect(route.url).toBeTruthy();
      expect(route.url.startsWith(BaseURL)).toBe(true);
      expect(route.url.includes("undefined")).toBe(false);
      expect(route.url.includes("null")).toBe(false);
      expect(hasDoubleSlash(route.url)).toBe(false);
    }
  });

  it("includes expected static and dynamic routes", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const routes = await sitemap();
    const urls = routes.map((route) => route.url);

    expect(urls).toContain(`${BaseURL}`);
    expect(urls).toContain(`${BaseURL}/projects`);
    expect(urls).toContain(`${BaseURL}/experiences`);
    expect(urls).toContain(`${BaseURL}/certificates`);
    expect(urls).toContain(`${BaseURL}/volunteer`);
    expect(urls).toContain(`${BaseURL}/contact`);

    expect(urls.some((url) => url.endsWith("/projects/proj-1"))).toBe(true);
    expect(urls.some((url) => url.endsWith("/experiences/exp-1"))).toBe(true);
    expect(urls.some((url) => url.endsWith("/certificates/cert-1"))).toBe(true);
    expect(urls.some((url) => url.endsWith("/volunteer/vol-1"))).toBe(true);
  });

  it("does not contain duplicate URLs", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const routes = await sitemap();
    const urls = routes.map((route) => route.url);

    expect(new Set(urls).size).toBe(urls.length);
  });
});
