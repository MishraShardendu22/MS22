'use client'

import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
  message?: string
  variant?: 'cyan' | 'blue' | 'purple'
}

export const LoadingState = ({ 
  message = 'Loading...', 
  variant = 'cyan' 
}: LoadingStateProps) => {
  const colorClasses = {
    cyan: 'text-cyan-400 bg-cyan-500/5',
    blue: 'text-blue-400 bg-blue-500/5',
    purple: 'text-purple-400 bg-purple-500/5'
  }

  return (
    <section className="relative py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${colorClasses[variant]} rounded-full blur-3xl`}></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className={`w-12 h-12 ${colorClasses[variant].split(' ')[0]} animate-spin mb-4`} />
          <p className="text-gray-400 text-lg">{message}</p>
        </div>
      </div>
    </section>
  )
}
