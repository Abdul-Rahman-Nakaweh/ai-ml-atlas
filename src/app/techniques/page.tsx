import { Suspense } from "react";
import { HeroSection } from "@/components/HeroSection";
import { TechniqueLibrary } from "./TechniqueLibrary";

export const metadata = {
  title: "Technique Library | AI/ML Atlas",
  description: "Searchable concept cards with depth levels, filters, and pipeline context.",
};

export default function TechniquesPage() {
  return (
    <>
      <HeroSection
        title="Technique Library"
        subtitle="The library explains—search algorithms, metrics, methods, and LLM concepts."
        description="Filter by generation, pipeline stage, purpose, math, difficulty, concept type, and deployment relevance. Expand any card for Quick, Intuition, Technical, Math, Practical, and Deploy views."
      />
      <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading library…</div>}>
        <TechniqueLibrary />
      </Suspense>
    </>
  );
}
