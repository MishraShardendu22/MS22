"use client";

type ThemeType = "cyan" | "blue" | "pink" | "purple";

interface EmptyStateProps {
  title: string;
  description: string;
  hasFilters: boolean;
  onClearFilters: () => void;
  theme: ThemeType;
  icon?: string;
}

const themeClasses: Record<ThemeType, string> = {
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20",
  pink: "bg-pink-500/10 text-pink-400 border-pink-500/30 hover:bg-pink-500/20",
  purple:
    "bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20",
};

const defaultIcons: Record<ThemeType, string> = {
  cyan: "📁",
  blue: "💼",
  pink: "❤️",
  purple: "🏆",
};

export function EmptyState({
  title,
  description,
  hasFilters,
  onClearFilters,
  theme,
  icon,
}: EmptyStateProps) {
  const displayIcon = icon ?? defaultIcons[theme];

  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-900/80 border border-gray-800/50 mb-4">
        <span className="text-2xl">{displayIcon}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-4">{description}</p>
      {hasFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className={`inline-flex items-center gap-2 px-4 py-2 ${themeClasses[theme]} border rounded-lg font-medium text-sm transition-all`}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
