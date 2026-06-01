import type { FormalConcept } from "@/types/learn";
import Link from "next/link";

interface FormalConceptPanelProps {
  concept: FormalConcept;
}

const fields: { key: keyof FormalConcept; label: string }[] = [
  { key: "definition", label: "Definition" },
  { key: "roleInWorkflow", label: "Role in the Workflow" },
  { key: "purpose", label: "Purpose" },
  { key: "technicalBasis", label: "Technical Basis" },
  { key: "practicalApplication", label: "Practical Application" },
  { key: "limitations", label: "Limitations" },
  { key: "tradeOffs", label: "Trade-offs" },
];

export function FormalConceptPanel({ concept }: FormalConceptPanelProps) {
  return (
    <article
      id={concept.id}
      className="scroll-mt-28 border border-atlas-border/50 rounded-xl bg-atlas-surface/30 overflow-hidden"
    >
      <header className="border-b border-atlas-border/40 bg-atlas-card/50 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{concept.title}</h4>
        <Link
          href={`/library#${concept.id}`}
          className="mt-1 inline-block text-xs text-cyan-500/90 hover:text-cyan-400"
        >
          Open in Concept Library →
        </Link>
      </header>
      <div className="px-6 py-5 space-y-5">
        {fields.map(({ key, label }) => {
          const value = concept[key];
          if (typeof value !== "string" || !value) return null;
          return (
            <div key={key}>
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {label}
              </h5>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{value}</p>
            </div>
          );
        })}
        {concept.commonErrors && concept.commonErrors.length > 0 && (
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-amber-500/80">
              Common Errors
            </h5>
            <ul className="mt-2 space-y-1 text-sm text-slate-400">
              {concept.commonErrors.map((e) => (
                <li key={e}>• {e}</li>
              ))}
            </ul>
          </div>
        )}
        {concept.recommendedSequence && (
          <div className="grid gap-3 sm:grid-cols-2 text-sm">
            {concept.recommendedSequence.before.length > 0 && (
              <p>
                <span className="font-medium text-slate-400">Recommended prior study: </span>
                <span className="text-slate-300">
                  {concept.recommendedSequence.before.join("; ")}
                </span>
              </p>
            )}
            {concept.recommendedSequence.after.length > 0 && (
              <p>
                <span className="font-medium text-slate-400">Recommended subsequent study: </span>
                <span className="text-slate-300">
                  {concept.recommendedSequence.after.join("; ")}
                </span>
              </p>
            )}
          </div>
        )}
        <p className="text-sm border-t border-atlas-border/40 pt-4">
          <span className="font-medium text-slate-400">Related concepts: </span>
          <span className="text-slate-300">{concept.relatedConcepts.join("; ")}</span>
        </p>
      </div>
    </article>
  );
}
