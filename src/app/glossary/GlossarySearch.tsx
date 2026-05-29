"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { glossaryEntries } from "@/data/glossary";
import { SearchBar } from "@/components/SearchBar";
import { PageContainer } from "@/components/PageContainer";

export function GlossarySearch() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return glossaryEntries;
    return glossaryEntries.filter(
      (e) =>
        e.term.toLowerCase().includes(q) ||
        e.fullName?.toLowerCase().includes(q) ||
        e.simpleExplanation.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <PageContainer className="pb-20">
      <header className="max-w-3xl mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500/80">Glossary</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Terminology Reference</h1>
        <p className="mt-4 text-slate-400 leading-relaxed">
          Concise formal definitions for quick lookup. For extended treatment, use the{" "}
          <Link href="/learn" className="text-cyan-400 hover:text-cyan-300">
            Learn
          </Link>{" "}
          sequence or the{" "}
          <Link href="/library" className="text-cyan-400 hover:text-cyan-300">
            Library
          </Link>
          .
        </p>
      </header>

      <div className="max-w-xl mb-8">
        <SearchBar value={search} onChange={setSearch} placeholder="Search terms..." />
        <p className="mt-2 text-xs text-slate-500">{filtered.length} entries</p>
      </div>

      <div className="max-w-3xl divide-y divide-atlas-border/40">
        {filtered.map((entry) => (
          <article key={entry.id} className="py-6 first:pt-0">
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="text-lg font-semibold text-white">{entry.term}</h2>
              {entry.fullName && (
                <span className="text-sm text-slate-500">({entry.fullName})</span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{entry.simpleExplanation}</p>
            <p className="mt-2 text-sm text-slate-500">
              <span className="font-medium text-slate-400">Related area: </span>
              {entry.whereItFits}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Related concepts: {entry.relatedConcepts.join("; ")}
            </p>
            {entry.techniqueId && (
              <Link
                href={`/library#${entry.techniqueId}`}
                className="mt-2 inline-block text-xs text-cyan-500 hover:text-cyan-400"
              >
                Library entry →
              </Link>
            )}
          </article>
        ))}
      </div>
    </PageContainer>
  );
}
