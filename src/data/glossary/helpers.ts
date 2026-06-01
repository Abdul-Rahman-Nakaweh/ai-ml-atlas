import type { GlossaryEntry } from "@/types";

type EntryInput = Omit<GlossaryEntry, "summary"> & { summary?: string };

/** Build entry; summary defaults to first sentence of coreMeaning */
export function g(e: EntryInput): GlossaryEntry {
  const summary =
    e.summary ??
    (e.coreMeaning.length > 120 ? `${e.coreMeaning.slice(0, 117).trim()}…` : e.coreMeaning);
  return { ...e, summary };
}
