'use client'

import { AlertCircle } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  message: string
  variant?: 'red' | 'orange' | 'yellow'
}

export const ErrorState = ({ 
  title = 'Error', 
  message,
  variant = 'red'
}: ErrorStateProps) => {
  const colorClasses = {
    red: {
      bg: 'bg-red-500/5',
      ring: 'ring-red-500/30',
      icon: 'bg-red-500/10 text-red-400',
      title: 'text-red-400'
    },
    orange: {
      bg: 'bg-orange-500/5',
      ring: 'ring-orange-500/30',
      icon: 'bg-orange-500/10 text-orange-400',
      title: 'text-orange-400'
    },
    yellow: {
      bg: 'bg-yellow-500/5',
      ring: 'ring-yellow-500/30',
      icon: 'bg-yellow-500/10 text-yellow-400',
      title: 'text-yellow-400'
    }
  }

  const colors = colorClasses[variant]

  return (
    <section className="relative py-8 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${colors.bg} rounded-full blur-3xl`}></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className={`w-16 h-16 rounded-xl ${colors.icon} flex items-center justify-center mb-4 ring-2 ${colors.ring}`}>
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className={`text-xl font-bold ${colors.title} mb-2`}>{title}</h3>
          <p className="text-gray-400 text-center max-w-md">{message}</p>
        </div>
      </div>
    </section>
  )
}
