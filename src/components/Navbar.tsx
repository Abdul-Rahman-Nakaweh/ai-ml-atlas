"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Map, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Start",
    links: [
      { href: "/", label: "Home" },
      { href: "/start-here", label: "Start Here" },
      { href: "/how-to-use", label: "How to Use" },
    ],
  },
  {
    label: "Learn",
    links: [
      { href: "/paths", label: "Paths" },
      { href: "/generations", label: "Generations" },
      { href: "/pipeline", label: "Pipeline" },
    ],
  },
  {
    label: "Explore",
    links: [
      { href: "/techniques", label: "Techniques" },
      { href: "/glossary", label: "Glossary" },
      { href: "/math", label: "Math" },
    ],
  },
  {
    label: "Apply",
    links: [
      { href: "/evaluation", label: "Evaluation" },
      { href: "/tinyml", label: "TinyML" },
      { href: "/llm", label: "LLMs" },
      { href: "/mlops", label: "MLOps" },
    ],
  },
  {
    label: "Decide",
    links: [
      { href: "/guides", label: "Guides" },
      { href: "/mistakes", label: "Mistakes" },
      { href: "/comparisons", label: "Compare" },
    ],
  },
];

const allLinks = navGroups.flatMap((g) => g.links);

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-atlas-border/40 bg-atlas-bg/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 transition-colors group-hover:border-cyan-400/50">
            <Map className="h-5 w-5 text-cyan-400" />
          </div>
          <span className="hidden font-semibold text-white sm:inline">
            AI<span className="text-cyan-400">/</span>ML Atlas
          </span>
        </Link>

        <div className="hidden xl:flex items-center gap-0.5">
          {navGroups.map((group) => (
            <div key={group.label} className="relative group/nav">
              <span className="cursor-default rounded-lg px-2 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {group.label}
              </span>
              <div className="invisible absolute left-0 top-full z-50 min-w-[160px] pt-1 opacity-0 transition group-hover/nav:visible group-hover/nav:opacity-100">
                <div className="rounded-xl border border-atlas-border/60 bg-atlas-bg/95 py-1 shadow-xl">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "block px-3 py-2 text-sm",
                        isActive(pathname, link.href)
                          ? "bg-cyan-500/10 text-cyan-300"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex xl:hidden items-center gap-1 overflow-x-auto">
          {allLinks.slice(0, 8).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-lg px-2 py-1.5 text-xs",
                isActive(pathname, link.href)
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
          className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-atlas-border/40 bg-atlas-bg/98 px-4 py-4 xl:hidden max-h-[70vh] overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-2">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
                onClick={() =>
                  setExpandedGroup(expandedGroup === group.label ? null : group.label)
                }
              >
                {group.label}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition",
                    expandedGroup === group.label && "rotate-180"
                  )}
                />
              </button>
              {(expandedGroup === group.label || expandedGroup === null) && (
                <div className="ml-2 flex flex-col gap-0.5">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm",
                        isActive(pathname, link.href)
                          ? "bg-cyan-500/10 text-cyan-300"
                          : "text-slate-400 hover:bg-white/5"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
