export interface ProcessedExperience {
  type: "work" | "volunteer";
  name: string;
  logo: string;
  position: string;
  start_date: string;
  end_date: string;
  startMonth: Date;
  endMonth: Date;
  description?: string;
  technologies?: string[];
}

export interface TimelineEntry {
  position: string;
  start_date: string;
  end_date?: string;
}

export interface ExperienceInput {
  company_name: string;
  company_logo?: string;
  description?: string;
  technologies?: string[];
  experience_time_line: TimelineEntry[];
}

export interface VolunteerInput {
  organisation: string;
  organisation_logo?: string;
  description?: string;
  technologies?: string[];
  volunteer_time_line: TimelineEntry[];
}

export interface TimelineDisplayProps {
  experiences: ExperienceInput[];
  volunteerExperiences: VolunteerInput[];
}

export interface MonthData {
  date: Date;
  year: number;
  month: number;
  monthName: string;
  isYearStart: boolean;
}

export interface ProcessedTimelineData {
  allExperiences: ProcessedExperience[];
  months: MonthData[];
  earliestStart: Date;
  latestEnd: Date;
}

export interface ExperiencePosition {
  left: number;
  width: number;
}
