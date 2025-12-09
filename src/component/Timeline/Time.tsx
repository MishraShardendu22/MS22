'use client'

import { useEffect, useState } from 'react'
import { ErrorState } from '@/component/Error'
import { LoadingState } from '@/component/Loading'
import { TimelineDisplay } from './TimelineDisplay'
import { TimelineAPI } from '@/static/api/api.request'

export const Time = () => {
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState<string | null>(null)
  const [experiences, setExperiences] = useState<any[]>([])
  const [volunteerExperiences, setVolunteerExperiences] = useState<any[]>([])

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true)
        const res = await TimelineAPI.getAllEndpoints()
        
        const data: any = res.data
        const experienceTimeline = data?.experience_timeline || []
        const volunteerTimeline = data?.volunteer_experience_timeline || []
        
        const workExps = experienceTimeline.map((item: any) => ({
          company_name: item.company_name,
          company_logo: item.company_logo,
          description: item.description,
          technologies: item.technologies || [],
          experience_time_line: [{
            position: item.position,
            start_date: item.start_date,
            end_date: item.end_date || '',
          }]
        }))
        
        const volunteerExps = volunteerTimeline.map((item: any) => ({
          organisation: item.organisation,
          organisation_logo: item.organisation_logo,
          description: item.description,
          technologies: item.technologies || [],
          volunteer_time_line: [{
            position: item.position,
            start_date: item.start_date,
            end_date: item.end_date || '',
          }]
        }))
        
        setExperiences(workExps)
        setVolunteerExperiences(volunteerExps)
      } catch (err) {
        console.error('Timeline fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load timeline')
      } finally {
        setLoading(false)
      }
    }

    fetchTimeline()
  }, [])

  if (loading) return <LoadingState message="Loading timeline..." variant="cyan" />
  if (error) return <ErrorState title="Timeline Error" message={error} variant="red" onRetry={() => window.location.reload()} />

  return <TimelineDisplay experiences={experiences} volunteerExperiences={volunteerExperiences} />
}

export default Time
