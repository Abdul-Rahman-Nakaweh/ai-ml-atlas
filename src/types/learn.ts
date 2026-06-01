export interface FormalConcept {
  id: string;
  title: string;
  definition: string;
  roleInWorkflow: string;
  purpose: string;
  technicalBasis: string;
  practicalApplication: string;
  limitations: string;
  tradeOffs: string;
  relatedConcepts: string[];
  recommendedSequence?: { before: string[]; after: string[] };
  commonErrors?: string[];
}

export interface LearnBlock {
  type: "paragraph" | "list" | "concept" | "table" | "callout";
  content?: string;
  title?: string;
  items?: string[];
  concept?: FormalConcept;
  headers?: string[];
  rows?: { label: string; cells: string[] }[];
  /** For callout blocks only */
  variant?: "info" | "warning" | "tip";
}

export interface LearnSubsection {
  id: string;
  title: string;
  blocks: LearnBlock[];
}

export interface LearnChapter {
  id: string;
  order: number;
  title: string;
  overview: string;
  subsections: LearnSubsection[];
}

export const learnToc = [
  { id: "foundations", label: "Foundations of AI/ML" },
  { id: "generations", label: "AI Generations" },
  { id: "pipeline", label: "The ML Pipeline" },
  { id: "models", label: "Model Families" },
  { id: "evaluation", label: "Evaluation and Validation" },
  { id: "optimization", label: "Optimization and Deployment" },
  { id: "modern-ai", label: "Modern AI and LLMs" },
  { id: "tinyml", label: "TinyML and Embedded AI" },
] as const;
