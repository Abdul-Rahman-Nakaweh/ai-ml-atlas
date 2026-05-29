"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { techniques } from "@/data/techniques";
import { generationOptions, pipelineStageOptions, conceptTypeOptions } from "@/data/techniques";
import { SearchBar } from "@/components/SearchBar";
import { PageContainer } from "@/components/PageContainer";
import { Badge, generationVariant } from "@/components/Badge";
import { cn, normalizeArray } from "@/lib/utils";

export function LibraryView() {
  const [search, setSearch] = useState("");
  const [generation, setGeneration] = useState("All");
  const [pipeline, setPipeline] = useState("All");
  const [conceptType, setConceptType] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return techniques.filter((t) => {
      if (generation !== "All" && t.generation !== generation) return false;
      if (pipeline !== "All") {
        const stages = normalizeArray(t.pipelineStage);
        if (!stages.includes(pipeline as (typeof stages)[number])) return false;
      }
      if (conceptType !== "All" && t.conceptType !== conceptType) return false;
      if (q) {
        const hay = [t.name, t.quickExplanation, t.intuition, ...t.relatedConcepts]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, generation, pipeline, conceptType]);

  return (
    <PageContainer className="pb-20">
      <header className="max-w-3xl mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500/80">
          Reference
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">Concept Library</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-400">
          Searchable reference for algorithms, metrics, preprocessing methods, and deployment
          techniques. For structured study, begin with the{" "}
          <Link href="/learn" className="text-cyan-400 hover:text-cyan-300">
            Learn
          </Link>{" "}
          sequence.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0">
          <button
            type="button"
            className="lg:hidden flex w-full items-center justify-between rounded-lg border border-atlas-border/60 px-4 py-2 text-sm text-slate-300"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            Filters
            {filtersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <div
            className={cn(
              "space-y-6 mt-4 lg:mt-0",
              !filtersOpen && "hidden lg:block"
            )}
          >
            <SearchBar value={search} onChange={setSearch} placeholder="Search library..." />
            <FilterGroup label="Generation" value={generation} options={generationOptions} onChange={setGeneration} />
            <FilterGroup label="Pipeline stage" value={pipeline} options={pipelineStageOptions} onChange={setPipeline} />
            <FilterGroup label="Category" value={conceptType} options={conceptTypeOptions} onChange={setConceptType} />
            <p className="text-xs text-slate-500">{filtered.length} entries</p>
          </div>
        </aside>

        <div className="flex-1 min-w-0 space-y-3">
          {filtered.map((t) => {
            const open = expandedId === t.id;
            return (
              <article
                key={t.id}
                id={t.id}
                className="scroll-mt-24 rounded-xl border border-atlas-border/50 bg-atlas-surface/20"
              >
                <button
                  type="button"
                  className="w-full px-5 py-4 text-left"
                  onClick={() => setExpandedId(open ? null : t.id)}
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <h2 className="font-semibold text-white">{t.name}</h2>
                      <p className="mt-1 text-sm text-slate-400 line-clamp-2">{t.quickExplanation}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant={generationVariant(t.generation)}>{t.generation}</Badge>
                        <Badge>{t.conceptType}</Badge>
                      </div>
                    </div>
                    <ChevronDown className={cn("h-5 w-5 shrink-0 text-slate-500 transition", open && "rotate-180")} />
                  </div>
                </button>
                {open && (
                  <div className="border-t border-atlas-border/40 px-5 pb-5 pt-4 space-y-4 text-sm">
                    <Field label="Definition" value={t.quickExplanation} />
                    <Field label="Role in the Workflow" value={normalizeArray(t.pipelineStage).join("; ")} />
                    <Field label="Technical Basis" value={t.mathIdea ?? t.intuition} />
                    <Field label="Practical Application" value={t.whenToUse} />
                    <Field label="Limitations" value={t.limitations.join(" ")} />
                    <Field label="Trade-offs" value={t.mainTradeoff} />
                    <Field label="Related Concepts" value={t.relatedConcepts.join("; ")} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</h3>
      <p className="mt-1 leading-relaxed text-slate-300">{value}</p>
    </div>
  );
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-slate-500 mb-2">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-atlas-border/60 bg-atlas-bg px-3 py-2 text-sm text-slate-300"
      >
        <option value="All">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
