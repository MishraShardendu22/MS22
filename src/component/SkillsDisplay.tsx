'use client'

import { useEffect, useState } from 'react'
import { skillsAPI } from '@/static/api/api.request'

export default function SkillsDisplay() {
  const [skills, setSkills] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true)
        const response = await skillsAPI.getSkills()
        console.log('Fetched skills:', response)
        setSkills(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Loading skills...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">My Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
