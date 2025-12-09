export interface ProcessedExperience {
  type: 'work' | 'volunteer'
  name: string
  logo: string
  position: string
  start_date: string
  end_date: string
  startMonth: Date
  endMonth: Date
  description?: string
  technologies?: string[]
}

export interface TimelineDisplayProps {
  experiences: any[]
  volunteerExperiences: any[]
}

export interface MonthData {
  date: Date
  year: number
  month: number
  monthName: string
  isYearStart: boolean
}

export interface ProcessedTimelineData {
  allExperiences: ProcessedExperience[]
  months: MonthData[]
  earliestStart: Date
  latestEnd: Date
}

export interface ExperiencePosition {
  left: number
  width: number
}
