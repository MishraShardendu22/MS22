"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import ErrorPage from "./Error";

interface ErrorStateProps {
  title?: string;
  message?: string;
  variant?: "red" | "orange" | "yellow";
  fullPage?: boolean;
  onRetry?: () => void;
}

const InlineError = ({
  title = "Error",
  message,
  variant = "red",
  onRetry,
}: ErrorStateProps) => {
  const colors = {
    red: {
      bg: "from-red-500/20 to-orange-500/20",
      ring: "ring-red-500/30",
      icon: "text-red-400",
      button:
        "from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600",
      shadow: "shadow-red-500/30 hover:shadow-red-500/50",
      border: "border-red-900/30",
      text: "text-red-400",
    },
    orange: {
      bg: "from-orange-500/20 to-yellow-500/20",
      ring: "ring-orange-500/30",
      icon: "text-orange-400",
      button:
        "from-orange-500 via-yellow-500 to-amber-500 hover:from-orange-600 hover:via-yellow-600 hover:to-amber-600",
      shadow: "shadow-orange-500/30 hover:shadow-orange-500/50",
      border: "border-orange-900/30",
      text: "text-orange-400",
    },
    yellow: {
      bg: "from-yellow-500/20 to-amber-500/20",
      ring: "ring-yellow-500/30",
      icon: "text-yellow-400",
      button:
        "from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600",
      shadow: "shadow-yellow-500/30 hover:shadow-yellow-500/50",
      border: "border-yellow-900/30",
      text: "text-yellow-400",
    },
  };

  const currentColors = colors[variant];

  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center max-w-2xl px-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-16 h-16 rounded-xl bg-linear-to-br ${currentColors.bg} flex items-center justify-center ring-2 ${currentColors.ring}`}
          >
            <AlertTriangle className={`w-8 h-8 ${currentColors.icon}`} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>

        {/* Message */}
        {message && (
          <div
            className={`p-4 bg-red-950/20 border ${currentColors.border} rounded-lg mb-6`}
          >
            <p className={`${currentColors.text} text-sm font-mono break-all`}>
              {message}
            </p>
          </div>
        )}

        {/* Retry Button */}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r ${currentColors.button} text-white font-semibold shadow-lg ${currentColors.shadow} transition-all hover:scale-105`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};

export const ErrorState = ({
  title,
  message,
  variant,
  fullPage = false,
  onRetry,
}: ErrorStateProps) => {
  if (fullPage) {
    const error = message ? new Error(message) : undefined;
    return <ErrorPage error={error} reset={onRetry} />;
  }

  return (
    <InlineError
      title={title}
      message={message}
      variant={variant}
      onRetry={onRetry}
    />
  );
};
