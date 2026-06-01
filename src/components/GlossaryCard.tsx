import type { GlossaryEntry } from "@/types";
import { GlossaryEntryDetail } from "./GlossaryEntryDetail";

interface GlossaryCardProps {
  entry: GlossaryEntry;
}

/** Compact wrapper — renders the same expandable entry as the glossary page */
export function GlossaryCard({ entry }: GlossaryCardProps) {
  return (
    <div className="glass-card p-2">
      <GlossaryEntryDetail entry={entry} />
    </div>
  );
}
