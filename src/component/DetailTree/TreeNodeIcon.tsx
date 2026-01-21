/**
 * VS Code-style icons for tree nodes
 * Minimalist, structural icons for file explorer metaphor
 */

import type { TreeNodeIcon as IconType } from "@/types/detailTree";

interface TreeNodeIconProps {
  icon: IconType;
  className?: string;
}

/**
 * SVG-based icons for tree nodes
 * Uses simple strokes to match VS Code's minimalist aesthetic
 */
export function TreeNodeIcon({ icon, className = "" }: TreeNodeIconProps) {
  const baseClass = `w-4 h-4 shrink-0 ${className}`;

  switch (icon) {
    case "folder":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Folder"
        >
          <path d="M2 4.5h4l1 1.5h7v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z" />
        </svg>
      );

    case "folder-open":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Open folder"
        >
          <path d="M2 4.5h4l1 1.5h7v1H5.5L4 13H2V4.5z" />
          <path d="M5 7h10l-1.5 6H3.5L5 7z" />
        </svg>
      );

    case "file":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="File"
        >
          <path d="M4 2h5l4 4v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
          <path d="M9 2v4h4" />
        </svg>
      );

    case "file-code":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Code file"
        >
          <path d="M4 2h5l4 4v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
          <path d="M9 2v4h4" />
          <path d="M6 9l-1.5 1.5L6 12M10 9l1.5 1.5L10 12" />
        </svg>
      );

    case "file-text":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Text file"
        >
          <path d="M4 2h5l4 4v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
          <path d="M9 2v4h4" />
          <path d="M5 9h6M5 11h4" />
        </svg>
      );

    case "clock":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Clock"
        >
          <circle cx="8" cy="8" r="6" />
          <path d="M8 4v4l2.5 2.5" />
        </svg>
      );

    case "link":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Link"
        >
          <path d="M6.5 9.5L9.5 6.5" />
          <path d="M4.5 8l-1 1a2.5 2.5 0 0 0 3.5 3.5l1-1" />
          <path d="M11.5 8l1-1a2.5 2.5 0 0 0-3.5-3.5l-1 1" />
        </svg>
      );

    case "image":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Image"
        >
          <rect x="2" y="3" width="12" height="10" rx="1" />
          <circle cx="5.5" cy="6.5" r="1.5" />
          <path d="M14 13l-4-4-3 3-2-2-3 3" />
        </svg>
      );

    case "tag":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Tag"
        >
          <path d="M2 3h5l6 6-5 5-6-6V3z" />
          <circle cx="5" cy="6" r="1" fill="currentColor" />
        </svg>
      );

    case "list":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="List"
        >
          <path d="M5 4h9M5 8h9M5 12h9" />
          <circle cx="2.5" cy="4" r="0.75" fill="currentColor" />
          <circle cx="2.5" cy="8" r="0.75" fill="currentColor" />
          <circle cx="2.5" cy="12" r="0.75" fill="currentColor" />
        </svg>
      );

    case "info":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Info"
        >
          <circle cx="8" cy="8" r="6" />
          <path d="M8 11V7M8 5v0.01" />
        </svg>
      );

    case "briefcase":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Briefcase"
        >
          <rect x="2" y="5" width="12" height="9" rx="1" />
          <path d="M5 5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          <path d="M2 9h12" />
        </svg>
      );

    case "award":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Award"
        >
          <circle cx="8" cy="6" r="4" />
          <path d="M5 9l-1 5 4-2 4 2-1-5" />
        </svg>
      );

    case "users":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Users"
        >
          <circle cx="6" cy="4" r="2" />
          <path d="M2 12v-1a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v1" />
          <circle cx="11" cy="5" r="1.5" />
          <path d="M14 12v-1a3 3 0 0 0-3-3" />
        </svg>
      );

    case "globe":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Globe"
        >
          <circle cx="8" cy="8" r="6" />
          <path d="M2 8h12M8 2c-2 2.5-2 9.5 0 12M8 2c2 2.5 2 9.5 0 12" />
        </svg>
      );

    case "github":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="currentColor"
          role="img"
          aria-label="GitHub"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
      );

    case "youtube":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="currentColor"
          role="img"
          aria-label="YouTube"
        >
          <path d="M14.5 5.5s-.2-1.3-.8-1.9c-.7-.8-1.6-.8-2-.8C9.2 2.5 8 2.5 8 2.5s-1.2 0-3.7.3c-.4 0-1.3 0-2 .8-.6.6-.8 1.9-.8 1.9S1.3 7 1.3 8.5v1c0 1.5.2 3 .2 3s.2 1.3.8 1.9c.7.8 1.7.8 2.2.8 1.6.2 6.5.2 6.5.2s3.2 0 5.2-.3c.4 0 1.3 0 2-.8.6-.6.8-1.9.8-1.9s.2-1.5.2-3v-1c0-1.5-.2-3-.2-3zM6.5 10.5v-4L10.5 8l-4 2.5z" />
        </svg>
      );

    case "linkedin":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="currentColor"
          role="img"
          aria-label="LinkedIn"
        >
          <path d="M13.6 13.6h-2.4V9.9c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.7H6.2V6h2.3v1h0c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2zM3.6 5c-.8 0-1.4-.6-1.4-1.4S2.8 2.2 3.6 2.2 5 2.8 5 3.6 4.4 5 3.6 5zm1.2 8.6H2.4V6h2.4v7.6zM14.8 0H1.2C.5 0 0 .5 0 1.2v13.6c0 .7.5 1.2 1.2 1.2h13.6c.7 0 1.2-.5 1.2-1.2V1.2c0-.7-.5-1.2-1.2-1.2z" />
        </svg>
      );

    case "code":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Code"
        >
          <path d="M5 4L1 8l4 4M11 4l4 4-4 4M9 2l-2 12" />
        </svg>
      );

    case "terminal":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Terminal"
        >
          <rect x="1" y="2" width="14" height="12" rx="1" />
          <path d="M4 6l3 2-3 2M8 10h4" />
        </svg>
      );

    case "package":
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Package"
        >
          <path d="M8 1l6 3v8l-6 3-6-3V4l6-3z" />
          <path d="M8 1v14M2 4l6 3 6-3" />
        </svg>
      );

    default:
      return (
        <svg
          className={baseClass}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          role="img"
          aria-label="Item"
        >
          <circle cx="8" cy="8" r="3" />
        </svg>
      );
  }
}
