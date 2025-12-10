// Mobile-optimized Experience Display - minimal JS, no animations, no backdrop-blur
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingStateMobile } from "@/component/Loading";
import { experiencesAPI } from "@/static/api/api.request";
import type { Experience } from "@/static/api/api.types";

const ExperienceCardMobile = ({ experience }: { experience: Experience }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const latestPosition = experience.experience_time_line[0];
  const startDate = formatDate(latestPosition?.start_date);
  const endDate = latestPosition?.end_date ? formatDate(latestPosition.end_date) : "Present";

  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4">
      <div className="flex items-start gap-3 mb-2">
        {experience.company_logo && (
          <img
            src={experience.company_logo}
            alt={experience.company_name}
            className="w-10 h-10 rounded-lg object-cover bg-gray-800"
            loading="lazy"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-white line-clamp-1">
            {latestPosition?.position || "Position"}
          </h3>
          <p className="text-sm text-blue-400">{experience.company_name}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-2">{startDate} - {endDate}</p>
      <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">
        {experience.description}
      </p>
      <div className="flex flex-wrap gap-1">
        {experience.technologies && experience.technologies.slice(0, 3).map((tech, idx) => (
          <span key={idx} className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded">
            {tech}
          </span>
        ))}
        {experience.technologies && experience.technologies.length > 3 && (
          <span className="px-2 py-0.5 text-xs bg-blue-900/50 text-blue-400 rounded">
            +{experience.technologies.length - 3}
          </span>
        )}
      </div>
    </div>
  );
};

export const ExperiencesDisplayMobile = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await experiencesAPI.getAllExperiences(1, 2);
        if (response.status === 200 && response.data) {
          setExperiences(response.data.experiences);
        }
      } catch (err) {
        setError("Failed to load experiences");
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Experience</h2>
        <LoadingStateMobile />
      </section>
    );
  }

  if (error || experiences.length === 0) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Experience</h2>
        <p className="text-gray-400 text-sm">{error || "No experiences available"}</p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-400">Experience</h2>
        <Link href="/experiences" className="text-sm text-gray-400 hover:text-blue-400">
          View All →
        </Link>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        My professional journey and roles
      </p>
      <div className="space-y-4">
        {experiences.map((experience) => (
          <ExperienceCardMobile key={experience._id} experience={experience} />
        ))}
      </div>
    </section>
  );
};
