import type { GlossaryEntry } from "@/types";
import { expandedGlossaryEntries } from "./glossaryExpanded";
import { otherGlossaryEntries } from "./glossaryOther";

/**
 * Glossary entries for /glossary.
 * Priority terms with full non-repetitive fields: glossaryExpanded.ts
 * Additional terms: glossaryOther.ts
 */
export const glossaryEntries: GlossaryEntry[] = [
  ...expandedGlossaryEntries,
  ...otherGlossaryEntries,
].sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: "base" }));
