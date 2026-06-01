import type { ComponentType } from "react";
import type { VisualAidType } from "@/types/visual";
import { AttentionDiagram } from "./AttentionDiagram";
import { ConfusionMatrixDiagram } from "./ConfusionMatrixDiagram";
import { DataSplitDiagram } from "./DataSplitDiagram";
import { DecisionTreeDiagram } from "./DecisionTreeDiagram";
import { ErrorCurveDiagram } from "./ErrorCurveDiagram";
import { KNNDiagram } from "./KNNDiagram";
import { MetricRelationsDiagram } from "./MetricRelationsDiagram";
import { NeuralNetworkDiagram } from "./NeuralNetworkDiagram";
import { PCADiagram } from "./PCADiagram";
import { PipelineFlowDiagram } from "./PipelineFlowDiagram";
import { QuantizationDiagram } from "./QuantizationDiagram";
import { SVMMarginDiagram } from "./SVMMarginDiagram";
import { TinyMLTradeoffDiagram } from "./TinyMLTradeoffDiagram";

export interface VisualAidEntry {
  Component: ComponentType<{ caption?: string }>;
  defaultCaption: string;
}

export const visualAidRegistry: Record<VisualAidType, VisualAidEntry> = {
  "pipeline-flow": {
    Component: PipelineFlowDiagram,
    defaultCaption:
      "Sequential ML workflow: each stage produces artifacts consumed by the next.",
  },
  "data-split": {
    Component: DataSplitDiagram,
    defaultCaption: "Train, validation, and test partitions serve distinct roles in development.",
  },
  "confusion-matrix": {
    Component: ConfusionMatrixDiagram,
    defaultCaption: "Binary confusion matrix with TP, FP, FN, and TN cells.",
  },
  "metric-relations": {
    Component: MetricRelationsDiagram,
    defaultCaption: "Classification metrics derive from distinct error types in the confusion matrix.",
  },
  "error-curve": {
    Component: ErrorCurveDiagram,
    defaultCaption: "Training error versus validation error as complexity increases.",
  },
  pca: { Component: PCADiagram, defaultCaption: "Projection onto the first principal component." },
  "svm-margin": {
    Component: SVMMarginDiagram,
    defaultCaption: "Maximum-margin separator and support vectors.",
  },
  knn: { Component: KNNDiagram, defaultCaption: "k nearest neighbors vote on the query point." },
  "decision-tree": {
    Component: DecisionTreeDiagram,
    defaultCaption: "Recursive feature splits form an interpretable tree.",
  },
  "neural-network": {
    Component: NeuralNetworkDiagram,
    defaultCaption: "Layered units with weighted connections.",
  },
  attention: {
    Component: AttentionDiagram,
    defaultCaption: "Weighted attention links between tokens.",
  },
  quantization: {
    Component: QuantizationDiagram,
    defaultCaption: "Reduced numeric precision for deployment.",
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
