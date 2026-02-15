"use client";

import { ThemeToggleButton } from "./ThemeToggleButton";

/**
 * Floating theme toggle for mobile — only visible below `lg` breakpoint.
 * Renders on the client. The sidebar toggle covers desktop.
 */
export function MobileThemeToggle() {
  return (
    <div className="lg:hidden">
      <ThemeToggleButton variant="floating" />
    </div>
  );
}
