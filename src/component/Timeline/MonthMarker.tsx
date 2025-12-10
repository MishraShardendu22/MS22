import type { MonthData } from "./types";

interface MonthMarkerProps {
  month: MonthData;
  index: number;
  isMobile: boolean;
}

export const MonthMarker = ({ month, index, isMobile }: MonthMarkerProps) => {
  const now = new Date();
  const isCurrentMonth =
    month.year === now.getFullYear() && month.month === now.getMonth();

  return (
    <div
      key={`${month.year}-${month.month}`}
      className="absolute flex flex-col items-center z-20"
      style={{
        left: `${index * (isMobile ? 80 : 120)}px`,
        width: `${isMobile ? 80 : 120}px`,
      }}
    >
      <div className="relative">
        <div
          className={`w-4 h-4 rounded-full border-2 shadow-lg z-10 transition-all duration-300 ${
            isCurrentMonth
              ? "bg-cyan-400 border-cyan-300 animate-pulse ring-4 ring-cyan-400/30 scale-125"
              : month.isYearStart
                ? "bg-blue-400 border-blue-300 ring-2 ring-blue-400/20"
                : "bg-purple-400 border-purple-300"
          }`}
        />
        {isCurrentMonth && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-30">
            <div className="px-3 py-1.5 bg-linear-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-cyan-500/50">
              Current
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 text-center">
        <div
          className={`text-xs sm:text-sm font-bold transition-all duration-300 px-2 py-1 rounded-md ${
            isCurrentMonth
              ? "text-cyan-300 scale-110 bg-cyan-500/20 shadow-lg shadow-cyan-500/30"
              : month.isYearStart
                ? "text-blue-300 bg-blue-500/20 shadow-md shadow-blue-500/20"
                : "text-purple-300 bg-purple-500/10"
          }`}
        >
          {month.monthName}
        </div>
        {month.isYearStart && (
          <div className="text-xs text-gray-200 font-bold mt-1 bg-gray-800/50 px-2 py-0.5 rounded">
            {month.year}
          </div>
        )}
      </div>
    </div>
  );
};
