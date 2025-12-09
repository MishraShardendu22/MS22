'use client'

import { useEffect, useState } from 'react'
import { certificatesAPI } from '@/static/api/api.request'
import type { Certificate } from '@/static/api/api.types'
import { LoadingState } from '@/component/Loading'
import { ErrorState } from '@/component/Error'
import { Award, Building, Calendar, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'

interface CertificateCardProps {
  certificate: Certificate
  index: number
}

const CertificateCard = ({ certificate, index }: CertificateCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const issueDate = formatDate(certificate.issue_date)
  const expiryDate = certificate.expiry_date ? formatDate(certificate.expiry_date) : 'No Expiration'

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

      <div className="relative bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10">
        
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative p-5">
          
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-emerald-400 transition-colors duration-300">
                {certificate.title}
              </h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                <Building className="w-3.5 h-3.5" />
                <span>{certificate.issuer}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              {certificate.verified && (
                <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              )}
              {certificate.certificate_url && (
                <a
                  href={certificate.certificate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 rounded-lg transition-all duration-200 border border-emerald-500/30"
                  aria-label="View certificate"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Certificate</span>
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Issued {issueDate}</span>
            </div>
            {certificate.expiry_date && (
              <div className="flex items-center gap-1">
                <span>•</span>
                <span>Expires {expiryDate}</span>
              </div>
            )}
            {!certificate.expiry_date && (
              <div className="flex items-center gap-1">
                <span>•</span>
                <span className="text-emerald-400 font-medium">No Expiration</span>
              </div>
            )}
          </div>

          {certificate.credential_id && (
            <div className="mb-4 p-2.5 bg-gray-800/30 rounded-lg border border-gray-700/30">
              <p className="text-xs text-gray-500 mb-0.5">Credential ID</p>
              <p className="text-xs font-mono text-gray-300">{certificate.credential_id}</p>
            </div>
          )}

          {certificate.description && (
            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {certificate.description}
            </p>
          )}

          {certificate.skills && certificate.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {certificate.skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium bg-gray-800/50 text-gray-300 rounded-md border border-gray-700/50 hover:border-gray-600 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
              {certificate.skills.length > 4 && (
                <span className="px-2.5 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/30">
                  +{certificate.skills.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const CertificatesDisplay = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCertificates, setTotalCertificates] = useState(0)
  const [paginationLoading, setPaginationLoading] = useState(false)
  const certificatesPerPage = 4

  const fetchCertificates = async (page: number) => {
    try {
      if (page === 1) {
        setLoading(true)
      } else {
        setPaginationLoading(true)
      }
      setError(null)
      
      const response = await certificatesAPI.getAllCertificates(page, certificatesPerPage)
      
      if (response.status === 200 && response.data) {
        const certs = response.data.certifications || []
        // Sort by order if available, otherwise maintain API order
        const sortedCertificates = certs.sort((a, b) => {
          const orderA = a.order ?? 999
          const orderB = b.order ?? 999
          return orderA - orderB
        })
        setCertificates(sortedCertificates)
        setTotalCertificates(response.data.total || sortedCertificates.length)
      } else {
        setCertificates([])
        setTotalCertificates(0)
      }
    } catch (err) {
      console.error('Error fetching certificates:', err)
      setError('Failed to load certificates. Please try again later.')
      setCertificates([])
      setTotalCertificates(0)
    } finally {
      setLoading(false)
      setPaginationLoading(false)
    }
  }

  useEffect(() => {
    fetchCertificates(currentPage)
  }, [currentPage])

  const totalPages = Math.ceil(totalCertificates / certificatesPerPage)

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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-4">
            Certifications
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Professional certifications and achievements demonstrating expertise and continuous learning
          </p>
        </div>
        <div className="min-h-[600px]">
          <LoadingState message="Loading certificates..." variant="cyan" />
        </div>
      </div>
    </section>
  )

  if (error) return (
    <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-4">
            Certifications
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Professional certifications and achievements demonstrating expertise and continuous learning
          </p>
        </div>
        <div className="min-h-[600px]">
          <ErrorState title="Error Loading Certificates" message={error} variant="red" onRetry={() => fetchCertificates(currentPage)} />
        </div>
      </div>
    </section>
  )

  if (certificates.length === 0) return (
    <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-4">
            Certifications
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Professional certifications and achievements demonstrating expertise and continuous learning
          </p>
        </div>
        <div className="min-h-[400px] flex items-center justify-center">
          <p className="text-lg text-gray-400">No certifications available to display</p>
        </div>
      </div>
    </section>
  )

  return (
    <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-4">
            Certifications
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Professional certifications and achievements demonstrating expertise and continuous learning
          </p>
        </div>

        <div className="mb-6 min-h-[600px] relative">
          <div className={`h-[600px] flex items-center justify-center absolute inset-0 transition-opacity duration-300 ${paginationLoading ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}`}>
            <LoadingState message="Loading certificates..." variant="emerald" />
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${paginationLoading ? 'opacity-0' : 'opacity-100'}`}>
            {certificates.map((certificate, index) => {
              const certId = certificate.inline?.id || certificate._id || `cert-${index}`
              return (
                <CertificateCard key={certId} certificate={certificate} index={index} />
              )
            })}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1 || paginationLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-emerald-500/30 text-gray-400 hover:text-emerald-400 transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Previous</span>
            </button>

            <span className="text-gray-400 text-sm font-medium px-2">
              Page <span className="text-emerald-400 font-bold">{currentPage}</span> of <span className="text-emerald-400 font-bold">{totalPages}</span>
            </span>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || paginationLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-emerald-500/30 text-gray-400 hover:text-emerald-400 transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
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
