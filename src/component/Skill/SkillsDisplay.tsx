'use client'

import { useEffect, useState } from 'react'
import { skillsAPI } from '@/static/api/api.request'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { LoadingState } from '@/component/Loading/LoadingState'
import { ErrorState } from '../states'


export default function SkillsDisplay() {
  const [skills, setSkills] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)
  
  const skillsPerPage = 15

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true)
        const response = await skillsAPI.getSkills(currentPage, skillsPerPage)
        console.log('Fetched skills:', response)
        setSkills(response.data.skills)
        setTotalPages(response.data.total_pages)
        setHasNext(response.data.has_next)
        setHasPrevious(response.data.has_previous)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [currentPage])

  const nextPage = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (hasPrevious) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Technologies and tools I work with to build innovative solutions
          </p>
        </div>

        {/* Skills Grid or Loading/Error State */}
        <div className="mb-6 min-h-[250px]">
          {loading ? (
            <LoadingState message="Loading skills..." variant="cyan" />
          ) : error ? (
            <ErrorState title="Error Loading Skills" message={error} variant="red" />
          ) : (
            <div className="flex flex-wrap justify-center gap-2 md:gap-2 content-start">
              {skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="skill-badge group px-5 md:px-6 py-2.5 md:py-3 rounded-xl bg-linear-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm border border-gray-800 hover:border-cyan-500/50 text-gray-300 hover:text-cyan-400 font-semibold text-sm md:text-base shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transition-colors duration-500 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevPage}
              disabled={!hasPrevious}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Previous</span>
            </button>

            <span className="text-gray-400 text-sm font-medium px-2">
              Page <span className="text-cyan-400 font-bold">{currentPage}</span> of <span className="text-cyan-400 font-bold">{totalPages}</span>
            </span>

            <button
              onClick={nextPage}
              disabled={!hasNext}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="text-sm font-medium">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
