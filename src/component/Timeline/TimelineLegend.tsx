export const TimelineLegend = () => {
  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <div className="bg-linear-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-cyan-500/5">
        <h3 className="text-lg font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent text-center mb-6">
          Timeline Legend
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-4 p-4 bg-linear-to-br from-cyan-500/5 to-blue-500/5 rounded-xl border border-cyan-500/20 w-full max-w-xs backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-linear-to-br from-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/30"></div>
            <div className="flex-1 text-center sm:text-left">
              <div className="font-bold text-white text-sm">
                Work Experience
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                Professional roles
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-linear-to-br from-purple-500/5 to-pink-500/5 rounded-xl border border-purple-500/20 w-full max-w-xs backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-linear-to-br from-purple-400 to-pink-400 shadow-lg shadow-purple-500/30"></div>
            <div className="flex-1 text-center sm:text-left">
              <div className="font-bold text-white text-sm">Volunteer Work</div>
              <div className="text-xs text-gray-400 mt-0.5">
                Community service
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 ">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-8 h-2 bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full shadow-lg shadow-cyan-500/30"></div>
              <span>Most recent to earliest</span>
            </div>
            <div className="text-sm text-gray-400">
              <span>Scroll to explore full history</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
