"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Technique } from "@/types";
import { Badge, generationVariant } from "./Badge";
import { cn, normalizeArray } from "@/lib/utils";

type DepthTab = "quick" | "intuition" | "technical" | "math" | "practical" | "deployment";

interface TechniqueCardProps {
  technique: Technique;
  defaultExpanded?: boolean;
}

export function TechniqueCard({ technique, defaultExpanded }: TechniqueCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded ?? false);
  const [tab, setTab] = useState<DepthTab>("quick");
  const stages = normalizeArray(technique.pipelineStage);
  const purposes = normalizeArray(technique.purpose);
  const math = normalizeArray(technique.mathFoundation);

  const tabs: { id: DepthTab; label: string; show: boolean }[] = [
    { id: "quick", label: "Quick", show: true },
    { id: "intuition", label: "Intuition", show: !!technique.intuition },
    { id: "technical", label: "Technical", show: !!technique.technicalExplanation },
    { id: "math", label: "Math", show: !!technique.mathIdea },
    { id: "practical", label: "Practical", show: true },
    { id: "deployment", label: "Deploy", show: !!technique.deploymentNotes || technique.deploymentRelevance !== "None" },
  ];

  const tabContent: Record<DepthTab, string> = {
    quick: technique.quickExplanation,
    intuition: technique.intuition,
    technical: technique.technicalExplanation ?? technique.intuition,
    math: technique.mathIdea ?? "No dedicated math note—see Math Foundations.",
    practical: `Use when: ${technique.whenToUse}\n\nAvoid when: ${technique.whenToAvoid}\n\nMain trade-off: ${technique.mainTradeoff}`,
    deployment:
      technique.deploymentNotes ??
      (technique.deploymentRelevance !== "None"
        ? `Deployment relevance: ${technique.deploymentRelevance}`
        : "No specific deployment notes."),
  };

  return (
    <article
      id={technique.id}
      className="glass-card scroll-mt-24 overflow-hidden transition-all hover:border-cyan-500/30"
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 text-left md:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{technique.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-2">
              {technique.quickExplanation}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant={generationVariant(technique.generation)}>
                {technique.generation}
              </Badge>
              <Badge variant="accent">{technique.conceptType}</Badge>
              <Badge>{technique.difficulty}</Badge>
              {stages.slice(0, 1).map((s) => (
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
        <div className="border-t border-atlas-border/40 px-5 pb-5 pt-4 md:px-6 md:pb-6">
          <div className="mb-4 flex flex-wrap gap-1 border-b border-atlas-border/40 pb-3">
            {tabs
              .filter((t) => t.show)
              .map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-medium transition",
                    tab === t.id
                      ? "bg-cyan-500/15 text-cyan-300"
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  {t.label}
                </button>
              ))}
          </div>
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">
            {tabContent[tab]}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {purposes.map((p) => (
              <Badge key={p} variant="accent">
                {p}
              </Badge>
            ))}
            {math.map((m) => (
              <Badge key={m}>{m}</Badge>
            ))}
            {technique.deploymentRelevance !== "None" && (
              <Badge variant="default">Deploy: {technique.deploymentRelevance}</Badge>
            )}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase text-emerald-400/80">Strengths</h4>
              <ul className="mt-1 space-y-1 text-sm text-slate-400">
                {technique.strengths.map((s) => (
                  <li key={s}>+ {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase text-amber-400/80">Limitations</h4>
              <ul className="mt-1 space-y-1 text-sm text-slate-400">
                {technique.limitations.map((l) => (
                  <li key={l}>− {l}</li>
                ))}
              </ul>
            </div>
          </div>

          {technique.commonMistakes.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase text-amber-500/80">Common mistake</h4>
              <ul className="mt-1 text-sm text-slate-400">
                {technique.commonMistakes.map((m) => (
                  <li key={m}>• {m}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            {technique.learnBefore.length > 0 && (
              <p>
                <span className="font-medium text-slate-400">Learn before: </span>
                <span className="text-slate-300">{technique.learnBefore.join(" · ")}</span>
              </p>
            )}
            {technique.learnAfter.length > 0 && (
              <p>
                <span className="font-medium text-slate-400">Learn after: </span>
                <span className="text-slate-300">{technique.learnAfter.join(" · ")}</span>
              </p>
            )}
          </div>

          <p className="mt-3 text-sm">
            <span className="font-medium text-slate-400">Related: </span>
            <span className="text-slate-300">{technique.relatedConcepts.join(" · ")}</span>
          </p>

          <Link
            href="/glossary"
            className="mt-3 inline-block text-xs text-cyan-500/80 hover:text-cyan-400"
          >
            Check glossary for acronyms →
          </Link>
        </div>
      )}
    </article>
  );
}
