import type { MetadataRoute } from "next";
import {
  certificatesAPI,
  experiencesAPI,
  projectsAPI,
  volunteerAPI,
} from "@/static/api/api.request";
import { BaseURL } from "@/static/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = BaseURL || "https://mishrashardendu22.is-a.dev";

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/certificates`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/volunteer`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/links`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
  ];

  try {
    // Fetch dynamic routes - up to 500 items each
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

    // Add project routes
    if (projectsRes.data?.projects) {
      projectsRes.data.projects.forEach((project) => {
        routes.push({
          url: `${baseUrl}/projects/${project.inline?.id}`,

          lastModified: project.inline?.updated_at
            ? new Date(project.inline.updated_at)
            : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.8,
        });
      });
    }

    // Add experience routes
    if (experiencesRes.data?.experiences) {
      experiencesRes.data.experiences.forEach((experience) => {
        routes.push({
          url: `${baseUrl}/experiences/${experience.inline?.id}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        });
      });
    }

    // Add certificate routes
    if (certificatesRes.data?.certifications) {
      certificatesRes.data.certifications.forEach((certificate) => {
        routes.push({
          url: `${baseUrl}/certificates/${certificate.inline?.id}`,
          lastModified: certificate.inline?.updated_at
            ? new Date(certificate.inline.updated_at)
            : new Date(),
          changeFrequency: "yearly" as const,
          priority: 0.6,
        });
      });
    }

    // Add volunteer routes
    if (volunteersRes.data?.volunteer_experiences) {
      volunteersRes.data.volunteer_experiences.forEach((volunteer) => {
        routes.push({
          url: `${baseUrl}/volunteer/${volunteer.inline?.id}`,
          lastModified: volunteer.inline?.updated_at
            ? new Date(volunteer.inline.updated_at)
            : new Date(),
          changeFrequency: "yearly" as const,
          priority: 0.6,
        });
      });
    }
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
  }

  return routes;
}
