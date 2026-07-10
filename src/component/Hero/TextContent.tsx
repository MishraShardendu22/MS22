import { myIntro, SocialLinks } from "@/static/info/header";
import { BUTTON_LABELS } from "@/static/ui";

export const TextContent = () => {
  return (
    <div className="lg:col-span-7 text-center lg:text-left space-y-4 md:space-y-6 lg:space-y-8 relative z-10 order-2 lg:order-1">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black bg-linear-to-b from-white to-zinc-400 bg-clip-text text-transparent leading-[1.1] break-words drop-shadow-sm">
        {myIntro.name}
      </h1>

      <div className="w-16 md:w-20 lg:w-24 h-1.5 bg-linear-to-r from-violet-600 to-indigo-500 mx-auto lg:mx-0 rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)]" />

      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-transparent bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text font-bold tracking-tight">
        {myIntro.role}
      </p>

      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-zinc-400 leading-relaxed max-w-3xl mx-auto lg:mx-0 font-medium">
        I am a Software Engineer, I work with{" "}
        <span className="text-zinc-200 font-semibold drop-shadow-md">
          Linux
        </span>
        ,{" "}
        <span className="text-zinc-200 font-semibold drop-shadow-md">Git</span>,{" "}
        <span className="text-zinc-200 font-semibold drop-shadow-md">
          Web Technologies
        </span>
        ,{" "}
        <span className="text-zinc-200 font-semibold drop-shadow-md">
          Cloud Platforms
        </span>{" "}
        and{" "}
        <span className="text-zinc-200 font-semibold drop-shadow-md">
          AI/ML
        </span>
        . I absolutely love Engineering solutions for problems.
      </p>

      {/* Social Links */}
      <div className="flex gap-2 md:gap-3 lg:gap-4 justify-center lg:justify-start flex-wrap pt-2 md:pt-4 lg:pt-6">
        {Object.entries(SocialLinks).map(([key, link]) => {
          return (
            <a
              key={key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link group relative flex items-center gap-2 md:gap-2.5 lg:gap-3 px-4 md:px-5 lg:px-6 py-2.5 md:py-3 lg:py-3.5 bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800 hover:border-violet-500/50 rounded-xl transition-all duration-500 shadow-lg hover:shadow-violet-500/20 backdrop-blur-md text-xs sm:text-sm md:text-base font-medium"
              aria-label={key}
            >
              <span className="text-zinc-300 group-hover:text-violet-400 transition-colors duration-300 whitespace-nowrap">
                {BUTTON_LABELS[key] || key}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
