import { TextContent } from "./TextContent";
import { ImageContainerMobile } from "./ImageContainerMobile";
import { EducationSection } from "./EducationSection";
import { BackgroundElementsMobile } from "./BackgroundElementsMobile";

/**
 * Mobile-optimized Hero section
 * - No background blur effects
 * - Static images (no hover animations)
 * - Reduced DOM elements
 */
export const HeroSectionMobile = () => {
  return (
    <section className="relative w-full min-h-screen px-4 sm:px-6 py-16 bg-gray-950 overflow-hidden">
      <BackgroundElementsMobile />
      <div className="container mx-auto max-w-[1600px] w-full">
        <div className="grid grid-cols-1 gap-8 items-center mb-12">
          <TextContent />
          <ImageContainerMobile />
        </div>
        <EducationSection />
      </div>
    </section>
  );
};
