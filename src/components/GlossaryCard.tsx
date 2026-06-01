import type { GlossaryEntry } from "@/types";
import { GlossaryDetailPanel } from "./glossary/GlossaryDetailPanel";

interface GlossaryCardProps {
  entry: GlossaryEntry;
  onSelectTerm?: (id: string) => void;
}

export function GlossaryCard({ entry, onSelectTerm = () => {} }: GlossaryCardProps) {
  return (
    <div className="glass-card p-1">
      <GlossaryDetailPanel entry={entry} onSelectTerm={onSelectTerm} />
    </div>
  );
}
