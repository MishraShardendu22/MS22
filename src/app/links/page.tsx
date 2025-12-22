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
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";

export const dynamic = "force-static";

export const metadata: Metadata = generatePageMetadata({
  title: "All My Links",
  description:
    "Find all my social media profiles, coding platforms, and professional links in one place. Connect with me on GitHub, LinkedIn, Twitter, LeetCode, and more.",
  path: "/links",
  keywords: [
    "social links",
    "contact links",
    "social media",
    "GitHub profile",
    "LinkedIn profile",
    "LeetCode profile",
    "coding profiles",
    "developer links",
  ],
});

interface SocialLink {
  url: string;
  name: string;
  color: string;
  username: string;
  description: string;
  icon: React.ReactNode;
  category: "social" | "projects" | "coding";
}

export default function LinksPage() {
  const links: SocialLink[] = [
    // Main Portfolio
    {
      name: "Portfolio",
      username: "@MishraShardendu22",
      url: "https://mishrashardendu22.is-a.dev",
      icon: <Globe className="w-6 h-6" />,
      category: "projects",
      color: "from-cyan-500 to-blue-600",
      description: "My complete portfolio showcasing projects and experience",
    },
    // Social Media
    {
      name: "GitHub",
      username: "@MishraShardendu22",
      url: "https://github.com/MishraShardendu22",
      icon: <Github className="w-6 h-6" />,
      category: "social",
      color: "from-gray-700 to-gray-900",
      description: "Open source contributions and personal projects",
    },
    {
      name: "GitHub Alt",
      username: "@ShardenduMishra22",
      url: "https://github.com/ShardenduMishra22",
      icon: <Github className="w-6 h-6" />,
      category: "social",
      color: "from-gray-600 to-gray-800",
      description: "Alternative GitHub account for collaborative work",
    },
    {
      name: "LinkedIn",
      username: "@shardendumishra22",
      url: "https://www.linkedin.com/in/shardendumishra22/",
      icon: <Linkedin className="w-6 h-6" />,
      category: "social",
      color: "from-blue-600 to-blue-800",
      description: "Professional network and career updates",
    },
    {
      name: "Twitter / X",
      username: "@Shardendu_M",
      url: "https://x.com/Shardendu_M",
      icon: <Twitter className="w-6 h-6" />,
      category: "social",
      color: "from-sky-500 to-blue-600",
      description: "Tech tweets and daily coding updates",
    },
    {
      name: "Instagram",
      username: "@mishrashardendu22",
      url: "https://www.instagram.com/mishrashardendu22/",
      icon: <Instagram className="w-6 h-6" />,
      category: "social",
      color: "from-pink-500 via-purple-500 to-orange-500",
      description: "Personal moments and tech journey",
    },
    {
      name: "Reddit",
      username: "u/SouLVaGeTa",
      url: "https://www.reddit.com/user/SouLVaGeTa/",
      icon: <MessageCircle className="w-6 h-6" />,
      category: "social",
      color: "from-orange-500 to-red-600",
      description: "Tech discussions and community engagement",
    },
    {
      name: "Telegram",
      username: "@MishraShardendu22",
      url: "https://t.me/MishraShardendu22",
      icon: <Send className="w-6 h-6" />,
      category: "social",
      color: "from-blue-400 to-blue-600",
      description: "Direct messaging and quick updates",
    },
    {
      name: "YouTube",
      username: "@Shardendu_Mishra",
      url: "https://www.youtube.com/@Shardendu_Mishra",
      icon: <Play className="w-6 h-6" />,
      category: "social",
      color: "from-red-500 to-red-700",
      description: "Tech tutorials and coding videos",
    },
    // Coding Platforms
    {
      name: "LeetCode",
      username: "@ShardenduMishra22",
      url: "https://leetcode.com/u/ShardenduMishra22/",
      icon: <Trophy className="w-6 h-6" />,
      category: "coding",
      color: "from-yellow-500 to-orange-600",
      description: "Competitive programming and problem solving",
    },
    // Projects
    {
      name: "Tech Blog",
      username: "blogs.mishrashardendu22.is-a.dev",
      url: "https://blogs.mishrashardendu22.is-a.dev",
      icon: <BookOpen className="w-6 h-6" />,
      category: "projects",
      color: "from-green-500 to-emerald-600",
      description: "Technical articles and coding tutorials",
    },
    {
      name: "Treasure Hunt Game",
      username: "treasure-hunt.mishrashardendu22.is-a.dev",
      url: "https://treasure-hunt.mishrashardendu22.is-a.dev",
      icon: <Code2 className="w-6 h-6" />,
      category: "projects",
      color: "from-purple-500 to-indigo-600",
      description: "Interactive treasure hunt web game",
    },
    {
      name: "Pixel Art 8-Bit",
      username: "pixel-art-8-bit.mishrashardendu22.is-a.dev",
      url: "https://pixel-art-8-bit.mishrashardendu22.is-a.dev",
      icon: <Palette className="w-6 h-6" />,
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-12 max-w-2xl">
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
          {/* Hide profile image on mobile for better performance */}
          <div className="relative mb-6 hidden md:inline-block">
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur opacity-75 animate-pulse" />
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-900 shadow-2xl">
              <Image
                src="/professional.avif"
                alt="Shardendu Mishra"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
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
          {Object.entries(categories).map(([category, title]) => (
            <div key={category} className="animate-fadeIn">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="h-px flex-1 bg-linear-to-r from-transparent via-gray-700 to-transparent" />
                <span className="text-gray-300">{title}</span>
                <span className="h-px flex-1 bg-linear-to-r from-transparent via-gray-700 to-transparent" />
              </h2>

              <div className="space-y-3">
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
                        <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-xl p-4 hover:border-gray-700/50 transition-all duration-300 group-hover:scale-[1.02]">
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-3 rounded-lg bg-linear-to-br ${link.color} text-white shrink-0 group-hover:scale-110 transition-transform duration-300`}
                            >
                              {link.icon}
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
                  ))}
              </div>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p className="mb-2">© 2025 Shardendu Mishra. All rights reserved.</p>
          <p className="text-xs text-gray-600">
            Built with Next.js & Tailwind CSS
          </p>
        </footer>
      </main>
    </div>
  );
}
