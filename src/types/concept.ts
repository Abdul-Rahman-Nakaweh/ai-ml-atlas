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

/** Breadcrumb segment in the knowledge structure */
export interface ConceptPathSegment {
  label: string;
  /** When set and present in the library, segment is clickable */
  conceptId?: string;
}

/** Symbol definition for an equation or formal expression */
export interface EquationSymbol {
  symbol: string;
  meaning: string;
}

/** One formula block with its own symbol glossary — used for side-by-side comparisons */
export interface ConceptEquationPart {
  /** Optional heading (e.g. "ReLU", "Sigmoid") */
  label?: string;
  expression: string;
  /** Symbols scoped to this expression; rendered directly beneath it */
  symbols?: EquationSymbol[];
}

/** Equation or formal expression shown in the concept detail panel */
export interface ConceptEquation {
  /** Primary expression (plain-text math, readable without a renderer) */
  expression: string;
  /** What the expression measures or computes */
  summary: string;
  /** How the expression connects to the concept's role in practice */
  connection: string;
  /** Symbol glossary for every variable in the expression */
  symbols: EquationSymbol[];
  /** When set, each part renders in its own column with symbols aligned beneath that formula */
  parts?: ConceptEquationPart[];
  /** Optional note on when the expression applies or should not be used */
  useCase?: string;
}

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
  /** When set, renders the Equation or Formal Expression section */
  equation?: ConceptEquation;
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

  /** Hierarchy: where this concept sits in the broader AI/ML knowledge structure */
  conceptPath?: ConceptPathSegment[];
  /** Larger concepts this entry belongs under (library concept ids) */
  broaderConcepts?: string[];
  /** Smaller ideas or components inside this concept */
  subtopics?: string[];
  /** Named methods or practical techniques under this concept */
  specificTechniques?: string[];
  /** Alternative forms or types of this concept */
  variants?: string[];
  /** Concepts often confused with or compared against this one */
  commonlyComparedWith?: string[];
  /** Concepts that naturally follow after learning this one (may overlap learnAfter) */
  recommendedNext?: string[];
}
