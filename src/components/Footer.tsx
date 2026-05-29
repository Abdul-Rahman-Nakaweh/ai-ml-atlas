import Link from "next/link";
import { PageContainer } from "./PageContainer";

const footerGroups = [
  {
    title: "Start",
    links: [
      { href: "/start-here", label: "Start Here" },
      { href: "/how-to-use", label: "How to Use" },
      { href: "/paths", label: "Learning Paths" },
    ],
  },
  {
    title: "Learn & Explore",
    links: [
      { href: "/pipeline", label: "ML Pipeline" },
      { href: "/generations", label: "Generations" },
      { href: "/techniques", label: "Techniques" },
      { href: "/glossary", label: "Glossary" },
    ],
  },
  {
    title: "Decide",
    links: [
      { href: "/guides", label: "Decision Guides" },
      { href: "/mistakes", label: "Common Mistakes" },
      { href: "/comparisons", label: "Comparisons" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-atlas-border/40 bg-atlas-surface/30">
      <PageContainer className="py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="font-semibold text-white">AI/ML Atlas</p>
            <p className="mt-2 text-sm text-slate-500">
              A guided learning map—not a flat glossary.
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {group.title}
              </p>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-slate-600">
          Static data in <code className="text-slate-500">src/data/</code> — expand paths, techniques, and guides over time.
        </p>
      </PageContainer>
    </footer>
  );
}
