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
  { name: "Projects", href: "projects", icon: FolderGit2 },
  { name: "Experience", href: "experiences", icon: Briefcase },
  { name: "Volunteer", href: "volunteer", icon: Heart },
  { name: "Certifications", href: "certificates", icon: Award },
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
      <aside className="fixed left-0 top-0 h-screen w-16 bg-gray-950/98 backdrop-blur-sm border-r border-gray-800/50 z-50">
        {/* Header */}
        <div className="h-20 flex items-center justify-center border-b border-gray-800/50">
          <p className="text-sm font-bold text-white">SM</p>
        </div>

        {/* Navigation */}
        <nav className="py-6 px-2 space-y-1 overflow-y-auto sidebar-scroll max-h-[calc(100vh-5rem)]">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="nav-tooltip group relative flex items-center justify-center p-3 rounded-xl text-gray-400 hover:bg-gray-800/50 hover:text-cyan-400 transition-all duration-200"
                data-tooltip={item.name}
              >
                <Icon className="w-5 h-5 shrink-0" />
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Spacer */}
      <div className="w-16" />
    </>
  );
}
