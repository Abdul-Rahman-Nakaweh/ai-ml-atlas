"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  glossaryCategories,
  glossaryById,
  glossaryEntries,
} from "@/data/glossary";
import type { GlossaryCategory } from "@/types";
import { FilterPills } from "@/components/FilterPills";
import { PageContainer } from "@/components/PageContainer";
import { SearchBar } from "@/components/SearchBar";
import { GlossaryDetailPanel } from "./GlossaryDetailPanel";
import { GlossaryTermList } from "./GlossaryTermList";

function entrySearchText(e: (typeof glossaryEntries)[number]) {
  return [
    e.term,
    e.fullName,
    e.summary,
    e.category,
    e.pipelineStage,
    e.difficulty,
    e.coreMeaning,
    e.workflowLocation,
    e.mechanism,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function GlossaryExplorer() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [selectedId, setSelectedId] = useState<string | null>(glossaryEntries[0]?.id ?? null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return glossaryEntries.filter((e) => {
      if (category !== "All" && e.category !== category) return false;
      if (q && !entrySearchText(e).includes(q)) return false;
      return true;
    });
  }, [search, category]);

  useEffect(() => {
    if (filtered.length === 0) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !filtered.some((e) => e.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash && glossaryById[hash]) {
      setSelectedId(hash);
    }
  }, []);

  const selectTerm = useCallback((id: string) => {
    setSelectedId(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  }, []);

  const selected = selectedId ? glossaryById[selectedId] ?? null : null;

  return (
    <PageContainer className="pb-20">
      <header className="max-w-4xl mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500/80">
          Glossary
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white tracking-tight">Glossary</h1>
        <p className="mt-4 text-slate-400 leading-relaxed max-w-2xl">
          Formal terminology for quick recall and structured study. Scan the index for one-line
          definitions; select a term to read workflow context, mechanism, and distinctions. For
          chapter-length treatment, see{" "}
          <Link href="/learn" className="text-cyan-400 hover:text-cyan-300">
            Learn
          </Link>
          .
        </p>
      </header>

      <div className="max-w-4xl space-y-5 mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Search terms, topics, or stages..." />
        <FilterPills
          label="Category"
          options={glossaryCategories as unknown as string[]}
          selected={category}
          onSelect={setCategory}
        />
        <p className="text-xs text-slate-500">
          {filtered.length} {filtered.length === 1 ? "term" : "terms"}
          {category !== "All" ? ` in ${category}` : ""}
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-8 lg:items-start">
        <div className="rounded-xl border border-atlas-border/50 bg-atlas-surface/20 overflow-hidden lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:flex lg:flex-col">
          <div className="px-4 py-3 border-b border-atlas-border/40 shrink-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Term index
            </p>
          </div>
          <div className="overflow-y-auto flex-1 min-h-0 max-h-[min(50vh,420px)] lg:max-h-none">
            <GlossaryTermList
              entries={filtered}
              selectedId={selectedId}
              onSelect={selectTerm}
            />
          </div>
        </div>

        <div className="hidden lg:block">
          <GlossaryDetailPanel entry={selected} onSelectTerm={selectTerm} />
        </div>
      </div>

      {selected && (
        <div className="lg:hidden mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Selected term
          </p>
          <GlossaryDetailPanel entry={selected} onSelectTerm={selectTerm} />
        </div>
      )}
    </PageContainer>
  );
}
