export function StatsLoadingSkeleton() {
  return (
    <section className="relative py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 bg-linear-to-br from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none will-change-auto">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-80 md:h-80 bg-cyan-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-80 md:h-80 bg-blue-500/5 rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f06_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f06_1px,transparent_1px)] bg-size-[4rem_4rem]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-6 md:mb-8 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 md:mb-4">
            Coding Statistics
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
            Overview of my coding activity and achievements across platforms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {/* GitHub Profile skeleton */}
          <div className="bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-gray-700/50 rounded-lg" />
              <div className="space-y-2">
                <div className="w-32 h-4 bg-gray-700/50 rounded" />
                <div className="w-24 h-3 bg-gray-700/50 rounded" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 bg-gray-800/30 rounded-lg" />
                <div className="h-16 bg-gray-800/30 rounded-lg" />
              </div>
              <div className="h-16 bg-gray-800/30 rounded-lg" />
              <div className="h-12 bg-gray-800/30 rounded-lg" />
              <div className="h-12 bg-gray-800/30 rounded-lg" />
            </div>
          </div>

          {/* LeetCode skeleton */}
          <div className="bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-yellow-500/10 rounded-lg" />
              <div className="space-y-2">
                <div className="w-28 h-4 bg-gray-700/50 rounded" />
                <div className="w-24 h-3 bg-gray-700/50 rounded" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-12 bg-gray-800/30 rounded-lg" />
              <div className="h-16 bg-gray-800/30 rounded-lg" />
              <div className="space-y-2">
                <div className="h-10 bg-gray-800/30 rounded-lg" />
                <div className="h-10 bg-gray-800/30 rounded-lg" />
                <div className="h-10 bg-gray-800/30 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Commits Activity skeleton */}
          <div className="lg:col-span-2 bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-cyan-500/10 rounded-lg" />
              <div className="space-y-2">
                <div className="w-40 h-4 bg-gray-700/50 rounded" />
                <div className="w-48 h-3 bg-gray-700/50 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="h-16 bg-gray-800/30 rounded-lg" />
              <div className="h-16 bg-gray-800/30 rounded-lg" />
              <div className="h-16 bg-gray-800/30 rounded-lg" />
              <div className="h-16 bg-gray-800/30 rounded-lg" />
            </div>
            <div className="h-80 bg-gray-800/30 rounded-lg" />
          </div>

          {/* Top Repositories skeleton */}
          <div className="lg:col-span-2 bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-green-500/10 rounded-lg" />
              <div className="space-y-2">
                <div className="w-36 h-4 bg-gray-700/50 rounded" />
                <div className="w-32 h-3 bg-gray-700/50 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Array.from({ length: 6 }, (_, i) => `skeleton-repo-${i}`).map(
                (key) => (
                  <div key={key} className="h-24 bg-gray-800/30 rounded-lg" />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
