import Link from "next/link";
import type { GlossaryEntry } from "@/types";

const SECTIONS: { key: keyof GlossaryEntry; label: string }[] = [
  { key: "definition", label: "Definition" },
  { key: "locationInWorkflow", label: "Location in the Workflow" },
  { key: "functionRole", label: "Function" },
  { key: "technicalBasis", label: "Technical Basis" },
  { key: "practicalExample", label: "Practical Example" },
  { key: "commonDistinction", label: "Common Distinction" },
  { key: "limitations", label: "Limitations" },
];

interface GlossaryEntryDetailProps {
  entry: GlossaryEntry;
}

export function GlossaryEntryDetail({ entry }: GlossaryEntryDetailProps) {
  return (
    <details
      id={entry.id}
      className="group scroll-mt-24 py-6 first:pt-0 border-b border-atlas-border/30 last:border-0"
    >
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="text-lg font-semibold text-white group-open:text-cyan-100">
            {entry.term}
          </h2>
          {entry.fullName && (
            <span className="text-sm text-slate-500">({entry.fullName})</span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-400 max-w-prose">
          {entry.definition}
        </p>
        <span className="mt-2 inline-block text-xs text-slate-600 group-open:hidden">
          Expand for full entry
        </span>
      </summary>

      <div className="mt-5 space-y-4 max-w-prose">
        {SECTIONS.slice(1).map(({ key, label }) => (
          <div key={key}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {label}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
              {entry[key] as string}
            </p>
          </div>
        ))}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Related Terms
          </h3>
          <p className="mt-1.5 text-sm text-slate-400">{entry.relatedTerms.join("; ")}</p>
        </div>
        {entry.techniqueId && (
          <Link
            href={`/library#${entry.techniqueId}`}
            className="inline-block text-xs text-cyan-500 hover:text-cyan-400"
          >
            Library entry →
          </Link>
        )}
      </div>
    </details>
  );
}
