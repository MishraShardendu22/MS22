"use client";

import {
  BookOpen,
  Code,
  Github,
  MapPin,
  Star,
  User,
  Users,
} from "lucide-react";
import type { GitHubData } from "@/types/stats";

interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  iconColor?: string;
}

const StatsCard = ({
  icon: Icon,
  label,
  value,
  iconColor = "text-cyan-400",
}: StatsCardProps) => (
  <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors">
    <div className="flex items-center gap-3">
      <Icon className={`w-5 h-5 ${iconColor}`} />
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-lg font-bold text-white">{value.toLocaleString()}</p>
      </div>
    </div>
  </div>
);

interface GitHubProfileCardProps {
  github: GitHubData;
  stars: number;
}

export const GitHubProfileCard = ({
  github,
  stars,
}: GitHubProfileCardProps) => (
  <div className="bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
        <Github className="w-5 h-5 text-cyan-400" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">GitHub Profile</h3>
        <p className="text-xs text-gray-400">Development Activity</p>
      </div>
    </div>

    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <StatsCard icon={Users} label="Followers" value={github.followers} />
        <StatsCard
          icon={Code}
          label="Repositories"
          value={github.public_repos}
          iconColor="text-green-400"
        />
      </div>

      <StatsCard
        icon={Star}
        label="Total Stars"
        value={stars}
        iconColor="text-yellow-400"
      />

      {github.name && (
        <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">{github.name}</span>
          </div>
        </div>
      )}

      {github.location && (
        <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">{github.location}</span>
          </div>
        </div>
      )}

      {github.bio && (
        <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-purple-400 mt-0.5" />
            <p className="text-sm text-gray-400 leading-relaxed">
              {github.bio}
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
);
