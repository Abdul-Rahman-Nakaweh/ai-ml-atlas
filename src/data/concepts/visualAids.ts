import type { VisualAidType } from "@/types/visual";

/**
 * Attach educational visuals to Concept Library entries by concept id.
 * Add an id here and implement the matching component in src/components/visuals/.
 */
export const conceptVisualTypes: Partial<Record<string, VisualAidType>> = {
  // Foundations
  dataset: "dataset-table",
  feature: "feature-vs-label",
  label: "feature-vs-label",
  training: "training-vs-inference",
  inference: "training-vs-inference",
  parameter: "parameter-vs-hyperparameter",
  hyperparameter: "parameter-vs-hyperparameter",
  // Preprocessing
  standardization: "standardization",
  normalization: "normalization",
  "one-hot-encoding": "one-hot-encoding",
  "feature-selection": "feature-selection-extraction",
  "feature-extraction": "feature-selection-extraction",
  pca: "pca",
  // Algorithms
  "linear-regression": "linear-regression",
  "logistic-regression": "logistic-regression",
  svm: "svm-margin",
  knn: "knn",
  "decision-tree": "decision-tree",
  "random-forest": "random-forest",
  "gradient-boosting": "gradient-boosting",
  // Validation
  "train-test-split": "data-split",
  validation: "data-split",
  testing: "data-split",
  "cross-validation": "cross-validation",
  "nested-cv": "nested-cv",
  "grid-search": "grid-search",
  "bias-variance": "bias-variance",
  overfitting: "error-curve",
  underfitting: "error-curve-underfitting",
  // Metrics
  "confusion-matrix": "confusion-matrix",
  accuracy: "accuracy-metric",
  precision: "precision-recall",
  recall: "precision-recall",
  "f1-score": "metric-relations",
  "roc-auc": "roc-auc",
  mae: "mae-rmse",
  rmse: "mae-rmse",
  mse: "mae-rmse",
  // Deep learning
  "neural-network": "neural-network",
  mlp: "neural-network",
  cnn: "cnn",
  rnn: "rnn-lstm",
  lstm: "rnn-lstm",
  backpropagation: "backpropagation",
  "gradient-descent": "gradient-descent",
  // Modern AI
  tokenization: "tokenization",
  embeddings: "embeddings",
  transformer: "transformer-block",
  attention: "attention",
  "self-attention": "attention",
  rag: "rag",
  "vector-database": "vector-database",
  "fine-tuning": "fine-tuning-lora",
  lora: "fine-tuning-lora",
  "tool-use": "agent-tool-use",
  "ai-agents": "agent-tool-use",
  // Deployment
  quantization: "quantization",
  pruning: "pruning",
  "knowledge-distillation": "knowledge-distillation",
  onnx: "onnx",
  tflite: "tflite",
  tflm: "tflite",
  "deployment-verification": "deployment-verification",
  tinyml: "tinyml-tradeoff",
  "hardware-aware-selection": "tinyml-tradeoff",
};

/** @deprecated Use conceptVisualTypes */
export const conceptVisualAids = conceptVisualTypes;
