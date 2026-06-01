import type { VisualAidType } from "./visual";

export const LIBRARY_CATEGORIES = [
  "Foundations",
  "Preprocessing and Features",
  "Algorithms",
  "Evaluation Metrics",
  "Validation and Tuning",
  "Deep Learning",
  "Modern AI and LLMs",
  "Deployment and TinyML",
  "Math and Optimization",
] as const;

export type LibraryCategory = (typeof LIBRARY_CATEGORIES)[number];

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
  libraryCategory: LibraryCategory;
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
  /** From technique metadata — used in advanced filters */
  deploymentRelevance?: string;
  mathFoundation?: string[];
  /** When set, the detail panel shows a Visual Intuition diagram */
  visualType?: VisualAidType;
  /** @deprecated Use visualType */
  visualAid?: VisualAidType;
}
