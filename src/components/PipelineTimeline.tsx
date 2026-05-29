import Link from "next/link";
import type { PipelineStageData } from "@/types";

interface PipelineTimelineProps {
  stages: PipelineStageData[];
  limit?: number;
}

export function PipelineTimeline({ stages, limit }: PipelineTimelineProps) {
  const shown = limit ? stages.slice(0, limit) : stages;
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/30 to-emerald-500/40 md:left-6" />
      <ol className="space-y-3">
        {shown.map((stage) => (
          <li key={stage.id} className="relative flex gap-4 pl-10 md:pl-14">
            <span className="absolute left-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-500/40 bg-atlas-bg text-xs font-bold text-cyan-400 md:left-4.5">
              {stage.order}
            </span>
            <Link
              href={`/pipeline#${stage.id}`}
              className="flex-1 rounded-xl border border-atlas-border/50 bg-atlas-card/50 px-4 py-3 transition hover:border-cyan-500/40 hover:bg-atlas-card/80"
            >
              <span className="font-medium text-white">{stage.name}</span>
              <p className="mt-1 line-clamp-2 text-xs text-slate-500">{stage.description}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
