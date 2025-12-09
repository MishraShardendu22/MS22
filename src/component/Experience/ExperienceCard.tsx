'use client'

import { useEffect, useState } from 'react'
import { experiencesAPI } from '@/static/api/api.request'
import type { Experience } from '@/static/api/api.types'
import { LoadingState } from '@/component/Loading'
import { ErrorState } from '@/component/Error'
import { Briefcase, Building, Calendar, ExternalLink, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

interface ExperienceCardProps {
  experience: Experience
  index: number
}

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Present'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const latestPosition = experience.experience_time_line[0]
  const startDate = formatDate(latestPosition?.start_date)
  const endDate = latestPosition?.end_date ? formatDate(latestPosition.end_date) : 'Present'

  return (
    <div 
      className="group relative"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="relative bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10">
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative p-4">
          <div className="flex items-start gap-3 mb-3">
            {experience.company_logo && (
              <div className="w-12 h-12 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  src={experience.company_logo} 
                  alt={experience.company_name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-blue-400 transition-colors duration-300">
                {latestPosition?.position || 'Position'}
              </h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                <Building className="w-3.5 h-3.5" />
                <span className="line-clamp-1">{experience.company_name}</span>
              </div>
            </div>
            {experience.certificate_url && (
              <a
                href={experience.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 rounded-lg transition-all duration-200 border border-blue-500/30 shrink-0"
                aria-label="View certificate"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Certificate</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{startDate} - {endDate}</span>
            </div>
          </div>

          {experience.description && (
            <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-3">
              {experience.description}
            </p>
          )}

          {experience.technologies && experience.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {experience.technologies.slice(0, 4).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium bg-gray-800/50 text-gray-300 rounded-md border border-gray-700/50 hover:border-gray-600 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
              {experience.technologies.length > 4 && (
                <span className="px-2.5 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/30">
                  +{experience.technologies.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const ExperiencesDisplay = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalExperiences, setTotalExperiences] = useState(0)
  const [paginationLoading, setPaginationLoading] = useState(false)
  const experiencesPerPage = 2

  const fetchExperiences = async (page: number) => {
    try {
      if (page === 1) {
        setLoading(true)
      } else {
        setPaginationLoading(true)
      }
      setError(null)
      
      const response = await experiencesAPI.getAllExperiences(page, experiencesPerPage)
      
      if (response.status === 200 && response.data) {
        setExperiences(response.data.experiences)
        setTotalExperiences(response.data.total || response.data.experiences.length)
      } else {
        setExperiences([])
        setTotalExperiences(0)
      }
    } catch (err) {
      console.error('Error fetching experiences:', err)
      setError('Failed to load experiences. Please try again later.')
      setExperiences([])
      setTotalExperiences(0)
    } finally {
      setLoading(false)
      setPaginationLoading(false)
    }
  }

  useEffect(() => {
    fetchExperiences(currentPage)
  }, [currentPage])

  const totalPages = Math.ceil(totalExperiences / experiencesPerPage)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  if (loading) return (
    <section className="relative py-8 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Professional Experience
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            My journey through various roles and companies that shaped my professional career
          </p>
        </div>
        <div className="min-h-[400px]">
          <LoadingState message="Loading experiences..." variant="purple" />
        </div>
      </div>
    </section>
  )

  if (error) return (
    <section className="relative py-8 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Professional Experience
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            My journey through various roles and companies that shaped my professional career
          </p>
        </div>
        <div className="min-h-[400px]">
          <ErrorState title="Error Loading Experiences" message={error} variant="red" onRetry={() => fetchExperiences(currentPage)} />
        </div>
      </div>
    </section>
  )

  if (experiences.length === 0) return (
    <section className="relative py-8 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Professional Experience
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            My journey through various roles and companies that shaped my professional career
          </p>
        </div>
        <div className="min-h-[300px] flex items-center justify-center">
          <p className="text-lg text-gray-400">No professional experiences available to display</p>
        </div>
      </div>
    </section>
  )

  return (
    <section className="relative py-8 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Professional Experience
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            My journey through various roles and companies that shaped my professional career
          </p>
        </div>

        <div className="mb-6 min-h-[400px] relative">
          <div className={`h-[400px] flex items-center justify-center absolute inset-0 transition-opacity duration-300 ${paginationLoading ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}`}>
            <LoadingState message="Loading experiences..." variant="purple" />
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${paginationLoading ? 'opacity-0' : 'opacity-100'}`}>
            {experiences.map((experience, index) => (
              <ExperienceCard key={`${experience._id}-${index}`} experience={experience} index={index} />
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1 || paginationLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-blue-500/30 text-gray-400 hover:text-blue-400 transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Previous</span>
            </button>

            <span className="text-gray-400 text-sm font-medium px-2">
              Page <span className="text-blue-400 font-bold">{currentPage}</span> of <span className="text-blue-400 font-bold">{totalPages}</span>
            </span>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || paginationLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-blue-500/30 text-gray-400 hover:text-blue-400 transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
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
