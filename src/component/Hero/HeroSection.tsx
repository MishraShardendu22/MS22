"use client";

import { TextContent } from "./TextContent";
import { ImageContainer } from "./ImageContainer";
import { EducationSection } from "./EducationSection";
import { BackgroundElements } from "./BackgroundElements";

export const HeroSection = () => {

  return (
    <section className="relative w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      <BackgroundElements />
      <div className="container mx-auto max-w-[1600px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          <TextContent />
          <ImageContainer />
        </div>
        <EducationSection />
      </div>
    </section>
  );
};
