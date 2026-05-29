import type { PipelineStageData } from "@/types";

export const pipelineStages: PipelineStageData[] = [
  {
    id: "problem-definition",
    name: "Problem Definition",
    order: 1,
    description:
      "Define the task, target variable, constraints, success metrics, and the real-world objective the model must support.",
    whyItMatters:
      "A poorly defined problem leads to wrong data, wrong metrics, and models that optimize the wrong goal.",
    techniques: ["Success metrics", "Baseline definition", "Constraint analysis"],
    commonMistakes: [
      "Optimizing proxy metrics unrelated to business or safety goals",
      "Ignoring deployment constraints until late",
    ],
    relatedConcepts: ["Target", "Label", "Evaluation", "MLOps"],
    comesAfter: "Data Collection",
  },
  {
    id: "data-collection",
    name: "Data Collection",
    order: 2,
    description:
      "Gather relevant data from sensors, logs, surveys, APIs, or public datasets while documenting sources and limitations.",
    whyItMatters:
      "Model quality is bounded by data coverage, quality, and representativeness.",
    techniques: ["Sampling", "Labeling pipelines", "Data versioning"],
    commonMistakes: [
      "Collecting data that does not match production conditions",
      "Ignoring consent, privacy, and bias in sourcing",
    ],
    relatedConcepts: ["Dataset", "Feature", "Label", "Data drift"],
    comesBefore: "Problem Definition",
    comesAfter: "Data Cleaning",
  },
  {
    id: "data-cleaning",
    name: "Data Cleaning",
    order: 3,
    description:
      "Handle missing values, duplicates, inconsistent labels, corrupted samples, and obvious errors.",
    whyItMatters:
      "Dirty data teaches wrong patterns and inflates apparent performance.",
    techniques: ["Missing Value Imputation", "Outlier Handling", "Deduplication"],
    commonMistakes: [
      "Cleaning using information from the test set",
      "Dropping outliers without domain justification",
    ],
    relatedConcepts: ["Preprocessing", "Data Leakage"],
    comesBefore: "Data Collection",
    comesAfter: "Preprocessing",
  },
  {
    id: "preprocessing",
    name: "Preprocessing",
    order: 4,
    description:
      "Scale, normalize, encode categorical variables, and prepare inputs in a consistent form for modeling.",
    whyItMatters:
      "Many algorithms are sensitive to feature scale and encoding choices.",
    techniques: [
      "Standardization",
      "Normalization",
      "Min-Max Scaling",
      "One-Hot Encoding",
      "Label Encoding",
    ],
    commonMistakes: [
      "Fitting scalers on the full dataset including test data",
      "Applying different preprocessing in training vs inference",
    ],
    relatedConcepts: ["Feature Engineering", "Data Leakage"],
    techniqueIds: ["standardization", "one-hot-encoding", "missing-value-imputation"],
    comesBefore: "Data Cleaning",
    comesAfter: "Feature Engineering",
  },
  {
    id: "feature-engineering",
    name: "Feature Engineering",
    order: 5,
    description:
      "Create meaningful inputs: domain features, interactions, signal-derived features, or text representations.",
    whyItMatters:
      "Especially in Gen 1 ML, features often determine whether a model can learn useful patterns.",
    techniques: ["Domain features", "Interaction terms", "Time-based features"],
    commonMistakes: [
      "Creating features that leak future information",
      "Overfitting to idiosyncrasies in the training set",
    ],
    relatedConcepts: ["Feature Selection", "PCA", "Embeddings"],
  },
  {
    id: "feature-selection",
    name: "Feature Selection / Extraction",
    order: 6,
    description:
      "Select useful original features or transform them into new representations (e.g., PCA, embeddings).",
    whyItMatters:
      "Reduces noise, overfitting risk, and deployment cost while improving generalization.",
    techniques: ["Feature Selection", "PCA", "Embeddings", "Autoencoders"],
    commonMistakes: [
      "Selecting features using the test set",
      "Confusing selection (subset) with extraction (transform)",
    ],
    relatedConcepts: ["Dimensionality Reduction", "Embeddings"],
  },
  {
    id: "model-selection",
    name: "Model Selection",
    order: 7,
    description:
      "Choose algorithms based on task type, data modality, interpretability needs, speed, memory, and deployment target.",
    whyItMatters:
      "The right model family balances accuracy, cost, and operational constraints.",
    techniques: [
      "Linear Regression",
      "Random Forest",
      "CNN",
      "Transformer",
      "Hardware-Aware Model Selection",
    ],
    commonMistakes: [
      "Defaulting to deep learning without data or compute justification",
      "Ignoring interpretability or latency requirements",
    ],
    relatedConcepts: ["Bias-Variance Trade-off", "TinyML"],
  },
  {
    id: "training",
    name: "Training",
    order: 8,
    description:
      "Fit model parameters by minimizing loss or error on training data using optimization.",
    whyItMatters:
      "Training translates data and architecture into a usable function approximator.",
    techniques: [
      "Gradient Descent",
      "Backpropagation",
      "Loss Function",
      "Regularization",
    ],
    commonMistakes: [
      "Training without monitoring validation loss",
      "Using learning rates or batch sizes without experimentation",
    ],
    relatedConcepts: ["Overfitting", "Underfitting", "Hyperparameter Tuning"],
  },
  {
    id: "hyperparameter-tuning",
    name: "Hyperparameter Tuning",
    order: 9,
    description:
      "Search over settings not learned during training: tree depth, learning rate, regularization strength, etc.",
    whyItMatters:
      "Hyperparameters strongly affect generalization and deployment characteristics.",
    techniques: ["Grid Search", "Random Search", "Bayesian Optimization", "Cross-Validation"],
    commonMistakes: [
      "Tuning directly on the test set",
      "Nested CV confusion leading to optimistic estimates",
    ],
    relatedConcepts: ["Validation Strategy", "Overfitting"],
  },
  {
    id: "validation-strategy",
    name: "Validation",
    order: 10,
    description:
      "Split data into train, validation, and test sets—or use cross-validation—while keeping the test set unseen until final evaluation.",
    whyItMatters:
      "Honest validation prevents overfitting estimates and data leakage surprises. Validation supports tuning; test supports final claims only.",
    techniques: [
      "Train/Test Split",
      "Cross-Validation",
      "Stratified Cross-Validation",
      "Nested Cross-Validation",
    ],
    techniqueIds: ["train-test-split", "cross-validation", "nested-cv", "data-leakage"],
    commonMistakes: [
      "Data leakage from preprocessing or feature selection",
      "Repeatedly peeking at test performance",
      "Tuning hyperparameters on the test set",
    ],
    relatedConcepts: ["Data Leakage", "Evaluation"],
    comesBefore: "Hyperparameter Tuning (inner loops may use CV)",
    comesAfter: "Evaluation on held-out test data",
  },
  {
    id: "evaluation",
    name: "Evaluation",
    order: 11,
    description:
      "Measure model performance with metrics aligned to the task: classification, regression, or ranking.",
    whyItMatters:
      "Metrics translate model outputs into decisions about deployment and risk.",
    techniques: [
      "Confusion Matrix",
      "F1-score",
      "ROC-AUC",
      "MAE",
      "RMSE",
      "R²",
    ],
    commonMistakes: [
      "Using accuracy alone on imbalanced data",
      "Ignoring calibration and false-positive cost",
    ],
    relatedConcepts: ["Precision", "Recall", "Evaluation & Validation page"],
  },
  {
    id: "optimization",
    name: "Optimization / Compression",
    order: 12,
    description:
      "Reduce model size and inference cost through pruning, quantization, distillation, or feature reduction.",
    whyItMatters:
      "Production and embedded systems often cannot run full-precision large models.",
    techniques: [
      "Quantization",
      "Pruning",
      "Knowledge Distillation",
      "Model Compression",
    ],
    commonMistakes: [
      "Compressing without re-validating accuracy on representative data",
      "Ignoring numeric precision effects on microcontrollers",
    ],
    relatedConcepts: ["ONNX", "TensorFlow Lite", "TinyML"],
  },
  {
    id: "deployment",
    name: "Deployment",
    order: 13,
    description:
      "Export and serve models via APIs, mobile apps, web apps, cloud, ONNX, or embedded C firmware.",
    whyItMatters:
      "A model only creates value when integrated reliably into a real system.",
    techniques: ["ONNX", "TensorFlow Lite", "TensorFlow Lite Micro", "Embedded C Deployment"],
    commonMistakes: [
      "Training-serving skew from different preprocessing",
      "Skipping prediction parity checks between Python and device",
    ],
    relatedConcepts: ["MLOps", "Inference", "Monitoring"],
  },
  {
    id: "monitoring",
    name: "Monitoring",
    order: 14,
    description:
      "Track performance drift, data drift, latency, failures, bias, and resource usage in production.",
    whyItMatters:
      "Real-world data changes; models degrade without ongoing observation.",
    techniques: ["Drift detection", "Logging", "Alerting", "Retraining triggers"],
    commonMistakes: [
      "Deploying without baseline metrics or rollback plans",
      "Ignoring subgroup performance changes",
    ],
    relatedConcepts: ["MLOps", "Data drift", "Performance drift"],
  },
];
