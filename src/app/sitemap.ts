import type { MetadataRoute } from "next";
import { FALLBACK_SKILLS } from "@/lib/agentSkills";
import {
  certificatesAPI,
  experiencesAPI,
  projectsAPI,
  volunteerAPI,
} from "@/static/api/api.request";
import { BaseURL } from "@/static/data";

export const revalidate = 3600;

const FALLBACK_PROJECT_IDS = [
  "6a68fca5d19296e9fb0a132b",
  "6a68ffadd19296e9fb0a132c",
  "6873dde16798e4d1e0dc2a4f",
  "6873dde96798e4d1e0dc2a56",
  "6873ec516798e4d1e0dc2a58",
];

const FALLBACK_EXPERIENCE_IDS = [
  "6a6901cdd19296e9fb0a132d",
  "68c546e9538a0e733808c763",
  "68ab75d21cf2ca00881cfe17",
  "68ab69581cf2ca00881cfe16",
];

const FALLBACK_CERTIFICATE_IDS = [
  "68754bc9e37e573cc1d68ede",
  "68754bc8e37e573cc1d68edd",
];

const FALLBACK_VOLUNTEER_IDS = [
  "68ab871d1cf2ca00881cfe1d",
  "68ab86b21cf2ca00881cfe1c",
  "68ab7e451cf2ca00881cfe1a",
  "68ab79471cf2ca00881cfe19",
  "68ab77d21cf2ca00881cfe18",
];

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function normalizePath(path: string): string {
  if (!path || path === "/") return "";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

function normalizeId(id: unknown): string | null {
  if (id === null || id === undefined) return null;
  const normalized = String(id).trim();
  if (!normalized || normalized === "undefined" || normalized === "null") {
    return null;
  }
  return normalized;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = normalizeBaseUrl(BaseURL);
  const routes: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const addRoute = (
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: number,
    lastModified = new Date(),
  ) => {
    const url = `${baseUrl}${normalizePath(path)}` || baseUrl;

    if (seen.has(url)) return;
    seen.add(url);

    routes.push({
      url,
      lastModified,
      changeFrequency,
      priority,
    });
  };

  addRoute("/", "weekly", 1.0);
  addRoute("/projects", "weekly", 0.9);
  addRoute("/experiences", "monthly", 0.8);
  addRoute("/certificates", "monthly", 0.7);
  addRoute("/volunteer", "monthly", 0.7);
  addRoute("/skills", "weekly", 0.9);
  addRoute("/skills/cli", "monthly", 0.8);
  FALLBACK_SKILLS.forEach((skill) => {
    if (skill.name) {
      addRoute(`/skills/${encodeURIComponent(skill.name)}`, "monthly", 0.8);
    }
  });
  addRoute("/links", "monthly", 0.9);
  addRoute("/contact", "yearly", 0.6);

  try {
    const [projectsRes, experiencesRes, certificatesRes, volunteersRes] =
      await Promise.all([
        projectsAPI
          .getAllProjects(1, 500)
          .catch(() => ({ data: { projects: [] } })),
        experiencesAPI
          .getAllExperiences(1, 500)
          .catch(() => ({ data: { experiences: [] } })),
        certificatesAPI
          .getAllCertificates(1, 500)
          .catch(() => ({ data: { certifications: [] } })),
        volunteerAPI
          .getAllVolunteers(1, 500)
          .catch(() => ({ data: { volunteer_experiences: [] } })),
      ]);

    const projects = projectsRes.data?.projects?.length
      ? projectsRes.data.projects
      : FALLBACK_PROJECT_IDS.map((id) => ({ inline: { id, updated_at: undefined } }));

    projects.forEach((project) => {
      const id = normalizeId(project.inline?.id);
      if (!id) return;

      addRoute(
        `/projects/${id}`,
        "monthly",
        0.8,
        project.inline?.updated_at
          ? new Date(project.inline.updated_at)
          : new Date(),
      );
    });

    // Add experience routes
    const experiences = experiencesRes.data?.experiences?.length
      ? experiencesRes.data.experiences
      : FALLBACK_EXPERIENCE_IDS.map((id) => ({ inline: { id } }));

    experiences.forEach((experience) => {
      const id = normalizeId(experience.inline?.id);
      if (!id) return;

      addRoute(`/experiences/${id}`, "monthly", 0.7, new Date());
    });

    // Add certificate routes
    const certificates = certificatesRes.data?.certifications?.length
      ? certificatesRes.data.certifications
      : FALLBACK_CERTIFICATE_IDS.map((id) => ({ inline: { id, updated_at: undefined } }));

    certificates.forEach((certificate) => {
      const id = normalizeId(certificate.inline?.id);
      if (!id) return;

      addRoute(
        `/certificates/${id}`,
        "yearly",
        0.6,
        certificate.inline?.updated_at
          ? new Date(certificate.inline.updated_at)
          : new Date(),
      );
    });

    // Add volunteer routes
    const volunteers = volunteersRes.data?.volunteer_experiences?.length
      ? volunteersRes.data.volunteer_experiences
      : FALLBACK_VOLUNTEER_IDS.map((id) => ({ inline: { id, updated_at: undefined } }));

    volunteers.forEach((volunteer) => {
      const id = normalizeId(volunteer.inline?.id);
      if (!id) return;

      addRoute(
        `/volunteer/${id}`,
        "yearly",
        0.6,
        volunteer.inline?.updated_at
          ? new Date(volunteer.inline.updated_at)
          : new Date(),
      );
    });
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
    // Guarantee fallback routes even on network crash
    FALLBACK_PROJECT_IDS.forEach((id) => addRoute(`/projects/${id}`, "monthly", 0.8));
    FALLBACK_EXPERIENCE_IDS.forEach((id) => addRoute(`/experiences/${id}`, "monthly", 0.7));
    FALLBACK_CERTIFICATE_IDS.forEach((id) => addRoute(`/certificates/${id}`, "yearly", 0.6));
    FALLBACK_VOLUNTEER_IDS.forEach((id) => addRoute(`/volunteer/${id}`, "yearly", 0.6));
  }

  return routes;
}
