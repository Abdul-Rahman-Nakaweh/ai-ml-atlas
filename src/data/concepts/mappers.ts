import type { Technique } from "@/types";
import type {
  Concept,
  ConceptDifficulty,
  ConceptGeneration,
  ConceptPipelineStage,
  ConceptPurpose,
  ConceptType,
} from "@/types/concept";
import type { GlossaryEntry } from "@/types";
import { normalizeArray } from "@/lib/utils";

const NAME_TO_ID: Record<string, string> = {
  "Machine Learning": "ml",
  ML: "ml",
  AI: "ai",
  "Deep Learning": "dl",
  "Linear Regression": "linear-regression",
  "Logistic Regression": "logistic-regression",
  "Support Vector Machine": "svm",
  SVM: "svm",
  "k-NN": "knn",
  "k-Nearest Neighbors": "knn",
  "Decision Tree": "decision-tree",
  "Random Forest": "random-forest",
  "Gradient Boosting": "gradient-boosting",
  "Gradient Descent": "gradient-descent",
  "Cross-Validation": "cross-validation",
  "Train/Test Split": "train-test-split",
  "Confusion Matrix": "confusion-matrix",
  "F1-score": "f1-score",
  F1: "f1-score",
  "ROC-AUC": "roc-auc",
  PCA: "pca",
  "Principal Component Analysis": "pca",
  Transformer: "transformer",
  Attention: "attention",
  "Self-Attention": "self-attention",
  Embeddings: "embeddings",
  Embedding: "embeddings",
  Tokenization: "tokenization",
  "Vector Database": "vector-database",
  "TensorFlow Lite": "tflite",
  "TensorFlow Lite Micro": "tflm",
  TinyML: "tinyml",
  Quantization: "quantization",
  Pruning: "pruning",
  "Knowledge Distillation": "knowledge-distillation",
  "Feature Engineering": "feature-engineering",
  "Feature Selection": "feature-selection",
  "Feature Extraction": "feature-extraction",
  Standardization: "standardization",
  Normalization: "normalization",
  "One-Hot Encoding": "one-hot-encoding",
  "Neural Network": "neural-network",
  CNN: "cnn",
  RNN: "rnn",
  LSTM: "lstm",
  BERT: "bert",
  GPT: "gpt",
  LLM: "llm",
  RAG: "rag",
  LoRA: "lora",
  "Fine-Tuning": "fine-tuning",
  "Data Leakage": "data-leakage",
  Overfitting: "overfitting",
  Underfitting: "underfitting",
  Regularization: "regularization",
  "Loss Function": "loss-function",
  "Bias-Variance Trade-off": "bias-variance",
  "Nested Cross-Validation": "nested-cv",
  "Grid Search": "grid-search",
  "Random Search": "random-search",
  "Model Compression": "model-compression",
  "Hardware-Aware Model Selection": "hardware-aware-selection",
  "Embedded C Deployment": "embedded-c",
  "AI Agents": "ai-agents",
  "Tool Use": "tool-use",
  "Vision Transformer": "vit",
  "Activation Function": "activation-function",
  Backpropagation: "backpropagation",
  Autoencoder: "autoencoder",
  MLP: "mlp",
  RMSE: "rmse",
  MAE: "mae",
  "R²": "r-squared",
  Specificity: "specificity",
  Precision: "precision",
  Recall: "recall",
  Accuracy: "accuracy",
  Margin: "svm",
  Kernel: "svm",
  ONNX: "onnx",
  Monitoring: "monitoring",
  Deployment: "deployment",
  Inference: "inference",
  Training: "training",
  Validation: "validation",
  Testing: "testing",
  Dataset: "dataset",
  Feature: "feature",
  Label: "label",
  Target: "target",
  Model: "model",
  Parameter: "parameter",
  Hyperparameter: "hyperparameter",
};

