import type { Concept } from "@/types/concept";
import { conceptById } from "@/data/concepts";
import { formatDifficultyLabel } from "@/data/concepts/libraryCategories";
import { Badge } from "@/components/Badge";
import { VisualIntuitionSection } from "@/components/visuals/VisualIntuitionSection";
import { ConceptStructureSection } from "./ConceptStructureSection";
import { ConceptEquationSection } from "./ConceptEquationSection";
import { cn } from "@/lib/utils";

const EARLY_SECTIONS: { key: keyof Concept; label: string }[] = [
  { key: "coreMeaning", label: "Core Meaning" },
  { key: "workflowLocation", label: "Workflow Location" },
];

const MID_SECTIONS: { key: keyof Concept; label: string }[] = [
  { key: "functionRole", label: "Function" },
  { key: "mechanism", label: "Mechanism" },
];

const LATE_SECTIONS: { key: keyof Concept; label: string }[] = [
  { key: "example", label: "Practical Example" },
  { key: "commonDistinction", label: "Common Distinction" },
  { key: "limitation", label: "Limitation" },
];

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

  const visualType = concept.visualType ?? concept.visualAid;

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
          <Badge variant="pipeline">{concept.libraryCategory}</Badge>
          <Badge variant="default">{formatDifficultyLabel(concept.difficulty)}</Badge>
        </div>
      </header>

      <div className="px-5 py-5 md:px-6 space-y-5 max-w-prose">
        {EARLY_SECTIONS.map(({ key, label }) => {
          const text = concept[key] as string;
          if (!text?.trim()) return null;
          return (
            <section key={key}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {label}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{text}</p>
            </section>
          );
        })}

        <ConceptStructureSection concept={concept} onSelectConcept={onSelectConcept} />

        {MID_SECTIONS.map(({ key, label }) => {
          const text = concept[key] as string;
          if (!text?.trim()) return null;
          return (
            <section key={key}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {label}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{text}</p>
            </section>
          );
        })}

        {concept.equation && <ConceptEquationSection equation={concept.equation} />}

        {visualType && <VisualIntuitionSection visualType={visualType} />}

        {LATE_SECTIONS.map(({ key, label }) => (
          <section key={key}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {label}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
              {concept[key] as string}
            </p>
          </section>
        ))}

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

        {concept.relatedConcepts.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Related Concepts
            </h3>
            <ConceptChips ids={concept.relatedConcepts} onSelect={onSelectConcept} />
          </section>
        )}

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
