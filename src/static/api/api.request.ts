import { api } from "./api.response"
import type { ApiResponse, SkillsResponse, TimelineItem } from "./api.types"

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