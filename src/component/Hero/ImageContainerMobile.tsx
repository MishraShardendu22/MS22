import Image from "next/image";

/**
 * Mobile-optimized image container with no animations
 * Renders a simple static image with proper sizing
 */
export const ImageContainerMobile = () => {
  return (
    <div className="lg:col-span-5 relative order-1 lg:order-2 mb-8 lg:mb-0">
      <div className="relative w-full aspect-3/4 max-w-[280px] sm:max-w-[320px] rounded-2xl overflow-hidden mx-auto shadow-2xl">
        <Image
          src="/icon.avif"
          alt="Shardendu Mishra"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};
