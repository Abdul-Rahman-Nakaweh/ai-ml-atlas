import type { PipelineStageData } from "@/types";

interface PipelineStageCardProps {
  stage: PipelineStageData;
}

export function PipelineStageCard({ stage }: PipelineStageCardProps) {
  return (
    <article className="glass-card relative p-5 md:p-6">
      <div className="absolute -left-3 top-6 hidden h-6 w-6 items-center justify-center rounded-full border-2 border-cyan-500/50 bg-atlas-bg text-xs font-bold text-cyan-400 md:flex">
        {stage.order}
      </div>
      <div className="flex items-start gap-3 md:pl-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-sm font-bold text-cyan-400 md:hidden">
          {stage.order}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-white">{stage.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{stage.description}</p>
          <p className="mt-3 text-sm">
            <span className="font-medium text-violet-400/90">Why it matters: </span>
            <span className="text-slate-300">{stage.whyItMatters}</span>
          </p>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Techniques
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {stage.techniques.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-300/90"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-500/80">
              Common mistakes
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-400">
              {stage.commonMistakes.map((m) => (
                <li key={m}>• {m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
