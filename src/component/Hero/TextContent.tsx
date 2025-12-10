"use client";

import { myIntro, SocialLinks } from "@/static/info/header";

const buttonLabels: Record<string, string> = {
  GitHub: "View My Projects",
  LinkedIn: "Connect With Me",
  resume: "View Resume",
};

export const TextContent = () => {
  return (
    <div className="lg:col-span-7 text-center lg:text-left space-y-4 md:space-y-6 relative z-10 order-2 lg:order-1">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black bg-linear-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent leading-[1.1] wrap-break-word">
        {myIntro.name}
      </h1>

      <div className="w-16 md:w-20 h-1 bg-linear-to-r from-cyan-500 to-blue-500 mx-auto lg:mx-0 rounded-full" />

      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-transparent bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text font-semibold">
        {myIntro.role}
      </p>

      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto lg:mx-0">
        I am a Software Engineer, I work with{" "}
        <span className="text-cyan-400 font-semibold">Linux</span>,{" "}
        <span className="text-cyan-400 font-semibold">Git</span>,{" "}
        <span className="text-cyan-400 font-semibold">Web Technologies</span>,{" "}
        <span className="text-cyan-400 font-semibold">Cloud Platforms</span> and{" "}
        <span className="text-cyan-400 font-semibold">AI/ML</span>. I absolutely
        love Engineering solutions for problems.
      </p>

      {/* Social Links */}
      <div className="flex gap-3 md:gap-4 justify-center lg:justify-start flex-wrap pt-4 md:pt-6">
        {Object.entries(SocialLinks).map(([key, link]) => {
          const IconComponent = link.icon;
          return (
            <Link
              key={key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link group relative flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-gray-900/80 hover:bg-gray-800/80 border border-gray-700 hover:border-cyan-500 rounded-lg transition-all duration-500 shadow-lg backdrop-blur-sm text-sm md:text-base"
              aria-label={key}
            >
              <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-500 shrink-0" />
              <span className="font-medium text-gray-300 group-hover:text-cyan-400 transition-colors duration-500 whitespace-nowrap">
                {buttonLabels[key] || key}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
