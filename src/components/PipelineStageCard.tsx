import Link from "next/link";
import type { PipelineStageData } from "@/types";

interface PipelineStageCardProps {
  stage: PipelineStageData;
}

export function PipelineStageCard({ stage }: PipelineStageCardProps) {
  return (
    <article
      id={stage.id}
      className="glass-card relative scroll-mt-24 p-5 md:p-6"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-sm font-bold text-cyan-400">
          {stage.order}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-white">{stage.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{stage.description}</p>
          <p className="mt-3 text-sm">
            <span className="font-medium text-violet-400/90">Why it matters: </span>
            <span className="text-slate-300">{stage.whyItMatters}</span>
          </p>

          {(stage.comesBefore || stage.comesAfter) && (
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
              {stage.comesBefore && (
                <span>
                  <span className="text-slate-400">Before: </span>
                  {stage.comesBefore}
                </span>
              )}
              {stage.comesAfter && (
                <span>
                  <span className="text-slate-400">After: </span>
                  {stage.comesAfter}
                </span>
              )}
            </div>
          )}

          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Techniques in this stage
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {stage.techniqueIds?.map((tid) => (
                <Link
                  key={tid}
                  href={`/techniques#${tid}`}
                  className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-300/90 hover:bg-cyan-500/20"
                >
                  {tid.replace(/-/g, " ")}
                </Link>
              ))}
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

          <p className="mt-3 text-xs text-slate-500">
            Related: {stage.relatedConcepts.join(" · ")}
          </p>
        </div>
      </div>
    </article>
  );
}
