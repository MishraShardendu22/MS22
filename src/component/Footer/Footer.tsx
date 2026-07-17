import {
  ArrowUpRight,
  Award,
  BookOpen,
  Camera,
  Code,
  Code2,
  Coffee,
  Heart,
  Home,
  Mail,
  Play,
  Share2,
  Users,
} from "lucide-react";
import { ContactFormWrapper } from "@/component/Contact/ContactFormWrapper";
import { ScrollToTop } from "./ScrollToTop";

export const SOCIAL_LINKS = [
  { name: "Twitter", url: "https://x.com/Shardendu_M", icon: Share2 },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shardendumishra22",
    icon: Users,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@Shardendu_Mishra",
    icon: Play,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/mishrashardendu22",
    icon: Camera,
  },
];

export const ECOSYSTEM_LINKS = [
  {
    name: "Portfolio Home",
    url: "https://mishrashardendu22.is-a.dev",
    icon: Home,
  },
  {
    name: "Tech Blog",
    url: "https://blogs.mishrashardendu22.is-a.dev",
    icon: BookOpen,
  },
  {
    name: "Systems Lab",
    url: "https://github.mishrashardendu22.is-a.dev",
    icon: Code,
  },
];

export const QUICK_LINKS = [
  {
    name: "GitHub Profile",
    url: "https://github.com/MishraShardendu22",
    icon: Code2,
  },
  {
    name: "View Resume",
    url: "https://drive.google.com/drive/folders/1s48wtD34inP2tK5FxQjaj2OtBpFAi7l8?usp=sharing",
    icon: Award,
  },
  { name: "Contact Me", url: "#contact", icon: Mail },
];

export function FooterSectionMobile() {
  return (
    <footer className="relative overflow-hidden bg-zinc-950 px-4 pb-8 pt-14 border-t border-zinc-900">
      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Brand Card */}
        <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-heading">
                Shardendu Mishra
              </h2>
              <p className="text-[10px] uppercase tracking-[0.3em] text-violet-400">
                Software Engineer
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
            Software Engineer engineering modern, high-impact systems.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em]">
            <span className="rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-zinc-300">
              Go
            </span>
            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-violet-300">
              Next.js
            </span>
            <span className="rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-zinc-300">
              AI/ML
            </span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-lg font-bold text-white mb-4 font-heading">
            Let's Talk
          </h3>
          <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-900">
            <ContactFormWrapper variant="compact" includeSubject={false} />
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-violet-400 font-semibold mb-3">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              Ecosystem Products
            </div>
            <ul className="space-y-2">
              {ECOSYSTEM_LINKS.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="group flex items-center justify-between rounded-lg border border-transparent bg-zinc-900/60 px-3 py-2 text-xs text-zinc-300 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300"
                    >
                      <span className="flex items-center gap-2">
                        <IconComponent className="w-3.5 h-3.5 text-zinc-500 group-hover:text-violet-400" />
                        <span>{link.name}</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-violet-400" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-violet-400 font-semibold mb-3">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              Quick Links
            </div>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="group flex items-center justify-between rounded-lg border border-transparent bg-zinc-900/60 px-3 py-2 text-xs text-zinc-300 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300"
                    >
                      <span className="flex items-center gap-2">
                        <IconComponent className="w-3.5 h-3.5 text-zinc-500 group-hover:text-violet-400" />
                        <span>{link.name}</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-violet-400" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 sm:col-span-2">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-violet-400 font-semibold mb-3">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              Social
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {SOCIAL_LINKS.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg border border-transparent bg-zinc-900/60 px-3 py-2 text-xs text-zinc-300 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300"
                    >
                      <span className="flex items-center gap-2">
                        <IconComponent className="w-3.5 h-3.5 text-zinc-500 group-hover:text-violet-400" />
                        <span>{link.name}</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-violet-400" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-4 text-xs text-zinc-500">
          <p>Shardendu Mishra</p>
          <ScrollToTop variant="mobile" />
        </div>
      </div>
    </footer>
  );
}

export function FooterSection() {
  return (
    <footer className="relative bg-zinc-950 pt-16 pb-8 px-6 md:px-8 border-t border-zinc-900 overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-16">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-white font-heading">
                  Shardendu Mishra
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 font-mono">
                  Ecosystem
                </span>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                Software Engineer engineering modern, high-impact systems.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>and</span>
              <Coffee className="w-4 h-4 text-violet-400" />
              <span>by Shardendu Mishra</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 font-semibold">
                Go
              </span>
              <span className="px-4 py-2 bg-violet-500/10 border border-violet-500/25 rounded-lg text-xs text-violet-400 font-semibold">
                Next.js
              </span>
              <span className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 font-semibold">
                Kubernetes
              </span>
              <span className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 font-semibold">
                AI/ML
              </span>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                Let's Talk
              </h3>
              <p className="text-zinc-400 text-sm">Get in touch with me</p>
            </div>

            <div className="bg-zinc-900/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-zinc-850 shadow-2xl">
              <ContactFormWrapper variant="default" includeSubject={false} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-zinc-900">
          <div>
            <h3 className="text-sm font-semibold text-zinc-200 mb-4 uppercase tracking-wider">
              Ecosystem Products
            </h3>
            <ul className="space-y-3">
              {ECOSYSTEM_LINKS.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="flex items-center gap-2.5 text-zinc-400 hover:text-violet-400 transition-colors duration-200 text-sm"
                    >
                      <IconComponent className="w-4 h-4 text-zinc-500" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-200 mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="flex items-center gap-2.5 text-zinc-400 hover:text-violet-400 transition-colors duration-200 text-sm"
                    >
                      <IconComponent className="w-4 h-4 text-zinc-500" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-200 mb-4 uppercase tracking-wider">
              Social Media
            </h3>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-zinc-400 hover:text-violet-400 transition-colors duration-200 text-sm"
                    >
                      <IconComponent className="w-4 h-4 text-zinc-500" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>&copy; 2026 Shardendu Mishra. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono tracking-wider">VISCA EL BARÇA</span>
            <ScrollToTop variant="desktop" />
          </div>
        </div>
      </div>
    </footer>
  );
}