export function resolveConceptId(ref: string, knownIds: Set<string>): string | null {
  if (knownIds.has(ref)) return ref;
  const mapped = NAME_TO_ID[ref];
  if (mapped && knownIds.has(mapped)) return mapped;
  const slug = ref
    .toLowerCase()
    .replace(/[²]/g, "2")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (knownIds.has(slug)) return slug;
  return null;
}

export function resolveConceptIds(refs: string[], knownIds: Set<string>): string[] {
  const out: string[] = [];
  for (const ref of refs) {
    const id = resolveConceptId(ref, knownIds);
    if (id && !out.includes(id)) out.push(id);
  }
  return out;
}

function mapPipelineStage(stages: string[]): ConceptPipelineStage {
  const s = stages[0] ?? "";
  if (s.includes("Problem")) return "foundations";
  if (s.includes("Data Collection") || s.includes("Data Cleaning")) return "data";
  if (s.includes("Preprocessing")) return "preprocessing";
  if (s.includes("Feature")) return "feature engineering";
  if (s.includes("Model Selection")) return "model selection";
  if (s.includes("Training")) return "training";
  if (s.includes("Hyperparameter") || s.includes("Tuning")) return "tuning";
  if (s.includes("Validation")) return "validation";
  if (s.includes("Evaluation")) return "evaluation";
  if (s.includes("Optimization") || s.includes("Compression")) return "optimization";
  if (s.includes("Deployment")) return "deployment";
  if (s.includes("Monitoring")) return "monitoring";
  return "cross-cutting";
}

function mapGlossaryPipeline(stage: string): ConceptPipelineStage {
  const m: Record<string, ConceptPipelineStage> = {
    "Problem Definition": "foundations",
    Data: "data",
    Preprocessing: "preprocessing",
    Features: "feature engineering",
    Training: "training",
    Validation: "validation",
    Evaluation: "evaluation",
    Deployment: "deployment",
    "Cross-cutting": "cross-cutting",
  };
  return m[stage] ?? "cross-cutting";
}

function mapConceptTypeFromTechnique(t: Technique): ConceptType {
  switch (t.conceptType) {
    case "Metric":
      return "metric";
    case "Preprocessing":
      return "preprocessing";
    case "Tuning":
      return "tuning";
    case "Deployment":
      return "deployment";
    case "Math":
      return "math";
    case "LLM Concept":
      return "llm concept";
    case "Algorithm":
      return "algorithm";
    default:
      return "algorithm";
  }
}

function mapConceptTypeFromGlossary(category: string): ConceptType {
  const m: Record<string, ConceptType> = {
    Foundations: "foundation",
    "Data & Features": "preprocessing",
    Models: "algorithm",
    Evaluation: "metric",
    "Optimization & Deployment": "deployment",
    "Modern AI": "llm concept",
  };
  return m[category] ?? "foundation";
}

function mapDifficulty(d: string): ConceptDifficulty {
  if (d === "Beginner" || d === "Introductory") return "foundation";
  if (d === "Advanced") return "advanced";
  return "intermediate";
}

function mapPurpose(p: string | string[]): ConceptPurpose {
  const raw = normalizeArray(p)[0]?.toLowerCase() ?? "general";
  const allowed: ConceptPurpose[] = [
    "classification",
    "regression",
    "dimensionality reduction",
    "evaluation",
    "compression",
    "retrieval",
    "generation",
    "embedded deployment",
    "preprocessing",
    "validation",
    "optimization",
    "general",
  ];
  const hit = allowed.find((a) => raw.includes(a.replace(" ", "")) || raw.includes(a));
  if (hit) return hit;
  if (raw.includes("class")) return "classification";
  if (raw.includes("regress")) return "regression";
  if (raw.includes("reduc")) return "dimensionality reduction";
  if (raw.includes("retriev")) return "retrieval";
  if (raw.includes("generat")) return "generation";
  if (raw.includes("embed")) return "embedded deployment";
  if (raw.includes("valid")) return "validation";
  if (raw.includes("preprocess")) return "preprocessing";
  return "general";
}

