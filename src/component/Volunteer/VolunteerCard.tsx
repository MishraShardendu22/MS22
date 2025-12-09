'use client'

import { useEffect, useState } from 'react'
import { volunteerAPI } from '@/static/api/api.request'
import type { Volunteer } from '@/static/api/api.types'
import { LoadingState } from '@/component/Loading'
import { ErrorState } from '@/component/Error'
import { UnifiedCard } from '@/component/UnifiedCard'
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

interface VolunteerCardProps {
  volunteer: Volunteer
  index: number
}

const VolunteerCard = ({ volunteer, index }: VolunteerCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  // Get the latest position from volunteer_time_line or fallback to direct fields
  const latestTimeline = volunteer.volunteer_time_line?.[volunteer.volunteer_time_line.length - 1]
  const position = latestTimeline?.position || volunteer.position || 'Volunteer'
  const startDate = formatDate(latestTimeline?.start_date || volunteer.start_date)
  const endDate = latestTimeline?.end_date ? formatDate(latestTimeline.end_date) : (volunteer.end_date ? formatDate(volunteer.end_date) : 'Present')
  const isCurrent = !latestTimeline?.end_date && !volunteer.end_date

  const badges = []
  if (isCurrent) {
    badges.push({ label: 'Active' })
  }

  const extraInfo = volunteer.location ? (
    <>
      <span>•</span>
      <div className="flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5" />
        <span>{volunteer.location}</span>
      </div>
    </>
  ) : null

  return (
    <UnifiedCard
      index={index}
      theme="pink"
      logo={volunteer.organisation_logo}
      logoAlt={volunteer.organisation}
      title={position}
      subtitle={volunteer.organisation}
      startDate={startDate}
      endDate={endDate}
      description={volunteer.description}
      technologies={volunteer.technologies}
      certificateUrl={volunteer.certificate_link}
      certificateLabel="Certificate"
      badges={badges}
      extraInfo={extraInfo}
    />
  )
}

export const VolunteerDisplay = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalVolunteers, setTotalVolunteers] = useState(0)
  const [paginationLoading, setPaginationLoading] = useState(false)
  const volunteersPerPage = 4

  const fetchVolunteers = async (page: number) => {
    try {
      if (page === 1) {
        setLoading(true)
      } else {
        setPaginationLoading(true)
      }
      setError(null)
      
      const response = await volunteerAPI.getAllVolunteers(page, volunteersPerPage)
      
      if (response.status === 200 && response.data) {
        const vols = response.data.volunteer_experiences || []
        // Sort by order if available, otherwise maintain API order  
        const sortedVolunteers = vols.sort((a, b) => {
          const orderA = a.order ?? 999
          const orderB = b.order ?? 999
          return orderA - orderB
        })
        setVolunteers(sortedVolunteers)
        setTotalVolunteers(response.data.total || sortedVolunteers.length)
      } else {
        setVolunteers([])
        setTotalVolunteers(0)
      }
    } catch (err) {
      console.error('Error fetching volunteers:', err)
      setError('Failed to load volunteer experiences. Please try again later.')
      setVolunteers([])
      setTotalVolunteers(0)
    } finally {
      setLoading(false)
      setPaginationLoading(false)
    }
  }

  useEffect(() => {
    fetchVolunteers(currentPage)
  }, [currentPage])

  const totalPages = Math.ceil(totalVolunteers / volunteersPerPage)

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
    <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent mb-4">
            Volunteer Experience
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Making a difference through community service and meaningful contributions
          </p>
        </div>
        <div className="min-h-[600px]">
          <LoadingState message="Loading volunteer experiences..." variant="pink" />
        </div>
      </div>
    </section>
  )

  if (error) return (
    <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent mb-4">
            Volunteer Experience
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Making a difference through community service and meaningful contributions
          </p>
        </div>
        <div className="min-h-[600px]">
          <ErrorState title="Error Loading Volunteers" message={error} variant="red" onRetry={() => fetchVolunteers(currentPage)} />
        </div>
      </div>
    </section>
  )

  if (volunteers.length === 0) return (
    <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent mb-4">
            Volunteer Experience
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Making a difference through community service and meaningful contributions
          </p>
        </div>
        <div className="min-h-[400px] flex items-center justify-center">
          <p className="text-lg text-gray-400">No volunteer experiences available to display</p>
        </div>
      </div>
    </section>
  )

  return (
    <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent mb-4">
            Volunteer Experience
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Making a difference through community service and meaningful contributions
          </p>
        </div>

        <div className="mb-6 min-h-[600px] relative">
          <div className={`h-[600px] flex items-center justify-center absolute inset-0 transition-opacity duration-300 ${paginationLoading ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}`}>
            <LoadingState message="Loading volunteer experiences..." variant="pink" />
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${paginationLoading ? 'opacity-0' : 'opacity-100'}`}>
            {volunteers.map((volunteer, index) => {
              const volId = volunteer.inline?.id || volunteer._id || `vol-${index}`
              return (
                <VolunteerCard key={volId} volunteer={volunteer} index={index} />
              )
            })}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1 || paginationLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-pink-500/30 text-gray-400 hover:text-pink-400 transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Previous</span>
            </button>

            <span className="text-gray-400 text-sm font-medium px-2">
              Page <span className="text-pink-400 font-bold">{currentPage}</span> of <span className="text-pink-400 font-bold">{totalPages}</span>
            </span>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || paginationLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-pink-500/30 text-gray-400 hover:text-pink-400 transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
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
