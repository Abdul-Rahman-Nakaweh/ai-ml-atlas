"use client";

import { useMemo, useState } from "react";
import { TechniqueCard } from "@/components/TechniqueCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterPills } from "@/components/FilterPills";
import { PageContainer } from "@/components/PageContainer";
import {
  techniques,
  generationOptions,
  pipelineStageOptions,
  purposeOptions,
  mathOptions,
} from "@/data/techniques";
import { normalizeArray } from "@/lib/utils";

export function TechniqueLibrary() {
  const [search, setSearch] = useState("");
  const [generation, setGeneration] = useState("All");
  const [pipeline, setPipeline] = useState("All");
  const [purpose, setPurpose] = useState("All");
  const [math, setMath] = useState("All");
  const [deployment, setDeployment] = useState("All");

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
      if (deployment === "Embedded" && !t.deploymentNotes) return false;
      if (q) {
        const haystack = [
          t.name,
          t.shortDescription,
          t.whenToUse,
          t.tradeOffs,
          ...t.relatedConcepts,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [search, generation, pipeline, purpose, math, deployment]);

  return (
    <PageContainer className="pb-16">
      <div className="sticky top-[57px] z-40 -mx-4 border-b border-atlas-border/40 bg-atlas-bg/95 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search techniques by name, description, or related concept..."
          className="mb-4"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            label="Deployment"
            options={["Embedded", "Cloud/General"]}
            selected={deployment}
            onSelect={setDeployment}
          />
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Showing {filtered.length} of {techniques.length} techniques
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
