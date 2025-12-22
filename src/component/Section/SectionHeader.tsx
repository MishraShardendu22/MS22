import type { ReactNode } from "react";

export type HeaderTheme = "cyan" | "blue" | "emerald" | "pink" | "purple";

interface SectionHeaderProps {
  title: string;
  theme?: HeaderTheme;
  description?: string;
  children?: ReactNode;
}

const titleGradients: Record<HeaderTheme, string> = {
  pink: "from-pink-400 via-rose-400 to-red-400",
  cyan: "from-cyan-400 via-blue-400 to-purple-400",
  blue: "from-blue-400 via-indigo-400 to-purple-400",
  emerald: "from-emerald-400 via-teal-400 to-green-400",
  purple: "from-purple-400 via-violet-400 to-indigo-400",
};

export function SectionHeader({
  title,
  description,
  theme = "cyan",
  children,
}: SectionHeaderProps) {
  const gradient = titleGradients[theme];

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="text-center lg:text-left">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r ${gradient} bg-clip-text text-transparent`}
            >
              {title}
            </h2>
          </div>
          {children}
        </div>
        {description && (
          <p className="text-gray-400 text-sm md:text-base lg:text-lg text-center lg:text-left max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
