import type { Concept } from "@/types/concept";
import { Badge, generationVariant } from "@/components/Badge";
import { cn } from "@/lib/utils";

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

interface ConceptTermListProps {
  concepts: Concept[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ConceptTermList({ concepts, selectedId, onSelect }: ConceptTermListProps) {
  if (concepts.length === 0) {
    return (
      <p className="px-4 py-8 text-sm text-slate-500 text-center">
        No concepts match your search or filters.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-atlas-border/30" role="listbox" aria-label="Concept index">
      {concepts.map((concept) => {
        const selected = concept.id === selectedId;
        return (
          <li key={concept.id} role="option" aria-selected={selected}>
            <button
              type="button"
              onClick={() => onSelect(concept.id)}
              className={cn(
                "w-full text-left px-4 py-3 transition",
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
                  {concept.name}
                </span>
                {concept.fullName && (
                  <span className="text-xs text-slate-500 truncate">{concept.fullName}</span>
                )}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-400 line-clamp-2">
                {concept.summary}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <Badge variant={typeBadgeVariant(concept.conceptType)} className="!px-1.5 !py-0 text-[10px]">
                  {concept.conceptType}
                </Badge>
                <Badge variant="pipeline" className="!px-1.5 !py-0 text-[10px]">
                  {concept.pipelineStage}
                </Badge>
                <Badge variant={generationVariant(concept.generation)} className="!px-1.5 !py-0 text-[10px]">
                  {concept.generation}
                </Badge>
                <Badge variant="default" className="!px-1.5 !py-0 text-[10px]">
                  {concept.difficulty}
                </Badge>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
