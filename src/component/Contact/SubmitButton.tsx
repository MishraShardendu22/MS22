"use client";

import { Send } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  variant?: "default" | "compact";
}

export function SubmitButton({ variant = "default" }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const isCompact = variant === "compact";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full ${
        isCompact
          ? "bg-cyan-500 hover:bg-cyan-600 text-sm py-3"
          : "bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 hover:shadow-lg hover:shadow-cyan-500/50 text-base py-3"
      } disabled:from-gray-600 disabled:to-gray-700 disabled:bg-gray-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-500`}
    >
      {pending ? (
        <>
          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          Send message
        </>
      )}
    </button>
  );
}
