import { api } from "./api.response";
import type {
  ApiResponse,
  Certificate,
  CertificatesResponse,
  Experience,
  ExperiencesResponse,
  Project,
  ProjectsResponse,
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
