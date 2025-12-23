import { Code2, Coffee, Heart, Zap } from "lucide-react";
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
    <footer className="relative bg-linear-to-b from-transparent via-gray-950/50 to-transparent pt-12 sm:pt-16 md:pt-24 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]" />
      </div>

      <div className="container mx-auto max-w-400 relative z-10">
        {/* Top Section: Brand + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 mb-12 sm:mb-16 md:mb-20">
          {/* Left: Brand Info */}
          <div className="space-y-5 sm:space-y-6 md:space-y-8">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-linear-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center ring-2 ring-cyan-500/30">
                  <Code2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-cyan-400" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                  <span className="text-white">Shardendu</span>{" "}
                  <span className="text-cyan-400">Mishra</span>
                </h2>
              </div>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                Software Engineer engineering innovative and absolutely awesome
                solutions and giving amazing user experiences.
              </p>
            </div>

            {/* Made with */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
              <span>and</span>
              <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span>by Shardendu</span>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">
              <span className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-xs sm:text-sm text-cyan-400 font-semibold">
                Go
              </span>
              <span className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs sm:text-sm text-blue-400 font-semibold">
                Next.js
              </span>
              <span className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs sm:text-sm text-purple-400 font-semibold">
                React
              </span>
              <span className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-xs sm:text-sm text-green-400 font-semibold">
                TypeScript
              </span>
              <span className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-pink-500/10 border border-pink-500/30 rounded-lg text-xs sm:text-sm text-pink-400 font-semibold">
                Tailwind
              </span>
            </div>

            {/* Copyright */}
            <p className="text-xs text-gray-600">
              © 2025 Shardendu Mishra. All rights reserved.
            </p>

            {/* Made in GO and Fedora + Back to Top */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Made in GO and Fedora */}
              <div className="flex items-center gap-3 text-base text-gray-400">
                <span>Made</span>
                <div className="relative w-8 h-8">
                  <Image
                    src={images.go.loc}
                    alt={images.go.alt}
                    fill
                    className="object-contain"
                    sizes="32px"
                  />
                </div>
                <span>in mind and</span>
                <div className="relative w-8 h-8">
                  <Image
                    src={images.fedora.loc}
                    alt={images.fedora.alt}
                    fill
                    className="object-contain"
                    sizes="32px"
                  />
                </div>
                <span>in Machine.</span>
              </div>

              {/* Back to Top */}
              <ScrollToTop variant="desktop" />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                Let's Talk
              </h3>
              <p className="text-gray-400 text-sm">Get in touch with me</p>
            </div>

            <div className="bg-linear-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl">
              <ContactFormWrapper variant="default" includeSubject={false} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent mb-16" />

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-100 mb-5 flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              Quick Links
            </h3>
            <ul className="space-y-4">
              {Object.entries(QuickLinks).map(([key, data]) => {
                const IconComponent = data.icon;
                return (
                  <li key={key}>
                    <a
                      href={data.url}
                      className="flex items-center gap-2 text-sm md:text-base text-gray-400 hover:text-cyan-400 transition-colors duration-500 group"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{key}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* My Websites */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-100 mb-5 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              My Websites
            </h3>
            <ul className="space-y-4">
              {Object.entries(MyWebsites).map(([websiteKey, data]) => {
                const IconComponent = data.icon;
                return (
                  <li key={websiteKey}>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm md:text-base text-gray-400 hover:text-cyan-400 transition-colors duration-500 group"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{data.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-100 mb-5 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
              Social Media
            </h3>
            <ul className="space-y-4">
              {Object.entries(SocialMedia).map(([key, data]) => {
                const IconComponent = data.icon;
                return (
                  <li key={key}>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm md:text-base text-gray-400 hover:text-cyan-400 transition-colors duration-500 group"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{key}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Coding Profiles */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-100 mb-5 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              Coding
            </h3>
            <ul className="space-y-4">
              {Object.entries(CodingProfiles).map(([key, data]) => {
                const IconComponent = data.icon;
                return (
                  <li key={key}>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm md:text-base text-gray-400 hover:text-cyan-400 transition-colors duration-500 group"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{key}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
