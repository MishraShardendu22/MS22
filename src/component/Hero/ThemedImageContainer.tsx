"use client";

import Image from "next/image";
import { useTheme } from "@/component/ThemeToggle/ThemeProvider";

const CDN_ICON_AVIF =
  "https://res.cloudinary.com/dkxw15and/image/upload/v1770811228/image-upload-app/pimoqdnzgxttynbims86.avif";
const CDN_PROFESSIONAL_AVIF =
  "https://res.cloudinary.com/dkxw15and/image/upload/v1770811228/image-upload-app/iyeqraabcu6gn77dg48d.avif";
const CDN_TRADITIONAL_PNG =
  "https://res.cloudinary.com/dkxw15and/image/upload/v1771155629/image-upload-app/gixpamkgqpyht96jtlaa.png";

export function ThemedImageContainer() {
  const { isTraditional } = useTheme();

  if (isTraditional) {
    return (
      <div className="lg:col-span-5 relative order-1 lg:order-2 mb-8 lg:mb-0">
        <div className="glow-effect" />
        <div className="image-container group relative w-full aspect-3/4 max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] rounded-2xl overflow-hidden cursor-pointer mx-auto shadow-2xl border-2 border-amber-700/30">
          <Image
            src={CDN_TRADITIONAL_PNG}
            alt="Shardendu Mishra - Hindu Traditional portrait"
            fill
            className="object-cover transition-all duration-300"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="pixel-grid" />
          {/* Decorative corner accents */}
          <div
            className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-2xl pointer-events-none"
            style={{ borderColor: "var(--gold-accent)" }}
            aria-hidden="true"
          />
          <div
            className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-2xl pointer-events-none"
            style={{ borderColor: "var(--gold-accent)" }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-2xl pointer-events-none"
            style={{ borderColor: "var(--gold-accent)" }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-2xl pointer-events-none"
            style={{ borderColor: "var(--gold-accent)" }}
            aria-hidden="true"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-5 relative order-1 lg:order-2 mb-8 lg:mb-0">
      <div className="glow-effect" />
      <div className="image-container group relative w-full aspect-3/4 max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] rounded-2xl overflow-hidden cursor-pointer mx-auto shadow-2xl">
        <Image
          src={CDN_ICON_AVIF}
          alt="Shardendu Mishra - Software Developer and Engineer portrait"
          fill
          className="object-cover transition-all duration-300 group-hover:opacity-0 group-hover:scale-98"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <Image
          src={CDN_PROFESSIONAL_AVIF}
          alt="Shardendu Mishra - Professional Software Developer photo"
          fill
          className="object-cover opacity-0 scale-98 transition-all duration-300 delay-150 group-hover:opacity-100 group-hover:scale-100"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="pixel-grid" />
      </div>
    </div>
  );
}
