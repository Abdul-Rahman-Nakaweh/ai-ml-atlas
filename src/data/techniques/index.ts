import type { Technique } from "@/types";
import { classicalMl } from "./classical-ml";
import { preprocessing } from "./preprocessing";
import { features } from "./features";
import { validation } from "./validation";
import { evaluation } from "./evaluation";
import { deepLearning } from "./deep-learning";
import { modernAi } from "./modern-ai";
import { deployment } from "./deployment";
import { enrichedTechniques } from "./enriched";
import {
  defineTechnique,
  inferConceptType,
  inferDeployment,
  inferDifficulty,
} from "./helpers";

// Legacy raw entries (shortDescription, whenNotToUse, tradeOffs)
const rawTechniques = [
  ...classicalMl,
  ...preprocessing,
  ...features,
  ...validation,
  ...evaluation,
  ...deepLearning,
  ...modernAi,
  ...deployment,
] as Array<Record<string, unknown>>;

/** Converts legacy technique objects to full Technique shape */
function normalizeLegacy(raw: Record<string, unknown>): Technique {
  const stage = raw.pipelineStage as Technique["pipelineStage"];
  const generation = raw.generation as Technique["generation"];
  const purpose = raw.purpose as Technique["purpose"];
  const conceptType =
    (raw.conceptType as Technique["conceptType"]) ??
    inferConceptType(String(raw.name), stage);

  return defineTechnique({
    id: String(raw.id),
    name: String(raw.name),
    category: raw.category as string | undefined,
    generation,
    pipelineStage: stage,
    purpose,
    mathFoundation: raw.mathFoundation as Technique["mathFoundation"],
    difficulty:
      (raw.difficulty as Technique["difficulty"]) ??
      inferDifficulty(generation, conceptType),
    conceptType,
    deploymentRelevance:
      (raw.deploymentRelevance as Technique["deploymentRelevance"]) ??
      inferDeployment(raw.deploymentNotes as string | undefined, purpose),
    quickExplanation:
      (raw.quickExplanation as string) ??
      (raw.shortDescription as string) ??
      "",
    intuition: (raw.intuition as string) ?? (raw.shortDescription as string) ?? "",
    technicalExplanation: raw.technicalExplanation as string | undefined,
    mathIdea: raw.mathIdea as string | undefined,
    whenToUse: String(raw.whenToUse ?? ""),
    whenToAvoid:
      (raw.whenToAvoid as string) ?? (raw.whenNotToUse as string) ?? "",
    strengths: (raw.strengths as string[]) ?? [],
    limitations: (raw.limitations as string[]) ?? [],
    mainTradeoff:
      (raw.mainTradeoff as string) ?? (raw.tradeOffs as string) ?? "",
    commonMistakes: (raw.commonMistakes as string[]) ?? [],
    relatedConcepts: (raw.relatedConcepts as string[]) ?? [],
    learnBefore: (raw.learnBefore as string[]) ?? [],
    learnAfter: (raw.learnAfter as string[]) ?? [],
    deploymentNotes: raw.deploymentNotes as string | undefined,
  });
}

const normalized = rawTechniques.map(normalizeLegacy);

const enrichedById = new Map(enrichedTechniques.map((t) => [t.id, t]));

export const techniques: Technique[] = normalized.map((t) => {
  const enriched = enrichedById.get(t.id);
  return enriched ? { ...t, ...enriched } : t;
});

export function getTechniqueById(id: string): Technique | undefined {
  return techniques.find((t) => t.id === id);
}

export const pipelineStageOptions = [
  "Problem Definition",
  "Data Collection",
  "Data Cleaning",
  "Preprocessing",
  "Feature Engineering",
  "Feature Selection / Extraction",
  "Model Selection",
  "Training",
  "Hyperparameter Tuning",
  "Validation",
  "Evaluation",
  "Optimization / Compression",
  "Deployment",
  "Monitoring",
] as const;

export const generationOptions = ["Gen 1", "Gen 2", "Gen 3", "Cross-generation"] as const;
export const purposeOptions = [
  "Classification",
  "Regression",
  "Clustering",
  "Dimensionality Reduction",
  "Forecasting",
  "Generation",
  "Retrieval",
  "Embedded Deployment",
  "Preprocessing",
  "Validation",
  "Optimization",
  "General",
] as const;
export const mathOptions = [
  "Probability",
  "Linear Algebra",
  "Gradients",
  "Optimization",
  "Distance",
  "Loss Functions",
  "Matrix Operations",
  "Statistics",
  "Calculus",
  "Attention",
  "General",
] as const;
export const difficultyOptions = ["Beginner", "Intermediate", "Advanced"] as const;
export const conceptTypeOptions = [
  "Algorithm",
  "Metric",
  "Preprocessing",
  "Tuning",
  "Deployment",
  "Math",
  "LLM Concept",
  "General",
] as const;
export const deploymentOptions = ["None", "Low", "Medium", "High"] as const;
