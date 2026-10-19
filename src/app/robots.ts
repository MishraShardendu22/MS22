import type { MetadataRoute } from "next";
import { BaseURL } from "@/static/data";

export const revalidate = 3600;

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = normalizeBaseUrl(BaseURL);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Anthropic-AI",
          "PerplexityBot",
          "Applebot",
          "Applebot-Extended",
          "Google-Extended",
          "CCBot",
          "cohere-ai",
          "Diffbot",
          "FacebookBot",
          "OAI-SearchBot",
          "AhrefsBot",
          "AhrefsSiteAudit",
          "SemrushBot",
        ],
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
    ],
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
