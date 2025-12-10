import { myIntro, SocialLinks } from "@/static/info/header";
import Link from "next/link";

const buttonLabels: Record<string, string> = {
  GitHub: "View My Projects",
  LinkedIn: "Connect With Me",
  resume: "View Resume",
};

export const TextContent = () => {
  return (
    <div className="lg:col-span-7 text-center lg:text-left space-y-3 md:space-y-4 lg:space-y-6 relative z-10 order-2 lg:order-1">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black bg-linear-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent leading-[1.1] wrap-break-word">
        {myIntro.name}
      </h1>

      <div className="w-12 md:w-16 lg:w-20 h-1 bg-linear-to-r from-cyan-500 to-blue-500 mx-auto lg:mx-0 rounded-full" />

      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-transparent bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text font-semibold">
        {myIntro.role}
      </p>

      <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto lg:mx-0">
        I am a Software Engineer, I work with{" "}
        <span className="text-cyan-400 font-semibold">Linux</span>,{" "}
        <span className="text-cyan-400 font-semibold">Git</span>,{" "}
        <span className="text-cyan-400 font-semibold">Web Technologies</span>,{" "}
        <span className="text-cyan-400 font-semibold">Cloud Platforms</span> and{" "}
        <span className="text-cyan-400 font-semibold">AI/ML</span>. I absolutely
        love Engineering solutions for problems.
      </p>

      {/* Social Links */}
      <div className="flex gap-2 md:gap-3 lg:gap-4 justify-center lg:justify-start flex-wrap pt-2 md:pt-4 lg:pt-6">
        {Object.entries(SocialLinks).map(([key, link]) => {
          const IconComponent = link.icon;
          return (
            <Link
              key={key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link group relative flex items-center gap-2 md:gap-2.5 lg:gap-3 px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 bg-gray-900/80 hover:bg-gray-800/80 border border-gray-700 hover:border-cyan-500 rounded-lg transition-all duration-300 shadow-lg backdrop-blur-sm text-xs sm:text-sm md:text-base"
              aria-label={key}
            >
              <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 shrink-0" />
              <span className="font-medium text-gray-300 group-hover:text-cyan-400 transition-colors duration-300 whitespace-nowrap">
                {buttonLabels[key] || key}
              </span>
            </Link>
          );
        })}
      </div>

      {/* My Socials Box */}
      <div className="pt-4 md:pt-6">
        <Link
          href="/links"
          className="group relative inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 bg-linear-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border-2 border-cyan-500/30 hover:border-cyan-500/50 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20"
        >
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 to-blue-500/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <svg className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <div className="relative z-10">
            <div className="text-sm md:text-base font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
              My Socials
            </div>
            <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
              All my links in one place
            </div>
          </div>
          <svg className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};
