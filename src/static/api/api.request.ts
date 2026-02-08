import { cache } from "react";
import { api } from "./api.response";
import type {
  ApiResponse,
  Certificate,
  CertificatesResponse,
  Experience,
  ExperiencesResponse,
  Project,
  ProjectsResponse,
  SearchResponse,
  SearchResultType,
  SearchSuggestionsResponse,
  SkillsResponse,
  TimelineItem,
  Volunteer,
  VolunteersResponse,
} from "./api.types";

export const skillsAPI = {
  getSkills: async (
    page: number = 1,
    limit: number = 15,
  ): Promise<ApiResponse<SkillsResponse>> => {
    const response = await api.get<ApiResponse<SkillsResponse>>("/skills", {
      params: { page, limit },
    });
    return response.data;
  },
};

export const TimelineAPI = {
  getAllEndpoints: async (): Promise<ApiResponse<TimelineItem[]>> => {
    const response = await api.get("/timeline");
    return response.data;
  },
};

export const projectsAPI = {
  getAllProjects: async (
    page: number = 1,
    limit: number = 15,
  ): Promise<ApiResponse<ProjectsResponse>> => {
    const response = await api.get<ApiResponse<ProjectsResponse>>("/projects", {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Fetches ALL projects by paginating through the API
   * The backend limits each request to max 100 items, so we fetch in batches
   */
  getAllProjectsPaginated: async (): Promise<{
    projects: Project[];
    total: number;
  }> => {
    const allProjects: Project[] = [];
    const batchSize = 100; // Backend max limit
    let currentPage = 1;
    let totalFetched = 0;
    let totalProjects = 0;

    // Fetch first page to get total count
    const firstResponse = await projectsAPI.getAllProjects(1, batchSize);
    if (firstResponse.status === 200 && firstResponse.data) {
      allProjects.push(...(firstResponse.data.projects || []));
      totalProjects = firstResponse.data.total;
      totalFetched = allProjects.length;
      currentPage = 2;

      // Fetch remaining pages in parallel for better performance
      if (totalFetched < totalProjects) {
        const remainingPages = Math.ceil(
          (totalProjects - totalFetched) / batchSize,
        );
        const pagePromises = [];

        for (let i = 0; i < remainingPages; i++) {
          pagePromises.push(
            projectsAPI.getAllProjects(currentPage + i, batchSize),
          );
        }

        const responses = await Promise.all(pagePromises);
        for (const response of responses) {
          if (response.status === 200 && response.data?.projects) {
            allProjects.push(...response.data.projects);
          }
        }
      }
    }

    return { projects: allProjects, total: totalProjects };
  },

  getProjectById: async (id: string): Promise<ApiResponse<Project>> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  getProjectsByIds: async (
    ids: string[],
  ): Promise<{ projects: Project[]; failed: string[] }> => {
    if (ids.length === 0) {
      return { projects: [], failed: [] };
    }

    const results = await Promise.allSettled(
      ids.map((id) => projectsAPI.getProjectById(id)),
    );

    const projects: Project[] = [];
    const failed: string[] = [];

    results.forEach((result, index) => {
      if (
        result.status === "fulfilled" &&
        result.value.status === 200 &&
        result.value.data
      ) {
        projects.push(result.value.data);
      } else {
        failed.push(ids[index]);
      }
    });

    return { projects, failed };
  },
};

export const volunteerAPI = {
  getAllVolunteers: async (
    page: number = 1,
    limit: number = 15,
  ): Promise<ApiResponse<VolunteersResponse>> => {
    const response = await api.get<ApiResponse<VolunteersResponse>>(
      "/volunteer/experiences",
      {
        params: { page, limit },
      },
    );
    return response.data;
  },

  getVolunteerById: async (id: string): Promise<ApiResponse<Volunteer>> => {
    const response = await api.get(`/volunteer/experiences/${id}`);
    return response.data;
  },
};

export const certificatesAPI = {
  getAllCertificates: async (
    page: number = 1,
    limit: number = 15,
  ): Promise<ApiResponse<CertificatesResponse>> => {
    const response = await api.get<ApiResponse<CertificatesResponse>>(
      "/certifications",
      {
        params: { page, limit },
      },
    );
    return response.data;
  },

  getCertificateById: async (id: string): Promise<ApiResponse<Certificate>> => {
    const response = await api.get(`/certifications/${id}`);
    return response.data;
  },
};

export const experiencesAPI = {
  getAllExperiences: async (
    page: number = 1,
    limit: number = 15,
  ): Promise<ApiResponse<ExperiencesResponse>> => {
    const response = await api.get<ApiResponse<ExperiencesResponse>>(
      "/experiences",
      {
        params: { page, limit },
      },
    );
    return response.data;
  },

  getExperienceById: async (id: string): Promise<ApiResponse<Experience>> => {
    const response = await api.get(`/experiences/${id}`);
    return response.data;
  },
};

export const searchAPI = {
  /**
   * Search across all content types using BM25 algorithm
   * @param query - Search query string
   * @param type - Optional filter by content type
   * @param limit - Max results to return (default 10, max 50)
   */
  search: async (
    query: string,
    type?: SearchResultType,
    limit: number = 10,
  ): Promise<ApiResponse<SearchResponse>> => {
    const response = await api.get<ApiResponse<SearchResponse>>("/search", {
      params: { q: query, type, limit },
    });
    return response.data;
  },

  /**
   * Get search suggestions for autocomplete
   * @param query - Partial query for suggestions (min 2 chars)
   */
  getSuggestions: async (
    query: string,
  ): Promise<ApiResponse<SearchSuggestionsResponse>> => {
    const response = await api.get<ApiResponse<SearchSuggestionsResponse>>(
      "/search/suggestions",
      {
        params: { q: query },
      },
    );
    return response.data;
  },
};

// ─── React.cache() wrappers for request deduplication ───
// These ensure that layout (generateMetadata + body) and page
// share a single API call per render instead of making 3 separate requests.

export const getCachedProjectById = cache((id: string) =>
  projectsAPI.getProjectById(id),
);

export const getCachedCertificateById = cache((id: string) =>
  certificatesAPI.getCertificateById(id),
);

export const getCachedExperienceById = cache((id: string) =>
  experiencesAPI.getExperienceById(id),
);

export const getCachedVolunteerById = cache((id: string) =>
  volunteerAPI.getVolunteerById(id),
);
