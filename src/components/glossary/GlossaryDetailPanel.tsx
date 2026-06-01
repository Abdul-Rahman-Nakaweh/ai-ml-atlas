import Link from "next/link";
import type { GlossaryEntry } from "@/types";
import { glossaryById } from "@/data/glossary";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

const SECTIONS: { key: keyof GlossaryEntry; label: string }[] = [
  { key: "coreMeaning", label: "Core Meaning" },
  { key: "workflowLocation", label: "Workflow Location" },
  { key: "mechanism", label: "Mechanism" },
  { key: "example", label: "Example" },
  { key: "commonDistinction", label: "Common Distinction" },
  { key: "limitation", label: "Limitation" },
];

function categoryVariant(
  category: GlossaryEntry["category"]
): "default" | "accent" | "pipeline" | "gen1" | "gen3" {
  switch (category) {
    case "Modern AI":
      return "gen3";
    case "Models":
      return "gen1";
    case "Evaluation":
      return "accent";
    case "Data & Features":
      return "pipeline";
    default:
      return "default";
  }
}

interface GlossaryDetailPanelProps {
  entry: GlossaryEntry | null;
  onSelectTerm: (id: string) => void;
  className?: string;
}

export function GlossaryDetailPanel({
  entry,
  onSelectTerm,
  className,
}: GlossaryDetailPanelProps) {
  if (!entry) {
    return (
      <div
        className={cn(
          "rounded-xl border border-atlas-border/50 bg-atlas-surface/20 p-8 text-center",
          className
        )}
      >
        <p className="text-sm text-slate-500">Select a term from the index to view its full entry.</p>
      </div>
    );
  }

  return (
    <article
      className={cn(
        "rounded-xl border border-atlas-border/50 bg-atlas-surface/30 overflow-hidden",
        className
      )}
    >
      <header className="border-b border-atlas-border/40 px-5 py-4 md:px-6">
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="text-xl font-semibold text-white">{entry.term}</h2>
          {entry.fullName && (
            <span className="text-sm text-slate-500">({entry.fullName})</span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant={categoryVariant(entry.category)}>{entry.category}</Badge>
          <Badge variant="pipeline">{entry.pipelineStage}</Badge>
          <Badge variant="default">{entry.difficulty}</Badge>
        </div>
      </header>

      <div className="px-5 py-5 md:px-6 space-y-5 max-w-prose">
        {SECTIONS.map(({ key, label }) => (
          <section key={key}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {label}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{entry[key] as string}</p>
          </section>
        ))}

        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Related Concepts
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {entry.relatedConcepts.map((relatedId) => {
              const related = glossaryById[relatedId];
              return (
                <button
                  key={relatedId}
                  type="button"
                  onClick={() => onSelectTerm(relatedId)}
                  className="rounded-full border border-atlas-border/60 bg-atlas-card/40 px-3 py-1 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition"
                >
                  {related?.term ?? relatedId}
                </button>
              );
            })}
          </div>
        </section>

        {entry.techniqueId && (
          <Link
            href={`/library#${entry.techniqueId}`}
            className="inline-block text-xs text-cyan-500 hover:text-cyan-400"
          >
            Open Library reference →
          </Link>
        )}
      </div>
    </article>
  );
}
