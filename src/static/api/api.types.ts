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
  _id: string
  order: number
  position: string
  organisation: string
  organisation_logo?: string
  location?: string
  start_date: string
  end_date?: string
  current?: boolean
  description?: string
  technologies?: string[]
  certificate_link?: string
}

export interface VolunteersResponse {
  volunteers: Volunteer[]
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
}

export interface Certificate {
  _id: string
  order: number
  certificate_name: string
  issuing_organisation: string
  issue_date: string
  expiry_date?: string
  credential_id?: string
  certificate_url?: string
  description?: string
  skills?: string[]
  verified?: boolean
}

export interface CertificatesResponse {
  certificates: Certificate[]
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
} 