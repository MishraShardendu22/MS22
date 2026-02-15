import type { Metadata } from "next";
import { LinksPageDesktop, LinksPageMobile } from "@/component/Links";
import { getIsMobile } from "@/lib/isMobile";
import { generatePageMetadata } from "@/lib/metadata";

export const dynamic = "force-static";

export const metadata: Metadata = generatePageMetadata({
  title: "All My Links",
  description:
    "Find all my social media profiles, coding platforms, and professional links in one place. Connect with me on GitHub, LinkedIn, Twitter, LeetCode, and more.",
  path: "/links",
  keywords: [
    "social links",
    "contact links",
    "social media",
    "GitHub profile",
    "LinkedIn profile",
    "LeetCode profile",
    "coding profiles",
    "developer links",
  ],
});

export default async function LinksPage() {
  const isMobile = await getIsMobile();

  return isMobile ? <LinksPageMobile /> : <LinksPageDesktop />;
}
