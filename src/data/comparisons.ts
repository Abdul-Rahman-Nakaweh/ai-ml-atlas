import type { ComparisonSection } from "@/types";

/** Add comparison tables here */
export const comparisonSections: ComparisonSection[] = [
  {
    id: "classical-ml",
    title: "Classical ML algorithms (Gen 1)",
    description: "Tabular data starting points—compare before defaulting to boosting or deep learning.",
    headers: ["Algorithm", "Best for", "Watch out for"],
    rows: [
      {
        label: "Logistic Regression",
        cells: ["Linear-ish boundaries, interpretability", "Needs scaling; weak on complex nonlinear without features"],
      },
      {
        label: "SVM",
        cells: ["Medium data, margin-based classification", "Slow on huge data; kernel tuning"],
      },
      {
        label: "Decision Tree",
        cells: ["Rules, mixed feature types", "High variance alone; overfitting"],
      },
      {
        label: "Random Forest",
        cells: ["Strong tabular default", "Size on embedded; less interpretable than one tree"],
      },
      {
        label: "k-NN",
        cells: ["Simple baseline, local patterns", "Memory at inference; scaling required"],
      },
    ],
  },
  {
    id: "evaluation-metrics",
    title: "Classification metrics",
    description: "Choose metrics that match misclassification costs—not convenience.",
    headers: ["Metric", "Emphasizes", "Weak when"],
    rows: [
      { label: "Accuracy", cells: ["Overall correctness", "Classes imbalanced"] },
      { label: "Precision", cells: ["False positive cost", "Missing positives is cheap"] },
      { label: "Recall", cells: ["Finding positives", "False alarms are very costly"] },
      { label: "F1", cells: ["Balance precision & recall", "Asymmetric costs need weighting"] },
      { label: "ROC-AUC", cells: ["Ranking across thresholds", "Calibration at one threshold matters most"] },
    ],
  },
  {
    id: "deployment-targets",
    title: "Deployment: Python vs exported C vs microcontroller",
    headers: ["Stage", "Role", "Risk"],
    rows: [
      { label: "Python training", cells: ["Experimentation, gold labels", "Not production runtime on MCU"] },
      { label: "Exported C / TFLM", cells: ["Firmware integration", "Numeric/quantization mismatch"] },
      { label: "On-device inference", cells: ["Real latency & memory", "Preprocessing drift from training"] },
    ],
  },
  {
    id: "optimization",
    title: "Optimization: Quantization vs Pruning vs Distillation",
    headers: ["Method", "Reduces", "Trade-off"],
    rows: [
      { label: "Quantization", cells: ["Precision, size, speed", "Accuracy drop if not validated"] },
      { label: "Pruning", cells: ["Weights/neurons", "May need retraining"] },
      { label: "Distillation", cells: ["Model capacity via student", "Extra training pipeline"] },
      { label: "Feature reduction", cells: ["Input dimension", "Information loss"] },
    ],
  },
  {
    id: "generations",
    title: "Gen 1 vs Gen 2 vs Gen 3 AI",
    headers: ["Generation", "Core idea", "Typical constraint"],
    rows: [
      { label: "Gen 1", cells: ["Patterns from structured features", "Feature engineering quality"] },
      { label: "Gen 2", cells: ["Learned representations (layers)", "Data & compute"] },
      { label: "Gen 3", cells: ["Attention & scale", "Cost, evaluation, safety"] },
    ],
  },
];
