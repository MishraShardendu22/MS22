import { getIsMobile } from "@/lib/isMobile";
import { HeroSectionDesktop } from "./HeroSection";
import { HeroSectionMobile } from "./HeroSectionMobile";

/**
 * Server component that renders mobile or desktop Hero based on user agent
 */
export const HeroSection = async () => {
  const isMobile = await getIsMobile();

  if (isMobile) {
    return <HeroSectionMobile />;
  }

  return <HeroSectionDesktop />;
};
