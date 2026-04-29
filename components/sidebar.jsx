"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  PenBox, 
  GraduationCap, 
  TargetIcon, 
  Code, 
  Cpu 
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Build Resume", href: "/resume", icon: FileText },
  { name: "Cover Letter", href: "/ai-cover-letter", icon: PenBox },
  { name: "Interview Prep", href: "/interview", icon: GraduationCap },
  { name: "Explore Roadmaps", href: "/roadmaps", icon: TargetIcon },
  { name: "Code Reviews", href: "/code-review", icon: Code },
  { name: "HireMind Bot", href: "/HireMind", icon: Cpu },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full w-64 glass-card border-r border-white/5 flex flex-col p-4 space-y-2 hidden md:flex sticky top-20">
      <div className="mb-6 px-3">
        <h2 className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">
          Growth Tools
        </h2>
      </div>
      <nav className="flex-1 space-y-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden group",
                isActive 
                  ? "text-white bg-white/10" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-r-md"></div>
              )}
              <link.icon className={cn("h-5 w-5", isActive ? "text-cyan-400" : "group-hover:text-cyan-400 transition-colors")} />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
