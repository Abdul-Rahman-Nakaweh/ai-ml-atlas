import type { Concept } from "@/types/concept";

/** Rich, non-repetitive copy for high-traffic concepts (merged over technique + glossary) */
export const conceptOverrides: Partial<Record<string, Partial<Concept>>> = {
  pca: {
    functionRole:
      "Reduces the number of input dimensions while preserving major variance patterns in the data.",
    learnBefore: ["feature", "preprocessing"],
    learnAfter: ["feature-extraction", "embeddings"],
    technicalNote: "Center and scale continuous features before fitting.",
  },
  svm: {
    functionRole: "Finds a decision boundary with maximum margin between classes in feature space.",
    mechanism:
      "Optimizes a hyperplane using support vectors; kernels map data for nonlinear separation. Feature scaling is essential.",
    learnBefore: ["preprocessing", "logistic-regression"],
    learnAfter: ["random-forest", "gradient-boosting"],
  },
  knn: {
    functionRole: "Classifies or regresses by local comparison to stored training examples.",
    mechanism: "Distance (e.g., Euclidean) defines neighborhoods; prediction is vote or average over k neighbors.",
    limitation: "Stores the training set—memory and latency grow with sample count.",
  },
  "decision-tree": {
    functionRole: "Produces readable rules by recursive partitioning of feature space.",
    limitation: "A single deep tree often overfits; ensembles improve stability at higher size.",
  },
  "random-forest": {
    functionRole: "Aggregates many trees trained on bootstrap samples to reduce variance.",
    mechanism: "Bagging plus random feature subsets at splits; vote or average for prediction.",
    limitation: "Larger model size than one tree; less interpretable than a single rule set.",
  },
  accuracy: {
    functionRole: "Summarizes overall fraction of correct predictions across classes.",
    commonDistinction:
      "Misleading when classes are imbalanced—a majority-class classifier can score high accuracy while failing minorities.",
    mechanism: "(TP + TN) / total predictions from the confusion matrix.",
  },
  precision: {
    functionRole: "Measures reliability of positive predictions when false positives are costly.",
    mechanism: "TP / (TP + FP); increases when false positives decrease at a fixed threshold.",
  },
  recall: {
    functionRole: "Measures coverage of actual positives when false negatives are costly.",
    mechanism: "TP / (TP + FN); sensitivity to the positive class.",
  },
  "f1-score": {
    functionRole: "Balances precision and recall in one scalar when both error types matter.",
    mechanism: "F1 = 2PR / (P + R); harmonic mean penalizes extreme imbalance between P and R.",
  },
  "roc-auc": {
    functionRole: "Evaluates ranking quality of scores across thresholds without fixing one cutoff.",
    mechanism: "Area under the curve of true positive rate versus false positive rate.",
  },
  validation: {
    commonDistinction: "Development-time assessment on held-out data; not the same as final testing.",
    learnAfter: ["testing", "cross-validation"],
  },
  testing: {
    commonDistinction: "Single final evaluation after all choices are locked; not repeated tuning.",
    learnBefore: ["validation", "cross-validation"],
  },
  parameter: {
    commonDistinction: "Learned during training; hyperparameters are set before optimization begins.",
  },
  hyperparameter: {
    commonDistinction: "Chosen before training; parameters are updated from data during training.",
  },
  "feature-selection": {
    commonDistinction: "Keeps a subset of original columns; feature extraction creates new representations.",
  },
  "feature-extraction": {
    commonDistinction: "Builds new features (e.g., PCA components); selection only removes originals.",
  },
  standardization: {
    commonDistinction: "Centers to zero mean and unit variance; min–max normalization bounds a fixed range.",
    learnBefore: ["preprocessing", "feature"],
    learnAfter: ["pca", "svm"],
  },
  normalization: {
    commonDistinction: "Scales values to a bounded interval; standardization uses mean and standard deviation.",
  },
  quantization: {
    functionRole: "Reduces numeric precision to shrink memory and accelerate inference.",
    limitation: "May shift outputs; re-validate on representative hardware and data.",
  },
  pruning: {
    functionRole: "Removes low-impact weights or structures to reduce model size.",
  },
  tinyml: {
    functionRole: "Runs inference on MCUs under strict latency, flash, SRAM, firmware, and power limits.",
    example: "Vibration classification on a sensor MCU without cloud connectivity.",
  },
  rag: {
    functionRole: "Grounds generation in retrieved passages rather than parametric memory alone.",
    mechanism: "Embedding search, ranking, then conditional generation over selected chunks.",
  },
  embedding: {
    id: "embeddings",
    functionRole: "Maps discrete items to vectors so similarity in space reflects semantic relatedness.",
  },
  "vector-db": {
    id: "vector-database",
    functionRole: "Stores embeddings and returns nearest neighbors for retrieval pipelines.",
  },
  attention: {
    mechanism: "Computes softmax(QKᵀ/√d)V to weight values by query–key compatibility.",
  },
  transformer: {
    mechanism: "Stacks self-attention and feed-forward blocks with residuals and normalization.",
  },
  "data-leakage": {
    functionRole: "Explains inflated metrics when test or future information enters training or preprocessing.",
  },
  "deployment-verification": {
    id: "deployment-verification",
    name: "Deployment Verification",
    summary: "Confirms predictions match across training, export, and device runtimes.",
    conceptType: "deployment",
    generation: "Cross-generation",
    pipelineStage: "deployment",
    difficulty: "advanced",
    purpose: "embedded deployment",
    coreMeaning:
      "Deployment verification is the process of proving that inference outputs are consistent across the training framework, exported runtime, and on-device execution.",
    workflowLocation: "After export and before production sign-off on embedded or edge targets.",
    functionRole: "Detects numerical or preprocessing drift that would invalidate offline metrics.",
    mechanism:
      "Sample-by-sample comparison of outputs on identical inputs through Python, exported C or TFLite Micro, and firmware.",
    example:
      "Logging fifty test vectors in Python, then asserting bitwise or tolerance-bounded equality in exported C and on the MCU.",
    commonDistinction: "Runtime parity checks versus offline accuracy alone on the training stack.",
    limitation: "Requires representative inputs and documented tolerance for quantized arithmetic.",
    learnBefore: ["quantization", "tflm"],
    learnAfter: ["tinyml", "monitoring"],
    relatedConcepts: ["quantization", "tflm", "onnx"],
  },
  hallucination: {
    id: "hallucination",
    name: "Hallucination",
    summary: "Confident model output that is factually incorrect or unsupported.",
    conceptType: "llm concept",
    generation: "Gen 3",
    pipelineStage: "evaluation",
    difficulty: "advanced",
    purpose: "generation",
    coreMeaning:
      "Hallucination denotes fluent but incorrect or ungrounded content produced by generative models.",
    workflowLocation: "Evaluation and safety review for LLM and RAG deployments.",
    functionRole: "Flags reliability risks when outputs are used without human or retrieval grounding.",
    mechanism: "Arises from parametric memorization limits, ambiguous prompts, or weak retrieval recall.",
    example: "A legal assistant citing a non-existent statute with authoritative tone.",
    commonDistinction: "Generation error versus epistemic uncertainty scores or abstention policies.",
    limitation: "Mitigation requires retrieval, constraints, evaluation protocols, and human review—not one metric.",
    learnBefore: ["llm", "rag"],
    learnAfter: ["rag", "ai-agents"],
    relatedConcepts: ["llm", "rag", "ai-agents"],
  },
};
