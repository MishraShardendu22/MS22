import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  CDN_PROFESSIONAL_AVIF,
  CDN_SHARDENDU_QR_AVIF,
  LINK_CATEGORIES,
  SOCIAL_LINKS,
} from "@/constants";

export function LinksPageMobile() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <main className="relative z-10 container mx-auto px-3 py-8 max-w-xl">
        {/* Back Button */}
        <nav aria-label="Back navigation">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 mb-6 px-3 py-2 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-cyan-500/50 rounded-lg transition-all duration-300 text-gray-400 hover:text-cyan-400"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </nav>

        {/* Profile Section */}
        <header className="text-center mb-8 animate-fadeIn">
          {/* Profile image */}
          <div className="relative mb-4 inline-block">
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur opacity-75 animate-pulse" />
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-gray-900 shadow-2xl bg-gray-900">
              <Image
                src={CDN_PROFESSIONAL_AVIF}
                alt="Shardendu Mishra"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          <h1 className="text-2xl font-black text-white mb-2 bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
            Shardendu Mishra
          </h1>
          <p className="text-sm text-gray-400 mb-3 px-2">
            Software Developer & Engineer
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 flex-wrap px-2">
            <span className="px-2.5 py-1 bg-gray-800/50 rounded-full border border-gray-700/50">
              IIIT Dharwad
            </span>
            <span className="px-2.5 py-1 bg-gray-800/50 rounded-full border border-gray-700/50">
              Software Engineer
            </span>
          </div>
        </header>

        {/* Links Section */}
        <section aria-label="Social and project links" className="space-y-6">
          {Object.entries(LINK_CATEGORIES).map(([category, title]) => (
            <div key={category} className="animate-fadeIn">
              <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2 px-1">
                <span className="h-px flex-1 bg-linear-to-r from-transparent via-gray-700 to-transparent" />
                <span className="text-gray-300 text-sm">{title}</span>
                <span className="h-px flex-1 bg-linear-to-r from-transparent via-gray-700 to-transparent" />
              </h2>

              <div className="space-y-2.5">
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
                        <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-xl p-3 hover:border-gray-700/50 transition-all duration-300 group-active:scale-[0.98]">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg bg-linear-to-br ${link.color} text-white shrink-0`}
                            >
                              <link.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                                  {link.name}
                                </h3>
                                <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                              </div>
                              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors truncate">
                                {link.username}
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
        <section className="mt-10 mb-6 animate-fadeIn">
          <div className="text-center">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 justify-center">
              <span className="h-px flex-1 max-w-[80px] bg-linear-to-r from-transparent via-gray-700 to-transparent" />
              <span className="text-gray-300 text-sm">Scan to Connect</span>
              <span className="h-px flex-1 max-w-[80px] bg-linear-to-r from-transparent via-gray-700 to-transparent" />
            </h2>
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-50 animate-pulse" />
              <div className="relative bg-white p-3 rounded-2xl shadow-2xl">
                <Image
                  src={CDN_SHARDENDU_QR_AVIF}
                  alt="QR Code - Gravatar Profile"
                  width={160}
                  height={160}
                  className="w-40 h-40"
                  priority
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              Scan to view my Gravatar profile
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
