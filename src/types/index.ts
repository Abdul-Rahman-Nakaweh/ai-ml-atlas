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
  | "Validation Strategy"
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

export interface Technique {
  id: string;
  name: string;
  shortDescription: string;
  generation: Generation;
  pipelineStage: PipelineStage | PipelineStage[];
  purpose: Purpose | Purpose[];
  mathFoundation: MathFoundation | MathFoundation[];
  strengths: string[];
  limitations: string[];
  whenToUse: string;
  whenNotToUse: string;
  tradeOffs: string;
  relatedConcepts: string[];
  deploymentNotes?: string;
}

export interface GlossaryEntry {
  id: string;
  term: string;
  fullName?: string;
  simpleExplanation: string;
  whereItFits: string;
  relatedConcepts: string[];
}

export interface PipelineStageData {
  id: string;
  name: string;
  order: number;
  description: string;
  whyItMatters: string;
  techniques: string[];
  commonMistakes: string[];
  relatedConcepts: string[];
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
}

export interface AcronymMapping {
  technique: string;
  math: string;
}
