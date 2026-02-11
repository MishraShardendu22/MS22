"use client";

import { ArrowLeft } from "lucide-react";

export function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-orange-500/30 text-gray-300 hover:text-orange-400 font-semibold text-lg transition-all hover:scale-105"
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span>Go Back</span>
    </button>
  );
}
