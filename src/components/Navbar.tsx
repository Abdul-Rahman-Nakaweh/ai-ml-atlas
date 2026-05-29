"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Map } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/library", label: "Library" },
  { href: "/guides", label: "Guides" },
  { href: "/glossary", label: "Glossary" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-atlas-border/40 bg-atlas-bg/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-500/15 to-violet-500/15">
            <Map className="h-5 w-5 text-cyan-400" />
          </div>
          <span className="font-semibold text-white">
            AI<span className="text-cyan-400">/</span>ML Atlas
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition",
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                  ? "bg-cyan-500/10 text-cyan-300"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-slate-400"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-atlas-border/40 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium",
                pathname === link.href ? "bg-cyan-500/10 text-cyan-300" : "text-slate-400"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
