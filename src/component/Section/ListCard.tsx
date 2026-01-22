import Image from "next/image";
import Link from "next/link";
import { LIST_CARD_THEME_CONFIG, type ListCardTheme } from "@/constants/theme";
import { ExternalLink } from "./ExternalLink";

export type { ListCardTheme } from "@/constants/theme";

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
  const colors = LIST_CARD_THEME_CONFIG[theme];

  return (
    <Link href={href} className="group relative block h-full">
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${colors.gradientBg} rounded-xl blur-sm opacity-0 group-hover:opacity-25 transition-all duration-500`}
      />
      <div
        className={`relative h-full p-6 bg-gray-900/95 backdrop-blur-sm border border-gray-800/70 rounded-xl group-hover:${colors.border} transition-all duration-300 overflow-hidden flex flex-col shadow-lg group-hover:shadow-xl`}
      >
        <div className="flex items-start gap-4 mb-4">
          {logo && (
            <div className="shrink-0 w-12 h-12 rounded-lg bg-gray-800/70 border border-gray-700/70 flex items-center justify-center overflow-hidden group-hover:border-gray-600/70 transition-all duration-300">
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

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <h3
                className={`text-lg font-bold text-white line-clamp-1 group-hover:${colors.titleHover} transition-colors duration-300`}
              >
                {title}
              </h3>
              {isActive && (
                <span
                  className={`shrink-0 px-2.5 py-1 text-[10px] font-semibold rounded-md ${colors.activeBg} ${colors.activeText} border ${colors.activeBorder} uppercase tracking-wide shadow-sm`}
                >
                  Active
                </span>
              )}
            </div>
            {subtitle && (
              <p
                className={`${colors.subtitleColor} text-sm font-medium mt-1.5 line-clamp-1`}
              >
                {subtitle}
              </p>
            )}
            {dateRange && (
              <p className="text-gray-500 text-xs mt-1.5 font-medium">
                {dateRange}
              </p>
            )}
          </div>
        </div>

        {description && (
          <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
            {description}
          </p>
        )}

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.slice(0, maxTechDisplay).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-gray-800/80 text-gray-300 text-xs font-medium rounded-md border border-gray-700/70 hover:bg-gray-700/80 hover:border-gray-600/70 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
            {technologies.length > maxTechDisplay && (
              <span
                className={`px-2.5 py-1 ${colors.techExtraBg} ${colors.techExtraText} text-xs font-semibold rounded-md border ${colors.techExtraBorder}`}
              >
                +{technologies.length - maxTechDisplay}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-800/70 mt-auto">
          <div className="flex flex-wrap gap-2">
            {links &&
              links.length > 0 &&
              links.map((link) => (
                <ExternalLink
                  key={link.label}
                  href={link.url}
                  label={link.label}
                  className={`px-3 py-1.5 ${colors.techExtraBg} ${colors.techExtraText} text-xs font-semibold rounded-lg border ${colors.techExtraBorder} hover:scale-105 hover:shadow-md transition-all duration-200 truncate`}
                />
              ))}
          </div>

          <span
            className={`${colors.viewColor} text-sm font-semibold group-hover:translate-x-1 transition-all duration-300 shrink-0 flex items-center gap-1`}
          >
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
