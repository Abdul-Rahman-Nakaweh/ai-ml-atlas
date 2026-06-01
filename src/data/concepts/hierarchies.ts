import type { Concept, ConceptPathSegment } from "@/types/concept";

/** Hierarchy patches keyed by concept id — merged after base concept build */
export const conceptHierarchyPatches: Partial<
  Record<
    string,
    Pick<
      Concept,
      | "conceptPath"
      | "broaderConcepts"
      | "subtopics"
      | "specificTechniques"
      | "variants"
      | "commonlyComparedWith"
      | "recommendedNext"
    >
  >
> = {
  "model-compression": {
    conceptPath: [
      { label: "Optimization and Deployment", conceptId: "optimization-area" },
      { label: "Model Compression" },
    ],
    broaderConcepts: ["optimization-area", "deployment-practices"],
    specificTechniques: ["quantization", "pruning", "knowledge-distillation"],
    recommendedNext: ["quantization", "tinyml"],
    commonlyComparedWith: ["knowledge-distillation"],
  },
  preprocessing: {
    conceptPath: [{ label: "ML Pipeline" }, { label: "Preprocessing" }],
    broaderConcepts: ["preprocessing-methods"],
    recommendedNext: ["standardization", "feature-engineering"],
  },
  "feature-engineering": {
    conceptPath: [
      { label: "ML Pipeline" },
      { label: "Feature Methods", conceptId: "feature-methods" },
      { label: "Feature Engineering" },
    ],
    broaderConcepts: ["feature-methods"],
    recommendedNext: ["feature-selection", "feature-extraction"],
  },
  "cross-validation": {
    conceptPath: [
      { label: "ML Pipeline" },
      { label: "Validation", conceptId: "validation" },
      { label: "Cross-Validation Methods", conceptId: "cross-validation-methods" },
      { label: "k-Fold Cross-Validation" },
    ],
    broaderConcepts: ["cross-validation-methods", "validation"],
    variants: ["stratified-cv", "nested-cv"],
    recommendedNext: ["nested-cv", "grid-search"],
    commonlyComparedWith: ["train-test-split"],
  },
  transformer: {
    conceptPath: [
      { label: "Modern AI", conceptId: "modern-ai" },
      { label: "Transformers", conceptId: "transformer-architecture" },
      { label: "Transformer" },
    ],
    broaderConcepts: ["transformer-architecture", "modern-ai", "dl"],
    subtopics: ["attention", "self-attention", "tokenization", "embeddings"],
    recommendedNext: ["self-attention", "fine-tuning"],
    commonlyComparedWith: ["rnn", "lstm"],
  },
  rag: {
    conceptPath: [
      { label: "Modern AI", conceptId: "modern-ai" },
      { label: "RAG System", conceptId: "rag-system" },
      { label: "RAG" },
    ],
    broaderConcepts: ["rag-system", "modern-ai"],
    subtopics: ["embeddings", "vector-database"],
    recommendedNext: ["vector-database", "prompt-engineering"],
    commonlyComparedWith: ["fine-tuning"],
  },
  tinyml: {
    conceptPath: [
      { label: "Embedded AI" },
      { label: "TinyML System", conceptId: "tinyml-system" },
      { label: "TinyML" },
    ],
    broaderConcepts: ["tinyml-system", "deployment-practices"],
    subtopics: ["quantization", "tflm", "deployment-verification"],
    recommendedNext: ["hardware-aware-selection", "deployment-verification"],
  },
  dl: {
    conceptPath: [{ label: "ML Pipeline" }, { label: "Deep Learning" }],
    broaderConcepts: ["ml"],
    subtopics: ["neural-network", "cnn", "transformer"],
    specificTechniques: ["backpropagation", "gradient-descent"],
    recommendedNext: ["neural-network", "cnn"],
    commonlyComparedWith: ["classical-ml"],
  },
  ml: {
    conceptPath: [{ label: "Foundations" }, { label: "Machine Learning" }],
    subtopics: ["classical-ml", "dl", "validation"],
    recommendedNext: ["dataset", "training"],
  },
  quantization: {
    conceptPath: [
      { label: "Optimization and Deployment", conceptId: "optimization-area" },
      { label: "Model Compression", conceptId: "model-compression" },
      { label: "Quantization" },
    ],
    broaderConcepts: ["model-compression", "optimization-area"],
    recommendedNext: ["tflite", "deployment-verification"],
    commonlyComparedWith: ["pruning"],
  },
  pruning: {
    conceptPath: [
      { label: "Optimization and Deployment", conceptId: "optimization-area" },
      { label: "Model Compression", conceptId: "model-compression" },
      { label: "Pruning" },
    ],
    broaderConcepts: ["model-compression", "optimization-area"],
    recommendedNext: ["quantization", "knowledge-distillation"],
    commonlyComparedWith: ["quantization"],
  },
  "knowledge-distillation": {
    conceptPath: [
      { label: "Optimization and Deployment", conceptId: "optimization-area" },
      { label: "Model Compression", conceptId: "model-compression" },
      { label: "Knowledge Distillation" },
    ],
    broaderConcepts: ["model-compression", "optimization-area"],
    recommendedNext: ["quantization", "tinyml"],
    commonlyComparedWith: ["pruning"],
  },
  accuracy: {
    conceptPath: [
      { label: "ML Pipeline" },
      { label: "Evaluation", conceptId: "validation" },
      { label: "Evaluation Metrics", conceptId: "evaluation-metrics" },
      { label: "Accuracy" },
    ],
    broaderConcepts: ["evaluation-metrics"],
    commonlyComparedWith: ["precision", "recall", "f1-score"],
    recommendedNext: ["precision", "confusion-matrix"],
  },
  precision: {
    conceptPath: [
      { label: "ML Pipeline" },
      { label: "Evaluation", conceptId: "validation" },
      { label: "Evaluation Metrics", conceptId: "evaluation-metrics" },
      { label: "Classification Metrics" },
      { label: "Precision" },
    ],
    broaderConcepts: ["evaluation-metrics"],
    commonlyComparedWith: ["recall", "f1-score"],
    recommendedNext: ["recall", "f1-score"],
  },
  recall: {
    conceptPath: [
      { label: "ML Pipeline" },
      { label: "Evaluation", conceptId: "validation" },
      { label: "Evaluation Metrics", conceptId: "evaluation-metrics" },
      { label: "Classification Metrics" },
      { label: "Recall" },
    ],
    broaderConcepts: ["evaluation-metrics"],
    commonlyComparedWith: ["precision", "f1-score"],
    recommendedNext: ["precision", "roc-auc"],
  },
  specificity: {
    conceptPath: [
      { label: "ML Pipeline" },
      { label: "Evaluation Metrics", conceptId: "evaluation-metrics" },
      { label: "Specificity" },
    ],
    broaderConcepts: ["evaluation-metrics"],
    commonlyComparedWith: ["recall", "precision"],
  },
  "f1-score": {
    conceptPath: [
      { label: "ML Pipeline" },
      { label: "Evaluation Metrics", conceptId: "evaluation-metrics" },
      { label: "F1-score" },
    ],
    broaderConcepts: ["evaluation-metrics"],
    commonlyComparedWith: ["precision", "recall", "roc-auc"],
    recommendedNext: ["roc-auc"],
  },
  "roc-auc": {
    conceptPath: [
      { label: "ML Pipeline" },
      { label: "Evaluation Metrics", conceptId: "evaluation-metrics" },
      { label: "ROC-AUC" },
    ],
    broaderConcepts: ["evaluation-metrics"],
    commonlyComparedWith: ["f1-score", "precision"],
    recommendedNext: ["precision", "hyperparameter-tuning"],
  },
  "confusion-matrix": {
    conceptPath: [
      { label: "ML Pipeline" },
      { label: "Evaluation Metrics", conceptId: "evaluation-metrics" },
      { label: "Confusion Matrix" },
    ],
    broaderConcepts: ["evaluation-metrics"],
    recommendedNext: ["precision", "recall"],
  },
  mae: {
    conceptPath: [
      { label: "Evaluation Metrics", conceptId: "evaluation-metrics" },
      { label: "Regression Metrics" },
      { label: "MAE" },
    ],
    broaderConcepts: ["evaluation-metrics"],
    commonlyComparedWith: ["rmse", "mse"],
  },
  rmse: {
    conceptPath: [
      { label: "Evaluation Metrics", conceptId: "evaluation-metrics" },
      { label: "Regression Metrics" },
      { label: "RMSE" },
    ],
    broaderConcepts: ["evaluation-metrics"],
    commonlyComparedWith: ["mae", "r-squared"],
  },
  standardization: {
    conceptPath: [
      { label: "ML Pipeline" },
      { label: "Preprocessing", conceptId: "preprocessing-methods" },
      { label: "Standardization" },
    ],
    broaderConcepts: ["preprocessing-methods", "preprocessing"],
    commonlyComparedWith: ["normalization"],
    recommendedNext: ["pca", "svm"],
  },
  normalization: {
    conceptPath: [
      { label: "ML Pipeline" },
      { label: "Preprocessing", conceptId: "preprocessing-methods" },
      { label: "Normalization" },
    ],
    broaderConcepts: ["preprocessing-methods", "preprocessing"],
    commonlyComparedWith: ["standardization"],
    recommendedNext: ["neural-network"],
  },
  "one-hot-encoding": {
    conceptPath: [
      { label: "Preprocessing", conceptId: "preprocessing-methods" },
      { label: "One-Hot Encoding" },
    ],
    broaderConcepts: ["preprocessing-methods"],
    commonlyComparedWith: ["label-encoding"],
    recommendedNext: ["logistic-regression"],
  },
  "feature-selection": {
    conceptPath: [
      { label: "Feature Methods", conceptId: "feature-methods" },
      { label: "Feature Selection" },
    ],
    broaderConcepts: ["feature-methods", "feature-engineering"],
    commonlyComparedWith: ["feature-extraction", "pca"],
    recommendedNext: ["pca"],
  },
  "feature-extraction": {
    conceptPath: [
      { label: "Feature Methods", conceptId: "feature-methods" },
      { label: "Feature Extraction" },
    ],
    broaderConcepts: ["feature-methods", "feature-engineering"],
    commonlyComparedWith: ["feature-selection"],
    recommendedNext: ["pca", "embeddings"],
  },
  pca: {
    conceptPath: [
      { label: "ML Pipeline" },
      { label: "Feature Methods", conceptId: "feature-methods" },
      { label: "Feature Extraction", conceptId: "feature-extraction" },
      { label: "PCA" },
    ],
    broaderConcepts: ["feature-extraction", "feature-methods"],
    commonlyComparedWith: ["feature-selection", "embeddings"],
    recommendedNext: ["embeddings", "autoencoder"],
  },
  embeddings: {
    conceptPath: [
      { label: "Feature Methods", conceptId: "feature-methods" },
      { label: "Embeddings" },
    ],
    broaderConcepts: ["feature-methods", "modern-ai"],
    commonlyComparedWith: ["pca", "one-hot-encoding"],
    recommendedNext: ["vector-database", "transformer"],
  },
  "stratified-cv": {
    conceptPath: [
      { label: "Cross-Validation Methods", conceptId: "cross-validation-methods" },
      { label: "Stratified Cross-Validation" },
    ],
    broaderConcepts: ["cross-validation-methods", "cross-validation"],
    variants: ["cross-validation"],
    commonlyComparedWith: ["cross-validation"],
    recommendedNext: ["nested-cv"],
  },
  "nested-cv": {
    conceptPath: [
      { label: "Cross-Validation Methods", conceptId: "cross-validation-methods" },
      { label: "Nested Cross-Validation" },
    ],
    broaderConcepts: ["cross-validation-methods", "cross-validation"],
    commonlyComparedWith: ["cross-validation", "grid-search"],
    recommendedNext: ["grid-search"],
  },
  tokenization: {
    conceptPath: [
      { label: "Modern AI", conceptId: "modern-ai" },
      { label: "Transformers", conceptId: "transformer-architecture" },
      { label: "Tokenization" },
    ],
    broaderConcepts: ["transformer-architecture", "transformer"],
    recommendedNext: ["embeddings", "transformer"],
  },
  attention: {
    conceptPath: [
      { label: "Modern AI", conceptId: "modern-ai" },
      { label: "Transformers", conceptId: "transformer-architecture" },
      { label: "Attention" },
    ],
    broaderConcepts: ["transformer-architecture", "transformer"],
    subtopics: ["self-attention"],
    commonlyComparedWith: ["rnn"],
    recommendedNext: ["self-attention", "transformer"],
  },
  "self-attention": {
    conceptPath: [
      { label: "Transformers", conceptId: "transformer-architecture" },
      { label: "Attention", conceptId: "attention" },
      { label: "Self-Attention" },
    ],
    broaderConcepts: ["attention", "transformer-architecture"],
    commonlyComparedWith: ["attention"],
    recommendedNext: ["transformer"],
  },
  "vector-database": {
    conceptPath: [
      { label: "Modern AI", conceptId: "modern-ai" },
      { label: "RAG System", conceptId: "rag-system" },
      { label: "Vector Database" },
    ],
    broaderConcepts: ["rag-system", "rag"],
    recommendedNext: ["rag", "prompt-engineering"],
    commonlyComparedWith: ["embeddings"],
  },
  "deployment-verification": {
    conceptPath: [
      { label: "Embedded AI" },
      { label: "TinyML System", conceptId: "tinyml-system" },
      { label: "Deployment Verification" },
    ],
    broaderConcepts: ["tinyml-system", "deployment-practices", "tinyml"],
    recommendedNext: ["tinyml"],
    commonlyComparedWith: ["validation"],
  },
  "hardware-aware-selection": {
    conceptPath: [
      { label: "Embedded AI" },
      { label: "TinyML System", conceptId: "tinyml-system" },
      { label: "Hardware-Aware Model Selection" },
    ],
    broaderConcepts: ["tinyml-system", "model-selection", "tinyml"],
    commonlyComparedWith: ["model-selection", "cross-validation"],
    recommendedNext: ["quantization", "deployment-verification"],
  },
  tflm: {
    conceptPath: [
      { label: "TinyML System", conceptId: "tinyml-system" },
      { label: "TensorFlow Lite Micro" },
    ],
    broaderConcepts: ["tinyml-system", "tinyml"],
    recommendedNext: ["deployment-verification"],
  },
  svm: {
    conceptPath: [
      { label: "Classical Machine Learning", conceptId: "classical-ml" },
      { label: "SVM" },
    ],
    broaderConcepts: ["classical-ml"],
    commonlyComparedWith: ["logistic-regression", "knn"],
    recommendedNext: ["random-forest"],
  },
  "random-forest": {
    conceptPath: [
      { label: "Classical Machine Learning", conceptId: "classical-ml" },
      { label: "Random Forest" },
    ],
    broaderConcepts: ["classical-ml"],
    subtopics: ["decision-tree"],
    commonlyComparedWith: ["gradient-boosting", "decision-tree"],
    recommendedNext: ["gradient-boosting"],
  },
  "neural-network": {
    conceptPath: [{ label: "Deep Learning", conceptId: "dl" }, { label: "Neural Network" }],
    broaderConcepts: ["dl"],
    commonlyComparedWith: ["classical-ml"],
    recommendedNext: ["cnn", "backpropagation"],
  },
};

