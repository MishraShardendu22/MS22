'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  GraduationCap, 
  Code2, 
  Clock, 
  Briefcase, 
  FolderGit2, 
  Heart, 
  Award, 
  Mail, 
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Skills', href: '#skills', icon: Code2 },
  { name: 'Timeline', href: '#timeline', icon: Clock },
  { name: 'Projects', href: '#projects', icon: FolderGit2 },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Volunteer', href: '#volunteer', icon: Heart },
  { name: 'Certifications', href: '#certifications', icon: Award },
  { name: 'Contact', href: '#contact', icon: Mail },
  { name: 'Blog', href: '#blog', icon: FileText },
]

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return false
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-gray-950/95 backdrop-blur-xl border-r border-gray-800/50 z-50 transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-center px-5 border-b border-gray-800/50">
          <div className={`flex flex-col items-center justify-center transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-100'}`}>
            {isExpanded ? (
              <div className="text-xs text-gray-500 space-y-1 text-center">
                <p className="font-semibold text-pink-400">Shardendu Sankrit Mishra</p>
              </div>
            ) : (
              <p className="text-xs font-bold text-white">SM</p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  active
                    ? 'bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 border border-transparent'
                }`}
              >
                {active && (
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-xl animate-pulse" />
                )}
                
                <Icon className={`w-5 h-5 shrink-0 relative z-10 ${active ? 'text-cyan-400' : ''}`} />
                
                <span
                  className={`font-semibold whitespace-nowrap relative z-10 transition-all duration-300 ${
                    isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  }`}
                >
                  {item.name}
                </span>

                {active && (
                  <div className="absolute right-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer - Made with section */}
        <div className={`px-4 py-4 border-t border-gray-800/50 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-xs text-gray-500 space-y-1">
            <p className="font-semibold text-pink-400">Made with Linux in Kernel</p>
            <p className="text-gray-600">and Golang in Mind</p>
          </div>
        </div>

        {/* Expand/Collapse Indicator */}
        <button
          className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-900 border border-gray-800/50 rounded-full flex items-center justify-center transition-opacity duration-300 ${
            isExpanded ? 'opacity-0' : 'opacity-100'
          }`}
          aria-label="Expand sidebar"
        >
          <ChevronRight className="w-3 h-3 text-gray-400" />
        </button>
      </aside>

      {/* Spacer for content */}
      <div className="w-20" />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.7);
        }
      `}</style>
    </>
  )
}
