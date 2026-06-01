import type { Concept, LibraryCategory } from "@/types/concept";
import { LIBRARY_CATEGORIES } from "@/types/concept";

export { LIBRARY_CATEGORIES };
export type { LibraryCategory };

/** Explicit category overrides for concepts that heuristics might misclassify */
const CATEGORY_BY_ID: Partial<Record<string, LibraryCategory>> = {
  ai: "Foundations",
  ml: "Foundations",
  dl: "Foundations",
  dataset: "Foundations",
  feature: "Foundations",
  label: "Foundations",
  target: "Foundations",
  model: "Foundations",
  parameter: "Foundations",
  hyperparameter: "Foundations",
  training: "Foundations",
  inference: "Foundations",
  preprocessing: "Preprocessing and Features",
  standardization: "Preprocessing and Features",
  normalization: "Preprocessing and Features",
  "one-hot-encoding": "Preprocessing and Features",
  "label-encoding": "Preprocessing and Features",
  "min-max-scaling": "Preprocessing and Features",
  "missing-value-imputation": "Preprocessing and Features",
  "outlier-handling": "Preprocessing and Features",
  "feature-engineering": "Preprocessing and Features",
  "feature-selection": "Preprocessing and Features",
  "feature-extraction": "Preprocessing and Features",
  pca: "Preprocessing and Features",
  embeddings: "Modern AI and LLMs",
  "linear-regression": "Algorithms",
  "logistic-regression": "Algorithms",
  svm: "Algorithms",
  knn: "Algorithms",
  "decision-tree": "Algorithms",
  "random-forest": "Algorithms",
  "gradient-boosting": "Algorithms",
  xgboost: "Algorithms",
  "naive-bayes": "Algorithms",
  "confusion-matrix": "Evaluation Metrics",
  accuracy: "Evaluation Metrics",
  precision: "Evaluation Metrics",
  recall: "Evaluation Metrics",
  "f1-score": "Evaluation Metrics",
  "roc-auc": "Evaluation Metrics",
  specificity: "Evaluation Metrics",
  mse: "Evaluation Metrics",
  mae: "Evaluation Metrics",
  rmse: "Evaluation Metrics",
  "r-squared": "Evaluation Metrics",
  "cross-validation": "Validation and Tuning",
  "train-test-split": "Validation and Tuning",
  validation: "Validation and Tuning",
  testing: "Validation and Tuning",
  "data-leakage": "Validation and Tuning",
  overfitting: "Validation and Tuning",
  underfitting: "Validation and Tuning",
  "bias-variance": "Validation and Tuning",
  "nested-cv": "Validation and Tuning",
  "stratified-cv": "Validation and Tuning",
  "hyperparameter-tuning": "Validation and Tuning",
  "grid-search": "Validation and Tuning",
  "random-search": "Validation and Tuning",
  "bayesian-optimization": "Validation and Tuning",
  regularization: "Validation and Tuning",
  "neural-network": "Deep Learning",
  cnn: "Deep Learning",
  rnn: "Deep Learning",
  lstm: "Deep Learning",
  mlp: "Deep Learning",
  backpropagation: "Deep Learning",
  "gradient-descent": "Deep Learning",
  "activation-function": "Deep Learning",
  autoencoder: "Deep Learning",
  vit: "Deep Learning",
  transformer: "Modern AI and LLMs",
  attention: "Modern AI and LLMs",
  "self-attention": "Modern AI and LLMs",
  tokenization: "Modern AI and LLMs",
  llm: "Modern AI and LLMs",
  gpt: "Modern AI and LLMs",
  bert: "Modern AI and LLMs",
  rag: "Modern AI and LLMs",
  "vector-database": "Modern AI and LLMs",
  "prompt-engineering": "Modern AI and LLMs",
  "fine-tuning": "Modern AI and LLMs",
  lora: "Modern AI and LLMs",
  "ai-agents": "Modern AI and LLMs",
  "tool-use": "Modern AI and LLMs",
  hallucination: "Modern AI and LLMs",
  "knowledge-distillation": "Deployment and TinyML",
  quantization: "Deployment and TinyML",
  pruning: "Deployment and TinyML",
  "model-compression": "Deployment and TinyML",
  onnx: "Deployment and TinyML",
  tflite: "Deployment and TinyML",
  tflm: "Deployment and TinyML",
  tinyml: "Deployment and TinyML",
  "embedded-c": "Deployment and TinyML",
  "hardware-aware-selection": "Deployment and TinyML",
  "deployment-verification": "Deployment and TinyML",
  "loss-function": "Math and Optimization",
};

const DEEP_LEARNING_IDS = new Set([
  "neural-network",
  "cnn",
  "rnn",
  "lstm",
  "mlp",
  "backpropagation",
  "activation-function",
  "autoencoder",
  "vit",
]);

export function resolveLibraryCategory(concept: Concept): LibraryCategory {
  const explicit = CATEGORY_BY_ID[concept.id];
  if (explicit) return explicit;

  if (concept.conceptType === "foundation") return "Foundations";
  if (concept.conceptType === "metric") return "Evaluation Metrics";
  if (concept.conceptType === "preprocessing") return "Preprocessing and Features";
  if (concept.conceptType === "validation" || concept.conceptType === "tuning")
    return "Validation and Tuning";
  if (concept.conceptType === "deployment" || concept.conceptType === "optimization")
    return "Deployment and TinyML";
  if (concept.conceptType === "llm concept") return "Modern AI and LLMs";
  if (concept.conceptType === "math") return "Math and Optimization";
  if (DEEP_LEARNING_IDS.has(concept.id)) return "Deep Learning";
  if (concept.conceptType === "algorithm") {
    if (concept.generation === "Gen 2" || concept.generation === "Gen 3") return "Deep Learning";
    return "Algorithms";
  }
  if (concept.generation === "Gen 3") return "Modern AI and LLMs";

  if (concept.pipelineStage === "preprocessing" || concept.pipelineStage === "feature engineering")
    return "Preprocessing and Features";
  if (concept.pipelineStage === "validation" || concept.pipelineStage === "tuning")
    return "Validation and Tuning";
  if (concept.pipelineStage === "evaluation") return "Evaluation Metrics";
  if (concept.pipelineStage === "deployment" || concept.pipelineStage === "optimization")
    return "Deployment and TinyML";

  return "Foundations";
}

export function formatDifficultyLabel(difficulty: Concept["difficulty"]): string {
  if (difficulty === "foundation") return "Foundation";
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}
