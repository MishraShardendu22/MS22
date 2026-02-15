import {
  ArrowLeft,
  BookOpen,
  Code2,
  ExternalLink,
  Github,
  Globe,
  Instagram,
  Linkedin,
  MessageCircle,
  Palette,
  Play,
  Send,
  Trophy,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CDN_PROFESSIONAL_AVIF =
  "https://res.cloudinary.com/dkxw15and/image/upload/v1770811228/image-upload-app/iyeqraabcu6gn77dg48d.avif";
const CDN_SHARDENDU_QR_AVIF =
  "https://res.cloudinary.com/dkxw15and/image/upload/v1770811228/image-upload-app/hzfeaawknkizoejbkzjv.avif";

interface SocialLink {
  url: string;
  name: string;
  color: string;
  username: string;
  description: string;
  icon: React.ReactNode;
  category: "social" | "projects" | "coding";
}

export function LinksPageMobile() {
  const links: SocialLink[] = [
    // Main Portfolio
    {
      name: "Portfolio",
      username: "@MishraShardendu22",
      url: "https://mishrashardendu22.is-a.dev",
      icon: <Globe className="w-5 h-5" />,
      category: "projects",
      color: "from-cyan-500 to-blue-600",
      description: "My complete portfolio showcasing projects and experience",
    },
    // Social Media
    {
      name: "GitHub",
      username: "@MishraShardendu22",
      url: "https://github.com/MishraShardendu22",
      icon: <Github className="w-5 h-5" />,
      category: "social",
      color: "from-gray-700 to-gray-900",
      description: "Open source contributions and personal projects",
    },
    {
      name: "GitHub Alt",
      username: "@ShardenduMishra22",
      url: "https://github.com/ShardenduMishra22",
      icon: <Github className="w-5 h-5" />,
      category: "social",
      color: "from-gray-600 to-gray-800",
      description: "Alternative GitHub account for collaborative work",
    },
    {
      name: "LinkedIn",
      username: "@shardendumishra22",
      url: "https://www.linkedin.com/in/shardendumishra22/",
      icon: <Linkedin className="w-5 h-5" />,
      category: "social",
      color: "from-blue-600 to-blue-800",
      description: "Professional network and career updates",
    },
    {
      name: "Twitter / X",
      username: "@Shardendu_M",
      url: "https://x.com/Shardendu_M",
      icon: <Twitter className="w-5 h-5" />,
      category: "social",
      color: "from-sky-500 to-blue-600",
      description: "Tech tweets and daily coding updates",
    },
    {
      name: "Instagram",
      username: "@mishrashardendu22",
      url: "https://www.instagram.com/mishrashardendu22/",
      icon: <Instagram className="w-5 h-5" />,
      category: "social",
      color: "from-pink-500 via-purple-500 to-orange-500",
      description: "Personal moments and tech journey",
    },
    {
      name: "Reddit",
      username: "u/SouLVaGeTa",
      url: "https://www.reddit.com/user/SouLVaGeTa/",
      icon: <MessageCircle className="w-5 h-5" />,
      category: "social",
      color: "from-orange-500 to-red-600",
      description: "Tech discussions and community engagement",
    },
    {
      name: "Telegram",
      username: "@MishraShardendu22",
      url: "https://t.me/MishraShardendu22",
      icon: <Send className="w-5 h-5" />,
      category: "social",
      color: "from-blue-400 to-blue-600",
      description: "Direct messaging and quick updates",
    },
    {
      name: "Discord",
      username: "shardendumishra_22",
      url: "https://discord.com/users/shardendumishra_22",
      icon: <MessageCircle className="w-5 h-5" />,
      category: "social",
      color: "from-indigo-500 to-purple-600",
      description: "Gaming, tech communities, and collaboration",
    },
    {
      name: "YouTube",
      username: "@Shardendu_Mishra",
      url: "https://www.youtube.com/@Shardendu_Mishra",
      icon: <Play className="w-5 h-5" />,
      category: "social",
      color: "from-red-500 to-red-700",
      description: "Tech tutorials and coding videos",
    },
    {
      name: "Gravatar",
      username: "@personahonestly8a347f9823",
      url: "https://gravatar.com/personahonestly8a347f9823",
      icon: <Globe className="w-5 h-5" />,
      category: "social",
      color: "from-blue-500 to-cyan-600",
      description: "My globally recognized avatar profile",
    },
    // Coding Platforms
    {
      name: "LeetCode",
      username: "@ShardenduMishra22",
      url: "https://leetcode.com/u/ShardenduMishra22/",
      icon: <Trophy className="w-5 h-5" />,
      category: "coding",
      color: "from-yellow-500 to-orange-600",
      description: "Competitive programming and problem solving",
    },
    // Projects
    {
      name: "Tech Blog",
      username: "blogs.mishrashardendu22.is-a.dev",
      url: "https://blogs.mishrashardendu22.is-a.dev",
      icon: <BookOpen className="w-5 h-5" />,
      category: "projects",
      color: "from-green-500 to-emerald-600",
      description: "Technical articles and coding tutorials",
    },
    {
      name: "Treasure Hunt Game",
      username: "treasure-hunt.mishrashardendu22.is-a.dev",
      url: "https://treasure-hunt.mishrashardendu22.is-a.dev",
      icon: <Code2 className="w-5 h-5" />,
      category: "projects",
      color: "from-purple-500 to-indigo-600",
      description: "Interactive treasure hunt web game",
    },
    {
      name: "Pixel Art 8-Bit",
      username: "pixel-art-8-bit.mishrashardendu22.is-a.dev",
      url: "https://pixel-art-8-bit.mishrashardendu22.is-a.dev",
      icon: <Palette className="w-5 h-5" />,
      category: "projects",
      color: "from-rose-500 to-pink-600",
      description: "Retro pixel art creation tool",
    },
  ];

  const categories = {
    projects: "My Projects",
    social: "Connect With Me",
    coding: "Coding Platforms",
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
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
          {Object.entries(categories).map(([category, title]) => (
            <div key={category} className="animate-fadeIn">
              <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2 px-1">
                <span className="h-px flex-1 bg-linear-to-r from-transparent via-gray-700 to-transparent" />
                <span className="text-gray-300 text-sm">{title}</span>
                <span className="h-px flex-1 bg-linear-to-r from-transparent via-gray-700 to-transparent" />
              </h2>

              <div className="space-y-2.5">
                {links
                  .filter((link) => link.category === category)
                  .map((link, index) => (
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
                              {link.icon}
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
                  ))}
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

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-gray-500">
          <p className="mb-1.5">
            © 2025 Shardendu Mishra. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-600">
            Built with Next.js & Tailwind CSS
          </p>
        </footer>
      </main>
    </div>
  );
}
