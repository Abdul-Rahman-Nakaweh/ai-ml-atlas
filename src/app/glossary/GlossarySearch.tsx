"use client";

import { useMemo, useState } from "react";
import { GlossaryCard } from "@/components/GlossaryCard";
import { SearchBar } from "@/components/SearchBar";
import { PageContainer } from "@/components/PageContainer";
import { glossaryEntries } from "@/data/glossary";

export function GlossarySearch() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return glossaryEntries;
    return glossaryEntries.filter(
      (e) =>
        e.term.toLowerCase().includes(q) ||
        e.fullName?.toLowerCase().includes(q) ||
        e.simpleExplanation.toLowerCase().includes(q) ||
        e.relatedConcepts.some((r) => r.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <PageContainer className="pb-16">
      <div className="mb-8 max-w-xl">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search acronyms and terms..."
        />
        <p className="mt-2 text-sm text-slate-500">
          {filtered.length} term{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((entry) => (
          <GlossaryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </PageContainer>
  );
}
