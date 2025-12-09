'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { experiencesAPI } from '@/static/api/api.request'
import { Sidebar } from '@/component/Sidebar'
import type { Experience } from '@/static/api/api.types'
import { LoadingState } from '@/component/Loading'
import { ErrorState } from '@/component/Error'
import { ArrowLeft, Building2, Calendar, ExternalLink, Code2, Award, Briefcase } from 'lucide-react'
import Link from 'next/link'

export default function ExperienceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const id = params.id as string
        if (!id) {
          throw new Error('Experience ID is required')
        }

        const response = await experiencesAPI.getExperienceById(id)
        
        if (response.status === 200 && response.data) {
          setExperience(response.data)
        } else {
          throw new Error(response.message || 'Failed to fetch experience details')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [params.id])

  if (loading) {
    return <LoadingState />
  }

  if (error || !experience) {
    return <ErrorState message={error || 'Experience not found'} />
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link href="/experiences">
          <button className="group flex items-center gap-2 mb-8 px-6 py-3 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-gray-400 rounded-xl hover:border-blue-500/40 hover:text-blue-400 transition-all shadow-lg">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back to Experiences</span>
          </button>
        </Link>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Card */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative p-10 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-3xl">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30">
                      <Building2 className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-4xl font-black text-white mb-3 leading-tight">
                        {experience.company_name}
                      </h1>
                      {experience.experience_time_line && experience.experience_time_line.length > 0 && (
                        <p className="text-xl text-blue-400 font-semibold mb-2">
                          {experience.experience_time_line[0].position}
                        </p>
                      )}
                    </div>
                  </div>

                  {experience.experience_time_line && experience.experience_time_line.length > 0 && (
                    <div className="space-y-3 pt-6 border-t border-gray-800/50">
                      {experience.experience_time_line.map((timeline, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <div className="p-2 bg-gray-800/50 rounded-lg">
                            <Calendar className="w-4 h-4 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">{timeline.position}</p>
                            <p className="text-gray-400">
                              {timeline.start_date} - {timeline.end_date || 'Present'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {experience.description && (
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <Briefcase className="w-6 h-6 text-blue-400" />
                      About the Role
                    </h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {experience.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Images */}
              {experience.images && experience.images.length > 0 && (
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {experience.images.map((image, idx) => (
                        <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gray-800/50 hover:border-blue-500/40 transition-all group/img">
                          <img
                            src={image}
                            alt={`Experience image ${idx + 1}`}
                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Technologies */}
              {experience.technologies && experience.technologies.length > 0 && (
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-50" />
                  <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-blue-400" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-2 text-sm font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 rounded-lg border border-blue-500/30 hover:from-blue-500/20 hover:to-purple-500/20 transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Certificate Link */}
              {experience.certificate_url && (
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-50" />
                  <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-cyan-400" />
                      Certificate
                    </h3>
                    <a
                      href={experience.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 rounded-xl hover:from-cyan-500/30 hover:to-blue-500/30 transition-all font-semibold shadow-lg shadow-cyan-500/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Certificate
                    </a>
                  </div>
                </div>
              )}

              {/* Quick Info */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-50" />
                <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Info</h3>
                  
                  {experience.company_name && (
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Company</p>
                        <p className="text-white font-semibold">{experience.company_name}</p>
                      </div>
                    </div>
                  )}

                  {experience.experience_time_line && experience.experience_time_line.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Roles</p>
                        <p className="text-white font-semibold">{experience.experience_time_line.length} Position{experience.experience_time_line.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  )}

                  {experience.technologies && experience.technologies.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Code2 className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Technologies</p>
                        <p className="text-white font-semibold">{experience.technologies.length} Tech{experience.technologies.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
      </main>
    </>
  )
}
