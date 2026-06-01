import type { GlossaryEntry } from "@/types";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

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

interface GlossaryTermListProps {
  entries: GlossaryEntry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function GlossaryTermList({ entries, selectedId, onSelect }: GlossaryTermListProps) {
  if (entries.length === 0) {
    return (
      <p className="px-4 py-8 text-sm text-slate-500 text-center">No terms match your search or filters.</p>
    );
  }

  return (
    <ul className="divide-y divide-atlas-border/30" role="listbox" aria-label="Glossary terms">
      {entries.map((entry) => {
        const selected = entry.id === selectedId;
        return (
          <li key={entry.id} role="option" aria-selected={selected}>
            <button
              type="button"
              onClick={() => onSelect(entry.id)}
              className={cn(
                "w-full text-left px-4 py-3.5 transition",
                selected
                  ? "bg-cyan-500/10 border-l-2 border-cyan-400"
                  : "hover:bg-white/[0.03] border-l-2 border-transparent"
              )}
            >
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span
                  className={cn(
                    "font-semibold text-sm",
                    selected ? "text-cyan-100" : "text-white"
                  )}
                >
                  {entry.term}
                </span>
                {entry.fullName && (
                  <span className="text-xs text-slate-500 truncate">{entry.fullName}</span>
                )}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-400 line-clamp-2">
                {entry.summary}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge variant={categoryVariant(entry.category)} className="!px-2 !py-0 text-[10px]">
                  {entry.category}
                </Badge>
                <Badge variant="pipeline" className="!px-2 !py-0 text-[10px]">
                  {entry.pipelineStage}
                </Badge>
                <Badge variant="default" className="!px-2 !py-0 text-[10px]">
                  {entry.difficulty}
                </Badge>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
