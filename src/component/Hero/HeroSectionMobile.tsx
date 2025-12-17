import { TextContent } from "./TextContent";
import { EducationSection } from "./EducationSection";
import { BackgroundElementsMobile } from "./BackgroundElementsMobile";

/**
 * Mobile-optimized Hero section
 * - No background blur effects
 * - No images for better performance
 * - Reduced DOM elements
 */
export const HeroSectionMobile = () => {
  return (
    <section className="relative w-full min-h-screen px-4 sm:px-6 py-16 bg-gray-950 overflow-hidden">
      <BackgroundElementsMobile />
      <div className="container mx-auto max-w-400 w-full">
        <div className="mb-12">
          <TextContent />
        </div>
        <EducationSection />
      </div>
    </section>
  );
};
