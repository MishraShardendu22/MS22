import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  CDN_PROFESSIONAL_AVIF,
  CDN_SHARDENDU_QR_AVIF,
  LINK_CATEGORIES,
  SOCIAL_LINKS,
} from "@/constants";

export function LinksPageDesktop() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <main className="relative z-10 container mx-auto px-4 lg:px-6 py-12 max-w-3xl">
        {/* Back Button */}
        <nav aria-label="Back navigation">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 mb-8 px-4 py-2 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-cyan-500/50 rounded-lg transition-all duration-300 text-gray-400 hover:text-cyan-400"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </nav>

        {/* Profile Section */}
        <header className="text-center mb-12 animate-fadeIn">
          {/* Profile image */}
          <div className="relative mb-6 inline-block">
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur opacity-75 animate-pulse" />
            <div className="relative w-32 h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-gray-900 shadow-2xl bg-gray-900">
              <Image
                src={CDN_PROFESSIONAL_AVIF}
                alt="Shardendu Mishra"
                width={144}
                height={144}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-white mb-3 bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
            Shardendu Mishra
          </h1>
          <p className="text-lg text-gray-400 mb-4 max-w-md mx-auto">
            Software Developer & Engineer | Building with Go, React, Next.js
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="px-3 py-1 bg-gray-800/50 rounded-full border border-gray-700/50">
              IIIT Dharwad
            </span>
            <span className="px-3 py-1 bg-gray-800/50 rounded-full border border-gray-700/50">
              Software Engineer
            </span>
          </div>
        </header>

        {/* Links Section */}
        <section aria-label="Social and project links" className="space-y-8">
          {Object.entries(LINK_CATEGORIES).map(([category, title]) => (
            <div key={category} className="animate-fadeIn">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="h-px flex-1 bg-linear-to-r from-transparent via-gray-700 to-transparent" />
                <span className="text-gray-300">{title}</span>
                <span className="h-px flex-1 bg-linear-to-r from-transparent via-gray-700 to-transparent" />
              </h2>

              <div className="space-y-3">
                {SOCIAL_LINKS.filter((link) => link.category === category).map(
                  (link, index) => (
                    <a
                      key={`${link.url}-${link.name}-${index}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <div className="relative">
                        <div
                          className={`absolute -inset-0.5 bg-linear-to-r ${link.color} rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300`}
                        />
                        <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-xl p-5 hover:border-gray-700/50 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-[1.02]">
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-3 rounded-lg bg-linear-to-br ${link.color} text-white shrink-0 group-hover:scale-110 transition-transform duration-300`}
                            >
                              <link.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                                  {link.name}
                                </h3>
                                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                              </div>
                              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors mb-1">
                                {link.username}
                              </p>
                              <p className="text-xs text-gray-500 line-clamp-1">
                                {link.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  ),
                )}
              </div>
            </div>
          ))}
        </section>

        {/* QR Code Section */}
        <section className="mt-12 mb-8 animate-fadeIn">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 justify-center">
              <span className="h-px flex-1 max-w-[100px] bg-linear-to-r from-transparent via-gray-700 to-transparent" />
              <span className="text-gray-300">Scan to Connect</span>
              <span className="h-px flex-1 max-w-[100px] bg-linear-to-r from-transparent via-gray-700 to-transparent" />
            </h2>
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-50 animate-pulse" />
              <div className="relative bg-white p-4 rounded-2xl shadow-2xl">
                <Image
                  src={CDN_SHARDENDU_QR_AVIF}
                  alt="QR Code - Gravatar Profile"
                  width={220}
                  height={220}
                  className="w-56 h-56"
                  priority
                />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Scan to view my Gravatar profile
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
