// Mobile-optimized Volunteer Display - minimal JS, no animations, no backdrop-blur
"use client";

import { MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingStateMobile } from "@/component/Loading";
import { volunteerAPI } from "@/static/api/api.request";
import type { Volunteer } from "@/static/api/api.types";

const VolunteerCardMobile = ({ volunteer }: { volunteer: Volunteer }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const latestTimeline = volunteer.volunteer_time_line?.[volunteer.volunteer_time_line.length - 1];
  const position = latestTimeline?.position || volunteer.position || "Volunteer";
  const startDate = formatDate(latestTimeline?.start_date || volunteer.start_date);
  const endDate = latestTimeline?.end_date 
    ? formatDate(latestTimeline.end_date) 
    : volunteer.end_date 
      ? formatDate(volunteer.end_date) 
      : "Present";
  const isCurrent = !latestTimeline?.end_date && !volunteer.end_date;

  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4">
      <div className="mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-white line-clamp-1 flex-1">
            {position}
          </h3>
          {isCurrent && (
            <span className="px-2 py-0.5 text-xs bg-pink-900/50 text-pink-400 rounded">
              Active
            </span>
          )}
        </div>
        <p className="text-sm text-pink-400">{volunteer.organisation}</p>
      </div>
      <p className="text-xs text-gray-500 mb-2">
        {startDate} - {endDate}
        {volunteer.location && (
          <span className="ml-2 inline-flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {volunteer.location}
          </span>
        )}
      </p>
      <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">
        {volunteer.description}
      </p>
      <div className="flex flex-wrap gap-1">
        {volunteer.technologies?.slice(0, 3).map((tech, idx) => (
          <span key={idx} className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded">
            {tech}
          </span>
        ))}
        {volunteer.technologies && volunteer.technologies.length > 3 && (
          <span className="px-2 py-0.5 text-xs bg-pink-900/50 text-pink-400 rounded">
            +{volunteer.technologies.length - 3}
          </span>
        )}
      </div>
    </div>
  );
};

export const VolunteerDisplayMobile = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await volunteerAPI.getAllVolunteers(1, 4);
        if (response.status === 200 && response.data) {
          const vols = response.data.volunteer_experiences || [];
          setVolunteers(vols.sort((a, b) => (a.order ?? 999) - (b.order ?? 999)));
        }
      } catch (err) {
        setError("Failed to load volunteers");
      } finally {
        setLoading(false);
      }
    };
    fetchVolunteers();
  }, []);

  if (loading) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-pink-400 mb-4">Volunteer</h2>
        <LoadingStateMobile />
      </section>
    );
  }

  if (error || volunteers.length === 0) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-pink-400 mb-4">Volunteer</h2>
        <p className="text-gray-400 text-sm">{error || "No volunteer experiences available"}</p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-pink-400">Volunteer</h2>
        <Link href="/volunteer" className="text-sm text-gray-400 hover:text-pink-400">
          View All →
        </Link>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        Community service and contributions
      </p>
      <div className="space-y-4">
        {volunteers.map((volunteer) => (
          <VolunteerCardMobile key={volunteer._id} volunteer={volunteer} />
        ))}
      </div>
    </section>
  );
};
