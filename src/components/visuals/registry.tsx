import type { ComponentType } from "react";
import type { VisualAidType } from "@/types/visual";
import { AttentionDiagram } from "./AttentionDiagram";
import { ConfusionMatrixDiagram } from "./ConfusionMatrixDiagram";
import { CrossValidationDiagram } from "./CrossValidationDiagram";
import { DataSplitDiagram } from "./DataSplitDiagram";
import { DecisionTreeDiagram } from "./DecisionTreeDiagram";
import { EmbeddingsDiagram } from "./EmbeddingsDiagram";
import { ErrorCurveDiagram } from "./ErrorCurveDiagram";
import { KNNDiagram } from "./KNNDiagram";
import { MetricRelationsDiagram } from "./MetricRelationsDiagram";
import { NeuralNetworkDiagram } from "./NeuralNetworkDiagram";
import { PCADiagram } from "./PCADiagram";
import { PipelineFlowDiagram } from "./PipelineFlowDiagram";
import { PrecisionRecallDiagram } from "./PrecisionRecallDiagram";
import { PruningDiagram } from "./PruningDiagram";
import { QuantizationDiagram } from "./QuantizationDiagram";
import { RandomForestDiagram } from "./RandomForestDiagram";
import { RAGDiagram } from "./RAGDiagram";
import { SVMMarginDiagram } from "./SVMMarginDiagram";
import { TinyMLTradeoffDiagram } from "./TinyMLTradeoffDiagram";
import {
  DatasetDiagram,
  FeatureLabelDiagram,
  TrainingInferenceDiagram,
  ParameterHyperparameterDiagram,
} from "./diagrams/FoundationDiagrams";
import {
  StandardizationDiagram,
  NormalizationDiagram,
  OneHotEncodingDiagram,
  FeatureSelectionExtractionDiagram,
} from "./diagrams/PreprocessingDiagrams";
import {
  LinearRegressionDiagram,
  LogisticRegressionDiagram,
  GradientBoostingDiagram,
} from "./diagrams/AlgorithmDiagrams";
import {
  NestedCVDiagram,
  GridSearchDiagram,
  BiasVarianceDiagram,
} from "./diagrams/ValidationTuningDiagrams";
import { AccuracyDiagram, ROCAUCDiagram, MAERMSEDiagram } from "./diagrams/MetricDiagrams";
import {
  CNNDiagram,
  RNNLSTMDiagram,
  BackpropagationDiagram,
  GradientDescentDiagram,
} from "./diagrams/DeepLearningDiagrams";
import {
  TokenizationDiagram,
  TransformerBlockDiagram,
  VectorDatabaseDiagram,
  FineTuningLoRADiagram,
  AgentToolUseDiagram,
} from "./diagrams/ModernAIDiagrams";
import {
  KnowledgeDistillationDiagram,
  ONNXDiagram,
  TFLiteDiagram,
  DeploymentVerificationDiagram,
} from "./diagrams/DeploymentDiagrams";

export interface VisualAidEntry {
  Component: ComponentType<{ caption?: string }>;
  defaultCaption: string;
}

