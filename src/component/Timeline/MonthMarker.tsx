import { MonthData } from './types'

interface MonthMarkerProps {
  month: MonthData
  index: number
  isMobile: boolean
}

export const MonthMarker = ({ month, index, isMobile }: MonthMarkerProps) => {
  const now = new Date()
  const isCurrentMonth = month.year === now.getFullYear() && month.month === now.getMonth()

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
            <div className="px-3 py-1.5 bg-linear-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-cyan-500/50">
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
}
