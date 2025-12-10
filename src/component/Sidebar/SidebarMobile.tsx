// Ultra-lightweight mobile sidebar - minimal JS, no backdrop-blur on overlay
"use client";

import {
  Home,
  Mail,
  Clock,
  Code2,
  Award,
  Heart,
  FileText,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Menu,
  X,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Timeline", href: "#timeline", icon: Clock },
  { name: "Projects", href: "#projects", icon: FolderGit2 },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Volunteer", href: "#volunteer", icon: Heart },
  { name: "Certifications", href: "#certifications", icon: Award },
  { name: "Contact", href: "#contact", icon: Mail },
  { name: "My Socials", href: "/links", icon: LinkIcon },
  { name: "Blog", href: "https://blogs.mishrashardendu22.is-a.dev/read", icon: FileText },
];

export function SidebarMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Simple menu button - no blur */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-gray-900 border border-gray-800 rounded-xl"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-cyan-400" />
        ) : (
          <Menu className="w-5 h-5 text-gray-300" />
        )}
      </button>

      {/* Simple overlay - no blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Simple menu - no blur, no animations */}
      {isOpen && (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-950 border-r border-gray-800 z-45 pt-20 overflow-y-auto">
          <nav className="py-4 px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="px-4 py-4 border-t border-gray-800">
            <p className="text-xs text-pink-400 font-semibold">Shardendu Mishra</p>
          </div>
        </aside>
      )}
    </>
  );
}