export const visualAidRegistry: Record<VisualAidType, VisualAidEntry> = {
  "pipeline-flow": {
    Component: PipelineFlowDiagram,
    defaultCaption: "Sequential ML workflow: each stage produces artifacts consumed by the next.",
  },
  "data-split": {
    Component: DataSplitDiagram,
    defaultCaption: "Train, validation, and test partitions serve distinct roles in development.",
  },
  "cross-validation": {
    Component: CrossValidationDiagram,
    defaultCaption: "Each fold serves once as validation while the remaining folds train the model.",
  },
  "nested-cv": {
    Component: NestedCVDiagram,
    defaultCaption: "Outer folds estimate performance; inner folds tune hyperparameters without leakage.",
  },
  "grid-search": {
    Component: GridSearchDiagram,
    defaultCaption: "Grid search evaluates model quality at each hyperparameter combination.",
  },
  "bias-variance": {
    Component: BiasVarianceDiagram,
    defaultCaption: "Model complexity trades bias against variance in generalization error.",
  },
  "dataset-table": {
    Component: DatasetDiagram,
    defaultCaption: "A dataset organizes observations as rows and variables as columns.",
  },
  "feature-vs-label": {
    Component: FeatureLabelDiagram,
    defaultCaption: "Features describe each sample; the label is the supervised target to predict.",
  },
  "training-vs-inference": {
    Component: TrainingInferenceDiagram,
    defaultCaption: "Training fits parameters from labeled data; inference applies the model to new inputs.",
  },
  "parameter-vs-hyperparameter": {
    Component: ParameterHyperparameterDiagram,
    defaultCaption: "Parameters are learned from data; hyperparameters are configured before training.",
  },
  standardization: {
    Component: StandardizationDiagram,
    defaultCaption: "Standardization centers features at zero mean with unit variance.",
  },
  normalization: {
    Component: NormalizationDiagram,
    defaultCaption: "Normalization rescales values into a fixed bounded interval.",
  },
  "one-hot-encoding": {
    Component: OneHotEncodingDiagram,
    defaultCaption: "Each category becomes a binary column indicating membership.",
  },
  "feature-selection-extraction": {
    Component: FeatureSelectionExtractionDiagram,
    defaultCaption: "Selection keeps original columns; extraction creates new transformed features.",
  },
  pca: { Component: PCADiagram, defaultCaption: "Projection onto the direction of maximum variance." },
  "linear-regression": {
    Component: LinearRegressionDiagram,
    defaultCaption: "Linear regression fits a line minimizing squared error to continuous targets.",
  },
  "logistic-regression": {
    Component: LogisticRegressionDiagram,
    defaultCaption: "Logistic regression maps a linear score through a sigmoid to class probabilities.",
  },
  "svm-margin": {
    Component: SVMMarginDiagram,
    defaultCaption: "Maximum-margin separator and support vectors.",
  },
  knn: { Component: KNNDiagram, defaultCaption: "k nearest neighbors vote on the query point." },
  "decision-tree": {
    Component: DecisionTreeDiagram,
    defaultCaption: "Recursive feature splits form an interpretable tree.",
  },
  "random-forest": {
    Component: RandomForestDiagram,
    defaultCaption: "Multiple trees vote or average to form the ensemble prediction.",
  },
  "gradient-boosting": {
    Component: GradientBoostingDiagram,
    defaultCaption: "Each new model corrects residual errors from the previous ensemble.",
  },
  "confusion-matrix": {
    Component: ConfusionMatrixDiagram,
    defaultCaption: "Binary confusion matrix with TP, FP, FN, and TN cells.",
  },
  "accuracy-metric": {
    Component: AccuracyDiagram,
    defaultCaption: "Accuracy is the fraction of all predictions that are correct.",
  },
  "metric-relations": {
    Component: MetricRelationsDiagram,
    defaultCaption: "Classification metrics derive from distinct error types in the confusion matrix.",
  },
  "precision-recall": {
    Component: PrecisionRecallDiagram,
    defaultCaption: "Precision isolates false positives; recall isolates false negatives.",
  },
  "roc-auc": {
    Component: ROCAUCDiagram,
    defaultCaption: "ROC curve plots true positive rate against false positive rate across thresholds.",
  },
  "mae-rmse": {
    Component: MAERMSEDiagram,
    defaultCaption: "Regression errors measure distance between predicted and actual continuous values.",
  },
  "error-curve": {
    Component: ErrorCurveDiagram,
    defaultCaption: "Training error versus validation error as model complexity increases.",
  },
  "error-curve-underfitting": {
    Component: () => <ErrorCurveDiagram variant="underfitting" />,
    defaultCaption: "Both training and validation error remain high when the model is too simple.",
  },
  "neural-network": {
    Component: NeuralNetworkDiagram,
    defaultCaption: "Layered units with weighted connections.",
  },
  cnn: { Component: CNNDiagram, defaultCaption: "Convolution filters scan local regions of the input grid." },
  "rnn-lstm": {
    Component: RNNLSTMDiagram,
    defaultCaption: "Recurrent connections propagate information across sequential time steps.",
  },
  backpropagation: {
    Component: BackpropagationDiagram,
    defaultCaption: "Gradients flow backward from the loss to update each layer's weights.",
  },
  "gradient-descent": {
    Component: GradientDescentDiagram,
    defaultCaption: "Parameters move in the direction that reduces the loss function.",
  },
  tokenization: {
    Component: TokenizationDiagram,
    defaultCaption: "Text is split into tokens—the atomic units processed by language models.",
  },
  embeddings: {
    Component: EmbeddingsDiagram,
    defaultCaption: "Similar concepts cluster nearby in vector space.",
  },
  attention: {
    Component: AttentionDiagram,
    defaultCaption: "Weighted attention links between tokens.",
  },
  "transformer-block": {
    Component: TransformerBlockDiagram,
    defaultCaption: "Tokens pass through self-attention and feed-forward layers to build representations.",
  },
  rag: {
    Component: RAGDiagram,
    defaultCaption: "Retrieved documents condition the generator before answering.",
  },
  "vector-database": {
    Component: VectorDatabaseDiagram,
    defaultCaption: "Nearest-neighbor search retrieves embeddings most similar to the query vector.",
  },
  "fine-tuning-lora": {
    Component: FineTuningLoRADiagram,
    defaultCaption: "Full fine-tuning updates all weights; LoRA adds small trainable adapter matrices.",
  },
  "agent-tool-use": {
    Component: AgentToolUseDiagram,
    defaultCaption: "The model selects an external tool, executes it, and incorporates the result.",
  },
  quantization: {
    Component: QuantizationDiagram,
    defaultCaption: "Reduced numeric precision for deployment.",
  },
  pruning: {
    Component: PruningDiagram,
    defaultCaption: "Low-impact weights or nodes are removed to simplify the model.",
  },
  "knowledge-distillation": {
    Component: KnowledgeDistillationDiagram,
    defaultCaption: "A large teacher model guides a smaller student toward similar predictions.",
  },
  onnx: {
    Component: ONNXDiagram,
    defaultCaption: "ONNX enables model exchange between training frameworks and deployment runtimes.",
  },
  tflite: {
    Component: TFLiteDiagram,
    defaultCaption: "TensorFlow Lite converts models for efficient on-device inference.",
  },
  "deployment-verification": {
    Component: DeploymentVerificationDiagram,
    defaultCaption: "Outputs must match across Python, exported runtime, and on-device execution.",
  },
  "tinyml-tradeoff": {
    Component: TinyMLTradeoffDiagram,
    defaultCaption: "Accuracy and resource constraints on embedded hardware.",
  },
};

export function VisualAidRenderer({
  type,
  caption,
}: {
  type: VisualAidType;
  caption?: string;
}) {
  const entry = visualAidRegistry[type];
  if (!entry) return null;
  const { Component } = entry;
  return <Component caption={caption ?? entry.defaultCaption} />;
}
