import type { GlossaryEntry } from "@/types";

interface GlossaryCardProps {
  entry: GlossaryEntry;
}

export function GlossaryCard({ entry }: GlossaryCardProps) {
  return (
    <article className="glass-card p-5 transition hover:border-violet-500/30">
      <div className="flex flex-wrap items-baseline gap-2">
        <h3 className="text-lg font-bold text-white">{entry.term}</h3>
        {entry.fullName && (
          <span className="text-sm text-slate-500">({entry.fullName})</span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{entry.simpleExplanation}</p>
      <p className="mt-3 text-sm">
        <span className="font-medium text-cyan-400/80">Where it fits: </span>
        <span className="text-slate-400">{entry.whereItFits}</span>
      </p>
      <p className="mt-2 text-xs text-slate-500">
        Related: {entry.relatedConcepts.join(" · ")}
      </p>
    </article>
  );
}
