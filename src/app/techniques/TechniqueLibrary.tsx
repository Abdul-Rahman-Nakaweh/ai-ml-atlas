"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TechniqueCard } from "@/components/TechniqueCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterPills } from "@/components/FilterPills";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import {
  techniques,
  generationOptions,
  pipelineStageOptions,
  purposeOptions,
  mathOptions,
  difficultyOptions,
  conceptTypeOptions,
  deploymentOptions,
} from "@/data/techniques";
import { normalizeArray } from "@/lib/utils";

export function TechniqueLibrary() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const [search, setSearch] = useState(initialQ);
  const [generation, setGeneration] = useState("All");
  const [pipeline, setPipeline] = useState("All");
  const [purpose, setPurpose] = useState("All");
  const [math, setMath] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [conceptType, setConceptType] = useState("All");
  const [deployment, setDeployment] = useState("All");

  useEffect(() => {
    if (initialQ) setSearch(initialQ);
  }, [initialQ]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return techniques.filter((t) => {
      if (generation !== "All" && t.generation !== generation) return false;
      if (pipeline !== "All") {
        const stages = normalizeArray(t.pipelineStage);
        if (!stages.includes(pipeline as (typeof stages)[number])) return false;
      }
      if (purpose !== "All") {
        const purposes = normalizeArray(t.purpose);
        if (!purposes.includes(purpose as (typeof purposes)[number])) return false;
      }
      if (math !== "All") {
        const maths = normalizeArray(t.mathFoundation);
        if (!maths.includes(math as (typeof maths)[number])) return false;
      }
      if (difficulty !== "All" && t.difficulty !== difficulty) return false;
      if (conceptType !== "All" && t.conceptType !== conceptType) return false;
      if (deployment !== "All") {
        if (deployment === "Embedded-relevant") {
          if (t.deploymentRelevance !== "High" && t.deploymentRelevance !== "Medium") return false;
        } else if (t.deploymentRelevance !== deployment) return false;
      }
      if (q) {
        const haystack = [
          t.name,
          t.quickExplanation,
          t.intuition,
          t.whenToUse,
          t.mainTradeoff,
          t.conceptType,
          ...t.relatedConcepts,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [search, generation, pipeline, purpose, math, difficulty, conceptType, deployment]);

  return (
    <PageContainer className="pb-16">
      <PageIntro
        title="Layer 3: Concept Cards"
        what="Searchable techniques with depth tabs, pipeline placement, and learn-before/after links."
        why="The library explains individual ideas; paths and pipeline show how they connect."
        next={[
          { label: "Learning Paths", href: "/paths" },
          { label: "Glossary", href: "/glossary" },
        ]}
      />

      <div className="sticky top-[57px] z-40 -mx-4 mt-8 border-b border-atlas-border/40 bg-atlas-bg/95 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by name, description, type, or related concept..."
          className="mb-4"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <FilterPills
            label="Generation"
            options={generationOptions}
            selected={generation}
            onSelect={setGeneration}
          />
          <FilterPills
            label="Pipeline stage"
            options={pipelineStageOptions}
            selected={pipeline}
            onSelect={setPipeline}
          />
          <FilterPills
            label="Purpose"
            options={purposeOptions}
            selected={purpose}
            onSelect={setPurpose}
          />
          <FilterPills
            label="Math foundation"
            options={mathOptions}
            selected={math}
            onSelect={setMath}
          />
          <FilterPills
            label="Difficulty"
            options={difficultyOptions}
            selected={difficulty}
            onSelect={setDifficulty}
          />
          <FilterPills
            label="Concept type"
            options={conceptTypeOptions}
            selected={conceptType}
            onSelect={setConceptType}
          />
          <FilterPills
            label="Deployment"
            options={["Embedded-relevant", ...deploymentOptions]}
            selected={deployment}
            onSelect={setDeployment}
          />
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Showing {filtered.length} of {techniques.length} concepts · Expand a card for depth tabs
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((t) => (
          <TechniqueCard key={t.id} technique={t} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-slate-500">
          No techniques match your filters. Try clearing search or filters.
        </p>
      )}
    </PageContainer>
  );
}
