"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  conceptById,
  conceptCategoryLandings,
  conceptDifficultyOptions,
  conceptGenerationOptions,
  conceptPipelineOptions,
  conceptPurposeOptions,
  conceptTypeOptions,
  concepts,
} from "@/data/concepts";
import type { Concept } from "@/types/concept";
import { FilterPills } from "@/components/FilterPills";
import { PageContainer } from "@/components/PageContainer";
import { SearchBar } from "@/components/SearchBar";
import { ConceptDetailPanel } from "./ConceptDetailPanel";
import { ConceptTermList } from "./ConceptTermList";

function conceptSearchText(c: Concept) {
  return [
    c.name,
    c.fullName,
    c.summary,
    c.conceptType,
    c.pipelineStage,
    c.generation,
    c.difficulty,
    c.purpose,
    c.coreMeaning,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function ConceptLibraryExplorer() {
  const [search, setSearch] = useState("");
  const [conceptType, setConceptType] = useState("All");
  const [generation, setGeneration] = useState("All");
  const [pipeline, setPipeline] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [purpose, setPurpose] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(concepts[0]?.id ?? null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return concepts.filter((c) => {
      if (conceptType !== "All" && c.conceptType !== conceptType) return false;
      if (generation !== "All" && c.generation !== generation) return false;
      if (pipeline !== "All" && c.pipelineStage !== pipeline) return false;
      if (difficulty !== "All" && c.difficulty !== difficulty) return false;
      if (purpose !== "All" && c.purpose !== purpose) return false;
      if (q && !conceptSearchText(c).includes(q)) return false;
      return true;
    });
  }, [search, conceptType, generation, pipeline, difficulty, purpose]);

  useEffect(() => {
    if (filtered.length === 0) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !filtered.some((c) => c.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash && conceptById[hash]) setSelectedId(hash);
  }, []);

  const selectConcept = useCallback((id: string) => {
    setSelectedId(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  }, []);

  const selected = selectedId ? conceptById[selectedId] ?? null : null;

  return (
    <PageContainer className="pb-20">
      <header className="max-w-4xl mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500/80">
          Reference
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white tracking-tight">Concept Library</h1>
        <p className="mt-4 text-slate-400 leading-relaxed max-w-2xl">
          A structured reference for AI/ML terms, algorithms, metrics, workflow methods, deployment
          concepts, and modern AI techniques. This library connects each concept to its workflow
          location, technical basis, practical use, limitations, and related concepts.
        </p>
        <p className="mt-3 text-sm text-slate-500 max-w-2xl">
          For guided study in sequence, use{" "}
          <Link href="/learn" className="text-cyan-400 hover:text-cyan-300">
            Learn
          </Link>
          . For decision criteria, use{" "}
          <Link href="/guides" className="text-cyan-400 hover:text-cyan-300">
            Guides
          </Link>
          .
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-6">
        {conceptCategoryLandings.map(({ label, conceptType: type }) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              setConceptType(type);
              setSearch("");
            }}
            className="rounded-lg border border-atlas-border/50 px-3 py-1.5 text-xs text-slate-400 hover:border-cyan-500/40 hover:text-cyan-300 transition"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="max-w-4xl space-y-4 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search concepts, mechanisms, or workflow stages..."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FilterPills
            label="Concept type"
            options={[...conceptTypeOptions]}
            selected={conceptType}
            onSelect={setConceptType}
          />
          <FilterPills
            label="Generation"
            options={[...conceptGenerationOptions]}
            selected={generation}
            onSelect={setGeneration}
          />
          <FilterPills
            label="Pipeline stage"
            options={[...conceptPipelineOptions]}
            selected={pipeline}
            onSelect={setPipeline}
          />
          <FilterPills
            label="Difficulty"
            options={[...conceptDifficultyOptions]}
            selected={difficulty}
            onSelect={setDifficulty}
          />
        </div>
        <FilterPills
          label="Purpose"
          options={[...conceptPurposeOptions]}
          selected={purpose}
          onSelect={setPurpose}
        />
        <p className="text-xs text-slate-500">
          {filtered.length} {filtered.length === 1 ? "concept" : "concepts"}
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-8 lg:items-start">
        <div className="rounded-xl border border-atlas-border/50 bg-atlas-surface/20 overflow-hidden lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:flex lg:flex-col">
          <div className="px-4 py-3 border-b border-atlas-border/40 shrink-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Concept index
            </p>
          </div>
          <div className="overflow-y-auto flex-1 min-h-0 max-h-[min(50vh,420px)] lg:max-h-none">
            <ConceptTermList
              concepts={filtered}
              selectedId={selectedId}
              onSelect={selectConcept}
            />
          </div>
        </div>

        <div className="hidden lg:block">
          <ConceptDetailPanel concept={selected} onSelectConcept={selectConcept} />
        </div>
      </div>

      {selected && (
        <div className="lg:hidden mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Selected concept
          </p>
          <ConceptDetailPanel concept={selected} onSelectConcept={selectConcept} />
        </div>
      )}
    </PageContainer>
  );
}
