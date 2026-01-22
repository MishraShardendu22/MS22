"use client";

import {
  Award,
  Briefcase,
  Command,
  FolderGit2,
  Heart,
  Loader2,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useReducer, useRef } from "react";
import { searchAPI } from "@/static/api/api.request";
import type { SearchResult, SearchResultType } from "@/static/api/api.types";
import {
  closeSearchModal,
  openSearchModal,
  useModalState,
} from "./HeaderSearchButton";

// Static config - zero runtime overhead
const FILTER_CONFIG = {
  project: {
    icon: FolderGit2,
    label: "Projects",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/15",
    borderColor: "border-cyan-500/50",
  },
  experience: {
    icon: Briefcase,
    label: "Experience",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/15",
    borderColor: "border-emerald-500/50",
  },
  certificate: {
    icon: Award,
    label: "Certificates",
    color: "text-purple-400",
    bgColor: "bg-purple-500/15",
    borderColor: "border-purple-500/50",
  },
  volunteer: {
    icon: Heart,
    label: "Volunteer",
    color: "text-rose-400",
    bgColor: "bg-rose-500/15",
    borderColor: "border-rose-500/50",
  },
} as const;

const FILTER_TYPES = Object.keys(FILTER_CONFIG) as SearchResultType[];

// Path to filter - pure function
function getPageFilter(pathname: string): SearchResultType | undefined {
  if (pathname.startsWith("/projects")) return "project";
  if (pathname.startsWith("/experiences")) return "experience";
  if (pathname.startsWith("/certificates")) return "certificate";
  if (pathname.startsWith("/volunteer")) return "volunteer";
  return undefined;
}

