import { myIntro, SocialLinks } from "@/static/info/header";

const buttonLabels: Record<string, string> = {
  resume: "View Resume",
  GitHub: "View My Projects",
  LinkedIn: "Connect With Me",
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
            <a
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
            </a>
          );
        })}
      </div>
    </div>
  );
};
