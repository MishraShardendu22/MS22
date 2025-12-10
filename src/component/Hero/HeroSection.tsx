"use client";

import { animate, stagger, Timeline } from "animejs";
import { useEffect } from "react";
import { BackgroundElements } from "./BackgroundElements";
import { EducationSection } from "./EducationSection";
import { ImageContainer } from "./ImageContainer";
import { TextContent } from "./TextContent";

export const HeroSection = () => {
  // Enhanced entry animation timeline
  useEffect(() => {
    const tl = new Timeline();

    const nameElement = document.querySelector(".hero-name");
    if (nameElement) {
      tl.add(nameElement, {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
      });
    }

    const roleElement = document.querySelector(".hero-role");
    if (roleElement) {
      tl.add(
        roleElement,
        {
          translateX: [-30, 0],
          opacity: [0, 1],
          duration: 600,
        },
        "-=400",
      );
    }

    const aboutElement = document.querySelector(".hero-about");
    if (aboutElement) {
      tl.add(
        aboutElement,
        {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 600,
        },
        "-=300",
      );
    }

    const socialLinks = document.querySelectorAll(".social-link");
    if (socialLinks.length > 0) {
      tl.add(
        Array.from(socialLinks),
        {
          scale: [0, 1],
          opacity: [0, 1],
          duration: 500,
          delay: stagger(100),
        },
        "-=200",
      );
    }

    const imageContainer = document.querySelector(".image-container-wrapper");
    if (imageContainer) {
      tl.add(
        imageContainer,
        {
          scale: [0.9, 1],
          opacity: [0, 1],
          duration: 1000,
          ease: "out(3)",
        },
        "-=800",
      );
    }

    const educationCards = document.querySelectorAll(".education-card");
    if (educationCards.length > 0) {
      tl.add(
        Array.from(educationCards),
        {
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 500,
          delay: stagger(80),
        },
        "-=600",
      );
    }
  }, []);

  // Social link hover
  useEffect(() => {
    const links = document.querySelectorAll(".social-link");
    links.forEach((link) => {
      const handleEnter = () => {
        animate(link, {
          scale: 1.05,
          translateY: -2,
          duration: 300,
          ease: "out(3)",
        });
        (link as HTMLElement).style.borderColor = "#06b6d4";
      };

      const handleLeave = () => {
        animate(link, {
          scale: 1,
          translateY: 0,
          duration: 300,
          ease: "out(3)",
        });
        (link as HTMLElement).style.borderColor = "";
      };

      link.addEventListener("mouseenter", handleEnter);
      link.addEventListener("mouseleave", handleLeave);
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16 bg-linear-to-b from-transparent via-gray-950/50 to-transparent overflow-hidden">
      {/* Background Elements */}
      <BackgroundElements />

      {/* Content Container */}
      <div className="container mx-auto max-w-[1600px] w-full">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Text Content */}
          <TextContent />

          {/* Image Container */}
          <ImageContainer />
        </div>

        {/* Education Section */}
        <EducationSection />
      </div>
    </section>
  );
};
