"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Map } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/generations", label: "Generations" },
  { href: "/pipeline", label: "Pipeline" },
  { href: "/techniques", label: "Techniques" },
  { href: "/math", label: "Math" },
  { href: "/glossary", label: "Glossary" },
  { href: "/tinyml", label: "TinyML" },
  { href: "/llm", label: "LLM & AI" },
  { href: "/evaluation", label: "Evaluation" },
  { href: "/mlops", label: "MLOps" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-atlas-border/40 bg-atlas-bg/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-colors">
            <Map className="h-5 w-5 text-cyan-400" />
          </div>
          <span className="font-semibold text-white">
            AI<span className="text-cyan-400">/</span>ML Atlas
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-2.5 py-2 text-sm transition-colors",
                pathname === link.href
                  ? "bg-cyan-500/10 text-cyan-300"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="lg:hidden rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-atlas-border/40 bg-atlas-bg/95 px-4 py-4">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm",
                  pathname === link.href
                    ? "bg-cyan-500/10 text-cyan-300"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
