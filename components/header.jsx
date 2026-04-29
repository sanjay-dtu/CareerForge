"use client";

import React from "react";
import { Button } from "./ui/button";

import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
  Target,
  TargetIcon,
  Code,
  Robot,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
export default function HeaderClient() {

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[80%] max-w-6xl border border-white/10 bg-black/40 backdrop-blur-xl z-50 rounded-full shadow-2xl">
      <nav className="px-6 h-14 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold tracking-tighter">
              Career<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Forge</span>
            </span>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* <ThemeToggle /> */}
          <SignedIn>
            <Link href="/dashboard">
              <Button
                className="hidden md:inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border-none glass"
              >
                <LayoutDashboard className="h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link>

            {/* Mobile Growth Tools Dropdown could go here if needed, but for now we rely on the layout or a mobile menu. */}
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
