import type {
  MonthData,
  ProcessedExperience,
  ProcessedTimelineData,
} from "./types";

export const processTimelineData = (
  experiences: any[],
  volunteerExperiences: any[],
): ProcessedTimelineData => {
  const allExperiences: ProcessedExperience[] = [];

  experiences.forEach((exp) => {
    exp.experience_time_line.forEach((timeline: any) => {
      const startDate = new Date(timeline.start_date);
      const endDate = timeline.end_date
        ? new Date(timeline.end_date)
        : new Date();

      allExperiences.push({
        type: "work",
        name: exp.company_name,
        logo: exp.company_logo || "",
        position: timeline.position,
        start_date: timeline.start_date,
        end_date: timeline.end_date || "",
        startMonth: startDate,
        endMonth: endDate,
        description: exp.description,
        technologies: exp.technologies,
      });
    });
  });

  volunteerExperiences.forEach((exp) => {
    exp.volunteer_time_line.forEach((timeline: any) => {
      const startDate = new Date(timeline.start_date);
      const endDate = timeline.end_date
        ? new Date(timeline.end_date)
        : new Date();

      allExperiences.push({
        type: "volunteer",
        name: exp.organisation,
        logo: exp.organisation_logo || "",
        position: timeline.position,
        start_date: timeline.start_date,
        end_date: timeline.end_date || "",
        startMonth: startDate,
        endMonth: endDate,
        description: exp.description,
        technologies: exp.technologies,
      });
    });
  });

  allExperiences.sort(
    (a, b) => b.startMonth.getTime() - a.startMonth.getTime(),
  );

  const now = new Date();
  const currentMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const earliestStart =
    allExperiences.length > 0
      ? new Date(
          Math.min(...allExperiences.map((exp) => exp.startMonth.getTime())),
        )
      : now;

  const latestEnd = currentMonthDate;

  const months: MonthData[] = [];
  const current = new Date(
    earliestStart.getFullYear(),
    earliestStart.getMonth(),
    1,
  );

  while (current <= latestEnd) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    months.push({
      date: new Date(current),
      year: current.getFullYear(),
      month: current.getMonth(),
      monthName: monthNames[current.getMonth()],
      isYearStart: current.getMonth() === 0,
    });
    current.setMonth(current.getMonth() + 1);
  }

  return { allExperiences, months, earliestStart, latestEnd };
};

export const getCompanyColor = (
  companyName: string,
  type: "work" | "volunteer",
): string => {
  const colors =
    type === "work"
      ? [
          "#06b6d4",
          "#3b82f6",
          "#8b5cf6",
          "#0ea5e9",
          "#2563eb",
          "#6366f1",
          "#0891b2",
          "#1d4ed8",
        ]
      : [
          "#10b981",
          "#059669",
          "#14b8a6",
          "#0d9488",
          "#06b6d4",
          "#0891b2",
          "#047857",
          "#0f766e",
        ];

  let hash = 0;
  for (let i = 0; i < companyName.length; i++) {
    hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const arrangeExperiences = (allExperiences: ProcessedExperience[]) => ({
  workExperiences: allExperiences.filter((exp) => exp.type === "work"),
  volunteerExperiences: allExperiences.filter(
    (exp) => exp.type === "volunteer",
  ),
});
