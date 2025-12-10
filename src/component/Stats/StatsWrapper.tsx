"use client";

import { useEffect, useState, useRef } from "react";
import { NameLoader } from "@/component/Loading";
import { fetchAllStats } from "@/lib/fetchStats";
import type { GitHubData, LeetCodeData, Repository } from "@/types/stats";
import { StatsDisplay } from "./stat";

export const StatsWrapper = () => {
  const [stats, setStats] = useState<{
    github: GitHubData | null;
    leetcode: LeetCodeData | null;
    stars: number;
    topRepos: Repository[];
    commits: Array<{ date: string; count: number }>;
    calendar: Record<string, number>;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading 200px before entering viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    const loadStats = async () => {
      setLoading(true);
      try {
        const data = await fetchAllStats();
        setStats({
          github: data.github,
          leetcode: data.leetcode,
          stars: data.stars,
          topRepos: data.topRepos,
          commits: data.commits,
          calendar: data.calendar,
        });
      } catch (error) {
        console.error("StatsWrapper - Error loading stats:", error);
        // Error loading stats
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [shouldLoad]);

  // Don't render if loading is done and there's no data
  const hasGithubData = stats?.github && Object.keys(stats.github).length > 0;
  const hasLeetcodeData =
    stats?.leetcode && Object.keys(stats.leetcode).length > 0;
  const hasRepos = stats?.topRepos && stats.topRepos.length > 0;
  const hasCommits = stats?.commits && stats.commits.length > 0;

  if (!loading && stats && (!hasGithubData || !hasLeetcodeData)) {
    return null;
  }

  if (loading || !stats) {
    return (
      <section 
        ref={sectionRef}
        className="relative py-6 md:py-8 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 md:mb-4">
              Coding Statistics
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
              Overview of my coding activity and achievements across platforms
            </p>
          </div>

          <div className="flex items-center justify-center py-6">
            <NameLoader />
          </div>
        </div>
      </section>
    );
  }

  if (!stats?.github || !stats?.leetcode) {
    return null;
  }

  return (
    <div ref={sectionRef}>
      <StatsDisplay
        stars={stats.stars}
        github={stats.github}
        leetcode={stats.leetcode}
        topRepos={stats.topRepos}
        commits={stats.commits || []}
        calendar={stats.calendar || {}}
      />
    </div>
  );
};
