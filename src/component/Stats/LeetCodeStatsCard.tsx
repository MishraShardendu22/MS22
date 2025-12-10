"use client";

import { Award, Trophy, User } from "lucide-react";
import type { LeetCodeData } from "@/types/stats";

const DifficultyCard = ({
  difficulty,
  count,
  color,
}: {
  difficulty: string;
  count: number;
  color: string;
}) => (
  <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-sm text-gray-300">{difficulty}</span>
      </div>
      <span className="text-sm font-bold text-white">{count}</span>
    </div>
  </div>
);

interface LeetCodeStatsCardProps {
  leetcode: LeetCodeData;
}

export const LeetCodeStatsCard = ({ leetcode }: LeetCodeStatsCardProps) => (
  <div className="bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
        <Trophy className="w-5 h-5 text-yellow-400" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">LeetCode Stats</h3>
        <p className="text-xs text-gray-400">Problem Solving</p>
      </div>
    </div>

    <div className="space-y-3">
      {leetcode.profile.realName && (
        <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">
              {leetcode.profile.realName}
            </span>
          </div>
        </div>
      )}

      <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-yellow-400" />
          <div>
            <p className="text-xs text-gray-400">Global Ranking</p>
            <p className="text-lg font-bold text-white">
              #{leetcode.profile?.ranking?.toLocaleString() || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <DifficultyCard
          difficulty="Easy"
          count={leetcode.submitStats.acSubmissionNum[1]?.count || 0}
          color="bg-green-500"
        />
        <DifficultyCard
          difficulty="Medium"
          count={leetcode.submitStats.acSubmissionNum[2]?.count || 0}
          color="bg-yellow-500"
        />
        <DifficultyCard
          difficulty="Hard"
          count={leetcode.submitStats.acSubmissionNum[3]?.count || 0}
          color="bg-red-500"
        />
      </div>
    </div>
  </div>
);
