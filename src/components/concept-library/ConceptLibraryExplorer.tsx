"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  conceptById,
  conceptDifficultyOptions,
  conceptGenerationOptions,
  conceptPipelineOptions,
  conceptPurposeOptions,
  concepts,
} from "@/data/concepts";
import {
  formatDifficultyLabel,
  LIBRARY_CATEGORIES,
} from "@/data/concepts/libraryCategories";
import type { Concept } from "@/types/concept";
import { FilterPills } from "@/components/FilterPills";
import { PageContainer } from "@/components/PageContainer";
import { SearchBar } from "@/components/SearchBar";
import { ConceptDetailPanel } from "./ConceptDetailPanel";
import { ConceptTermList } from "./ConceptTermList";
import { cn } from "@/lib/utils";

const LEVEL_OPTIONS = ["Foundation", "Intermediate", "Advanced"] as const;

const DEPLOYMENT_OPTIONS = ["None", "Low", "Medium", "High"] as const;

function conceptSearchText(c: Concept) {
  return [
    c.name,
    c.fullName,
    c.summary,
    c.libraryCategory,
    c.coreMeaning,
    c.mechanism,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function levelToFilter(difficulty: Concept["difficulty"]): string {
  return formatDifficultyLabel(difficulty);
}

function filterToLevel(level: string): Concept["difficulty"] | null {
  if (level === "Foundation") return "foundation";
  if (level === "Intermediate") return "intermediate";
  if (level === "Advanced") return "advanced";
  return null;
}

export function ConceptLibraryExplorer() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [level, setLevel] = useState<string>("All");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [generation, setGeneration] = useState("All");
  const [pipeline, setPipeline] = useState("All");
  const [purpose, setPurpose] = useState("All");
  const [deployment, setDeployment] = useState("All");
  const [mathFoundation, setMathFoundation] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(concepts[0]?.id ?? null);

  const mathOptions = useMemo(() => {
    const set = new Set<string>();
    for (const c of concepts) {
      c.mathFoundation?.forEach((m) => set.add(m));
    }
    return [...set].sort();
  }, []);

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "All" ||
    level !== "All" ||
    generation !== "All" ||
    pipeline !== "All" ||
    purpose !== "All" ||
    deployment !== "All" ||
    mathFoundation !== "All";

  const clearFilters = useCallback(() => {
    setSearch("");
    setCategory("All");
    setLevel("All");
    setGeneration("All");
    setPipeline("All");
    setPurpose("All");
    setDeployment("All");
    setMathFoundation("All");
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const levelFilter = level !== "All" ? filterToLevel(level) : null;

    return concepts.filter((c) => {
      if (category !== "All" && c.libraryCategory !== category) return false;
      if (levelFilter && c.difficulty !== levelFilter) return false;
      if (generation !== "All" && c.generation !== generation) return false;
      if (pipeline !== "All" && c.pipelineStage !== pipeline) return false;
      if (purpose !== "All" && c.purpose !== purpose) return false;
      if (deployment !== "All" && c.deploymentRelevance !== deployment) return false;
      if (mathFoundation !== "All" && !c.mathFoundation?.includes(mathFoundation)) return false;
      if (q && !conceptSearchText(c).includes(q)) return false;
      return true;
    });
  }, [search, category, level, generation, pipeline, purpose, deployment, mathFoundation]);

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
      <header className="max-w-3xl mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500/80">
          Reference
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white tracking-tight">Concept Library</h1>
        <p className="mt-4 text-slate-400 leading-relaxed">
          A formal learning reference connecting each term to its meaning, workflow role, mechanism,
          practical example, limitations, and related concepts. Select a term from the index to study
          its structured entry.
        </p>
        <p className="mt-3 text-sm text-slate-500">
          For guided study in sequence, see{" "}
          <Link href="/learn" className="text-cyan-400 hover:text-cyan-300">
            Learn
          </Link>
          .
        </p>
      </header>

      <div className="max-w-3xl space-y-4 mb-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search concepts by name or topic..."
        />

        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-[200px] flex-1">
            <label htmlFor="category-filter" className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Category
            </label>
            <select
              id="category-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-atlas-border/60 bg-atlas-surface/50 px-3 py-2 text-sm text-slate-200 focus:border-cyan-500/50 focus:outline-none"
            >
              <option value="All">All categories</option>
              {LIBRARY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[160px] flex-1">
            <label htmlFor="level-filter" className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Level
            </label>
            <select
              id="level-filter"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-atlas-border/60 bg-atlas-surface/50 px-3 py-2 text-sm text-slate-200 focus:border-cyan-500/50 focus:outline-none"
            >
              <option value="All">All levels</option>
              {LEVEL_OPTIONS.map((lv) => (
                <option key={lv} value={lv}>
                  {lv}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg border border-atlas-border/60 px-3 py-2 text-xs text-slate-400 hover:border-cyan-500/40 hover:text-cyan-300 transition"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="border border-atlas-border/40 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setAdvancedOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-3 text-left text-sm text-slate-400 hover:bg-white/[0.02] transition"
            aria-expanded={advancedOpen}
          >
            <span className="text-xs font-semibold uppercase tracking-wider">Advanced Filters</span>
            <span className="text-slate-500">{advancedOpen ? "−" : "+"}</span>
          </button>
          {advancedOpen && (
            <div className="px-4 pb-4 space-y-4 border-t border-atlas-border/30 pt-4">
              <FilterPills
                label="AI generation"
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
                label="Purpose"
                options={[...conceptPurposeOptions]}
                selected={purpose}
                onSelect={setPurpose}
              />
              <FilterPills
                label="Deployment relevance"
                options={[...DEPLOYMENT_OPTIONS]}
                selected={deployment}
                onSelect={setDeployment}
              />
              {mathOptions.length > 0 && (
                <FilterPills
                  label="Math foundation"
                  options={mathOptions}
                  selected={mathFoundation}
                  onSelect={setMathFoundation}
                />
              )}
            </div>
          )}
        </div>

        <p className="text-xs text-slate-500">
          {filtered.length} {filtered.length === 1 ? "concept" : "concepts"}
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(280px,340px)_1fr] lg:gap-8 lg:items-start">
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
          <ConceptDetailPanel concept={selected} onSelectConcept={selectConcept} />
        </div>
      )}
    </PageContainer>
  );
}
