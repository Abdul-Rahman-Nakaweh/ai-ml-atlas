export type Generation =
  | "Gen 1"
  | "Gen 2"
  | "Gen 3"
  | "Cross-generation";

export type PipelineStage =
  | "Problem Definition"
  | "Data Collection"
  | "Data Cleaning"
  | "Preprocessing"
  | "Feature Engineering"
  | "Feature Selection / Extraction"
  | "Model Selection"
  | "Training"
  | "Hyperparameter Tuning"
  | "Validation"
  | "Evaluation"
  | "Optimization / Compression"
  | "Deployment"
  | "Monitoring";

export type Purpose =
  | "Classification"
  | "Regression"
  | "Clustering"
  | "Dimensionality Reduction"
  | "Forecasting"
  | "Generation"
  | "Retrieval"
  | "Embedded Deployment"
  | "Preprocessing"
  | "Validation"
  | "Optimization"
  | "General";

export type MathFoundation =
  | "Probability"
  | "Linear Algebra"
  | "Gradients"
  | "Optimization"
  | "Distance"
  | "Loss Functions"
  | "Matrix Operations"
  | "Statistics"
  | "Calculus"
  | "Attention"
  | "General";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type ConceptType =
  | "Algorithm"
  | "Metric"
  | "Preprocessing"
  | "Tuning"
  | "Deployment"
  | "Math"
  | "LLM Concept"
  | "General";

export type DeploymentRelevance = "None" | "Low" | "Medium" | "High";

/** Full technique card — add entries in src/data/techniques/ */
export interface Technique {
  id: string;
  name: string;
  category?: string;
  generation: Generation;
  pipelineStage: PipelineStage | PipelineStage[];
  purpose: Purpose | Purpose[];
  mathFoundation: MathFoundation | MathFoundation[];
  difficulty: Difficulty;
  conceptType: ConceptType;
  deploymentRelevance: DeploymentRelevance;
  quickExplanation: string;
  intuition: string;
  technicalExplanation?: string;
  mathIdea?: string;
  whenToUse: string;
  whenToAvoid: string;
  strengths: string[];
  limitations: string[];
  mainTradeoff: string;
  commonMistakes: string[];
  relatedConcepts: string[];
  learnBefore: string[];
  learnAfter: string[];
  deploymentNotes?: string;
}

/** @deprecated Legacy fields — normalized automatically in techniques/index.ts */
export interface LegacyTechniqueFields {
  shortDescription?: string;
  whenNotToUse?: string;
  tradeOffs?: string;
}

export interface GlossaryEntry {
  id: string;
  term: string;
  fullName?: string;
  definition: string;
  locationInWorkflow: string;
  /** What the term does or which problem it addresses (labeled "Function" in UI) */
  functionRole: string;
  technicalBasis: string;
  practicalExample: string;
  commonDistinction: string;
  limitations: string;
  relatedTerms: string[];
  /** Link to technique library id when available */
  techniqueId?: string;
}

export interface PipelineStageData {
  id: string;
  name: string;
  order: number;
  description: string;
  whyItMatters: string;
  techniques: string[];
  techniqueIds?: string[];
  commonMistakes: string[];
  relatedConcepts: string[];
  comesBefore?: string;
  comesAfter?: string;
}

export interface GenerationData {
  id: string;
  name: string;
  shortName: string;
  description: string;
  coreIdea: string;
  commonData: string;
  examples: string[];
  strengths: string[];
  limitations: string[];
}

export interface MathFoundationData {
  id: string;
  name: string;
  description: string;
  usedIn: string[];
  intuition: string;
  relatedTechniqueIds?: string[];
}

export interface AcronymMapping {
  technique: string;
  techniqueId?: string;
  math: string;
}

/** Add paths in src/data/learningPaths.ts */
export interface LearningPath {
  id: string;
  title: string;
  goal: string;
  audience: string;
  sequence: { label: string; techniqueId?: string; href?: string }[];
  prerequisites: string[];
  commonMistakes: string[];
  relatedPathIds: string[];
  relatedLinks: { label: string; href: string }[];
  accent: "cyan" | "emerald" | "violet" | "amber";
}

/** Add guides in src/data/decisionGuides.ts */
export interface DecisionGuide {
  id: string;
  title: string;
  situation: string;
  recommended: string[];
  compareAgainst: string[];
  avoid: string[];
  keyMetrics: string[];
  relatedConcepts: string[];
}

/** Add mistakes in src/data/commonMistakes.ts */
export interface CommonMistake {
  id: string;
  mistake: string;
  whyItMatters: string;
  betterPractice: string;
  relatedConcepts: string[];
  techniqueIds?: string[];
}

export interface ComparisonSection {
  id: string;
  title: string;
  description?: string;
  headers: string[];
  rows: { label: string; cells: string[] }[];
}
