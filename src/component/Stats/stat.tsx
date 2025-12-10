"use client";

import type { GitHubData, LeetCodeData, Repository } from "@/types/stats";
import { CommitsActivityCard } from "./CommitsActivityCard";
import { GitHubProfileCard } from "./GitHubProfileCard";
import { LeetCodeStatsCard } from "./LeetCodeStatsCard";
import { TopRepositoriesCard } from "./TopRepositoriesCard";

interface StatsDisplayProps {
  github: GitHubData;
  stars: number;
  leetcode: LeetCodeData;
  topRepos: Repository[];
  commits: any[];
  calendar: any;
}

export const StatsDisplay = ({
  github,
  stars,
  leetcode,
  topRepos,
  commits,
  calendar,
}: StatsDisplayProps) => {
  const hasCommits = commits && commits.length > 0;
  const hasTopRepos = topRepos && topRepos.length > 0;


  return (
    <section className="relative py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 bg-linear-to-br from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-6 md:mb-8 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 md:mb-4">
            Coding Statistics
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
            Overview of my coding activity and achievements across platforms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <GitHubProfileCard github={github} stars={stars} />
          <LeetCodeStatsCard leetcode={leetcode} />
          {hasCommits && (
            <div className="lg:col-span-2">
              <CommitsActivityCard commits={commits} calendar={calendar} />
            </div>
          )}
          {hasTopRepos && (
            <div className="lg:col-span-2">
              <TopRepositoriesCard topRepos={topRepos} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
