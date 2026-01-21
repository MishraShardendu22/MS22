"use client";

import Image from "next/image";
import Link from "next/link";

export type ListCardTheme = "cyan" | "blue" | "pink" | "purple";

interface ListCardProps {
  id: string;
  href: string;
  theme: ListCardTheme;
  logo?: string;
  title: string;
  subtitle?: string;
  description?: string;
  dateRange?: string;
  technologies?: string[];
  links?: Array<{
    label: string;
    url: string;
  }>;
  isActive?: boolean;
  maxTechDisplay?: number;
}

const themeConfig: Record<
  ListCardTheme,
  {
    border: string;
    gradientBg: string;
    titleHover: string;
    subtitleColor: string;
    techExtraBg: string;
    techExtraText: string;
    techExtraBorder: string;
    viewColor: string;
    activeBg: string;
    activeText: string;
    activeBorder: string;
  }
> = {
  cyan: {
    border: "hover:border-cyan-500/40",
    gradientBg: "from-cyan-500 via-blue-500 to-purple-600",
    titleHover: "group-hover:text-cyan-400",
    subtitleColor: "text-cyan-400/80",
    techExtraBg: "bg-cyan-500/10",
    techExtraText: "text-cyan-400",
    techExtraBorder: "border-cyan-500/25",
    viewColor: "text-cyan-400",
    activeBg: "bg-green-500/10",
    activeText: "text-green-400",
    activeBorder: "border-green-500/25",
  },
  blue: {
    border: "hover:border-blue-500/40",
    gradientBg: "from-blue-500 via-purple-500 to-pink-500",
    titleHover: "group-hover:text-blue-400",
    subtitleColor: "text-blue-400/80",
    techExtraBg: "bg-blue-500/10",
    techExtraText: "text-blue-400",
    techExtraBorder: "border-blue-500/25",
    viewColor: "text-blue-400",
    activeBg: "bg-green-500/10",
    activeText: "text-green-400",
    activeBorder: "border-green-500/25",
  },
  pink: {
    border: "hover:border-pink-500/40",
    gradientBg: "from-pink-500 via-purple-500 to-cyan-500",
    titleHover: "group-hover:text-pink-400",
    subtitleColor: "text-pink-400/80",
    techExtraBg: "bg-pink-500/10",
    techExtraText: "text-pink-400",
    techExtraBorder: "border-pink-500/25",
    viewColor: "text-pink-400",
    activeBg: "bg-green-500/10",
    activeText: "text-green-400",
    activeBorder: "border-green-500/25",
  },
  purple: {
    border: "hover:border-purple-500/40",
    gradientBg: "from-purple-500 via-pink-500 to-cyan-500",
    titleHover: "group-hover:text-purple-400",
    subtitleColor: "text-purple-400/80",
    techExtraBg: "bg-purple-500/10",
    techExtraText: "text-purple-400",
    techExtraBorder: "border-purple-500/25",
    viewColor: "text-purple-400",
    activeBg: "bg-green-500/10",
    activeText: "text-green-400",
    activeBorder: "border-green-500/25",
  },
};

export function ListCard({
  href,
  theme,
  logo,
  title,
  subtitle,
  description,
  dateRange,
  technologies,
  links,
  isActive,
  maxTechDisplay = 3,
}: ListCardProps) {
  const colors = themeConfig[theme];

  return (
    <Link href={href} className="group relative block h-full">
      <div
        className={`absolute -inset-0.5 bg-linear-to-r ${colors.gradientBg} rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300`}
      />
      <div
        className={`relative h-full p-5 bg-gray-900/90 border border-gray-800/50 rounded-xl ${colors.border} transition-all overflow-hidden flex flex-col`}
      >
        {/* Header with Logo */}
        <div className="flex items-start gap-3 mb-3">
          {/* Logo */}
          {logo && (
            <div className="shrink-0 w-12 h-12 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center overflow-hidden">
              <Image
                src={logo}
                alt={title}
                width={48}
                height={48}
                className="object-contain"
                loading="lazy"
              />
            </div>
          )}

          {/* Title & Subtitle */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`text-base font-bold text-white line-clamp-1 ${colors.titleHover} transition-colors`}
              >
                {title}
              </h3>
              {isActive && (
                <span
                  className={`shrink-0 px-2 py-0.5 text-[10px] font-medium rounded ${colors.activeBg} ${colors.activeText} border ${colors.activeBorder}`}
                >
                  Active
                </span>
              )}
            </div>
            {subtitle && (
              <p
                className={`${colors.subtitleColor} text-sm font-medium mt-0.5 line-clamp-1`}
              >
                {subtitle}
              </p>
            )}
            {dateRange && (
              <p className="text-gray-500 text-xs mt-1">{dateRange}</p>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-400 text-sm line-clamp-2 mb-3 leading-relaxed flex-1">
            {description}
          </p>
        )}

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {technologies.slice(0, maxTechDisplay).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-gray-800/60 text-gray-400 text-xs font-medium rounded border border-gray-700/50"
              >
                {tech}
              </span>
            ))}
            {technologies.length > maxTechDisplay && (
              <span
                className={`px-2 py-0.5 ${colors.techExtraBg} ${colors.techExtraText} text-xs font-medium rounded border ${colors.techExtraBorder}`}
              >
                +{technologies.length - maxTechDisplay}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800/50 mt-auto">
          {/* Links */}
          <div className="flex flex-wrap gap-2">
            {links &&
              links.length > 0 &&
              links.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  className={`px-2.5 py-1 ${colors.techExtraBg} ${colors.techExtraText} text-xs font-medium rounded-lg border ${colors.techExtraBorder} hover:opacity-80 transition-all truncate`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(link.url, "_blank", "noopener,noreferrer");
                  }}
                >
                  {link.label}
                </button>
              ))}
          </div>

          <span
            className={`${colors.viewColor} text-sm font-medium group-hover:underline transition-all shrink-0`}
          >
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
