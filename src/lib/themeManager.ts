/**
 * ThemeManager — lightweight Hindu Traditional Mode toggle engine.
 *
 * Responsibilities:
 *  1. Detect saved preference (localStorage → cookie fallback)
 *  2. Apply / remove `data-theme="hindu-traditional"` on <html>
 *  3. Notify subscribers (for React state sync)
 *  4. Expose toggle() / get() / subscribe()
 *
 * Runtime budget: < 3 ms. No DOM style recalculation loops.
 * Uses CSS custom-property swap via data-attribute selector — zero class toggling.
 */

const STORAGE_KEY = "theme-hindu-traditional";
const COOKIE_KEY = "theme-hindu-traditional";
const DATA_ATTR = "data-theme";
const THEME_VALUE = "hindu-traditional";

type Listener = (active: boolean) => void;

let listeners: Listener[] = [];
let currentState: boolean | null = null;

/* ------------------------------------------------------------------ */
/*  Persistence helpers                                                */
/* ------------------------------------------------------------------ */

function readPreference(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === "true";
  } catch {
    /* localStorage unavailable — try cookie */
  }
  if (typeof document !== "undefined") {
    const match = document.cookie.match(
      new RegExp(`(?:^|;\\s*)${COOKIE_KEY}=([^;]*)`),
    );
    if (match) return match[1] === "true";
  }
  return false;
}

function writePreference(active: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(active));
  } catch {
    /* quota / private mode */
  }
  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE_KEY}=${active};path=/;max-age=31536000;SameSite=Lax`;
  }
}

/* ------------------------------------------------------------------ */
/*  DOM application                                                    */
/* ------------------------------------------------------------------ */

function applyToDOM(active: boolean): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (active) {
    root.setAttribute(DATA_ATTR, THEME_VALUE);
  } else {
    root.removeAttribute(DATA_ATTR);
  }
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export function getThemeActive(): boolean {
  if (currentState !== null) return currentState;
  currentState = readPreference();
  return currentState;
}

export function setThemeActive(active: boolean): void {
  if (currentState === active) return;
  currentState = active;
  writePreference(active);
  applyToDOM(active);
  for (const fn of listeners) fn(active);
}

export function toggleTheme(): boolean {
  const next = !getThemeActive();
  setThemeActive(next);
  return next;
}

export function subscribeTheme(fn: Listener): () => void {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

/**
 * Called once on app mount to hydrate DOM from persisted preference.
 * Must run before first paint to avoid FOUC.
 */
export function initTheme(): boolean {
  const active = getThemeActive();
  applyToDOM(active);
  return active;
}
