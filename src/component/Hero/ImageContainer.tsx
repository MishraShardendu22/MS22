"use client";

import { animate, stagger } from "animejs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const ImageContainer = () => {
  const iconRef = useRef<HTMLImageElement>(null);
  const professionalRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pixelGridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Disable animations on mobile for better performance
    if (isMobile) return;

    // Delay animation setup to improve initial page load
    const timeoutId = setTimeout(() => {
      const container = containerRef.current;
      const icon = iconRef.current;
      const professional = professionalRef.current;
      const glow = glowRef.current;
      const pixelGrid = pixelGridRef.current;
      if (!container || !icon || !professional || !glow || !pixelGrid) return;

      const handleEnter = () => {
        pixelGrid.innerHTML = "";
        const cols = 6; // Reduced for better performance
        const rows = 8; // Reduced for better performance

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
          will-change: transform, opacity;
        `;
          pixelGrid.appendChild(block);
        }

        animate(".pixel-block-hover", {
          opacity: [0, 0.7, 0],
          scale: [0, 1.1, 0],
          duration: 500,
          delay: stagger(10, { grid: [cols, rows], from: "center" }),
          ease: "out(3)",
        });

        animate(icon, {
          opacity: 0,
          scale: 0.98,
          duration: 300,
          ease: "out(3)",
        });

        animate(professional, {
          opacity: 1,
          scale: 1,
          duration: 300,
          delay: 150,
          ease: "out(3)",
        });

        animate(glow, {
          opacity: [0, 0.3],
          scale: [0.9, 1.05],
          duration: 400,
          ease: "out(4)",
        });
      };

      const handleLeave = () => {
        animate(icon, {
          opacity: 1,
          scale: 1,
          duration: 300,
          delay: 150,
          ease: "out(3)",
        });

        animate(professional, {
          opacity: 0,
          scale: 0.98,
          duration: 300,
          ease: "out(3)",
        });

        animate(glow, {
          opacity: 0,
          scale: 0.9,
          duration: 400,
          ease: "out(4)",
        });

        setTimeout(() => {
          if (pixelGrid) pixelGrid.innerHTML = "";
        }, 400);
      };

      container.addEventListener("mouseenter", handleEnter);
      container.addEventListener("mouseleave", handleLeave);

      return () => {
        container.removeEventListener("mouseenter", handleEnter);
        container.removeEventListener("mouseleave", handleLeave);
      };
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isMobile]);

  return (
    <div className="lg:col-span-5 relative order-1 lg:order-2 mb-8 lg:mb-0">
      <div
        ref={glowRef}
        className="absolute -inset-4 md:-inset-8 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-0"
      />

      <div
        ref={containerRef}
        className="image-container-wrapper relative w-full aspect-3/4 max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] rounded-2xl overflow-hidden cursor-pointer mx-auto shadow-2xl"
      >
        <Image
          ref={iconRef}
          src="/icon.avif"
          alt="Shardendu Mishra - Software Developer and Engineer portrait"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <Image
          ref={professionalRef}
          src="/professional.avif"
          alt="Shardendu Mishra - Professional Software Developer photo"
          fill
          className="object-cover opacity-0"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          ref={pixelGridRef}
          className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
        />
      </div>
    </div>
  );
};
