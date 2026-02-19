import Image from "next/image";

const CDN_ICON_AVIF =
  "https://res.cloudinary.com/dkxw15and/image/upload/v1770811228/image-upload-app/pimoqdnzgxttynbims86.avif";
const CDN_PROFESSIONAL_AVIF =
  "https://res.cloudinary.com/dkxw15and/image/upload/v1770811228/image-upload-app/iyeqraabcu6gn77dg48d.avif";

export const ImageContainer = () => {
  return (
    <div
      className="lg:col-span-5 relative order-1 lg:order-2 mb-8 lg:mb-0"
      style={{ perspective: "1000px" }}
    >
      <div className="glow-effect" />

      <div className="image-container group relative w-full aspect-3/4 max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] rounded-2xl overflow-hidden cursor-pointer mx-auto shadow-2xl transition-all duration-500 ">
        <Image
          src={CDN_ICON_AVIF}
          alt="Shardendu Mishra - Software Developer and Engineer portrait"
          fill
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <Image
          src={CDN_PROFESSIONAL_AVIF}
          alt="Shardendu Mishra - Professional Software Developer photo"
          fill
          className="object-cover opacity-0 transition-opacity duration-500 delay-150 group-hover:opacity-100"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="shimmer-effect" />
        <div className="pixel-grid" />
      </div>
    </div>
  );
};
