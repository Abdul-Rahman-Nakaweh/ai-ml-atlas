import type { GenerationData } from "@/types";
import { Badge, generationVariant } from "./Badge";

interface GenerationCardProps {
  generation: GenerationData;
  index: number;
}

const indexColors = [
  "border-emerald-500/40",
  "border-sky-500/40",
  "border-violet-500/40",
];

export function GenerationCard({ generation, index }: GenerationCardProps) {
  return (
    <article
      className={`glass-card border-l-4 p-6 ${indexColors[index] ?? "border-cyan-500/40"}`}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge variant={generationVariant(generation.shortName)}>{generation.shortName}</Badge>
      </div>
      <h3 className="text-xl font-semibold text-white">{generation.name}</h3>
      <p className="mt-2 text-sm text-slate-400">{generation.description}</p>
      <p className="mt-4 text-sm">
        <span className="font-medium text-cyan-400/90">Core idea: </span>
        <span className="text-slate-300">{generation.coreIdea}</span>
      </p>
      <p className="mt-2 text-sm">
        <span className="font-medium text-slate-400">Common data: </span>
        <span className="text-slate-300">{generation.commonData}</span>
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {generation.examples.slice(0, 6).map((ex) => (
          <span
            key={ex}
            className="rounded-md bg-slate-800/80 px-2 py-0.5 text-xs text-slate-400"
          >
            {ex}
          </span>
        ))}
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400/80">
            Strengths
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-slate-400">
            {generation.strengths.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="text-emerald-500">+</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400/80">
            Limitations
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-slate-400">
            {generation.limitations.map((l) => (
              <li key={l} className="flex gap-2">
                <span className="text-amber-500">−</span> {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
