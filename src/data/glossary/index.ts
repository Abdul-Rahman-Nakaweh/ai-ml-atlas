import type { GlossaryCategory, GlossaryEntry } from "@/types";
import { deploymentEntries } from "./entries/deployment";
import { evaluationEntries } from "./entries/evaluation";
import { foundationEntries } from "./entries/foundations";
import { modelEntries } from "./entries/models";
import { modernEntries } from "./entries/modern";
import { pipelineEntries } from "./entries/pipeline";

/** Edit glossary terms in src/data/glossary/entries/*.ts */
export const glossaryEntries: GlossaryEntry[] = [
  ...foundationEntries,
  ...pipelineEntries,
  ...modelEntries,
  ...evaluationEntries,
  ...deploymentEntries,
  ...modernEntries,
].sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: "base" }));

export const glossaryById: Record<string, GlossaryEntry> = Object.fromEntries(
  glossaryEntries.map((e) => [e.id, e])
);

export const glossaryCategories: readonly GlossaryCategory[] = [
  "Foundations",
  "Data & Features",
  "Models",
  "Evaluation",
  "Optimization & Deployment",
  "Modern AI",
] as const;
