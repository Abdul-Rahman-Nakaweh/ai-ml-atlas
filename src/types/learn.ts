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
  type: "paragraph" | "list" | "concept" | "table";
  content?: string;
  title?: string;
  items?: string[];
  concept?: FormalConcept;
  headers?: string[];
  rows?: { label: string; cells: string[] }[];
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
  { id: "foundations", label: "Foundations" },
  { id: "generations", label: "AI Generations" },
  { id: "pipeline", label: "ML Pipeline" },
  { id: "models", label: "Models and Techniques" },
  { id: "evaluation", label: "Evaluation" },
  { id: "optimization", label: "Optimization" },
  { id: "deployment", label: "Deployment" },
  { id: "modern-ai", label: "Modern AI" },
  { id: "tinyml", label: "TinyML" },
] as const;
