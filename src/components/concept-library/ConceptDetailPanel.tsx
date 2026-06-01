import type { Concept } from "@/types/concept";
import { conceptById } from "@/data/concepts";
import { Badge } from "@/components/Badge";
import { InfoCallout } from "@/components/InfoCallout";
import { VisualIntuitionSection } from "@/components/visuals/VisualIntuitionSection";
import { cn } from "@/lib/utils";

const SECTIONS: { key: keyof Concept; label: string }[] = [
  { key: "coreMeaning", label: "Core Meaning" },
  { key: "workflowLocation", label: "Workflow Location" },
  { key: "functionRole", label: "Function" },
  { key: "mechanism", label: "Mechanism" },
  { key: "example", label: "Example" },
  { key: "limitation", label: "Limitation" },
];

function typeBadgeVariant(
  type: Concept["conceptType"]
): "default" | "accent" | "pipeline" | "gen1" | "gen3" {
  switch (type) {
    case "llm concept":
      return "gen3";
    case "algorithm":
      return "gen1";
    case "metric":
      return "accent";
    case "preprocessing":
      return "pipeline";
    default:
      return "default";
  }
}

interface ConceptDetailPanelProps {
  concept: Concept | null;
  onSelectConcept: (id: string) => void;
  className?: string;
}

export function ConceptDetailPanel({
  concept,
  onSelectConcept,
  className,
}: ConceptDetailPanelProps) {
  if (!concept) {
    return (
      <div
        className={cn(
          "rounded-xl border border-atlas-border/50 bg-atlas-surface/20 p-8 text-center",
          className
        )}
      >
        <p className="text-sm text-slate-500">
          Select a concept from the index to view its structured entry.
        </p>
      </div>
    );
  }

  const pathIds = [...concept.learnBefore, concept.id, ...concept.learnAfter];

  return (
    <article
      className={cn(
        "rounded-xl border border-cyan-500/20 bg-atlas-surface/40 overflow-hidden shadow-lg shadow-cyan-500/5",
        className
      )}
    >
      <header className="border-b border-atlas-border/40 px-5 py-4 md:px-6 bg-atlas-card/40">
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="text-xl font-semibold text-white">{concept.name}</h2>
          {concept.fullName && (
            <span className="text-sm text-slate-500">({concept.fullName})</span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant={typeBadgeVariant(concept.conceptType)}>{concept.conceptType}</Badge>
          <Badge variant="pipeline">{concept.pipelineStage}</Badge>
          <Badge variant={generationVariant(concept.generation)}>{concept.generation}</Badge>
          <Badge variant="default">{concept.difficulty}</Badge>
          <Badge variant="default">{concept.purpose}</Badge>
        </div>
      </header>

      {pathIds.length > 1 && (
        <div className="px-5 py-3 md:px-6 border-b border-atlas-border/30 bg-atlas-bg/30">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Recommended path
          </p>
          <div className="flex flex-wrap items-center gap-1 text-xs text-slate-400">
            {pathIds.map((id, i) => {
              const c = conceptById[id];
              const isCurrent = id === concept.id;
              return (
                <span key={id} className="flex items-center gap-1">
                  {i > 0 && <span className="text-slate-600">→</span>}
                  <button
                    type="button"
                    onClick={() => onSelectConcept(id)}
                    className={cn(
                      "rounded px-1.5 py-0.5 transition",
                      isCurrent
                        ? "text-cyan-300 font-medium"
                        : "hover:text-cyan-400 text-slate-400"
                    )}
                  >
                    {c?.name ?? id}
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="px-5 py-5 md:px-6 space-y-5 max-w-prose">
        {concept.visualAid && (
          <VisualIntuitionSection visualAid={concept.visualAid} />
        )}

        {SECTIONS.map(({ key, label }) => (
          <section key={key}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {label}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
              {concept[key] as string}
            </p>
          </section>
        ))}

        <InfoCallout variant="tip" title="Common Distinction">
          {concept.commonDistinction}
        </InfoCallout>

        {concept.learnBefore.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Learn Before
            </h3>
            <ConceptChips ids={concept.learnBefore} onSelect={onSelectConcept} />
          </section>
        )}

        {concept.learnAfter.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Learn After
            </h3>
            <ConceptChips ids={concept.learnAfter} onSelect={onSelectConcept} />
          </section>
        )}

        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Related Concepts
          </h3>
          <ConceptChips ids={concept.relatedConcepts} onSelect={onSelectConcept} />
        </section>

        {concept.technicalNote && (
          <section className="rounded-lg border border-atlas-border/40 bg-atlas-bg/50 px-4 py-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Technical Note
            </h3>
            <p className="mt-1.5 text-sm text-slate-400">{concept.technicalNote}</p>
          </section>
        )}
      </div>
    </article>
  );
}

function ConceptChips({
  ids,
  onSelect,
}: {
  ids: string[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {ids.map((id) => {
        const c = conceptById[id];
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="rounded-full border border-atlas-border/60 bg-atlas-card/40 px-3 py-1 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition"
          >
            {c?.name ?? id}
          </button>
        );
      })}
    </div>
  );
}

function generationVariant(gen: Concept["generation"]): "gen1" | "gen2" | "gen3" | "cross" {
  if (gen === "Gen 1") return "gen1";
  if (gen === "Gen 2") return "gen2";
  if (gen === "Gen 3") return "gen3";
  return "cross";
}
