import { getIsMobile } from "@/lib/isMobile";
import { HeroSectionDesktop } from "./HeroSection";
import { HeroSectionMobile } from "./HeroSectionMobile";

export const HeroSection = async () => {
  const isMobile = await getIsMobile();

  if (isMobile) {
    return <HeroSectionMobile />;
  }

  return <HeroSectionDesktop />;
};
