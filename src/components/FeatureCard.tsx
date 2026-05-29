import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent?: "cyan" | "violet" | "emerald" | "amber";
}

const accents = {
  cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
  violet: "from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-400",
  emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400",
  amber: "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400",
};

export function FeatureCard({
  title,
  description,
  href,
  icon: Icon,
  accent = "cyan",
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group glass-card block p-5 transition-all hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5 md:p-6"
    >
      <div
        className={cn(
          "mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-gradient-to-br",
          accents[accent]
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="flex items-center gap-2 text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
        {title}
        <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
    </Link>
  );
}
