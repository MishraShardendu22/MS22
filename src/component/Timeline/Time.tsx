"use client";

import { useEffect, useState } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingState } from "@/component/Loading";
import { TimelineAPI } from "@/static/api/api.request";
import { TimelineDisplay } from "./TimelineDisplay";
import type { ExperienceInput, VolunteerInput } from "./types";

interface TimelineApiItem {
  company_name?: string;
  company_logo?: string;
  organisation?: string;
  organisation_logo?: string;
  description?: string;
  technologies?: string[];
  position: string;
  start_date: string;
  end_date?: string;
}

interface TimelineApiResponse {
  experience_timeline?: TimelineApiItem[];
  volunteer_experience_timeline?: TimelineApiItem[];
}

export const Time = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<ExperienceInput[]>([]);
  const [volunteerExperiences, setVolunteerExperiences] = useState<
    VolunteerInput[]
  >([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true);
        const res = await TimelineAPI.getAllEndpoints();

        const data = res.data as TimelineApiResponse | null;
        const experienceTimeline = data?.experience_timeline || [];
        const volunteerTimeline = data?.volunteer_experience_timeline || [];

        const workExps: ExperienceInput[] = experienceTimeline.map((item) => ({
          company_name: item.company_name || "",
          company_logo: item.company_logo,
          description: item.description,
          technologies: item.technologies || [],
          experience_time_line: [
            {
              position: item.position,
              start_date: item.start_date,
              end_date: item.end_date || "",
            },
          ],
        }));

        const volunteerExps: VolunteerInput[] = volunteerTimeline.map(
          (item) => ({
            organisation: item.organisation || "",
            organisation_logo: item.organisation_logo,
            description: item.description,
            technologies: item.technologies || [],
            volunteer_time_line: [
              {
                position: item.position,
                start_date: item.start_date,
                end_date: item.end_date || "",
              },
            ],
          }),
        );

        setExperiences(workExps);
        setVolunteerExperiences(volunteerExps);
      } catch (err) {
        console.error("Timeline fetch error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load timeline",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  if (loading)
    return <LoadingState message="Loading timeline..." variant="cyan" />;
  if (error)
    return (
      <ErrorState
        title="Timeline Error"
        message={error}
        variant="red"
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <TimelineDisplay
      experiences={experiences}
      volunteerExperiences={volunteerExperiences}
    />
  );
};

export default Time;
