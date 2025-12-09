'use client'

import { Github, Trophy, Activity, TrendingUp, Users, Code, Star, User, MapPin, BookOpen, Award, GitCommit } from 'lucide-react'
import type { GitHubData, LeetCodeData, Repository } from '@/types/stats'

interface StatsCardProps {
  icon: React.ElementType
  label: string
  value: number
  iconColor?: string
}

const StatsCard = ({ icon: Icon, label, value, iconColor = 'text-cyan-400' }: StatsCardProps) => (
  <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors">
    <div className="flex items-center gap-3">
      <Icon className={`w-5 h-5 ${iconColor}`} />
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-lg font-bold text-white">{value.toLocaleString()}</p>
      </div>
    </div>
  </div>
)

const DifficultyCard = ({ difficulty, count, color }: { difficulty: string; count: number; color: string }) => (
  <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-sm text-gray-300">{difficulty}</span>
      </div>
      <span className="text-sm font-bold text-white">{count}</span>
    </div>
  </div>
)

const RepoCard = ({ repo, index }: { repo: Repository; index: number }) => (
  <a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-cyan-500/40 transition-all duration-200 group"
  >
    <div className="flex items-start justify-between mb-2">
      <h4 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
        {repo.name}
      </h4>
      <span className="text-xs text-gray-500">#{index + 1}</span>
    </div>
    {repo.description && (
      <p className="text-xs text-gray-400 mb-3 line-clamp-2">{repo.description}</p>
    )}
    <div className="flex items-center gap-4 text-xs text-gray-500">
      <div className="flex items-center gap-1">
        <Star className="w-3 h-3" />
        <span>{repo.stargazers_count}</span>
      </div>
      {repo.language && (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>{repo.language}</span>
        </div>
      )}
    </div>
  </a>
)

interface GitHubProfileCardProps {
  github: GitHubData
  stars: number
}

const GitHubProfileCard = ({ github, stars }: GitHubProfileCardProps) => (
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
        <StatsCard icon={Code} label="Repositories" value={github.public_repos} iconColor="text-green-400" />
      </div>

      <StatsCard icon={Star} label="Total Stars" value={stars} iconColor="text-yellow-400" />

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
            <p className="text-sm text-gray-400 leading-relaxed">{github.bio}</p>
          </div>
        </div>
      )}
    </div>
  </div>
)

interface LeetCodeStatsCardProps {
  leetcode: LeetCodeData
}

const LeetCodeStatsCard = ({ leetcode }: LeetCodeStatsCardProps) => (
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
            <span className="text-sm text-gray-300">{leetcode.profile.realName}</span>
          </div>
        </div>
      )}

      <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-yellow-400" />
          <div>
            <p className="text-xs text-gray-400">Global Ranking</p>
            <p className="text-lg font-bold text-white">#{leetcode.profile.ranking.toLocaleString()}</p>
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
)

interface TopRepositoriesCardProps {
  topRepos: Repository[]
}

const TopRepositoriesCard = ({ topRepos }: TopRepositoriesCardProps) => (
  <div className="bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
        <TrendingUp className="w-5 h-5 text-green-400" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">Top Repositories</h3>
        <p className="text-xs text-gray-400">Most Popular Projects</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {topRepos.slice(0, 6).map((repo, index) => (
        <RepoCard key={repo.name} repo={repo} index={index} />
      ))}
    </div>
  </div>
)

interface StatsDisplayProps {
  github: GitHubData
  stars: number
  leetcode: LeetCodeData
  topRepos: Repository[]
}

export const StatsDisplay = ({ github, stars, leetcode, topRepos }: StatsDisplayProps) => {
  return (
    <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Coding Statistics
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Overview of my coding activity and achievements across platforms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GitHubProfileCard github={github} stars={stars} />
          <LeetCodeStatsCard leetcode={leetcode} />
          <div className="lg:col-span-2">
            <TopRepositoriesCard topRepos={topRepos} />
          </div>
        </div>
      </div>
    </section>
  )
}
