/**
 * Lightweight CSS-only loading state for Suspense fallbacks.
 * Does NOT import anime.js or any heavy client-side JS.
 * This is critical for Lighthouse performance — Suspense fallbacks
 * must be as lightweight as possible since they're part of the initial bundle.
 */

interface LoadingStateLightProps {
  message?: string;
  variant?: "cyan" | "blue" | "purple" | "pink" | "emerald";
  fullPage?: boolean;
}

const VARIANT_COLORS: Record<string, { gradient: string; text: string }> = {
  cyan: {
    gradient: "from-cyan-400 via-blue-400 to-cyan-400",
    text: "text-cyan-400/70",
  },
  blue: {
    gradient: "from-blue-400 via-indigo-400 to-blue-400",
    text: "text-blue-400/70",
  },
  purple: {
    gradient: "from-purple-400 via-pink-400 to-purple-400",
    text: "text-purple-400/70",
  },
  pink: {
    gradient: "from-pink-400 via-rose-400 to-pink-400",
    text: "text-pink-400/70",
  },
  emerald: {
    gradient: "from-emerald-400 via-teal-400 to-emerald-400",
    text: "text-emerald-400/70",
  },
};

function LoadingSpinner({ variant = "cyan" }: { variant?: string }) {
  const colors = VARIANT_COLORS[variant] || VARIANT_COLORS.cyan;
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
  message,
  variant = "cyan",
  fullPage = false,
}: LoadingStateLightProps) {
  const colors = VARIANT_COLORS[variant] || VARIANT_COLORS.cyan;

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner variant={variant} />
          <p className="text-lg font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Shardendu Mishra
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-center py-8">
        <div className="flex flex-col items-center gap-3">
          <LoadingSpinner variant={variant} />
          {message && <p className={`text-sm ${colors.text}`}>{message}</p>}
        </div>
      </div>
    </div>
  );
}
