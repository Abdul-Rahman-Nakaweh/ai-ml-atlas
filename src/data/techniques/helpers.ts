import type {
  ConceptType,
  DeploymentRelevance,
  Difficulty,
  Generation,
  LegacyTechniqueFields,
  MathFoundation,
  PipelineStage,
  Purpose,
  Technique,
} from "@/types";

type TechniqueInput = Omit<Technique, never> &
  LegacyTechniqueFields & {
    /** Shorthand if quickExplanation omitted */
    shortDescription?: string;
    whenNotToUse?: string;
    tradeOffs?: string;
  };

const defaults: Pick<
  Technique,
  "difficulty" | "conceptType" | "deploymentRelevance" | "learnBefore" | "learnAfter" | "commonMistakes"
> = {
  difficulty: "Intermediate",
  conceptType: "General",
  deploymentRelevance: "None",
  learnBefore: [],
  learnAfter: [],
  commonMistakes: [],
};

/** Use defineTechnique() when adding technique cards — fills legacy field gaps. */
export function defineTechnique(input: TechniqueInput): Technique {
  const quick =
    input.quickExplanation ??
    input.shortDescription ??
    "Concept in the AI/ML Atlas technique library.";

  return {
    ...defaults,
    ...input,
    quickExplanation: quick,
    whenToAvoid: input.whenToAvoid ?? input.whenNotToUse ?? "See trade-offs and limitations.",
    mainTradeoff: input.mainTradeoff ?? input.tradeOffs ?? "Balance capability with constraints.",
    intuition:
      input.intuition ??
      input.technicalExplanation ??
      quick,
    commonMistakes:
      input.commonMistakes?.length ? input.commonMistakes : [],
    learnBefore: input.learnBefore ?? [],
    learnAfter: input.learnAfter ?? [],
  };
}

/** Infer concept type from name/context when not set */
export function inferConceptType(name: string, stage: PipelineStage | PipelineStage[]): ConceptType {
  const s = Array.isArray(stage) ? stage[0] : stage;
  if (s === "Evaluation") return "Metric";
  if (s === "Preprocessing" || s === "Data Cleaning") return "Preprocessing";
  if (s === "Hyperparameter Tuning" || s === "Validation") return "Tuning";
  if (s === "Deployment" || s === "Optimization / Compression") return "Deployment";
  if (name.match(/LLM|GPT|BERT|RAG|Token|Embedding|Attention|Transformer/i)) return "LLM Concept";
  if (name.match(/Accuracy|Precision|Recall|F1|ROC|MAE|MSE|RMSE|R²|Confusion/i)) return "Metric";
  return "Algorithm";
}

export function inferDifficulty(generation: Generation, conceptType: ConceptType): Difficulty {
  if (conceptType === "Metric" || conceptType === "Preprocessing") return "Beginner";
  if (generation === "Gen 3" && conceptType === "LLM Concept") return "Advanced";
  if (generation === "Gen 2") return "Intermediate";
  if (generation === "Gen 1") return "Beginner";
  return "Intermediate";
}

export function inferDeployment(
  deploymentNotes?: string,
  purpose?: Purpose | Purpose[]
): DeploymentRelevance {
  if (deploymentNotes) return "High";
  const purposes = Array.isArray(purpose) ? purpose : [purpose];
  if (purposes.includes("Embedded Deployment")) return "High";
  if (purposes.includes("Optimization")) return "Medium";
  return "None";
}
