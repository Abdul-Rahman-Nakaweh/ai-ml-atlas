export type ConceptType =
  | "foundation"
  | "algorithm"
  | "metric"
  | "preprocessing"
  | "validation"
  | "tuning"
  | "optimization"
  | "deployment"
  | "math"
  | "llm concept";

export type ConceptGeneration = "Gen 1" | "Gen 2" | "Gen 3" | "Cross-generation";

export type ConceptPipelineStage =
  | "foundations"
  | "data"
  | "preprocessing"
  | "feature engineering"
  | "model selection"
  | "training"
  | "tuning"
  | "validation"
  | "evaluation"
  | "optimization"
  | "deployment"
  | "monitoring"
  | "cross-cutting";

export type ConceptDifficulty = "foundation" | "intermediate" | "advanced";

export type ConceptPurpose =
  | "classification"
  | "regression"
  | "dimensionality reduction"
  | "evaluation"
  | "compression"
  | "retrieval"
  | "generation"
  | "embedded deployment"
  | "preprocessing"
  | "validation"
  | "optimization"
  | "general";

/** Unified concept entry for the Concept Library */
export interface Concept {
  id: string;
  name: string;
  fullName?: string;
  summary: string;
  conceptType: ConceptType;
  generation: ConceptGeneration;
  pipelineStage: ConceptPipelineStage;
  difficulty: ConceptDifficulty;
  purpose: ConceptPurpose;
  coreMeaning: string;
  workflowLocation: string;
  functionRole: string;
  mechanism: string;
  example: string;
  commonDistinction: string;
  limitation: string;
  learnBefore: string[];
  learnAfter: string[];
  relatedConcepts: string[];
  technicalNote?: string;
}
