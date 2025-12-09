'use client'

import { useEffect, useState } from 'react'
import { fetchAllStats } from '@/lib/fetchStats'
import { StatsDisplay } from './stat'
import { LoadingState } from '@/component/Loading'
import type { GitHubData, LeetCodeData, Repository } from '@/types/stats'

export const StatsWrapper = () => {
  const [stats, setStats] = useState<{
    github: GitHubData | null
    leetcode: LeetCodeData | null
    stars: number
    topRepos: Repository[]
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        console.log('📈 Loading stats...')
        const data = await fetchAllStats()
        console.log('📈 Stats loaded:', data)
        setStats({
          github: data.github,
          leetcode: data.leetcode,
          stars: data.stars,
          topRepos: data.topRepos,
        })
      } catch (error) {
        console.error('❌ Error loading stats:', error)
      } finally {
        console.log('📈 Stats loading finished')
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  // Don't render if loading is done and there's no data
  if (!loading && (!stats?.github || !stats?.leetcode || stats?.topRepos?.length === 0)) {
    return null
  }

  if (loading) {
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
          <div className="min-h-[600px]">
            <LoadingState message="Loading statistics..." variant="cyan" />
          </div>
        </div>
      </section>
    )
  }

  if (!stats?.github || !stats?.leetcode) {
    return null
  }

  return (
    <StatsDisplay
      github={stats.github}
      leetcode={stats.leetcode}
      stars={stats.stars}
      topRepos={stats.topRepos}
    />
  )
}
