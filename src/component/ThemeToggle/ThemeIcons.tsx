"use client";

/**
 * Optimized inline SVG icons for the Hindu Traditional theme toggle.
 * Converted from source images, minified, with accessibility labels.
 */

interface IconProps {
  className?: string;
  "aria-hidden"?: boolean;
}

/**
 * Om / Aum symbol — primary icon for the traditional theme.
 * Derived from: rsvos17p3qu0qbqnxgsg.webp
 * Optimized: removed metadata, minified paths.
 */
export function OmIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Om symbol"
      {...props}
    >
      <path
        d="M32 4c-2.5 5-8 8-8 14 0 4 2.5 7 6 8-5 1-9 5-9 10 0 6 5 10 11 10 4 0 7-2 9-5 0 5-1 9-4 12-2 2-5 4-9 4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 18c4-1 8 1 10 5s1 9-2 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="44" cy="10" r="2.5" fill="currentColor" />
      <path
        d="M20 6c-3 0-6 2-7 5s0 7 3 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 52c4 4 10 6 16 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 3"
      />
    </svg>
  );
}

/**
 * Kalash / temple pot — secondary decorative icon.
 * Derived from: gvydma64flv6cjias6pt.png
 * Optimized: simplified geometry, minified.
 */
export function KalashIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Kalash symbol"
      {...props}
    >
      <path
        d="M22 54h20c2-8 4-16 4-24 0-4-2-7-5-9h-18c-3 2-5 5-5 9 0 8 2 16 4 24z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M20 54h24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <ellipse
        cx="32"
        cy="18"
        rx="10"
        ry="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M32 15V8M28 10l4-4 4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 10c-4-2-7-1-8 2M38 10c4-2 7-1 8 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M27 34a5 5 0 0 1 10 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="42" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/**
 * Diya / lamp icon — used in toggle button active state.
 * Represents light/knowledge in traditional symbolism.
 */
export function DiyaIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Diya lamp"
      {...props}
    >
      {/* Flame */}
      <path
        d="M32 8c-2 6-6 10-6 16 0 4 3 7 6 7s6-3 6-7c0-6-4-10-6-16z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* Lamp body */}
      <path
        d="M18 40c0-4 6-7 14-7s14 3 14 7c0 2-1 4-3 5l-4 8H25l-4-8c-2-1-3-3-3-5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Base */}
      <path
        d="M24 53h16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Glow rays */}
      <path
        d="M32 4v2M24 6l1 2M40 6l-1 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/**
 * Modern/Sport mode icon — code brackets, representing the default tech theme.
 */
export function CodeBracketIcon({
  className = "w-5 h-5",
  ...props
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Code mode"
      {...props}
    >
      <path
        d="M8 3l-5 9 5 9M16 3l5 9-5 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 4l-4 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
