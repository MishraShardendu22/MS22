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

export interface TimelineItem {
  id: string
  type: 'work' | 'volunteer'
  company: string
  organisation?: string
  logo?: string
  company_logo?: string
  organisation_logo?: string
  position: string
  location?: string
  startDate: string
  start_date?: string
  endDate?: string
  end_date?: string
  description?: string
  technologies?: string[]
  current?: boolean
}

export interface TimelineResponse {
  timeline?: TimelineItem[]
  items?: TimelineItem[]
  experiences?: TimelineItem[]
}

export interface Project {
  _id: string
  order: number
  skills: string[]
  description: string
  project_name: string
  project_video?: string
  project_live_link?: string
  small_description: string
  project_repository?: string
}

export interface ProjectsResponse {
  projects: Project[]
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
}

export interface Volunteer {
  inline?: {
    id: string
    created_at: string
    updated_at: string
  }
  _id?: string
  order?: number
  position?: string
  organisation: string
  organisation_logo?: string
  location?: string
  start_date?: string
  end_date?: string
  current?: boolean
  description?: string
  technologies?: string[]
  certificate_link?: string
  images?: string[]
  projects?: string[]
  volunteer_time_line?: Array<{
    position: string
    start_date: string
    end_date?: string
  }>
}

export interface VolunteersResponse {
  volunteer_experiences: Volunteer[]
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
}

export interface Certificate {
  inline?: {
    id: string
    created_at: string
    updated_at: string
  }
  _id?: string
  order?: number
  title: string
  issuer: string
  issue_date: string
  expiry_date?: string
  credential_id?: string
  certificate_url?: string
  description?: string
  skills?: string[]
  verified?: boolean
  images?: string[]
  projects?: string[]
}

export interface CertificatesResponse {
  certifications: Certificate[]
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
}

export interface ExperienceTimeLine {
  position: string
  start_date: string
  end_date?: string
}

export interface Experience {
  _id: string
  images?: string[]
  technologies?: string[]
  created_by?: string
  description: string
  company_name: string
  company_logo?: string
  certificate_url?: string
  projects?: string[]
  experience_time_line: ExperienceTimeLine[]
}

export interface ExperiencesResponse {
  experiences: Experience[]
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
} 