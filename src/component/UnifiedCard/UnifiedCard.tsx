import { Building, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type CardTheme = "blue" | "pink" | "emerald" | "purple";

interface UnifiedCardProps {
  index: number;
  theme: CardTheme;
  logo?: string;
  logoAlt?: string;
  title: string;
  subtitle: string;
  subtitleIcon?: ReactNode;
  startDate?: string;
  endDate?: string;
  description?: string;
  technologies?: string[];
  certificateUrl?: string;
  certificateLabel?: string;
  badges?: {
    label: string;
    icon?: ReactNode;
  }[];
  extraInfo?: ReactNode;
  maxTechDisplay?: number;
}

const themeConfig = {
  blue: {
    border: "hover:border-blue-500/40",
    shadow: "hover:shadow-blue-500/10",
    gradient: "from-blue-500/5 via-transparent to-indigo-500/5",
    titleHover: "group-hover:text-blue-400",
    certificateBg: "bg-blue-500/10 hover:bg-blue-500/20",
    certificateText: "text-blue-400 hover:text-blue-300",
    certificateBorder: "border-blue-500/30",
    techExtraBg: "bg-blue-500/10",
    techExtraText: "text-blue-400",
    techExtraBorder: "border-blue-500/30",
  },
  pink: {
    border: "hover:border-pink-500/40",
    shadow: "hover:shadow-pink-500/10",
    gradient: "from-pink-500/5 via-transparent to-rose-500/5",
    titleHover: "group-hover:text-pink-400",
    certificateBg: "bg-pink-500/10 hover:bg-pink-500/20",
    certificateText: "text-pink-400 hover:text-pink-300",
    certificateBorder: "border-pink-500/30",
    techExtraBg: "bg-pink-500/10",
    techExtraText: "text-pink-400",
    techExtraBorder: "border-pink-500/30",
  },
  emerald: {
    border: "hover:border-emerald-500/40",
    shadow: "hover:shadow-emerald-500/10",
    gradient: "from-emerald-500/5 via-transparent to-teal-500/5",
    titleHover: "group-hover:text-emerald-400",
    certificateBg: "bg-emerald-500/10 hover:bg-emerald-500/20",
    certificateText: "text-emerald-400 hover:text-emerald-300",
    certificateBorder: "border-emerald-500/30",
    techExtraBg: "bg-emerald-500/10",
    techExtraText: "text-emerald-400",
    techExtraBorder: "border-emerald-500/30",
  },
  purple: {
    border: "hover:border-purple-500/40",
    shadow: "hover:shadow-purple-500/10",
    gradient: "from-purple-500/5 via-transparent to-violet-500/5",
    titleHover: "group-hover:text-purple-400",
    certificateBg: "bg-purple-500/10 hover:bg-purple-500/20",
    certificateText: "text-purple-400 hover:text-purple-300",
    certificateBorder: "border-purple-500/30",
    techExtraBg: "bg-purple-500/10",
    techExtraText: "text-purple-400",
    techExtraBorder: "border-purple-500/30",
  },
};

export const UnifiedCard = ({
  index,
  theme,
  logo,
  logoAlt,
  title,
  subtitle,
  subtitleIcon,
  startDate,
  endDate,
  description,
  technologies,
  certificateUrl,
  certificateLabel = "Certificate",
  badges,
  extraInfo,
  maxTechDisplay = 4,
}: UnifiedCardProps) => {
  const colors = themeConfig[theme];

  return (
    <div
      className="group relative"
      style={{
        opacity: 0,
        animation: `fadeInUp 0.25s ease-out ${Math.min(index * 0.04, 0.2)}s forwards`,
        contain: "layout style paint",
      }}
    >
      <div
        className={`relative bg-linear-to-br from-gray-900/50 to-gray-950/50 border border-gray-800/50 rounded-xl md:rounded-2xl overflow-hidden transition-colors duration-200 ${colors.border}`}
      >
        <div
          className={`absolute inset-0 bg-linear-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
        />

        <div className="relative p-3 sm:p-4 md:p-5">
          <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
            {logo && (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src={logo}
                  alt={logoAlt || subtitle}
                  width={48}
                  height={48}
                  className="object-contain p-1"
                  loading="lazy"
                  sizes="(max-width: 768px) 40px, 48px"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3
                className={`text-base sm:text-lg font-bold text-white mb-1 line-clamp-1 transition-colors duration-300 ${colors.titleHover}`}
              >
                {title}
              </h3>
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm font-medium">
                {subtitleIcon || <Building className="w-3.5 h-3.5" />}
                <span className="line-clamp-1">{subtitle}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              {badges?.map((badge) => (
                <span
                  key={badge.label}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold ${colors.certificateBg} ${colors.certificateText} rounded-md ${colors.certificateBorder}`}
                >
                  {badge.icon}
                  {badge.label}
                </span>
              ))}
              {certificateUrl && (
                <Link
                  href={certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium ${colors.certificateBg} ${colors.certificateText} rounded-lg transition-all duration-200 ${colors.certificateBorder}`}
                  aria-label={`View ${certificateLabel.toLowerCase()}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{certificateLabel}</span>
                </Link>
              )}
            </div>
          </div>

          {(startDate || endDate || extraInfo) && (
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
              {(startDate || endDate) && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {startDate && endDate
                      ? `${startDate} - ${endDate}`
                      : startDate || endDate}
                  </span>
                </div>
              )}
              {extraInfo}
            </div>
          )}

          {description && (
            <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-3">
              {description}
            </p>
          )}

          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, maxTechDisplay).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium bg-gray-800/50 text-gray-300 rounded-md border border-gray-700/50 hover:border-gray-600 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > maxTechDisplay && (
                <span
                  className={`px-2.5 py-1 text-xs font-medium ${colors.techExtraBg} ${colors.techExtraText} rounded-md ${colors.techExtraBorder}`}
                >
                  +{technologies.length - maxTechDisplay}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
