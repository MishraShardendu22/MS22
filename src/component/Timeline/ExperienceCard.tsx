// ExperienceCard.tsx
import Image from 'next/image'
import { ProcessedExperience, ExperiencePosition } from './types'

interface ExperienceCardProps {
  expId: string
  isMobile: boolean
  isHovered: boolean
  companyColor: string
  onMouseEnter: () => void
  onMouseLeave: () => void
  exp: ProcessedExperience
  position: ExperiencePosition
}

export const ExperienceCard = ({
  exp,
  position,
  isHovered,
  companyColor,
  onMouseEnter,
  onMouseLeave,
}: ExperienceCardProps) => {
  return (
    <>
      {/* Company Logo */}
      <div
        className="absolute transition-all duration-300"
        style={{
          left: `${position.left + position.width / 2 - 28}px`,
          top: '-14px',
          zIndex: isHovered ? 100 : 20,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
            ['--tw-ring-color' as string]: `${companyColor}40`,
          }}
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

        {/* Tooltip */}
        <div
          className={`
            absolute top-16 left-1/2 -translate-x-1/2 
            px-4 py-3 bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-md
            border rounded-xl shadow-2xl text-xs font-medium whitespace-nowrap
            transition-all duration-300
            ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}
          `}
          style={{ 
            borderColor: companyColor,
            boxShadow: `0 10px 40px ${companyColor}30`,
            zIndex: 1000,
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
          />
        </div>
      </div>

      {/* Experience Bar */}
      <div
        className="absolute rounded-full transition-all duration-300 cursor-pointer shadow-lg"
        style={{
          left: `${position.left}px`,
          width: `${position.width}px`,
          top: '8px',
          background: `linear-gradient(90deg, ${companyColor}E6 0%, ${companyColor}CC 100%)`,
          height: isHovered ? '8px' : '6px',
          transform: isHovered ? 'translateY(-1px)' : 'none',
          boxShadow: isHovered ? `0 0 20px ${companyColor}80, 0 4px 12px ${companyColor}40` : `0 2px 8px ${companyColor}40`,
          zIndex: isHovered ? 50 : 10,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Start Dot */}
        <div
          className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-gray-950 shadow-lg"
          style={{ 
            backgroundColor: companyColor,
            boxShadow: `0 0 10px ${companyColor}80`,
          }}
        />

        {/* End Dot */}
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

      {/* Date Range */}
      <div
        className="absolute text-xs text-gray-500 text-center font-medium pointer-events-none"
        style={{
          left: `${position.left}px`,
          width: `${position.width}px`,
          top: '20px',
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
          : <span className={`${exp.type === 'work' ? 'text-cyan-400' : 'text-purple-400'} font-bold`}>Present</span>}
      </div>
    </>
  )
}
