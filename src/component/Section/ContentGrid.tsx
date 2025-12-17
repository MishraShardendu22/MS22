"use client";

import type { ReactNode } from "react";
import { memo } from "react";
import { LoadingState } from "@/component/Loading";

interface ContentGridProps {
  children: ReactNode;
  isLoading?: boolean;
  loadingMessage?: string;
  loadingVariant?: "cyan" | "purple" | "emerald" | "pink" | "blue";
  columns?: 1 | 2 | 3 | 4;
  minHeight?: string;
}

const gridCols: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

/**
 * Reusable content grid with loading overlay
 */
export const ContentGrid = memo(function ContentGrid({
  children,
  isLoading = false,
  loadingMessage = "Loading...",
  loadingVariant = "cyan",
  columns = 2,
  minHeight = "300px",
}: ContentGridProps) {
  return (
    <div className="mb-6 relative" style={{ minHeight }}>
      <div
        className={`flex items-center justify-center absolute inset-0 transition-opacity duration-300 ${
          isLoading ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
        }`}
        style={{ minHeight }}
      >
        <LoadingState message={loadingMessage} variant={loadingVariant} />
      </div>
      <div
        className={`grid ${gridCols[columns]} gap-4 md:gap-6 transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
});
