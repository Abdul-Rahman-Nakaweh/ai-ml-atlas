import type { Technique } from "@/types";
import { classicalMl } from "./classical-ml";
import { preprocessing } from "./preprocessing";
import { features } from "./features";
import { validation } from "./validation";
import { evaluation } from "./evaluation";
import { deepLearning } from "./deep-learning";
import { modernAi } from "./modern-ai";
import { deployment } from "./deployment";

export const techniques: Technique[] = [
  ...classicalMl,
  ...preprocessing,
  ...features,
  ...validation,
  ...evaluation,
  ...deepLearning,
  ...modernAi,
  ...deployment,
];

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
  "Validation Strategy",
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
