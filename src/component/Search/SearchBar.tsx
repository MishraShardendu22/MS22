"use client";

import { Command, Loader2, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useReducer, useRef } from "react";
import { searchAPI } from "@/static/api/api.request";
import type { SearchResult, SearchResultType } from "@/static/api/api.types";
import { FILTER_CONFIG, FILTER_TYPES, getPageFilter } from "@/static/search";
import {
  closeSearchModal,
  openSearchModal,
  useModalState,
} from "./HeaderSearchButton";

export function SearchModalContent() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [, forceRender] = useReducer((x) => x + 1, 0);

  const data = useRef({
    results: [] as SearchResult[],
    loading: false,
    searched: false,
    selected: 0,
    filter: undefined as SearchResultType | undefined,
    query: "",
  });

  const { open, filter: initialFilter } = useModalState();

  if (open && inputRef.current && !data.current.query) {
    data.current.filter = initialFilter;
    queueMicrotask(() => inputRef.current?.focus());
  }

  async function search(query: string, filter: SearchResultType | undefined) {
    abortRef.current?.abort();

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
      className="fixed inset-0 z-60 flex items-end justify-center bg-black/75 backdrop-blur-md sm:items-start sm:pt-[8vh]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={onKeyDown}
    >
      <div className="h-[100dvh] w-full overflow-hidden border border-gray-700/80 bg-gray-900/98 shadow-2xl sm:mx-4 sm:h-auto sm:max-w-3xl sm:rounded-2xl sm:border sm:backdrop-blur-xl">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 px-3 sm:px-5 py-3 border-b border-gray-800/70">
          <span className="text-xs text-gray-500 font-medium shrink-0">
            Filter:
          </span>
          <div className="flex flex-wrap gap-2 w-full">
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
                  style={{ minWidth: "90px" }}
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
        </div>

        {/* Input */}
        <div className="relative flex items-center border-b border-gray-700/70">
          <Search className="absolute left-3 sm:left-5 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            onInput={onInput}
            placeholder={
              activeFilter
                ? `Search ${FILTER_CONFIG[activeFilter].label.toLowerCase()}...`
                : "Search everything..."
            }
            className="w-full py-4 sm:py-5 pl-10 sm:pl-14 pr-10 sm:pr-14 bg-transparent text-white text-base sm:text-lg placeholder:text-gray-500 focus:outline-none"
            autoComplete="off"
          />
          {d.loading ? (
            <Loader2 className="absolute right-3 sm:right-5 w-5 h-5 text-gray-400 animate-spin" />
          ) : d.query ? (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-3 sm:right-5 p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="absolute right-3 sm:right-5 px-2.5 py-1 text-xs text-gray-400 bg-gray-800/70 rounded-md border border-gray-700/70 font-medium">
              ESC
            </kbd>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[55vh] sm:max-h-[55vh] overflow-y-auto">
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
                      className={`flex flex-col sm:flex-row items-start gap-2 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4 ${sel ? "bg-gray-800/90 border-l-2 border-cyan-500" : "hover:bg-gray-800/60 border-l-2 border-transparent"}`}
                    >
                      <div className={`shrink-0 p-2 rounded-xl ${c.bgColor}`}>
                        <Icon className={`w-4 h-4 ${c.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
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
                          <div className="flex flex-wrap gap-1 mt-2">
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
        <div className="flex flex-col sm:flex-row items-center justify-between px-3 sm:px-5 py-3 border-t border-gray-700/70 bg-gray-900/70 gap-2">
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
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-700/80 bg-gray-900/95 px-2.5 py-2 shadow-lg sm:flex-nowrap sm:gap-3 sm:px-3">
        <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto sm:flex-initial sm:overflow-visible sm:gap-2">
          {FILTER_TYPES.map((type) => {
            const c = FILTER_CONFIG[type];
            const Icon = c.icon;
            const active = pageFilter === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => openSearchModal(type)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium sm:px-3 ${active ? `${c.bgColor} ${c.color} border ${c.borderColor}` : "bg-gray-800/50 text-gray-400 border border-transparent hover:bg-gray-800"}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{c.label}</span>
              </button>
            );
          })}
        </div>
        <div className="hidden h-6 w-px bg-gray-700/70 sm:block" />
        <button
          type="button"
          onClick={() => openSearchModal(pageFilter)}
          className="ml-auto flex shrink-0 items-center gap-2 rounded-lg border border-gray-700/70 bg-gray-800/70 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
          <span className="hidden text-sm font-medium md:inline">Search</span>
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
        className="flex items-center gap-2 rounded-xl border border-gray-700/70 bg-gray-800/70 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white sm:px-4"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm font-medium sm:hidden">Search</span>
        <span className="hidden text-sm font-medium sm:inline">
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
