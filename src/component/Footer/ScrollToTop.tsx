"use client";

import { ArrowUp } from "lucide-react";

interface ScrollToTopProps {
  variant?: "mobile" | "desktop";
}

export function ScrollToTop({ variant = "desktop" }: ScrollToTopProps) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: variant === "mobile" ? "instant" : "smooth",
    });
  };

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={handleScrollToTop}
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 text-xs text-violet-400"
      >
        <ArrowUp className="w-3 h-3" />
        <span>Top</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      className="group flex items-center gap-2 px-5 py-2.5 rounded-lg bg-linear-to-br from-violet-500/20 to-purple-500/20 hover:from-violet-500/30 hover:to-purple-500/30 border border-violet-500/30 hover:border-violet-500/50 transition-colors duration-500"
    >
      <span className="text-sm font-medium text-violet-400">Back to Top</span>
      <ArrowUp className="w-4 h-4 text-violet-400" />
    </button>
  );
}
