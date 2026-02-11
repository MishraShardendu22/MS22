/**
 * Lightweight CSS-only loading state for Suspense fallbacks.
 * Does NOT import anime.js or any heavy client-side JS.
 * This is critical for Lighthouse performance — Suspense fallbacks
 * must be as lightweight as possible since they're part of the initial bundle.
 */

import { VARIANT_COLORS } from "@/constants/theme";

type LoadingVariant = "cyan" | "blue" | "purple" | "pink" | "emerald";

interface LoadingStateLightProps {
  variant?: LoadingVariant;
  message?: string;
}

function LoadingSpinner({ variant = "cyan" }: { variant?: LoadingVariant }) {
  const colors =
    VARIANT_COLORS[variant as keyof typeof VARIANT_COLORS] ||
    VARIANT_COLORS.cyan;
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-10 h-10">
        <div
          className={`absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r ${colors.gradient} animate-spin`}
          style={{
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "2px",
          }}
        />
      </div>
    </div>
  );
}

export function LoadingStateLight({
  variant = "cyan",
  message = "Loading...",
}: LoadingStateLightProps) {
  const colors =
    VARIANT_COLORS[variant as keyof typeof VARIANT_COLORS] ||
    VARIANT_COLORS.cyan;
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner variant={variant} />
        <p className={`text-sm font-medium ${colors.text}`}>{message}</p>
      </div>
    </div>
  );
}
