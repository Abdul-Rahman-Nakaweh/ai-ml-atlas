import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { LearningPath } from "@/types";
import { cn } from "@/lib/utils";
import { getLearningPath } from "@/data/learningPaths";

const accents = {
  cyan: "border-cyan-500/40 from-cyan-500/10",
  emerald: "border-emerald-500/40 from-emerald-500/10",
  violet: "border-violet-500/40 from-violet-500/10",
  amber: "border-amber-500/40 from-amber-500/10",
};

interface LearningPathCardProps {
  path: LearningPath;
  compact?: boolean;
}

export function LearningPathCard({ path, compact }: LearningPathCardProps) {
  return (
    <article
      className={cn(
        "glass-card border-l-4 bg-gradient-to-br to-transparent p-5 md:p-6",
        accents[path.accent]
      )}
    >
      <div className="flex items-start gap-3">
        <BookOpen className="h-5 w-5 shrink-0 text-cyan-400/80" />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-white">{path.title}</h3>
          <p className="mt-1 text-sm text-cyan-400/70">Goal: {path.goal}</p>
          {!compact && (
            <>
              <p className="mt-3 text-sm text-slate-400">
                <span className="font-medium text-slate-300">For: </span>
                {path.audience}
              </p>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Suggested sequence
                </p>
                <ol className="mt-2 space-y-1">
                  {path.sequence.slice(0, compact ? 4 : 8).map((step, i) => (
                    <li key={step.label} className="flex gap-2 text-sm text-slate-400">
                      <span className="text-slate-600">{i + 1}.</span>
                      {step.techniqueId ? (
                        <Link
                          href={`/techniques?q=${encodeURIComponent(step.label)}`}
                          className="hover:text-cyan-400"
                        >
                          {step.label}
                        </Link>
                      ) : step.href ? (
                        <Link href={step.href} className="hover:text-cyan-400">
                          {step.label}
                        </Link>
                      ) : (
                        step.label
                      )}
                    </li>
                  ))}
                  {path.sequence.length > 8 && !compact && (
                    <li className="text-xs text-slate-600">
                      +{path.sequence.length - 8} more on path page
                    </li>
                  )}
                </ol>
              </div>
              {path.prerequisites.length > 0 && (
                <p className="mt-3 text-xs text-slate-500">
                  Prerequisites: {path.prerequisites.join("; ")}
                </p>
              )}
            </>
          )}
          <Link
            href={`/paths#${path.id}`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300"
          >
            View full path
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function RelatedPaths({ ids }: { ids: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ids.map((id) => {
        const p = getLearningPath(id);
        if (!p) return null;
        return (
          <Link
            key={id}
            href={`/paths#${id}`}
            className="rounded-full border border-atlas-border/60 bg-atlas-surface/50 px-3 py-1 text-xs text-slate-400 hover:border-cyan-500/40 hover:text-cyan-300"
          >
            {p.title}
          </Link>
        );
      })}
    </div>
  );
}
