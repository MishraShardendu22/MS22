"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { initTheme, subscribeTheme, toggleTheme } from "@/lib/themeManager";

interface ThemeContextValue {
  isTraditional: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  isTraditional: false,
  toggle: () => {},
});

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isTraditional, setIsTraditional] = useState(false);

  useEffect(() => {
    const initial = initTheme();
    setIsTraditional(initial);
    return subscribeTheme(setIsTraditional);
  }, []);

  const toggle = useCallback(() => {
    toggleTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ isTraditional, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
