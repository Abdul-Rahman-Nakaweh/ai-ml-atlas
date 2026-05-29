import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PageIntroProps {
  title: string;
  what: string;
  why: string;
  next?: { label: string; href: string }[];
}

export function PageIntro({ title, what, why, next }: PageIntroProps) {
  return (
    <div className="mb-10 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400/80">
        You are here
      </p>
      <h2 className="mt-2 text-xl font-bold text-white md:text-2xl">{title}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">What this covers</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">{what}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Why it matters</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">{why}</p>
        </div>
      </div>
      {next && next.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3 border-t border-atlas-border/40 pt-5">
          <span className="text-xs text-slate-500">Explore next:</span>
          {next.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300"
            >
              {n.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
