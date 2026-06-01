import type { VisualAidType } from "@/types/visual";

/**
 * Attach educational visuals to Concept Library entries by concept id.
 * Add an id here and implement the matching component in src/components/visuals/.
 */
export const conceptVisualAids: Partial<Record<string, VisualAidType>> = {
  pca: "pca",
  svm: "svm-margin",
  knn: "knn",
  "decision-tree": "decision-tree",
  "random-forest": "decision-tree",
  "neural-network": "neural-network",
  cnn: "neural-network",
  transformer: "attention",
  attention: "attention",
  "self-attention": "attention",
  "confusion-matrix": "confusion-matrix",
  accuracy: "confusion-matrix",
  precision: "metric-relations",
  recall: "metric-relations",
  "f1-score": "metric-relations",
  overfitting: "error-curve",
  quantization: "quantization",
  pruning: "quantization",
  tinyml: "tinyml-tradeoff",
  "cross-validation": "data-split",
  "train-test-split": "data-split",
  validation: "data-split",
  testing: "data-split",
};
