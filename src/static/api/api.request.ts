import { api } from "./api.response"
import type { ApiResponse, SkillsResponse } from "./api.types"

export const skillsAPI = {
  getSkills: async (): Promise<ApiResponse<SkillsResponse>> => {
    const response = await api.get<ApiResponse<SkillsResponse>>('/skills')
    return response.data
  },
}