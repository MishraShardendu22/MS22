/**
 * Link type detection and utilities
 * Determines the appropriate display label and type for external URLs
 */

import type { LinkType } from "@/types/detailTree";

export function detectLinkType(url: string): LinkType {
  try {
    const hostname = new URL(url).hostname.toLowerCase();

    if (hostname.includes("github.com") || hostname.includes("github.io")) {
      return "github";
    }
    if (
      hostname.includes("youtube.com") ||
      hostname.includes("youtu.be") ||
      hostname.includes("youtube-nocookie.com")
    ) {
      return "youtube";
    }
    if (hostname.includes("linkedin.com")) {
      return "linkedin";
    }
    // If it's a certificate URL (common patterns)
    if (
      hostname.includes("coursera.org") ||
      hostname.includes("udemy.com") ||
      hostname.includes("credly.com") ||
      url.includes("certificate")
    ) {
      return "certificate";
    }
  } catch {
    return "external";
  }

  return "live-demo";
}

export function getLinkLabel(type: LinkType): string {
  switch (type) {
    case "github":
      return "View Code";
    case "youtube":
      return "View Demo";
    case "linkedin":
      return "View Post";
    case "live-demo":
      return "View Demo";
    case "certificate":
      return "View Certificate";
    case "external":
      return "Open Link";
    default:
      return "Open Link";
  }
}

export function getYouTubeEmbedUrl(url: string): string | null {
  try {
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("watch?v=")[1]?.split("&")[0];
      return videoId
        ? `https://www.youtube-nocookie.com/embed/${videoId}`
        : null;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return videoId
        ? `https://www.youtube-nocookie.com/embed/${videoId}`
        : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function canEmbedUrl(url: string): boolean {
  const linkType = detectLinkType(url);
  // Only allow embedding for actual live demos (not GitHub, LinkedIn, etc.)
  return linkType === "live-demo";
}
