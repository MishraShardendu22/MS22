import { api } from "./api.response"
import type { ApiResponse, SkillsResponse, TimelineItem, ProjectsResponse, Project } from "./api.types"

export const skillsAPI = {
  getSkills: async (page: number = 1, limit: number = 15): Promise<ApiResponse<SkillsResponse>> => {
    const response = await api.get<ApiResponse<SkillsResponse>>('/skills', {
      params: { page, limit }
    })
    return response.data
  },
}

export const TimelineAPI = {
  getAllEndpoints: async (): Promise<ApiResponse<TimelineItem[]>> => {
    const response = await api.get('/timeline')
    return response.data
  },
}

export const projectsAPI = {
  getAllProjects: async (page: number = 1, limit: number = 15): Promise<ApiResponse<ProjectsResponse>> => {
    const response = await api.get<ApiResponse<ProjectsResponse>>('/projects', {
      params: { page, limit }
    })
    return response.data
  },

  getProjectById: async (id: string): Promise<ApiResponse<Project>> => {
    const response = await api.get(`/projects/${id}`)
    return response.data
  }
}