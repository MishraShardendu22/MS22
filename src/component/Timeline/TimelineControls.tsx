import { ArrowLeft, ArrowRight } from "lucide-react";

interface TimelineControlsProps {
  isMobile: boolean;
  onScroll: (direction: "left" | "right") => void;
}

export const TimelineControls = ({
  isMobile,
  onScroll,
}: TimelineControlsProps) => {
  return (
    <>
      {!isMobile && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => onScroll("left")}
            className="p-4 bg-linear-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-md border border-violet-500/30 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:border-violet-500/50 transition-all duration-300 group"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" />
          </button>
          <button
            type="button"
            onClick={() => onScroll("right")}
            className="p-4 bg-linear-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-md border border-violet-500/30 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:border-violet-500/50 transition-all duration-300 group"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" />
          </button>
        </div>
      )}

      <div className="text-center mt-6">
        <p className="text-xs text-gray-500 font-medium flex items-center justify-center gap-2">
          {isMobile ? (
            <>
              <span className="text-violet-400">←</span>
              Swipe to explore timeline
              <span className="text-violet-400">→</span>
            </>
          ) : (
            <>
              <span className="text-violet-400">←</span>
              Scroll horizontally to explore timeline
              <span className="text-violet-400">→</span>
            </>
          )}
        </p>
      </div>
    </>
  );
};