// Search Modal - AbortController for native debouncing (cancels previous request)
export function SearchModalContent() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [, forceRender] = useReducer((x) => x + 1, 0);

  // Mutable refs instead of state
  const data = useRef({
    results: [] as SearchResult[],
    loading: false,
    searched: false,
    selected: 0,
    filter: undefined as SearchResultType | undefined,
    query: "",
  });

  const { open, filter: initialFilter } = useModalState();

  // Reset on open
  if (open && inputRef.current && !data.current.query) {
    data.current.filter = initialFilter;
    queueMicrotask(() => inputRef.current?.focus());
  }

  // AbortController-based search - no setTimeout, cancels previous request immediately
  async function search(query: string, filter: SearchResultType | undefined) {
    abortRef.current?.abort(); // Cancel previous

    if (query.length < 2) {
      data.current = {
        ...data.current,
        results: [],
        searched: false,
        loading: false,
        query,
      };
      forceRender();
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    data.current.loading = true;
    data.current.query = query;
    forceRender();

    try {
      const res = await searchAPI.search(query, filter, 10);
      if (controller.signal.aborted) return;
      data.current.results = res.status === 200 ? res.data?.results || [] : [];
      data.current.searched = true;
    } catch {
      if (!controller.signal.aborted) {
        data.current.results = [];
        data.current.searched = true;
      }
    } finally {
      if (!controller.signal.aborted) {
        data.current.loading = false;
        forceRender();
      }
    }
  }

  function onInput(e: React.FormEvent<HTMLInputElement>) {
    const q = e.currentTarget.value;
    data.current.selected = 0;
    search(q, data.current.filter);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const d = data.current;
    if (e.key === "Escape") closeSearchModal();
    else if (e.key === "ArrowDown" && d.results.length) {
      e.preventDefault();
      d.selected = Math.min(d.selected + 1, d.results.length - 1);
      forceRender();
    } else if (e.key === "ArrowUp" && d.results.length) {
      e.preventDefault();
      d.selected = Math.max(d.selected - 1, 0);
      forceRender();
    } else if (e.key === "Enter" && d.results[d.selected]) {
      e.preventDefault();
      router.push(d.results[d.selected].url);
      closeSearchModal();
    }
  }

  function toggleFilter(type: SearchResultType) {
    const newFilter = data.current.filter === type ? undefined : type;
    data.current.filter = newFilter;
    if (data.current.query.length >= 2) search(data.current.query, newFilter);
    else forceRender();
  }

  function clearInput() {
    if (inputRef.current) inputRef.current.value = "";
    data.current = { ...data.current, query: "", results: [], searched: false };
    forceRender();
    inputRef.current?.focus();
  }

  function onClose() {
    abortRef.current?.abort();
    data.current = {
      results: [],
      loading: false,
      searched: false,
      selected: 0,
      filter: undefined,
      query: "",
    };
    closeSearchModal();
  }

  if (!open) return null;

  const d = data.current;
  const activeFilter = d.filter;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-60 flex items-start justify-center pt-[8vh] bg-black/75 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={onKeyDown}
    >
      <div className="w-full max-w-3xl mx-4 bg-gray-900/98 backdrop-blur-xl border border-gray-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Filters */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-800/70">
          <span className="text-xs text-gray-500 font-medium shrink-0">
            Filter:
          </span>
          {FILTER_TYPES.map((type) => {
            const c = FILTER_CONFIG[type];
            const Icon = c.icon;
            const active = activeFilter === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleFilter(type)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 ${active ? `${c.bgColor} ${c.color} border ${c.borderColor}` : "bg-gray-800/60 text-gray-400 border border-gray-700/50 hover:bg-gray-800"}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {c.label}
              </button>
            );
          })}
          {activeFilter && (
            <button
              type="button"
              onClick={() => {
                data.current.filter = undefined;
                search(d.query, undefined);
              }}
              className="flex items-center gap-1 px-2 py-1.5 rounded-full text-xs font-medium bg-gray-800/60 text-gray-400 border border-gray-700/50 hover:bg-red-500/20 hover:text-red-400 shrink-0"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>

        {/* Input */}
        <div className="relative flex items-center border-b border-gray-700/70">
          <Search className="absolute left-5 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            onInput={onInput}
            placeholder={
              activeFilter
                ? `Search ${FILTER_CONFIG[activeFilter].label.toLowerCase()}...`
                : "Search everything..."
            }
            className="w-full py-5 pl-14 pr-14 bg-transparent text-white text-lg placeholder:text-gray-500 focus:outline-none"
            autoComplete="off"
          />
          {d.loading ? (
            <Loader2 className="absolute right-5 w-5 h-5 text-gray-400 animate-spin" />
          ) : d.query ? (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-5 p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="absolute right-5 px-2.5 py-1 text-xs text-gray-400 bg-gray-800/70 rounded-md border border-gray-700/70 font-medium">
              ESC
            </kbd>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[55vh] overflow-y-auto">
          {d.results.length > 0 ? (
            <ul className="py-2">
              {d.results.map((r, i) => {
                const c = FILTER_CONFIG[r.type];
                const Icon = c.icon;
                const sel = i === d.selected;
                return (
                  <li key={`${r.type}-${r.id}`}>
                    <Link
                      href={r.url}
                      onClick={onClose}
                      onMouseEnter={() => {
                        d.selected = i;
                        forceRender();
                      }}
                      className={`flex items-start gap-4 px-5 py-4 ${sel ? "bg-gray-800/90 border-l-2 border-cyan-500" : "hover:bg-gray-800/60 border-l-2 border-transparent"}`}
                    >
                      <div className={`shrink-0 p-2.5 rounded-xl ${c.bgColor}`}>
                        <Icon className={`w-4 h-4 ${c.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white truncate">
                            {r.title}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-md font-medium uppercase tracking-wide ${c.bgColor} ${c.color}`}
                          >
                            {c.label.replace(/s$/, "")}
                          </span>
                        </div>
                        {r.subtitle && (
                          <p className="text-sm text-gray-300 truncate mt-0.5">
                            {r.subtitle}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                          {r.description}
                        </p>
                        {r.skills?.length ? (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {r.skills.slice(0, 4).map((s) => (
                              <span
                                key={s}
                                className="text-xs px-2 py-0.5 bg-gray-800/80 text-gray-300 rounded-md border border-gray-700/50"
                              >
                                {s}
                              </span>
                            ))}
                            {r.skills.length > 4 && (
                              <span className="text-xs text-gray-500 font-medium">
                                +{r.skills.length - 4}
                              </span>
                            )}
                          </div>
                        ) : null}
                      </div>
                      {sel && (
                        <span className="text-xs text-gray-500 shrink-0 self-center">
                          ↵
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : d.searched && d.query.length >= 2 ? (
            <div className="py-16 text-center">
              <Search className="w-14 h-14 mx-auto text-gray-700 mb-4" />
              <p className="text-gray-300 font-medium text-lg">
                No{" "}
                {activeFilter
                  ? FILTER_CONFIG[activeFilter].label.toLowerCase()
                  : "results"}{" "}
                found
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Try different keywords
                {activeFilter ? " or remove the filter" : ""}
              </p>
            </div>
          ) : d.query.length > 0 && d.query.length < 2 ? (
            <div className="py-12 text-center text-gray-400">
              Type at least 2 characters
            </div>
          ) : (
            <div className="py-10 px-6">
              <p className="text-sm text-gray-400 text-center mb-6 font-medium">
                {activeFilter
                  ? `Searching ${FILTER_CONFIG[activeFilter].label.toLowerCase()} only`
                  : "Search across all content"}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {FILTER_TYPES.map((type) => {
                  const c = FILTER_CONFIG[type];
                  const Icon = c.icon;
                  const active = activeFilter === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleFilter(type)}
                      className={`flex items-center gap-3 p-4 rounded-xl border ${active ? `${c.bgColor} ${c.borderColor}` : "bg-gray-800/50 border-gray-700/50 hover:border-gray-600"}`}
                    >
                      <Icon className={`w-5 h-5 ${c.color}`} />
                      <span
                        className={`text-sm font-medium ${active ? c.color : "text-gray-200"}`}
                      >
                        {c.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-700/70 bg-gray-900/70">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 bg-gray-800/80 rounded-md border border-gray-700/70 font-medium">
                ↑↓
              </kbd>
              <span className="hidden sm:inline">navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 bg-gray-800/80 rounded-md border border-gray-700/70 font-medium">
                ↵
              </kbd>
              <span className="hidden sm:inline">open</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 bg-gray-800/80 rounded-md border border-gray-700/70 font-medium">
                esc
              </kbd>
              <span className="hidden sm:inline">close</span>
            </span>
          </div>
          {activeFilter && (
            <span
              className={`text-xs font-medium ${FILTER_CONFIG[activeFilter].color}`}
            >
              Filtered: {FILTER_CONFIG[activeFilter].label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Global keyboard listener - added once
let keyListenerAdded = false;
function useGlobalShortcut() {
  if (typeof window !== "undefined" && !keyListenerAdded) {
    keyListenerAdded = true;
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearchModal(getPageFilter(window.location.pathname));
      }
    });
  }
}

// SearchBar - top bar with filters
export function SearchBar() {
  const pathname = usePathname();
  const pageFilter = getPageFilter(pathname);
  useGlobalShortcut();

  return (
    <>
      <div className="flex items-center gap-3 bg-gray-900/95 backdrop-blur-sm border border-gray-700/80 rounded-xl px-3 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          {FILTER_TYPES.map((type) => {
            const c = FILTER_CONFIG[type];
            const Icon = c.icon;
            const active = pageFilter === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => openSearchModal(type)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${active ? `${c.bgColor} ${c.color} border ${c.borderColor}` : "bg-gray-800/50 text-gray-400 border border-transparent hover:bg-gray-800"}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{c.label}</span>
              </button>
            );
          })}
        </div>
        <div className="w-px h-6 bg-gray-700/70" />
        <button
          type="button"
          onClick={() => openSearchModal(pageFilter)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800/70 hover:bg-gray-800 border border-gray-700/70 rounded-lg text-gray-300 hover:text-white group"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
          <span className="hidden md:inline text-sm font-medium">Search</span>
          <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-gray-900/80 rounded border border-gray-700/70 font-semibold text-gray-400">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </button>
      </div>
      <SearchModalContent />
    </>
  );
}

// Sidebar button
export function SidebarSearchButton() {
  const pathname = usePathname();
  useGlobalShortcut();
  return (
    <>
      <button
        type="button"
        onClick={() => openSearchModal(getPageFilter(pathname))}
        className="group relative flex items-center justify-center p-3 rounded-xl text-gray-400 hover:bg-surface-elevated hover:text-cyan-400"
        data-tooltip="Search (⌘K)"
        aria-label="Search"
      >
        <Search className="w-5 h-5 shrink-0" />
      </button>
      <SearchModalContent />
    </>
  );
}

// Page search button
export function PageSearch({
  defaultFilter,
}: {
  defaultFilter?: SearchResultType;
}) {
  return (
    <>
      <button
        type="button"
        onClick={() => openSearchModal(defaultFilter)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800/70 hover:bg-gray-800 border border-gray-700/70 rounded-xl text-gray-300 hover:text-white group"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm font-medium">
          Search {defaultFilter ? FILTER_CONFIG[defaultFilter].label : "All"}
        </span>
        <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-gray-900/80 rounded border border-gray-700/70 font-semibold text-gray-400">
          <Command className="w-2.5 h-2.5" />K
        </kbd>
      </button>
      <SearchModalContent />
    </>
  );
}
