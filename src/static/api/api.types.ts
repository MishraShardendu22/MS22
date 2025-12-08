export interface ApiResponse<T> {
  status: number
  message: string
  data: T
}

export interface SkillsResponse {
  skills: string[]
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
} 