"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { glossaryEntries } from "@/data/glossary";
import { GlossaryEntryDetail } from "@/components/GlossaryEntryDetail";
import { SearchBar } from "@/components/SearchBar";
import { PageContainer } from "@/components/PageContainer";

function entrySearchText(e: (typeof glossaryEntries)[number]) {
  return [
    e.term,
    e.fullName,
    e.definition,
    e.locationInWorkflow,
    e.functionRole,
    e.technicalBasis,
    e.practicalExample,
    e.commonDistinction,
    e.limitations,
    e.relatedTerms.join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function GlossarySearch() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return glossaryEntries;
    return glossaryEntries.filter((e) => entrySearchText(e).includes(q));
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

      <div className="max-w-3xl">
        {filtered.map((entry) => (
          <GlossaryEntryDetail key={entry.id} entry={entry} />
        ))}
      </div>
    </PageContainer>
  );
}
