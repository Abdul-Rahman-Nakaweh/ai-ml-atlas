import { cn } from "@/lib/utils";

const variants = {
  default: "bg-slate-700/60 text-slate-200 border-slate-600/50",
  gen1: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  gen2: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  gen3: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  cross: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  accent: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  pipeline: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
} as const;

type BadgeVariant = keyof typeof variants;

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function generationVariant(gen: string): BadgeVariant {
  if (gen === "Gen 1") return "gen1";
  if (gen === "Gen 2") return "gen2";
  if (gen === "Gen 3") return "gen3";
  return "cross";
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
