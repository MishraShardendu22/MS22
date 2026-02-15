"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { initTheme, subscribeTheme, toggleTheme } from "@/lib/themeManager";
import { CodeBracketIcon, DiyaIcon } from "./ThemeIcons";

/**
 * ThemeToggleButton — reusable toggle for Hindu Traditional Mode.
 *
 * Features:
 *  - Keyboard navigation (Enter / Space)
 *  - ARIA switch role with live label
 *  - Focus ring
 *  - GPU-accelerated icon morph animation
 *  - Subtle glow/aura on activation
 *  - No layout shift (fixed dimensions)
 *  - prefers-reduced-motion compliant
 */

interface ThemeToggleButtonProps {
  variant?: "sidebar" | "floating" | "inline";
  className?: string;
}

export function ThemeToggleButton({
  variant = "sidebar",
  className = "",
}: ThemeToggleButtonProps) {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const initial = initTheme();
    setActive(initial);
    setMounted(true);
    return subscribeTheme(setActive);
  }, []);

  const handleToggle = useCallback(() => {
    if (animating) return;
    setAnimating(true);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReduced) {
      document.documentElement.classList.add("theme-transitioning");
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("theme-transitioning");
      });
    }

    toggleTheme();

    const dur = prefersReduced ? 50 : 280;
    setTimeout(() => setAnimating(false), dur);
  }, [animating]);

  if (!mounted) {
    return (
      <div
        className={`${sizeClasses[variant]} ${className}`}
        aria-hidden="true"
      />
    );
  }

  const label = active
    ? "Switch to Sport Mode"
    : "Switch to Hindu Traditional Mode";

  return (
    <button
      ref={buttonRef}
      type="button"
      role="switch"
      aria-checked={active}
      aria-label={label}
      title={label}
      onClick={handleToggle}
      className={`
        ${baseClasses}
        ${sizeClasses[variant]}
        ${active ? activeClasses : inactiveClasses}
        ${animating ? "scale-90" : "scale-100"}
        ${className}
      `}
    >
      <span className="sr-only">{label}</span>

      {/* Icon morph — cross-fade with GPU-accelerated transform */}
      <span className="relative w-5 h-5" aria-hidden="true">
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
            active
              ? "opacity-0 rotate-90 scale-75"
              : "opacity-100 rotate-0 scale-100"
          }`}
          style={{ willChange: "transform, opacity" }}
        >
          <DiyaIcon className="w-5 h-5" />
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
            active
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-75"
          }`}
          style={{ willChange: "transform, opacity" }}
        >
          <CodeBracketIcon className="w-5 h-5" />
        </span>
      </span>

      {/* Aura glow — GPU layer */}
      {active && (
        <span
          className="absolute inset-0 rounded-xl animate-theme-glow pointer-events-none"
          aria-hidden="true"
          style={{ willChange: "opacity" }}
        />
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Style constants — kept as strings for tree-shaking                 */
/* ------------------------------------------------------------------ */

const baseClasses = [
  "relative",
  "inline-flex",
  "items-center",
  "justify-center",
  "rounded-xl",
  "border",
  "transition-all",
  "duration-200",
  "cursor-pointer",
  "select-none",
  "outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-offset-2",
  "focus-visible:ring-offset-background",
].join(" ");

const sizeClasses: Record<string, string> = {
  sidebar: "w-10 h-10 p-2",
  floating: "w-12 h-12 p-2.5 fixed bottom-6 right-6 z-50 shadow-lg",
  inline: "w-9 h-9 p-1.5",
};

const activeClasses = [
  "bg-gradient-to-br",
  "from-amber-900/40",
  "to-orange-900/30",
  "border-amber-600/50",
  "text-amber-400",
  "hover:border-amber-500",
  "hover:text-amber-300",
  "focus-visible:ring-amber-500",
  "shadow-[0_0_12px_rgba(255,140,0,0.15)]",
].join(" ");

const inactiveClasses = [
  "bg-surface-elevated",
  "border-border",
  "text-text-secondary",
  "hover:bg-surface",
  "hover:text-cyan-400",
  "hover:border-cyan-500/40",
  "focus-visible:ring-cyan-400",
].join(" ");
