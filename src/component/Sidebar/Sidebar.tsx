import {
  Award,
  Briefcase,
  Clock,
  Code2,
  FileText,
  FolderGit2,
  GraduationCap,
  Heart,
  Home,
  Link as LinkIcon,
  Mail,
} from "lucide-react";
import Link from "next/link";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Timeline", href: "#timeline", icon: Clock },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Experience", href: "/experiences", icon: Briefcase },
  { name: "Volunteer", href: "/volunteer", icon: Heart },
  { name: "Certifications", href: "/certificates", icon: Award },
  { name: "My Socials", href: "/links", icon: LinkIcon },
  { name: "Contact", href: "#contact", icon: Mail },
  {
    name: "Blog",
    href: "https://blogs.mishrashardendu22.is-a.dev/read",
    icon: FileText,
  },
];

export function Sidebar() {
  return (
    <>
      <nav
        className="fixed left-0 top-0 h-screen w-16 bg-background border-r border-border z-50"
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-center border-b border-border">
          <span
            className="text-sm font-bold text-white"
            title="Shardendu Mishra"
          >
            SM
          </span>
        </div>

        {/* Navigation */}
        <div className="py-6 px-2 space-y-1 overflow-y-auto sidebar-scroll max-h-[calc(100vh-5rem)]">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="nav-tooltip group relative flex items-center justify-center p-3 rounded-xl text-gray-400 hover:bg-surface-elevated hover:text-cyan-400 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                data-tooltip={item.name}
                aria-label={item.name}
              >
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer */}
      <div className="w-16" aria-hidden="true" />
    </>
  );
}
