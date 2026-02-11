import { AlertTriangle, RefreshCw } from "lucide-react";
import {
  ERROR_STATE_THEME_CONFIG,
  type ErrorStateTheme,
} from "@/constants/theme";
import ErrorPage from "./Error";

interface ErrorStateProps {
  title?: string;
  message?: string;
  fullPage?: boolean;
  onRetry?: () => void;
  variant?: ErrorStateTheme;
}

const InlineError = ({
  title = "Error",
  message,
  variant = "red",
  onRetry,
}: ErrorStateProps) => {
  const currentColors = ERROR_STATE_THEME_CONFIG[variant];

  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center max-w-2xl px-8">
        <div className="flex justify-center mb-6">
          <div
            className={`w-16 h-16 rounded-xl bg-linear-to-br ${currentColors.bg} flex items-center justify-center ring-2 ${currentColors.ring}`}
          >
            <AlertTriangle className={`w-8 h-8 ${currentColors.icon}`} />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        {message && (
          <div
            className={`p-4 bg-red-950/20 border ${currentColors.border} rounded-lg mb-6`}
          >
            <p className={`${currentColors.text} text-sm font-mono break-all`}>
              {message}
            </p>
          </div>
        )}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r ${currentColors.button} text-white font-semibold shadow-lg ${currentColors.shadow} transition-colors`}
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
