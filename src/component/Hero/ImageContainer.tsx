import Image from "next/image";

export const ImageContainer = () => {
  return (
    <div className="lg:col-span-5 relative order-1 lg:order-2 mb-8 lg:mb-0">
      <div className="glow-effect" />

      <div className="image-container group relative w-full aspect-3/4 max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] rounded-2xl overflow-hidden cursor-pointer mx-auto shadow-2xl">
        <Image
          src="/images-avif/icon.avif"
          alt="Shardendu Mishra - Software Developer and Engineer portrait"
          fill
          className="object-cover transition-all duration-300 group-hover:opacity-0 group-hover:scale-98"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <Image
          src="/images-avif/professional.avif"
          alt="Shardendu Mishra - Professional Software Developer photo"
          fill
          className="object-cover opacity-0 scale-98 transition-all duration-300 delay-150 group-hover:opacity-100 group-hover:scale-100"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="pixel-grid" />
      </div>
    </div>
  );
};
