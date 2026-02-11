"use client";

import { Command, Search } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import {
  SEARCH_BUTTON_THEME_CONFIG,
  type SearchButtonTheme,
} from "@/constants/theme";
import type { SearchResultType } from "@/static/api/api.types";

// Minimal external store for modal state
let modalState = {
  open: false,
  filter: undefined as SearchResultType | undefined,
};
const listeners = new Set<() => void>();
const notify = () => {
  for (const listener of listeners) {
    listener();
  }
};
export const openSearchModal = (filter?: SearchResultType) => {
  modalState = { open: true, filter };
  notify();
};
export const closeSearchModal = () => {
  modalState = { open: false, filter: undefined };
  notify();
};
export const subscribeModal = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
export const getModalSnapshot = () => modalState;
export const getServerModalSnapshot = () => ({
  open: false,
  filter: undefined,
});

interface HeaderSearchButtonProps {
  filterType?: SearchResultType;
  label?: string;
  theme?: SearchButtonTheme;
}

export function HeaderSearchButton({
  filterType,
  label = "Search",
  theme = "cyan",
}: HeaderSearchButtonProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearchModal(filterType);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [filterType]);

  return (
    <button
      type="button"
      onClick={() => openSearchModal(filterType)}
      className={`flex items-center gap-2 px-3 py-2 bg-gray-800/70 hover:bg-gray-800 border border-gray-700/70 rounded-lg text-gray-400 ${SEARCH_BUTTON_THEME_CONFIG[theme]} transition-colors`}
      aria-label="Search"
    >
      <Search className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
      <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-gray-900/80 rounded border border-gray-700/70 font-semibold text-gray-400">
        <Command className="w-2.5 h-2.5" />K
      </kbd>
    </button>
  );
}

// Re-export for use in SearchBar
export function useModalState() {
  return useSyncExternalStore(
    subscribeModal,
    getModalSnapshot,
    getServerModalSnapshot,
  );
}
