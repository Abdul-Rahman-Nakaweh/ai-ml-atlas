import type { Concept } from "@/types/concept";
import type { ConceptType, ConceptPipelineStage, ConceptDifficulty, ConceptGeneration, ConceptPurpose } from "@/types/concept";
import { glossaryEntries } from "@/data/glossary";
import { techniques } from "@/data/techniques";
import {
  glossaryToConcept,
  mergeConcept,
  techniqueToConcept,
} from "./mappers";
import { conceptOverrides } from "./overrides";
import { conceptVisualTypes } from "./visualAids";
import { resolveLibraryCategory } from "./libraryCategories";
import { LIBRARY_CATEGORIES } from "@/types/concept";

/** ID aliases: glossary id → canonical concept id */
const GLOSSARY_ID_ALIAS: Record<string, string> = {
  f1: "f1-score",
  embedding: "embeddings",
  "vector-db": "vector-database",
};

function buildConceptLibrary(): Concept[] {
  const preliminaryIds = new Set<string>([
    ...techniques.map((t) => t.id),
    ...glossaryEntries.map((e) => GLOSSARY_ID_ALIAS[e.id] ?? e.id),
    ...Object.keys(conceptOverrides),
  ]);
  const byId = new Map<string, Concept>();

  for (const t of techniques) {
    byId.set(t.id, techniqueToConcept(t, preliminaryIds));
  }

  for (const g of glossaryEntries) {
    const canonicalId = GLOSSARY_ID_ALIAS[g.id] ?? g.id;
    const concept = glossaryToConcept({ ...g, id: canonicalId }, preliminaryIds);
    const existing = byId.get(canonicalId);
    if (existing) {
      byId.set(
        canonicalId,
        mergeConcept(existing, {
          name: concept.name,
          fullName: concept.fullName,
          summary: concept.summary,
          coreMeaning: concept.coreMeaning,
          workflowLocation: concept.workflowLocation,
          functionRole: concept.functionRole,
          mechanism: concept.mechanism,
          example: concept.example,
          commonDistinction: concept.commonDistinction,
          limitation: concept.limitation,
          conceptType: concept.conceptType,
          pipelineStage: concept.pipelineStage,
          difficulty: concept.difficulty,
          purpose: concept.purpose,
          generation: concept.generation,
          learnBefore: concept.learnBefore.length ? concept.learnBefore : undefined,
          learnAfter: concept.learnAfter.length ? concept.learnAfter : undefined,
          relatedConcepts: concept.relatedConcepts.length
            ? concept.relatedConcepts
            : undefined,
        })
      );
    } else {
      byId.set(canonicalId, concept);
    }
  }

  for (const [id, patch] of Object.entries(conceptOverrides)) {
    if (!patch) continue;
    const canonicalId = patch.id ?? id;
    const existing = byId.get(canonicalId);
    if (existing) {
      byId.set(canonicalId, mergeConcept(existing, { ...patch, id: canonicalId }));
    } else if (
      patch.name &&
      patch.summary &&
      patch.coreMeaning &&
      patch.workflowLocation &&
      patch.mechanism &&
      patch.example &&
      patch.commonDistinction &&
      patch.limitation
    ) {
      byId.set(canonicalId, {
        learnBefore: [],
        learnAfter: [],
        relatedConcepts: [],
        functionRole: patch.functionRole ?? "",
        ...patch,
        id: canonicalId,
      } as Concept);
    }
  }

  const allIds = new Set(byId.keys());
  return Array.from(byId.values())
    .map((c) => {
      const visualType = c.visualType ?? c.visualAid ?? conceptVisualTypes[c.id];
      const withCategory = { ...c, libraryCategory: resolveLibraryCategory(c) };
      return {
        ...withCategory,
        visualType,
        visualAid: visualType,
        learnBefore: c.learnBefore.filter((id) => allIds.has(id)),
        learnAfter: c.learnAfter.filter((id) => allIds.has(id)),
        relatedConcepts: c.relatedConcepts.filter((id) => allIds.has(id)),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
}

export const concepts = buildConceptLibrary();

export const conceptById: Record<string, Concept> = Object.fromEntries(
  concepts.map((c) => [c.id, c])
);

export const conceptTypeOptions: readonly ConceptType[] = [
  "foundation",
  "algorithm",
  "metric",
  "preprocessing",
  "validation",
  "tuning",
  "optimization",
  "deployment",
  "math",
  "llm concept",
] as const;

export const conceptGenerationOptions: readonly ConceptGeneration[] = [
  "Gen 1",
  "Gen 2",
  "Gen 3",
  "Cross-generation",
] as const;

export const conceptPipelineOptions: readonly ConceptPipelineStage[] = [
  "foundations",
  "data",
  "preprocessing",
  "feature engineering",
  "model selection",
  "training",
  "tuning",
  "validation",
  "evaluation",
  "optimization",
  "deployment",
  "monitoring",
  "cross-cutting",
] as const;

export const conceptDifficultyOptions: readonly ConceptDifficulty[] = [
  "foundation",
  "intermediate",
  "advanced",
] as const;

export const conceptPurposeOptions: readonly ConceptPurpose[] = [
  "classification",
  "regression",
  "dimensionality reduction",
  "evaluation",
  "compression",
  "retrieval",
  "generation",
  "embedded deployment",
  "preprocessing",
  "validation",
  "optimization",
  "general",
] as const;

export const conceptCategoryLandings = LIBRARY_CATEGORIES.map((label) => ({
  label,
  category: label,
}));
