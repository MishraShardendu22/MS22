"use client";

import { useEffect, useRef, useState } from "react";
import { EmptyState } from "./EmptyState";
import { ExperienceSection } from "./ExperienceSection";
import { MonthMarker } from "./MonthMarker";
import { TimelineControls } from "./TimelineControls";
import { TimelineLegend } from "./TimelineLegend";
import type {
  ExperiencePosition,
  ProcessedExperience,
  TimelineDisplayProps,
} from "./types";
import { useIsMobile } from "./useIsMobile";
import { arrangeExperiences, processTimelineData } from "./utils";

export const TimelineDisplay = ({
  experiences,
  volunteerExperiences: volunteerExpProps,
}: TimelineDisplayProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const processedData = processTimelineData(experiences, volunteerExpProps);

  const getMonthPosition = (date: Date) => {
    const monthIndex = processedData.months.findIndex(
      (m) =>
        m.date.getFullYear() === date.getFullYear() &&
        m.date.getMonth() === date.getMonth(),
    );
    return monthIndex >= 0 ? monthIndex * (isMobile ? 80 : 120) + 24 : 24;
  };

  const getExperiencePosition = (
    exp: ProcessedExperience,
  ): ExperiencePosition => {
    const monthWidth = isMobile ? 80 : 120;
    const startPos = getMonthPosition(exp.startMonth);

    const now = new Date();
    const currentMonthDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const effectiveEndMonth =
      exp.endMonth > currentMonthDate ? currentMonthDate : exp.endMonth;

    const endPos = getMonthPosition(effectiveEndMonth);

    return {
      left: startPos,
      width: Math.max(endPos - startPos + monthWidth, monthWidth),
    };
  };

  useEffect(() => {
    if (!scrollContainerRef.current || processedData.months.length === 0)
      return;

    requestAnimationFrame(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const now = new Date();
      const currentMonthIndex = processedData.months.findIndex(
        (m) => m.year === now.getFullYear() && m.month === now.getMonth(),
      );

      const monthWidth = isMobile ? 80 : 120;
      const scrollTo =
        currentMonthIndex !== -1
          ? Math.max(
              0,
              currentMonthIndex * monthWidth - container.clientWidth / 2 + 60,
            )
          : Math.max(0, container.scrollWidth - container.clientWidth - 200);

      container.scrollLeft = scrollTo;
    });
  }, [processedData.months, isMobile]);

  const { workExperiences, volunteerExperiences } = arrangeExperiences(
    processedData.allExperiences,
  );

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? 300 : 500;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (processedData.allExperiences.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              Experience Timeline
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive timeline of my professional journey and volunteer
            contributions, continuously updated to reflect my current roles
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-visible pb-6 pt-8 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-900/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-linear-to-r [&::-webkit-scrollbar-thumb]:from-cyan-500 [&::-webkit-scrollbar-thumb]:to-blue-500 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:from-cyan-400 [&::-webkit-scrollbar-thumb:hover]:to-blue-400"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#06b6d4 #1a1a1a",
              scrollBehavior: "smooth",
            }}
          >
            <div
              className="relative bg-linear-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-xl border border-gray-800 rounded-2xl sm:rounded-3xl pt-8 sm:pt-12 pb-6 sm:pb-8 px-3 sm:px-6 md:px-8 shadow-2xl shadow-cyan-500/10 min-h-[400px] sm:min-h-[500px] overflow-visible"
              style={{
                width: `${Math.max(processedData.months.length * (isMobile ? 80 : 120), isMobile ? 600 : 800)}px`,
              }}
            >
              <div className="relative mb-8" style={{ height: "120px" }}>
                {processedData.months.map((month, index) => (
                  <MonthMarker
                    key={`${month.year}-${month.month}`}
                    month={month}
                    index={index}
                    isMobile={isMobile}
                  />
                ))}
                <div className="absolute top-16 left-0 right-0 h-1 bg-linear-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 rounded-full shadow-lg shadow-cyan-500/20" />
              </div>

              <div className="space-y-8 min-h-[350px]">
                <ExperienceSection
                  experiences={workExperiences}
                  type="work"
                  isMobile={isMobile}
                  hoveredCard={hoveredCard}
                  setHoveredCard={setHoveredCard}
                  getExperiencePosition={getExperiencePosition}
                />

                <ExperienceSection
                  experiences={volunteerExperiences}
                  type="volunteer"
                  isMobile={isMobile}
                  hoveredCard={hoveredCard}
                  setHoveredCard={setHoveredCard}
                  getExperiencePosition={getExperiencePosition}
                />
              </div>
            </div>
          </div>

          <TimelineControls isMobile={isMobile} onScroll={scroll} />
          <TimelineLegend />
        </div>
      </div>
    </section>
  );
};
