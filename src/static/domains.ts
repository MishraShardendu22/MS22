/**
 * Centralized Domain Configuration
 * Single source of truth for all domain names and URLs across the portfolio.
 * To change the domain in the future, simply update PRIMARY_DOMAIN or set NEXT_PUBLIC_BASE_URL.
 * This does NOT hurt SEO because all values are evaluated during SSG/SSR into static HTML.
 */

export const PRIMARY_DOMAIN = "mishrashardendu22.is-a.dev";

const rawBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || `https://${PRIMARY_DOMAIN}`;
const rawBackendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://portfolio-backend-2iw4.onrender.com";

export const BaseURL: string = rawBaseUrl.endsWith("/")
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl;

export const BackendURL: string = rawBackendUrl.endsWith("/")
  ? rawBackendUrl.slice(0, -1)
  : rawBackendUrl;

export const DomainName: string = (() => {
  try {
    return new URL(BaseURL).hostname;
  } catch {
    return PRIMARY_DOMAIN;
  }
})();

export const SUBDOMAINS = {
  blogs: process.env.NEXT_PUBLIC_BLOGS_URL || `https://blogs.${PRIMARY_DOMAIN}`,
  github:
    process.env.NEXT_PUBLIC_GITHUB_BACKUP_URL ||
    `https://github.${PRIMARY_DOMAIN}`,
  admin: process.env.NEXT_PUBLIC_ADMIN_URL || `https://admin.${PRIMARY_DOMAIN}`,
  docs: process.env.NEXT_PUBLIC_DOCS_URL || `https://docs.${PRIMARY_DOMAIN}`,
  design:
    process.env.NEXT_PUBLIC_DESIGN_URL || `https://design.${PRIMARY_DOMAIN}`,
  observatoryCdn:
    process.env.NEXT_PUBLIC_OBSERVATORY_CDN_URL ||
    `https://observatory-cdn.${PRIMARY_DOMAIN}`,
  frozenUi:
    process.env.NEXT_PUBLIC_FROZEN_UI_URL || "https://shardendu.is-a.dev",
} as const;

export const InternalRoutes = {
  home: "/",
  projects: "/projects",
  skills: "/skills",
  certificates: "/certificates",
  experiences: "/experiences",
  volunteer: "/volunteer",
  contact: "/contact",
  links: "/links",
  feed: "/feed.xml",
} as const;

export function getFullUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BaseURL}${cleanPath}`;
}
