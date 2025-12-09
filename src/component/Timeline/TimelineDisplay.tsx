'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ProcessedExperience {
  type: 'work' | 'volunteer'
  name: string
  logo: string
  position: string
  start_date: string
  end_date: string
  startMonth: Date
  endMonth: Date
  description?: string
  technologies?: string[]
}

interface TimelineDisplayProps {
  experiences: any[]
  volunteerExperiences: any[]
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return isMobile
}

export const TimelineDisplay = ({ experiences, volunteerExperiences: volunteerExpProps }: TimelineDisplayProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${now.getMonth()}`
  })

  useEffect(() => {
    const checkMonth = () => {
      const now = new Date()
      const monthKey = `${now.getFullYear()}-${now.getMonth()}`
      if (monthKey !== currentMonth) {
        setCurrentMonth(monthKey)
      }
    }

    const interval = setInterval(checkMonth, 24 * 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [currentMonth])

  const processedData = (() => {
    const allExperiences: ProcessedExperience[] = []

    experiences.forEach((exp) => {
      exp.experience_time_line.forEach((timeline: any) => {
        const startDate = new Date(timeline.start_date)
        const endDate = timeline.end_date ? new Date(timeline.end_date) : new Date()

        allExperiences.push({
          type: 'work',
          name: exp.company_name,
          logo: exp.company_logo || '',
          position: timeline.position,
          start_date: timeline.start_date,
          end_date: timeline.end_date || '',
          startMonth: startDate,
          endMonth: endDate,
          description: exp.description,
          technologies: exp.technologies,
        })
      })
    })

    volunteerExpProps.forEach((exp) => {
      exp.volunteer_time_line.forEach((timeline: any) => {
        const startDate = new Date(timeline.start_date)
        const endDate = timeline.end_date ? new Date(timeline.end_date) : new Date()

        allExperiences.push({
          type: 'volunteer',
          name: exp.organisation,
          logo: exp.organisation_logo || '',
          position: timeline.position,
          start_date: timeline.start_date,
          end_date: timeline.end_date || '',
          startMonth: startDate,
          endMonth: endDate,
          description: exp.description,
          technologies: exp.technologies,
        })
      })
    })

    allExperiences.sort((a, b) => b.startMonth.getTime() - a.startMonth.getTime())

    const earliestStart =
      allExperiences.length > 0
        ? new Date(Math.min(...allExperiences.map((exp) => exp.startMonth.getTime())))
        : new Date()

    const now = new Date()
    const currentMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)

    const maxExperienceEnd =
      allExperiences.length > 0
        ? new Date(Math.max(...allExperiences.map((exp) => exp.endMonth.getTime())))
        : currentMonthDate

    const latestEnd = maxExperienceEnd > currentMonthDate ? currentMonthDate : currentMonthDate

    void currentMonth

    const months: Array<{
      date: Date
      year: number
      month: number
      monthName: string
      isYearStart: boolean
    }> = []

    const current = new Date(earliestStart.getFullYear(), earliestStart.getMonth(), 1)
    while (current <= latestEnd) {
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ]
      months.push({
        date: new Date(current),
        year: current.getFullYear(),
        month: current.getMonth(),
        monthName: monthNames[current.getMonth()],
        isYearStart: current.getMonth() === 0,
      })
      current.setMonth(current.getMonth() + 1)
    }

    return { allExperiences, months, earliestStart, latestEnd }
  })()

  const getMonthPosition = (date: Date) => {
    const monthIndex = processedData.months.findIndex(
      (m) => m.date.getFullYear() === date.getFullYear() && m.date.getMonth() === date.getMonth()
    )
    return monthIndex >= 0 ? monthIndex * (isMobile ? 80 : 120) + 24 : 24
  }

  const getExperiencePosition = (exp: ProcessedExperience) => {
    const startPos = getMonthPosition(exp.startMonth)

    const now = new Date()
    const currentMonthDate = new Date(now.getFullYear(), now.getMonth(), 1)
    const effectiveEndMonth = exp.endMonth > currentMonthDate ? currentMonthDate : exp.endMonth

    const endPos = getMonthPosition(effectiveEndMonth)
    const minWidth = isMobile ? 80 : 120

    return {
      left: startPos,
      width: Math.max(endPos - startPos + (isMobile ? 80 : 120), minWidth),
    }
  }

  useEffect(() => {
    if (scrollContainerRef.current && processedData.months.length > 0) {
      requestAnimationFrame(() => {
        const container = scrollContainerRef.current
        if (container) {
          const now = new Date()
          const currentMonthIndex = processedData.months.findIndex(
            (m) => m.year === now.getFullYear() && m.month === now.getMonth()
          )
          
          if (currentMonthIndex !== -1) {
            const monthPosition = currentMonthIndex * (isMobile ? 80 : 120)
            const containerWidth = container.clientWidth
            const scrollTo = Math.max(0, monthPosition - containerWidth / 2 + 60)
            
            container.scrollLeft = scrollTo
          } else {
            const scrollTo = Math.max(0, container.scrollWidth - container.clientWidth - 200)
            container.scrollLeft = scrollTo
          }
        }
      })
    }
  }, [processedData.months, isMobile])

  const arrangeExperiences = () => {
    const workExperiences: ProcessedExperience[] = []
    const volunteerExperiences: ProcessedExperience[] = []

    processedData.allExperiences.forEach((exp) => {
      if (exp.type === 'work') {
        workExperiences.push(exp)
      } else {
        volunteerExperiences.push(exp)
      }
    })

    return { workExperiences, volunteerExperiences }
  }

  const { workExperiences, volunteerExperiences } = arrangeExperiences()

  const getCompanyColor = (companyName: string, type: 'work' | 'volunteer') => {
    const colors =
      type === 'work'
        ? ['#06b6d4', '#3b82f6', '#8b5cf6', '#0ea5e9', '#2563eb', '#6366f1', '#0891b2', '#1d4ed8']
        : ['#10b981', '#059669', '#14b8a6', '#0d9488', '#06b6d4', '#0891b2', '#047857', '#0f766e']

    let hash = 0
    for (let i = 0; i < companyName.length; i++) {
      hash = companyName.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? 300 : 500
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  if (processedData.allExperiences.length === 0) {
    return (
      <section className="relative py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Experience Timeline
            </h2>
            <p className="text-lg text-gray-400">No experiences available to display</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              Experience Timeline
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive timeline of my professional journey and volunteer contributions,
            continuously updated to reflect my current roles
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-visible pb-6 pt-4 mx-4 lg:mx-12 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-900/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gradient-to-r [&::-webkit-scrollbar-thumb]:from-cyan-500 [&::-webkit-scrollbar-thumb]:to-blue-500 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:from-cyan-400 [&::-webkit-scrollbar-thumb:hover]:to-blue-400"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#06b6d4 #1a1a1a',
              scrollBehavior: 'smooth',
            }}
          >
            <div
              className="relative bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10"
              style={{
                width: `${Math.max(processedData.months.length * (isMobile ? 80 : 120), 800)}px`,
                minWidth: '100%',
              }}
            >
              <div className="absolute top-24 left-8 right-8 h-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 rounded-full shadow-lg shadow-cyan-500/20" />

              <div className="relative h-20 mb-12">
                {processedData.months.map((month, index) => {
                  const now = new Date()
                  const isCurrentMonth =
                    month.year === now.getFullYear() && month.month === now.getMonth()

                  return (
                    <div
                      key={`${month.year}-${month.month}`}
                      className="absolute flex flex-col items-center"
                      style={{
                        left: `${index * (isMobile ? 80 : 120)}px`,
                        width: `${isMobile ? 80 : 120}px`,
                      }}
                    >
                      <div className="relative">
                        <div
                          className={`w-4 h-4 rounded-full border-2 shadow-lg z-10 transition-all duration-300 ${
                            isCurrentMonth
                              ? 'bg-cyan-400 border-cyan-300 animate-pulse ring-4 ring-cyan-400/30 scale-125'
                              : month.isYearStart
                                ? 'bg-blue-400 border-blue-300 ring-2 ring-blue-400/20'
                                : 'bg-purple-400 border-purple-300'
                          }`}
                        />
                        {isCurrentMonth && (
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <div className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-cyan-500/50">
                              Current
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 text-center">
                        <div
                          className={`text-xs sm:text-sm font-semibold transition-all duration-300 ${
                            isCurrentMonth
                              ? 'text-cyan-400 scale-110'
                              : month.isYearStart
                                ? 'text-blue-400'
                                : 'text-purple-400'
                          }`}
                        >
                          {month.monthName}
                        </div>
                        {month.isYearStart && (
                          <div className="text-xs text-gray-500 font-bold mt-1">
                            {month.year}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {workExperiences.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <h3 className="font-bold text-xl text-cyan-400">Work Experience</h3>
                  </div>

                  <div className="relative">
                    <div className="absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-transparent rounded-full" />

                    {workExperiences.map((exp, index) => {
                      const position = getExperiencePosition(exp)
                      const companyColor = getCompanyColor(exp.name, 'work')
                      const expId = `work-${index}`
                      const isHovered = hoveredCard === expId

                      return (
                        <div
                          key={expId}
                          className="relative"
                          style={{
                            marginBottom: index < workExperiences.length - 1 ? '3rem' : '0',
                          }}
                        >
                          <div
                            className="absolute transition-all duration-300"
                            style={{
                              left: `${position.left + position.width / 2 - 28}px`,
                              top: '-14px',
                              zIndex: 20,
                            }}
                            onMouseEnter={() => !isMobile && setHoveredCard(expId)}
                            onMouseLeave={() => !isMobile && setHoveredCard(null)}
                          >
                            <div
                              className={`
                              w-14 h-14 rounded-xl bg-gradient-to-br from-gray-900 to-gray-950 
                              flex items-center justify-center cursor-pointer border-2
                              transition-all duration-300 shadow-lg
                              ${isHovered ? 'scale-125 shadow-2xl ring-4' : 'hover:scale-110'}
                            `}
                              style={{ 
                                borderColor: companyColor,
                                boxShadow: isHovered ? `0 0 30px ${companyColor}40` : undefined,
                                '--tw-ring-color': `${companyColor}40`,
                              } as any}
                            >
                              {exp.logo ? (
                                <Image
                                  src={exp.logo}
                                  alt={exp.name}
                                  width={36}
                                  height={36}
                                  className="object-contain rounded-lg"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-lg" style={{ backgroundColor: companyColor }}></div>
                              )}
                            </div>

                            <div
                              className={`
                              absolute top-16 left-1/2 -translate-x-1/2 
                              px-4 py-3 bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-md
                              border rounded-xl shadow-2xl text-xs font-medium whitespace-nowrap
                              transition-all duration-300 z-50
                              ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}
                            `}
                              style={{ 
                                borderColor: companyColor,
                                boxShadow: `0 10px 40px ${companyColor}30`,
                                zIndex: 1000 
                              }}
                            >
                              <div className="font-bold text-white">{exp.name}</div>
                              <div className="text-xs text-gray-400 mt-1">
                                {exp.position}
                              </div>

                              <div 
                                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                                style={{ 
                                  background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                                  borderLeft: `1px solid ${companyColor}`,
                                  borderTop: `1px solid ${companyColor}`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div
                            className="absolute top-8 rounded-full transition-all duration-300 cursor-pointer shadow-lg"
                            style={{
                              left: `${position.left}px`,
                              width: `${position.width}px`,
                              background: `linear-gradient(90deg, ${companyColor}E6 0%, ${companyColor}CC 100%)`,
                              height: isHovered ? '8px' : '6px',
                              top: isHovered ? '5px' : '6px',
                              boxShadow: isHovered ? `0 0 20px ${companyColor}80, 0 4px 12px ${companyColor}40` : `0 2px 8px ${companyColor}40`,
                            }}
                            onMouseEnter={() => !isMobile && setHoveredCard(expId)}
                            onMouseLeave={() => !isMobile && setHoveredCard(null)}
                          >
                            <div
                              className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-gray-950 shadow-lg"
                              style={{ 
                                backgroundColor: companyColor,
                                boxShadow: `0 0 10px ${companyColor}80`,
                              }}
                            />

                            <div
                              className={`
                                absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-gray-950 shadow-lg
                                ${!exp.end_date ? 'animate-pulse' : ''}
                              `}
                              style={{ 
                                backgroundColor: companyColor,
                                boxShadow: !exp.end_date ? `0 0 20px ${companyColor}` : `0 0 10px ${companyColor}80`,
                              }}
                            />
                          </div>

                          <div
                            className="absolute top-16 text-xs text-gray-500 text-center font-medium"
                            style={{
                              left: `${position.left}px`,
                              width: `${position.width}px`,
                            }}
                          >
                            {exp.startMonth.toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric',
                            })}{' '}
                            <span className="text-gray-600">→</span>{' '}
                            {exp.end_date
                              ? exp.endMonth.toLocaleDateString('en-US', {
                                  month: 'short',
                                  year: 'numeric',
                                })
                              : <span className="text-cyan-400 font-bold">Present</span>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {volunteerExperiences.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-8">
                    <h3 className="font-bold text-xl text-purple-400">Volunteer Experience</h3>
                  </div>

                  <div className="relative">
                    <div className="absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-transparent rounded-full" />

                    {volunteerExperiences.map((exp, index) => {
                      const position = getExperiencePosition(exp)
                      const companyColor = getCompanyColor(exp.name, 'volunteer')
                      const expId = `volunteer-${index}`
                      const isHovered = hoveredCard === expId

                      return (
                        <div
                          key={expId}
                          className="relative"
                          style={{
                            marginBottom: index < volunteerExperiences.length - 1 ? '3rem' : '0',
                          }}
                        >
                          <div
                            className="absolute transition-all duration-300"
                            style={{
                              left: `${position.left + position.width / 2 - 28}px`,
                              top: '-14px',
                              zIndex: 20,
                            }}
                            onMouseEnter={() => !isMobile && setHoveredCard(expId)}
                            onMouseLeave={() => !isMobile && setHoveredCard(null)}
                          >
                            <div
                              className={`
                              w-14 h-14 rounded-xl bg-gradient-to-br from-gray-900 to-gray-950
                              flex items-center justify-center cursor-pointer border-2
                              transition-all duration-300 shadow-lg
                              ${isHovered ? 'scale-125 shadow-2xl ring-4' : 'hover:scale-110'}
                            `}
                              style={{ 
                                borderColor: companyColor,
                                boxShadow: isHovered ? `0 0 30px ${companyColor}40` : undefined,
                                '--tw-ring-color': `${companyColor}40`,
                              } as any}
                            >
                              {exp.logo ? (
                                <Image
                                  src={exp.logo}
                                  alt={exp.name}
                                  width={36}
                                  height={36}
                                  className="object-contain rounded-lg"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-lg" style={{ backgroundColor: companyColor }}></div>
                              )}
                            </div>

                            <div
                              className={`
                              absolute top-16 left-1/2 -translate-x-1/2 
                              px-4 py-3 bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-md
                              border rounded-xl shadow-2xl text-xs font-medium whitespace-nowrap
                              transition-all duration-300 z-50
                              ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}
                            `}
                              style={{ 
                                borderColor: companyColor,
                                boxShadow: `0 10px 40px ${companyColor}30`,
                                zIndex: 1000 
                              }}
                            >
                              <div className="font-bold text-white">{exp.name}</div>
                              <div className="text-xs text-gray-400 mt-1">
                                {exp.position}
                              </div>

                              <div 
                                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                                style={{ 
                                  background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                                  borderLeft: `1px solid ${companyColor}`,
                                  borderTop: `1px solid ${companyColor}`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div
                            className="absolute top-8 rounded-full transition-all duration-300 cursor-pointer shadow-lg"
                            style={{
                              left: `${position.left}px`,
                              width: `${position.width}px`,
                              background: `linear-gradient(90deg, ${companyColor}E6 0%, ${companyColor}CC 100%)`,
                              height: isHovered ? '8px' : '6px',
                              top: isHovered ? '5px' : '6px',
                              boxShadow: isHovered ? `0 0 20px ${companyColor}80, 0 4px 12px ${companyColor}40` : `0 2px 8px ${companyColor}40`,
                            }}
                            onMouseEnter={() => !isMobile && setHoveredCard(expId)}
                            onMouseLeave={() => !isMobile && setHoveredCard(null)}
                          >
                            <div
                              className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-gray-950 shadow-lg"
                              style={{ 
                                backgroundColor: companyColor,
                                boxShadow: `0 0 10px ${companyColor}80`,
                              }}
                            />

                            <div
                              className={`
                                absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-gray-950 shadow-lg
                                ${!exp.end_date ? 'animate-pulse' : ''}
                              `}
                              style={{ 
                                backgroundColor: companyColor,
                                boxShadow: !exp.end_date ? `0 0 20px ${companyColor}` : `0 0 10px ${companyColor}80`,
                              }}
                            />
                          </div>

                          <div
                            className="absolute top-16 text-xs text-gray-500 text-center font-medium"
                            style={{
                              left: `${position.left}px`,
                              width: `${position.width}px`,
                            }}
                          >
                            {exp.startMonth.toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric',
                            })}{' '}
                            <span className="text-gray-600">→</span>{' '}
                            {exp.end_date
                              ? exp.endMonth.toLocaleDateString('en-US', {
                                  month: 'short',
                                  year: 'numeric',
                                })
                              : <span className="text-purple-400 font-bold">Present</span>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {!isMobile && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => scroll('left')}
                className="p-4 bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:border-cyan-500/50 transition-all duration-300 group"
                aria-label="Scroll left"
              >
                <ArrowLeft className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-4 bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:border-cyan-500/50 transition-all duration-300 group"
                aria-label="Scroll right"
              >
                <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </button>
            </div>
          )}

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500 font-medium flex items-center justify-center gap-2">
              {isMobile ? (
                <>
                  <span className="text-cyan-400">←</span>
                  Swipe to explore timeline
                  <span className="text-cyan-400">→</span>
                </>
              ) : (
                <>
                  <span className="text-cyan-400">←</span>
                  Scroll horizontally to explore timeline
                  <span className="text-cyan-400">→</span>
                </>
              )}
            </p>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-cyan-500/5">
              <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent text-center mb-6">
                Timeline Legend
              </h3>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl border border-cyan-500/20 w-full max-w-xs backdrop-blur-sm">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/30"></div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="font-bold text-white text-sm">Work Experience</div>
                    <div className="text-xs text-gray-400 mt-0.5">Professional roles</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl border border-purple-500/20 w-full max-w-xs backdrop-blur-sm">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg shadow-purple-500/30"></div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="font-bold text-white text-sm">Volunteer Work</div>
                    <div className="text-xs text-gray-400 mt-0.5">Community service</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-8 h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full shadow-lg shadow-cyan-500/30"></div>
                    <span>Most recent to earliest</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    <span>Scroll to explore full history</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