export function filterHierarchyIds(ids: string[] | undefined, knownIds: Set<string>): string[] {
  if (!ids?.length) return [];
  return ids.filter((id) => knownIds.has(id));
}

export function filterConceptPath(
  path: ConceptPathSegment[] | undefined,
  knownIds: Set<string>
): ConceptPathSegment[] {
  if (!path?.length) return [];
  return path.map((seg) => ({
    label: seg.label,
    ...(seg.conceptId && knownIds.has(seg.conceptId) ? { conceptId: seg.conceptId } : {}),
  }));
}

export function hasConceptStructure(concept: Concept): boolean {
  return !!(
    concept.conceptPath?.length ||
    concept.broaderConcepts?.length ||
    concept.subtopics?.length ||
    concept.specificTechniques?.length ||
    concept.variants?.length ||
    concept.commonlyComparedWith?.length ||
    concept.recommendedNext?.length
  );
}

export function applyHierarchyPatch(concept: Concept, knownIds: Set<string>): Concept {
  const patch = conceptHierarchyPatches[concept.id];
  const merged = patch ? { ...concept, ...patch } : concept;

  return {
    ...merged,
    broaderConcepts: filterHierarchyIds(merged.broaderConcepts, knownIds),
    subtopics: filterHierarchyIds(merged.subtopics, knownIds),
    specificTechniques: filterHierarchyIds(merged.specificTechniques, knownIds),
    variants: filterHierarchyIds(merged.variants, knownIds),
    commonlyComparedWith: filterHierarchyIds(merged.commonlyComparedWith, knownIds),
    recommendedNext: filterHierarchyIds(merged.recommendedNext, knownIds),
    conceptPath: filterConceptPath(merged.conceptPath, knownIds),
  };
}
