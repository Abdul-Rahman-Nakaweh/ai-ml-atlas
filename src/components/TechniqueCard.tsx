"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Technique } from "@/types";
import { Badge, generationVariant } from "./Badge";
import { cn, normalizeArray } from "@/lib/utils";

interface TechniqueCardProps {
  technique: Technique;
}

export function TechniqueCard({ technique }: TechniqueCardProps) {
  const [expanded, setExpanded] = useState(false);
  const stages = normalizeArray(technique.pipelineStage);
  const purposes = normalizeArray(technique.purpose);
  const math = normalizeArray(technique.mathFoundation);

  return (
    <article className="glass-card overflow-hidden transition-all hover:border-cyan-500/30">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 text-left md:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{technique.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {technique.shortDescription}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant={generationVariant(technique.generation)}>
                {technique.generation}
              </Badge>
              {stages.slice(0, 2).map((s) => (
                <Badge key={s} variant="pipeline">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 shrink-0 text-slate-500 transition-transform",
              expanded && "rotate-180"
            )}
          />
        </div>
      </button>
      {expanded && (
        <div className="border-t border-atlas-border/40 px-5 pb-5 pt-4 md:px-6 md:pb-6 space-y-4 text-sm">
          <div className="flex flex-wrap gap-2">
            {purposes.map((p) => (
              <Badge key={p} variant="accent">
                {p}
              </Badge>
            ))}
            {math.map((m) => (
              <Badge key={m}>{m}</Badge>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="font-medium text-emerald-400/90">Strengths</h4>
              <ul className="mt-1 space-y-1 text-slate-400">
                {technique.strengths.map((s) => (
                  <li key={s}>+ {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-amber-400/90">Limitations</h4>
              <ul className="mt-1 space-y-1 text-slate-400">
                {technique.limitations.map((l) => (
                  <li key={l}>− {l}</li>
                ))}
              </ul>
            </div>
          </div>
          <p>
            <span className="font-medium text-cyan-400/90">When to use: </span>
            <span className="text-slate-300">{technique.whenToUse}</span>
          </p>
          <p>
            <span className="font-medium text-amber-400/80">When not to use: </span>
            <span className="text-slate-300">{technique.whenNotToUse}</span>
          </p>
          <p>
            <span className="font-medium text-violet-400/90">Trade-offs: </span>
            <span className="text-slate-300">{technique.tradeOffs}</span>
          </p>
          {technique.deploymentNotes && (
            <p>
              <span className="font-medium text-slate-400">Deployment: </span>
              <span className="text-slate-300">{technique.deploymentNotes}</span>
            </p>
          )}
          <div>
            <span className="font-medium text-slate-400">Related: </span>
            <span className="text-slate-300">{technique.relatedConcepts.join(" · ")}</span>
          </div>
        </div>
      )}
    </article>
  );
}
