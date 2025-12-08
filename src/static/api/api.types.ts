export interface ApiResponse<T> {
  status: number
  message: string
  data: T
}

export type SkillsResponse = string[] 