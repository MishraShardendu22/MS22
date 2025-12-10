"use client";

import { animate, stagger } from "animejs";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const ImageContainer = () => {
  const iconRef = useRef<HTMLImageElement>(null);
  const professionalRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pixelGridRef = useRef<HTMLDivElement>(null);

  // Image hover animation with glow and pixelation effect
  useEffect(() => {
    const container = containerRef.current;
    const icon = iconRef.current;
    const professional = professionalRef.current;
    const glow = glowRef.current;
    const pixelGrid = pixelGridRef.current;
    if (!container || !icon || !professional || !glow || !pixelGrid) return;

    const handleEnter = () => {
      pixelGrid.innerHTML = "";
      const cols = 12;
      const rows = 16;

      for (let i = 0; i < cols * rows; i++) {
        const block = document.createElement("div");
        block.className = "pixel-block-hover";
        block.style.cssText = `
          position: absolute;
          width: ${100 / cols}%;
          height: ${100 / rows}%;
          left: ${(i % cols) * (100 / cols)}%;
          top: ${Math.floor(i / cols) * (100 / rows)}%;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          opacity: 0;
          z-index: 5;
        `;
        pixelGrid.appendChild(block);
      }

      animate(".pixel-block-hover", {
        opacity: [0, 0.8, 0],
        scale: [0, 1.2, 0],
        duration: 600,
        delay: stagger(8, { grid: [cols, rows], from: "center" }),
        ease: "out(3)",
      });

      animate(icon, {
        opacity: 0,
        scale: 0.95,
        duration: 400,
        ease: "out(3)",
      });

      animate(professional, {
        opacity: 1,
        scale: 1,
        duration: 400,
        delay: 200,
        ease: "out(3)",
      });

      animate(glow, {
        opacity: [0, 0.4],
        scale: [0.8, 1.1],
        duration: 600,
        ease: "out(4)",
      });
    };

    const handleLeave = () => {
      animate(icon, {
        opacity: 1,
        scale: 1,
        duration: 400,
        delay: 200,
        ease: "out(3)",
      });

      animate(professional, {
        opacity: 0,
        scale: 0.95,
        duration: 400,
        ease: "out(3)",
      });

      animate(glow, {
        opacity: 0,
        scale: 0.8,
        duration: 600,
        ease: "out(4)",
      });

      setTimeout(() => {
        if (pixelGrid) pixelGrid.innerHTML = "";
      }, 600);
    };

    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="lg:col-span-5 relative order-1 lg:order-2">
      <div
        ref={glowRef}
        className="absolute -inset-4 md:-inset-8 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-0"
      />

      <div
        ref={containerRef}
        className="image-container-wrapper relative w-full aspect-3/4 max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] xl:max-w-[600px] rounded-2xl overflow-hidden cursor-pointer mx-auto shadow-2xl"
      >
        <Image
          ref={iconRef}
          src="/icon.avif"
          alt="Shardendu Mishra"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 400px, (max-width: 768px) 450px, (max-width: 1024px) 500px, (max-width: 1280px) 550px, 600px"
        />
        <Image
          ref={professionalRef}
          src="/professional.avif"
          alt="Shardendu Mishra Professional"
          fill
          className="object-cover opacity-0"
          priority
          sizes="(max-width: 640px) 400px, (max-width: 768px) 450px, (max-width: 1024px) 500px, (max-width: 1280px) 550px, 600px"
        />
        <div
          ref={pixelGridRef}
          className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
        />
      </div>
    </div>
  );
};
