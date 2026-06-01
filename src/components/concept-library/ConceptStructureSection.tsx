import type { Concept } from "@/types/concept";
import { conceptById } from "@/data/concepts";
import { hasConceptStructure } from "@/data/concepts/hierarchies";
import { cn } from "@/lib/utils";

interface ConceptStructureSectionProps {
  concept: Concept;
  onSelectConcept: (id: string) => void;
}

interface ChipGroupProps {
  label: string;
  ids: string[];
  onSelect: (id: string) => void;
  variant?: "default" | "compare" | "next";
}

function HierarchyChips({ label, ids, onSelect, variant = "default" }: ChipGroupProps) {
  if (!ids.length) return null;

  const chipClass =
    variant === "compare"
      ? "border-violet-500/30 bg-violet-500/10 hover:border-violet-400/50 hover:text-violet-200"
      : variant === "next"
        ? "border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-400/50 hover:text-emerald-200"
        : "border-atlas-border/60 bg-atlas-card/40 hover:border-cyan-500/40 hover:text-cyan-300";

  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500 mb-1.5">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {ids.map((id) => {
          const target = conceptById[id];
          if (!target) return null;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-xs text-slate-300 transition",
                chipClass
              )}
            >
              {target.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ConceptStructureSection({ concept, onSelectConcept }: ConceptStructureSectionProps) {
  if (!hasConceptStructure(concept)) return null;

  const path = concept.conceptPath ?? [];

  return (
    <section className="rounded-lg border border-atlas-border/40 bg-atlas-bg/30 px-4 py-4 space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Concept Structure
      </h3>

      {path.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 text-xs">
          {path.map((seg, i) => (
            <span key={`${seg.label}-${i}`} className="flex items-center gap-1">
              {i > 0 && <span className="text-slate-600">→</span>}
              {seg.conceptId && conceptById[seg.conceptId] ? (
                <button
                  type="button"
                  onClick={() => onSelectConcept(seg.conceptId!)}
                  className={cn(
                    "rounded px-1.5 py-0.5 transition",
                    seg.conceptId === concept.id
                      ? "text-cyan-300 font-medium bg-cyan-500/10"
                      : "text-slate-400 hover:text-cyan-300 hover:bg-white/[0.03]"
                  )}
                >
                  {seg.label}
                </button>
              ) : (
                <span
                  className={cn(
                    "px-1.5 py-0.5",
                    i === path.length - 1 ? "text-slate-300 font-medium" : "text-slate-500"
                  )}
                >
                  {seg.label}
                </span>
              )}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-3 pt-1">
        <HierarchyChips
          label="Broader concepts"
          ids={concept.broaderConcepts ?? []}
          onSelect={onSelectConcept}
        />
        <HierarchyChips
          label="Subtopics"
          ids={concept.subtopics ?? []}
          onSelect={onSelectConcept}
        />
        <HierarchyChips
          label="Specific techniques"
          ids={concept.specificTechniques ?? []}
          onSelect={onSelectConcept}
        />
        <HierarchyChips
          label="Variants"
          ids={concept.variants ?? []}
          onSelect={onSelectConcept}
        />
        <HierarchyChips
          label="Commonly compared with"
          ids={concept.commonlyComparedWith ?? []}
          onSelect={onSelectConcept}
          variant="compare"
        />
        <HierarchyChips
          label="Recommended next"
          ids={concept.recommendedNext ?? []}
          onSelect={onSelectConcept}
          variant="next"
        />
      </div>
    </section>
  );
}
