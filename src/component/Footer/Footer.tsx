import { Code2, Coffee, Heart } from "lucide-react";
import Image from "next/image";
import { ContactFormWrapper } from "@/component/Contact/ContactFormWrapper";
import {
  CodingProfiles,
  images,
  MyWebsites,
  QuickLinks,
  SocialMedia,
} from "@/static/info/footer";
import { ScrollToTop } from "./ScrollToTop";

export function FooterSectionMobile() {
  return (
    <footer className="bg-gray-950 pt-12 pb-6 px-4">
      <div className="container mx-auto max-w-400">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center border border-gray-800">
              <Code2 className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold">
              <span className="text-white">Shardendu</span>{" "}
              <span className="text-white">Sankritya</span>{" "}
              <span className="text-cyan-400">Mishra</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Software Engineer building innovative solutions.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Let's Talk</h3>
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <ContactFormWrapper variant="compact" includeSubject={false} />
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold text-gray-100 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {Object.entries(QuickLinks).map(([key, data]) => {
                const IconComponent = data.icon;
                return (
                  <li key={key}>
                    <a
                      href={data.url}
                      className="flex items-center gap-2 text-xs text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      <IconComponent className="w-3 h-3" />
                      <span>{key}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-base font-bold text-gray-100 mb-3">Social</h3>
            <ul className="space-y-2">
              {Object.entries(SocialMedia).map(([key, data]) => {
                const IconComponent = data.icon;
                return (
                  <li key={key}>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      <IconComponent className="w-3 h-3" />
                      <span>{key}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Copyright and Back to Top */}
        <div className="pt-4 flex items-center justify-between">
          <p className="text-xs text-gray-600">© 2025 Shardendu Mishra</p>
          <ScrollToTop variant="mobile" />
        </div>
      </div>
    </footer>
  );
}

export function FooterSection() {
  return (
    <footer className="relative bg-linear-to-b from-transparent via-gray-950/50 to-transparent pt-12 sm:pt-16 md:pt-32 lg:pt-40 pb-0 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]" />
      </div>

      <div className="container mx-auto max-w-400 relative z-10">
        {/* Top Section: Brand + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-24 mb-12 sm:mb-16 md:mb-24 lg:mb-32">
          {/* Left: Brand Info */}
          <div className="space-y-5 sm:space-y-6 md:space-y-10 lg:space-y-12">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                  <span className="text-white">Shardendu</span>{" "}
                  <span className="text-white">Sankritya</span>{" "}
                  <span className="text-cyan-400">Mishra</span>
                </h2>
              </div>
              <p className="text-gray-400 text-sm sm:text-base md:text-xl lg:text-2xl leading-relaxed max-w-xl">
                Software Engineer engineering innovative and absolutely awesome
                solutions and giving amazing user experiences.
              </p>
            </div>

            {/* Made with */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-lg lg:text-xl text-gray-400">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 text-red-500" />
              <span>and</span>
              <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 text-cyan-400" />
              <span>by Shardendu Sankritya Mishra</span>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-4 lg:gap-5">
              <span className="px-2.5 sm:px-3 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 lg:py-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-xs sm:text-sm md:text-lg lg:text-xl text-cyan-400 font-semibold">
                Go
              </span>
              <span className="px-2.5 sm:px-3 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 lg:py-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs sm:text-sm md:text-lg lg:text-xl text-blue-400 font-semibold">
                Next.js
              </span>
              <span className="px-2.5 sm:px-3 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 lg:py-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs sm:text-sm md:text-lg lg:text-xl text-purple-400 font-semibold">
                React
              </span>
              <span className="px-2.5 sm:px-3 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 lg:py-4 bg-green-500/10 border border-green-500/30 rounded-lg text-xs sm:text-sm md:text-lg lg:text-xl text-green-400 font-semibold">
                TypeScript
              </span>
              <span className="px-2.5 sm:px-3 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 lg:py-4 bg-pink-500/10 border border-pink-500/30 rounded-lg text-xs sm:text-sm md:text-lg lg:text-xl text-pink-400 font-semibold">
                Tailwind
              </span>
            </div>

            {/* Copyright */}
            <p className="text-xs md:text-base lg:text-lg text-gray-600">
              © 2025 Shardendu Sankritya Mishra. All rights reserved.
            </p>

            {/* Made in GO and Fedora + Back to Top */}
            <div className="flex items-center gap-4 md:gap-6 flex-wrap">
              {/* Made in GO and Fedora */}
              <div className="flex items-center gap-3 md:gap-4 text-base md:text-lg lg:text-xl text-gray-400">
                <span>Made</span>
                <div className="relative w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14">
                  <Image
                    src={images.go.loc}
                    alt={images.go.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 32px, (max-width: 1024px) 48px, 56px"
                  />
                </div>
                <span>in mind and</span>
                <div className="relative w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14">
                  <Image
                    src={images.fedora.loc}
                    alt={images.fedora.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 32px, (max-width: 1024px) 48px, 56px"
                  />
                </div>
                <span>in Machine.</span>
              </div>

              <ScrollToTop variant="desktop" />
            </div>
          </div>

          <div>
            <div className="mb-6 md:mb-8 lg:mb-10">
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2 md:mb-4">
                Let's Talk
              </h3>
              <p className="text-gray-400 text-sm md:text-lg lg:text-xl">
                Get in touch with me
              </p>
            </div>

            <div className="bg-linear-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm p-6 md:p-10 lg:p-12 rounded-2xl border border-gray-800 shadow-2xl">
              <ContactFormWrapper variant="default" includeSubject={false} />
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent mb-16 md:mb-24 lg:mb-32" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 lg:gap-20 mb-16 md:mb-24 lg:mb-32">
          <div>
            <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-100 mb-5 md:mb-8">
              Quick Links
            </h3>
            <ul className="space-y-4 md:space-y-6">
              {Object.entries(QuickLinks).map(([key, data]) => {
                const IconComponent = data.icon;
                return (
                  <li key={key}>
                    <a
                      href={data.url}
                      className="flex items-center gap-2 md:gap-3 text-sm md:text-lg lg:text-xl text-gray-400 hover:text-cyan-400 transition-colors duration-500 group"
                    >
                      <IconComponent className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                      <span>{key}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-100 mb-5 md:mb-8">
              My Websites
            </h3>
            <ul className="space-y-4 md:space-y-6">
              {Object.entries(MyWebsites).map(([websiteKey, data]) => {
                const IconComponent = data.icon;
                return (
                  <li key={websiteKey}>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 md:gap-3 text-sm md:text-lg lg:text-xl text-gray-400 hover:text-cyan-400 transition-colors duration-500 group"
                    >
                      <IconComponent className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                      <span>{data.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-100 mb-5 md:mb-8">
              Social Media
            </h3>
            <ul className="space-y-4 md:space-y-6">
              {Object.entries(SocialMedia).map(([key, data]) => {
                const IconComponent = data.icon;
                return (
                  <li key={key}>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 md:gap-3 text-sm md:text-lg lg:text-xl text-gray-400 hover:text-cyan-400 transition-colors duration-500 group"
                    >
                      <IconComponent className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                      <span>{key}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-100 mb-5 md:mb-8">
              Coding
            </h3>
            <ul className="space-y-4 md:space-y-6">
              {Object.entries(CodingProfiles).map(([key, data]) => {
                const IconComponent = data.icon;
                return (
                  <li key={key}>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 md:gap-3 text-sm md:text-lg lg:text-xl text-gray-400 hover:text-cyan-400 transition-colors duration-500 group"
                    >
                      <IconComponent className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                      <span>{key}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="text-center py-8 md:py-12 lg:py-16">
          <h2 className="font-black text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[14rem] 2xl:text-[18rem] tracking-wider leading-none">
            <span
              className="text-[#004D98]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
              }}
            >
              VISCA EL{" "}
            </span>
            <span
              className="text-[#A50044]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
              }}
            >
              BARÇA
            </span>
          </h2>
        </div>
      </div>
    </footer>
  );
}
