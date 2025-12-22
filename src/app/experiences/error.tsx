"use client";

import { ErrorState } from "@/component/Error";
import { Sidebar } from "@/component/Sidebar";

export default function ExperiencesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
        <ErrorState
          title="Failed to load experiences"
          message={
            error.message ||
            "An unexpected error occurred while loading experiences."
          }
          onRetry={reset}
          fullPage
        />
      </main>
    </>
  );
}
