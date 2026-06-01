import type { Concept } from "@/types/concept";
import { eq, CM_SYMBOLS } from "./helpers";

export const foundationLessons: Partial<Record<string, Partial<Concept>>> = {
  ai: {
    coreMeaning:
      "Artificial intelligence denotes systems that perform tasks associated with perception, reasoning, prediction, or control. Implementations may rely on explicit rules, learned statistical models, search, or hybrid combinations. The term describes capability scope rather than a single algorithm or training procedure.",
    workflowLocation:
      "Frames problem scope at project inception and spans the full lifecycle from data acquisition through deployment. AI is not a discrete pipeline stage but the umbrella under which machine learning, deep learning, and rule-based systems operate.",
    functionRole:
      "Establishes what class of intelligent behavior the system must exhibit—classification, forecasting, dialogue, control—and therefore which methods, data, and evaluation criteria are appropriate.",
    mechanism:
      "No unified mathematical formalism covers all AI approaches. Rule engines apply logical conditions; learned systems estimate functions from data; agents combine planning with tool invocation. Each family optimizes different objectives under different constraints.",
    example:
      "An industrial vision system that detects surface defects on a conveyor line combines camera perception, a trained classifier, and alerting logic—each component falls under AI, but only the classifier involves machine learning.",
    commonDistinction:
      "Broader than machine learning: a chess engine using minimax search is AI without learning from data; a spam filter trained on labeled email is both AI and ML.",
    limitation:
      "The label does not specify data requirements, interpretability, latency, or operational cost—those must be defined by the chosen approach and deployment context.",
    learnBefore: [],
    learnAfter: ["ml", "dl", "model"],
  },
  ml: {
    coreMeaning:
      "Machine learning is the branch of AI in which system behavior is estimated from data by adjusting model parameters to minimize a defined objective on observed samples. The learned function is expected to generalize to unseen inputs drawn from a similar distribution.",
    workflowLocation:
      "Underpins data preparation, model training, validation, and deployment for predictive and generative tasks. ML methods are selected during model selection and applied throughout the training and evaluation stages.",
    functionRole:
      "Provides the paradigm for turning labeled or unlabeled data into parameterized models that capture patterns without hand-coding every decision rule.",
    mechanism:
      "Empirical risk minimization: a loss function quantifies error on training samples; optimization adjusts parameters to reduce that error while validation estimates performance on held-out data. Regularization penalizes excessive complexity.",
    example:
      "A retailer forecasts next-month demand by training a gradient boosting model on two years of sales, promotion flags, and calendar features, then validates on the most recent quarter.",
    commonDistinction:
      "Requires a learning procedure with data-driven parameter updates; not every AI system learns from examples—a static expert system does not.",
    limitation:
      "Performance is bounded by data quality, representativeness, label accuracy, and validation discipline. No algorithm compensates for fundamentally missing or biased signal.",
    learnBefore: ["ai", "dataset"],
    learnAfter: ["training", "validation", "model"],
  },
  dl: {
    coreMeaning:
      "Deep learning uses neural networks with multiple nonlinear layers to learn hierarchical representations directly from raw or weakly processed inputs. Each layer transforms the previous representation; deeper stacks capture increasingly abstract structure.",
    workflowLocation:
      "Model selection and training for unstructured or high-dimensional data—images, audio, text, and large tabular embeddings—when hand-crafted features are insufficient or unavailable.",
    functionRole:
      "Enables end-to-end representation learning so the model discovers useful features jointly with the prediction task rather than relying on manual feature engineering.",
    mechanism:
      "Stacked layers apply weighted linear transforms followed by nonlinear activations. Backpropagation computes gradients of the loss with respect to each weight; optimizers such as Adam update parameters over many epochs on minibatches.",
    example:
      "A convolutional network trained on dermatology images learns edge, texture, and lesion-pattern detectors in early layers and disease-relevant combinations in deeper layers without predefined descriptors.",
    commonDistinction:
      "A subset of machine learning focused on deep networks—not the default for small tabular datasets where tree ensembles often outperform with less data and compute.",
    limitation:
      "Typically requires substantial labeled data, GPU-class compute, careful regularization, and monitoring for overfitting. Interpretability of internal representations remains limited.",
    learnBefore: ["ml", "neural-network", "loss-function"],
    learnAfter: ["cnn", "transformer", "backpropagation"],
  },
  dataset: {
    coreMeaning:
      "A dataset is an organized collection of observations, each described by one or more features and optionally by labels or targets. Rows represent samples; columns represent variables. The dataset is the empirical basis from which patterns are estimated and evaluated.",
    workflowLocation:
      "Data collection and cleaning at the start of the pipeline. Partitions of the dataset feed training, validation, and testing. Quality audits occur before any model fitting.",
    functionRole:
      "Supplies the empirical evidence from which parameters are estimated, hyperparameters are tuned, and final performance is judged.",
    mechanism:
      "Samples are treated as draws from an underlying data-generating process. Training fits parameters; validation estimates generalization during development; testing provides a final unbiased estimate after all choices are locked.",
    example:
      "Twelve thousand customer records with demographics, transaction history, and a churn label are split 70% train, 15% validation, and 15% test before any model work begins.",
    commonDistinction:
      "Raw observations and their labels versus the feature matrix derived through preprocessing and feature engineering.",
    limitation:
      "Biased, incomplete, or non-representative data caps every downstream model regardless of algorithm sophistication.",
    learnBefore: ["feature", "label"],
    learnAfter: ["train-test-split", "preprocessing", "data-leakage"],
  },
  feature: {
    coreMeaning:
      "A feature is a measurable attribute or constructed signal that encodes information about each sample in a form the model can consume. Features may be raw measurements, derived ratios, categorical encodings, or learned embeddings.",
    workflowLocation:
      "Preprocessing and feature engineering after data collection and before model training. Feature design strongly influences which algorithms are appropriate.",
    functionRole:
      "Translates raw observations into numeric or structured inputs that expose the patterns the model must learn.",
    mechanism:
      "Consumed as scalars, vectors, tensors, or embedding lookups depending on model interface. Distance-based methods treat features as coordinates; tree methods split on individual feature values; neural networks learn composite functions of features.",
    example:
      "Debt-to-income ratio computed from raw account balances and annual income becomes a single feature in a credit-risk model.",
    commonDistinction:
      "Hand-built tabular features versus embeddings learned inside a neural network—the former are interpretable columns; the latter are dense vectors without direct column names.",
    limitation:
      "Weak, redundant, leaky, or misaligned features limit performance regardless of model family.",
    learnBefore: ["dataset"],
    learnAfter: ["feature-engineering", "preprocessing", "standardization"],
  },
  label: {
    coreMeaning:
      "A label is the ground-truth supervised outcome attached to a training sample—the quantity the model is trained to predict. In classification, labels are discrete classes; in regression, labels are continuous targets.",
    workflowLocation:
      "Defined during data annotation and used during supervised training and evaluation metric computation.",
    functionRole:
      "Defines the prediction objective: the optimizer adjusts model parameters so outputs align with labels on training data.",
    mechanism:
      "Paired with input features in the loss function. Classification uses cross-entropy or hinge loss against class labels; regression uses squared or absolute error against numeric targets.",
    example:
      "Each histology image patch carries a pathologist-assigned label of malignant or benign used to train a diagnostic classifier.",
    commonDistinction:
      "Known label available during training versus unlabeled input at inference time when only features are provided.",
    limitation:
      "Noisy, inconsistent, ambiguous, or class-imbalanced labels directly degrade learnable signal and metric reliability.",
    learnBefore: ["dataset", "feature"],
    learnAfter: ["target", "loss-function", "training"],
  },
  target: {
    coreMeaning:
      "The target is the variable a supervised model is trained to predict—the output corresponding to each input sample. Target and label refer to the same quantity; target emphasizes the prediction side of the relationship.",
    workflowLocation:
      "Specified during problem formulation and used throughout training, validation, and evaluation.",
    functionRole:
      "Anchors the optimization objective: every predicted output is compared against the target to compute loss and metrics.",
    mechanism:
      "For regression, targets are continuous values compared via MSE or MAE. For classification, targets are class indices or one-hot vectors compared via cross-entropy.",
    example:
      "In a housing price model, the target is the sold price in dollars; features include square footage, age, and location.",
    commonDistinction:
      "Target (what the model predicts) versus feature (what the model receives as input).",
    limitation:
      "Target definition errors—wrong granularity, delayed labels, or proxy targets that do not match business goals—cannot be corrected by model choice alone.",
    learnBefore: ["label", "feature"],
    learnAfter: ["loss-function", "training"],
  },
  model: {
    coreMeaning:
      "A model is a parameterized function that maps inputs to outputs. Architecture defines the function family; learned parameters determine the specific mapping fitted to data.",
    workflowLocation:
      "Selected during model selection, fitted during training, tuned during validation, and executed during inference and deployment.",
    functionRole:
      "Implements the input-to-output mapping whose parameters are optimized to minimize prediction error on training data while generalizing to new samples.",
    mechanism:
      "Forward computation transforms inputs through the architecture; training adjusts parameters via optimization on a loss function; inference applies fixed parameters without further learning.",
    example:
      "A random forest with two hundred trees maps standardized sensor features to equipment failure probability after training on labeled maintenance logs.",
    commonDistinction:
      "The model (architecture plus parameters) versus the training procedure that fits parameters and the inference procedure that applies them.",
    limitation:
      "Model capacity must match data complexity—too simple causes underfitting; too flexible causes overfitting without adequate regularization or data.",
    learnBefore: ["feature", "label"],
    learnAfter: ["parameter", "training", "inference"],
  },
  parameter: {
    coreMeaning:
      "Parameters are internal values learned from data during training—weights, biases, and similar coefficients that define the model's behavior. They are updated by the optimizer to reduce training loss.",
    workflowLocation:
      "Estimated during training; fixed during validation, testing, and inference.",
    functionRole:
      "Store the knowledge extracted from training data—the specific numeric values that implement the learned mapping.",
    mechanism:
      "Gradient-based methods compute partial derivatives of the loss with respect to each parameter and apply update rules. Tree models store split thresholds and leaf values as parameters.",
    example:
      "A linear regression stores one weight per feature plus an intercept bias; after training, the weight on square footage might be 120 dollars per square foot.",
    commonDistinction:
      "Learned parameters (updated from data) versus hyperparameters (set by the practitioner before training, such as learning rate or tree depth).",
    limitation:
      "Parameter count scales with model capacity; very large parameter counts require more data and regularization to generalize reliably.",
    learnBefore: ["model", "training"],
    learnAfter: ["hyperparameter", "gradient-descent", "regularization"],
  },
  hyperparameter: {
    coreMeaning:
      "Hyperparameters are configuration values set before training that control the learning process or model capacity. They are not updated from training data; they are chosen by the practitioner or search procedure.",
    workflowLocation:
      "Set prior to training; tuned using validation data or cross-validation; locked before final test evaluation.",
    functionRole:
      "Controls how learning proceeds—learning rate, regularization strength, network depth, tree count—and therefore strongly influences generalization.",
    mechanism:
      "Each training run uses a fixed hyperparameter configuration. Validation performance across configurations guides selection. Grid search, random search, or Bayesian optimization automate the search.",
    example:
      "A practitioner tries learning rates of 0.001, 0.01, and 0.1 with five-fold cross-validation, selecting the rate with highest mean validation F1.",
    commonDistinction:
      "Configured by the user before training versus parameters learned automatically from data during training.",
    limitation:
      "Tuning on the test set leaks information; hyperparameters must be selected using validation or nested cross-validation only.",
    learnBefore: ["parameter", "training", "validation"],
    learnAfter: ["cross-validation", "grid-search", "random-search"],
  },
  training: {
    coreMeaning:
      "Training is the phase in which model parameters are adjusted using data to minimize a defined loss function. The model observes labeled or unlabeled samples and updates its internal state accordingly.",
    workflowLocation:
      "Follows preprocessing and model selection; precedes validation and testing. May iterate with hyperparameter tuning.",
    functionRole:
      "Fits the model to observed patterns so it can produce useful predictions on new inputs.",
    mechanism:
      "Minibatches of data flow through the model; loss is computed against labels; optimizers apply parameter updates. Training stops after a fixed epoch count, convergence criterion, or early stopping on validation loss.",
    example:
      "A neural network trains for fifty epochs on eighty thousand labeled images, saving the checkpoint with lowest validation loss.",
    commonDistinction:
      "Parameter updates from labeled data versus inference, where parameters are fixed and only forward computation occurs.",
    limitation:
      "Extended training without validation monitoring can overfit; training data must not include test or future information.",
    learnBefore: ["model", "loss-function", "dataset"],
    learnAfter: ["validation", "inference", "overfitting"],
  },
  validation: {
    coreMeaning:
      "Validation is the process of estimating model performance on held-out data during development to compare alternatives and tune hyperparameters. It guides modeling decisions without consuming the final test set.",
    workflowLocation:
      "After initial training and throughout hyperparameter tuning and model selection. Occurs repeatedly during development.",
    functionRole:
      "Estimates generalization during development so practitioners can compare models and settings without biasing the final test estimate.",
    mechanism:
      "A validation partition or cross-validation folds hold out data not used for parameter updates. Metrics on validation data reflect expected performance if the development process is disciplined.",
    example:
      "Three candidate classifiers are compared by mean validation AUC across five stratified folds; the winner proceeds to final test evaluation.",
    commonDistinction:
      "Development-time performance estimation for model selection—not the one-time final test score reported after all choices are locked.",
    limitation:
      "Repeated validation-based decisions on the same partition can indirectly overfit validation; nested cross-validation or a fresh holdout mitigates this.",
    learnBefore: ["training", "train-test-split"],
    learnAfter: ["testing", "cross-validation", "hyperparameter-tuning"],
  },
  testing: {
    coreMeaning:
      "Testing evaluates the fully specified model—architecture, hyperparameters, and preprocessing—on data never used during training or tuning. It produces the final unbiased performance estimate.",
    workflowLocation:
      "Once after all modeling, preprocessing, and hyperparameter decisions are finalized.",
    functionRole:
      "Provides the definitive generalization estimate reported to stakeholders before deployment.",
    mechanism:
      "The test partition is touched only once. The same preprocessing fitted on training data is applied; the locked model generates predictions; metrics are computed and reported.",
    example:
      "After selecting a fraud model via cross-validation, engineers evaluate once on the fifteen-percent test partition and report precision at the chosen threshold.",
    commonDistinction:
      "One-time final evaluation versus validation, which may be consulted many times during development.",
    limitation:
      "A single test set gives one estimate; confidence intervals from cross-validation or bootstrap resampling add statistical context.",
    learnBefore: ["validation", "cross-validation"],
    learnAfter: ["deployment", "monitoring", "accuracy"],
  },
  inference: {
    coreMeaning:
      "Inference is the application of a trained model to new inputs to produce predictions or generations. Parameters remain fixed; no learning occurs during inference.",
    workflowLocation:
      "Deployment and production serving after training and validation are complete. Also used for batch scoring on new data.",
    functionRole:
      "Delivers the model's output—class labels, probabilities, numeric predictions, or generated text—to downstream systems or users.",
    mechanism:
      "Inputs pass through the same preprocessing pipeline fitted during training, then through the forward computation of the model. Latency, memory, and numeric precision depend on deployment runtime.",
    example:
      "A deployed keyword-spotting model runs on a microcontroller, processing twenty-millisecond audio windows and outputting wake-word confidence scores.",
    commonDistinction:
      "Forward prediction with fixed weights versus training, which updates parameters from labeled data.",
    limitation:
      "Inference behavior depends on preprocessing parity with training; distribution shift in production inputs degrades accuracy without retraining or monitoring.",
    learnBefore: ["training", "model"],
    learnAfter: ["deployment", "quantization", "deployment-verification"],
  },
  "loss-function": {
    coreMeaning:
      "A loss function quantifies the discrepancy between model predictions and ground-truth targets during training. It defines the optimization objective that parameter updates minimize.",
    workflowLocation:
      "Specified before training and computed on every minibatch or sample during parameter updates.",
    functionRole:
      "Provides the scalar signal that drives learning—telling the optimizer which direction to adjust parameters.",
    mechanism:
      "Differentiable losses enable gradient-based optimization. Regression uses MSE or MAE; binary classification uses cross-entropy −[y log ŷ + (1−y) log(1−ŷ)]. Regularization terms may be added to penalize complexity.",
    equation: eq(
      "J(θ) = (1/n) Σᵢ L(yᵢ, ŷᵢ) + λ·R(θ)",
      "The total training objective averages per-sample loss L over n examples and optionally adds a regularization penalty R scaled by λ.",
      "Gradient descent minimizes J with respect to parameters θ. The choice of L determines what error type the model prioritizes—squared error for regression, cross-entropy for classification.",
      [
        { symbol: "J(θ)", meaning: "Total loss as a function of model parameters θ" },
        { symbol: "L(yᵢ, ŷᵢ)", meaning: "Per-sample loss comparing true target yᵢ to prediction ŷᵢ" },
        { symbol: "n", meaning: "Number of training samples" },
        { symbol: "λ", meaning: "Regularization strength (zero if none)" },
        { symbol: "R(θ)", meaning: "Regularization penalty on parameters" },
      ],
      "Use MSE or MAE for regression; cross-entropy for classification; add regularization when overfitting is observed."
    ),
    example:
      "A binary classifier uses cross-entropy loss so predicted probabilities are pushed toward zero or one for negative and positive labels respectively.",
    commonDistinction:
      "Training loss optimized during fitting versus evaluation metrics (F1, AUC) used to judge deployment readiness—they need not be identical.",
    limitation:
      "Optimizing the wrong loss for the business goal—e.g., accuracy when false negatives are costly—produces models that score well but fail operationally.",
    learnBefore: ["label", "training", "model"],
    learnAfter: ["gradient-descent", "backpropagation", "mse"],
  },
  overfitting: {
    coreMeaning:
      "Overfitting occurs when a model captures idiosyncrasies and noise in the training set that do not transfer to new data. Training performance remains strong while validation performance degrades.",
    workflowLocation:
      "Diagnosed during training and validation by comparing performance curves on training versus held-out partitions.",
    functionRole:
      "Signals that the model has excessive capacity relative to data complexity or has trained too long without adequate regularization.",
    mechanism:
      "High-variance models memorize training samples including label noise. Indicators include a growing gap between training and validation error, near-perfect training accuracy with poor validation scores, and unstable predictions on small input perturbations.",
    example:
      "A decision tree grown to full depth achieves 100% training accuracy but only 72% validation accuracy on the same classification task.",
    commonDistinction:
      "High-variance overfitting (large train–validation gap) versus underfitting (high error on both sets from insufficient capacity).",
    limitation:
      "Mitigation requires more data, regularization, simpler models, early stopping, or better validation—not unlimited training epochs.",
    learnBefore: ["validation", "training", "cross-validation"],
    learnAfter: ["regularization", "underfitting", "bias-variance"],
  },
  underfitting: {
    coreMeaning:
      "Underfitting means the model is too simple or insufficiently trained to capture the underlying relationship in the data. Both training and validation error remain high.",
    workflowLocation:
      "Model selection and training diagnostics when performance plateaus below acceptable levels despite adequate data.",
    functionRole:
      "Indicates the model lacks capacity, appropriate features, or sufficient training to represent the signal in the data.",
    mechanism:
      "High bias from limited model complexity, overly aggressive regularization, or feature sets that omit necessary information. The model systematically misses structure present in the data.",
    example:
      "A linear boundary on data that require a nonlinear separation yields 65% accuracy on both training and validation sets.",
    commonDistinction:
      "Weak model bias with high error everywhere versus overfitting with low training error but high validation error.",
    limitation:
      "Increasing complexity without validation discipline can shift the problem to overfitting rather than resolve underfitting.",
    learnBefore: ["model", "training", "feature"],
    learnAfter: ["overfitting", "regularization", "feature-engineering"],
  },
  "data-leakage": {
    coreMeaning:
      "Data leakage is the introduction of information from the test set, future time periods, or the target variable into training, preprocessing, or feature construction. It produces optimistically biased performance estimates.",
    workflowLocation:
      "A risk to audit throughout preprocessing, feature engineering, validation design, and model training—not only at the training step.",
    functionRole:
      "Identifies contamination that must be eliminated before reported metrics can be trusted for deployment decisions.",
    mechanism:
      "Common sources include fitting scalers on train-plus-test combined, target encoding with test labels, temporal features that encode future outcomes, and duplicate samples split across partitions.",
    example:
      "An engineer fits a StandardScaler on the entire dataset including the test partition before cross-validation, inflating reported accuracy by several points.",
    commonDistinction:
      "Illegitimate information flow from holdout or future data versus legitimate feature engineering fit exclusively on training folds.",
    limitation:
      "Leakage is often subtle in complex pipelines; prevention requires strict fit-transform discipline, temporal splits, and group-aware partitioning.",
    learnBefore: ["train-test-split", "preprocessing", "validation"],
    learnAfter: ["cross-validation", "nested-cv"],
  },
};
