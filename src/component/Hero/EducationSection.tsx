import { BookOpen, Calendar, ExternalLink, Globe, MapPin } from "lucide-react";
import Link from "next/link";
import { Language } from "@/static/info/header";

export const EducationSection = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Academic Journey Header */}
      <div className="text-center mb-6 md:mb-8 lg:mb-10 px-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 md:mb-3">
          Academic Journey
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base px-4">
          Academic journey through diverse learning experiences and achievements
        </p>
      </div>

      {/* Education Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Higher Education with Languages */}
        <div className="group bg-linear-to-br from-gray-900/95 to-gray-950/95 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-gray-800 hover:border-cyan-500/50 transition-colors duration-200 shadow-xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 md:mb-5 gap-2">
            <div className="flex-1 min-w-0">
              <div className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/10 text-cyan-400 text-xs font-semibold rounded-full mb-2">
                Higher Education
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-100 leading-tight mb-2 wrap-break-word">
                Indian Institute of Information Technology, Dharwad
              </h3>
            </div>
            <Link
              href="https://iiitdwd.ac.in/website-team/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 flex items-center justify-center transition-all group/link"
              aria-label="Visit IIIT Dharwad Website Team"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400 group-hover/link:scale-110 transition-transform" />
            </Link>
          </div>

          {/* Details */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5\">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-cyan-400/70" />
              <span className="font-medium">2023 - 2027</span>
            </div>
            <div className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-cyan-400/70 mt-0.5" />
              <span>Dharwad, Karnataka, India</span>
            </div>
          </div>

          {/* Course Info */}
          <div className="pt-4 sm:pt-5 border-t border-gray-800 mb-4 sm:mb-5">
            <div className="flex items-start gap-1.5 sm:gap-2">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 mt-1 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-300 mb-1">
                  Computer Science and Engineering
                </p>
                <p className="text-xs text-gray-500">
                  Focusing on software development and emerging technologies
                </p>
              </div>
            </div>
          </div>

          {/* Languages Section */}
          <div className="pt-4 sm:pt-5 border-t border-gray-800">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <h3 className="text-xs sm:text-sm font-semibold text-gray-300">
                Communication
              </h3>
            </div>
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              {Language.map((lang) => (
                <span
                  key={lang}
                  className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full bg-linear-to-r from-gray-800/60 to-gray-700/60 border border-cyan-500/20 text-cyan-300 font-medium text-xs hover:border-cyan-500/40 hover:shadow-md hover:shadow-cyan-500/20 transition-all"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* School Education */}
        <div className="group bg-linear-to-br from-gray-900/95 to-gray-950/95 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-gray-800 hover:border-cyan-500/50 transition-colors duration-200 shadow-xl">
          {/* Header */}
          <div className="mb-4 sm:mb-5">
            <div className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/10 text-cyan-400 text-xs font-semibold rounded-full mb-2">
              School Education
            </div>
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-100 leading-tight mb-2 wrap-break-word">
              Delhi Public School, Kalyanpur
            </h3>
          </div>

          {/* Details */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4 shrink-0 text-cyan-400/70" />
              <span className="font-medium">2008 - 2022</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 shrink-0 text-cyan-400/70 mt-0.5" />
              <span>Kanpur, Uttar Pradesh, India</span>
            </div>
          </div>

          {/* Grades */}
          <div className="pt-5 border-t border-gray-800 space-y-4">
            {/* Class 12th */}
            <div className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-800/60 transition-colors duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-300">
                  Class 12th
                </span>
                <span className="text-2xl font-bold text-cyan-400">96.4%</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-3 h-3 text-cyan-400/70" />
                <p className="text-xs text-gray-500">
                  PCM and Computer Science
                </p>
              </div>
            </div>

            {/* Class 10th */}
            <div className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-800/60 transition-colors duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-300">
                  Class 10th
                </span>
                <span className="text-2xl font-bold text-cyan-400">84%</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-3 h-3 text-cyan-400/70" />
                <p className="text-xs text-gray-500">All Subjects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