function buildExample(t: Technique): string {
  const use = t.whenToUse.trim();
  if (use.length > 20 && use.length < 200) {
    return use.endsWith(".") ? use : `${use}.`;
  }
  const purpose = normalizeArray(t.purpose)[0];
  return `Applied in a ${purpose.toLowerCase()} workflow where ${t.strengths[0]?.toLowerCase() ?? "the method"} is required.`;
}

export function techniqueToConcept(t: Technique, knownIds: Set<string>): Concept {
  const stages = normalizeArray(t.pipelineStage);
  const math = normalizeArray(t.mathFoundation).map(String);
  return {
    id: t.id,
    name: t.name,
    summary: t.quickExplanation,
    libraryCategory: "Foundations",
    conceptType: mapConceptTypeFromTechnique(t),
    generation: t.generation as ConceptGeneration,
    pipelineStage: mapPipelineStage(stages),
    difficulty: mapDifficulty(t.difficulty),
    purpose: mapPurpose(t.purpose),
    coreMeaning: t.quickExplanation,
    workflowLocation: `Used during ${stages.join(", ")}.`,
    functionRole: t.whenToUse.split(".")[0]?.trim() + (t.whenToUse.includes(".") ? "." : "") || t.whenToUse,
    mechanism: t.mathIdea ?? t.technicalExplanation ?? t.intuition,
    example: buildExample(t),
    commonDistinction: t.whenToAvoid,
    limitation: t.limitations[0] ?? t.mainTradeoff,
    learnBefore: resolveConceptIds(t.learnBefore, knownIds),
    learnAfter: resolveConceptIds(t.learnAfter, knownIds),
    relatedConcepts: resolveConceptIds(t.relatedConcepts, knownIds),
    technicalNote: t.deploymentNotes,
    deploymentRelevance: t.deploymentRelevance,
    mathFoundation: math.length ? math : undefined,
  };
}

export function glossaryToConcept(e: GlossaryEntry, knownIds: Set<string>): Concept {
  const name = e.term;
  return {
    id: e.id,
    name,
    fullName: e.fullName,
    summary: e.summary,
    libraryCategory: "Foundations",
    conceptType: mapConceptTypeFromGlossary(e.category),
    generation:
      e.category === "Modern AI"
        ? "Gen 3"
        : e.category === "Models" && e.id !== "transformer" && e.id !== "attention"
          ? "Gen 1"
          : e.id === "transformer" || e.id === "attention" || e.id === "llm"
            ? "Gen 3"
            : "Cross-generation",
    pipelineStage: mapGlossaryPipeline(e.pipelineStage),
    difficulty: mapDifficulty(e.difficulty),
    purpose: mapPurpose(
      e.category === "Evaluation"
        ? "evaluation"
        : e.category === "Optimization & Deployment"
          ? "deployment"
          : "general"
    ),
    coreMeaning: e.coreMeaning,
    workflowLocation: e.workflowLocation,
    functionRole:
      (e as GlossaryEntry & { functionRole?: string }).functionRole ??
      e.workflowLocation,
    mechanism: e.mechanism,
    example: e.example,
    commonDistinction: e.commonDistinction,
    limitation: e.limitation,
    learnBefore: resolveConceptIds(
      (e as GlossaryEntry & { learnBefore?: string[] }).learnBefore ?? [],
      knownIds
    ),
    learnAfter: resolveConceptIds(
      (e as GlossaryEntry & { learnAfter?: string[] }).learnAfter ?? [],
      knownIds
    ),
    relatedConcepts: resolveConceptIds(e.relatedConcepts, knownIds),
  };
}

export function mergeConcept(base: Concept, overlay: Partial<Concept>): Concept {
  return {
    ...base,
    ...overlay,
    learnBefore: overlay.learnBefore?.length ? overlay.learnBefore : base.learnBefore,
    learnAfter: overlay.learnAfter?.length ? overlay.learnAfter : base.learnAfter,
    relatedConcepts: overlay.relatedConcepts?.length
      ? overlay.relatedConcepts
      : base.relatedConcepts,
  };
}
