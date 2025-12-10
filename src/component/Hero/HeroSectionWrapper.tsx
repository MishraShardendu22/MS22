import { getIsMobile } from "@/lib/isMobile";
import { HeroSectionMobile } from "./HeroSectionMobile";
import { HeroSectionDesktop } from "./HeroSection";

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
