import type { Concept } from "@/types/concept";
import { eq } from "./helpers";

export const validationLessons: Partial<Record<string, Partial<Concept>>> = {
  "train-test-split": {
    coreMeaning:
      "Train-test split partitions data into disjoint subsets: one for fitting model parameters and one for final unbiased evaluation. The test set is used only once after all development decisions are complete.",
    workflowLocation:
      "First partitioning step after data collection, before training and hyperparameter tuning.",
    functionRole:
      "Reserves held-out data so reported performance reflects generalization rather than memorization.",
    mechanism:
      "Random or stratified sampling assigns rows to partitions. Typical ratios are 70–80% train, 10–15% validation, 10–15% test. Stratification preserves class proportions.",
    example:
      "Ten thousand labeled images are split 70/15/15; models train on seven thousand, tune on fifteen hundred, and report final metrics on fifteen hundred.",
    commonDistinction:
      "One-time test evaluation versus cross-validation, which rotates validation folds for more stable estimates during tuning.",
    limitation:
      "A single split's estimate has variance; small test sets produce unreliable metrics. Temporal or group structure may require specialized splitting.",
    learnBefore: ["dataset", "validation"],
    learnAfter: ["cross-validation", "data-leakage"],
  },
  "cross-validation": {
    coreMeaning:
      "Cross-validation repeatedly partitions the development pool into training and validation folds, averaging performance metrics across rotations to stabilize generalization estimates.",
    workflowLocation:
      "Hyperparameter tuning and model comparison before the final held-out test evaluation.",
    functionRole:
      "Reduces variance of performance estimates compared to a single validation split.",
    mechanism:
      "k-fold CV divides data into k equal folds; each fold serves once as validation while the remaining k−1 folds train the model. Stratified variants preserve class ratios.",
    example:
      "Decision tree depth is selected by mean validation F1 across five stratified folds on an imbalanced defect dataset.",
    commonDistinction:
      "Repeated development estimates for tuning—not the one-time final test score reported after all choices are locked.",
    limitation:
      "Invalid when folds ignore temporal order or group structure; computational cost grows with fold count.",
    learnBefore: ["train-test-split", "validation"],
    learnAfter: ["nested-cv", "grid-search", "hyperparameter-tuning"],
  },
  "nested-cv": {
    coreMeaning:
      "Nested cross-validation uses an outer loop for unbiased performance estimation and an inner loop for hyperparameter tuning. The outer test fold never participates in tuning.",
    workflowLocation:
      "Rigorous model evaluation when hyperparameter search would otherwise contaminate cross-validation estimates.",
    functionRole:
      "Separates tuning from performance estimation to prevent optimistic bias in reported metrics.",
    mechanism:
      "Each outer fold is held out. On the remaining data, inner cross-validation selects hyperparameters. The outer fold is evaluated with the selected settings. Results are averaged across outer folds.",
    example:
      "An outer five-fold loop reports mean AUC while each inner three-fold loop selects SVM regularization strength on the outer training portion only.",
    commonDistinction:
      "Unbiased nested estimation versus flat cross-validation that reuses the same folds for both tuning and scoring.",
    limitation:
      "Computationally expensive—each outer fold runs a full inner search. Still requires a separate test set for final deployment sign-off if available.",
    learnBefore: ["cross-validation", "grid-search"],
    learnAfter: ["hyperparameter-tuning", "bias-variance"],
  },
  "grid-search": {
    coreMeaning:
      "Grid search exhaustively evaluates a predefined Cartesian product of hyperparameter values, selecting the combination with the best cross-validated score.",
    workflowLocation:
      "Hyperparameter tuning after model family is chosen and cross-validation framework is established.",
    functionRole:
      "Systematically explores a bounded hyperparameter space when the number of combinations is manageable.",
    mechanism:
      "Every combination in the grid is trained and evaluated via cross-validation. The configuration with the best mean validation metric is selected.",
    example:
      "SVM C and gamma each take three values, producing nine combinations evaluated with five-fold cross-validation on standardized features.",
    commonDistinction:
      "Exhaustive discrete search versus random search, which samples combinations and may find good settings with fewer evaluations.",
    limitation:
      "Cost grows exponentially with dimensions; poor grid bounds miss optimal regions entirely.",
    learnBefore: ["cross-validation", "hyperparameter"],
    learnAfter: ["random-search", "bayesian-optimization", "nested-cv"],
  },
  "random-search": {
    coreMeaning:
      "Random search samples hyperparameter combinations from specified distributions rather than exhaustively gridding. It often finds strong settings with fewer evaluations than grid search.",
    workflowLocation:
      "Hyperparameter tuning when the search space is large or only a few hyperparameters strongly affect performance.",
    functionRole:
      "Explores broad hyperparameter spaces efficiently when exhaustive grid search is too costly.",
    mechanism:
      "Each trial draws random values from per-parameter ranges or distributions. Cross-validation scores each trial; the best trial is selected.",
    example:
      "Fifty random draws of learning rate (log-uniform), batch size, and dropout rate are evaluated with three-fold CV on a neural network.",
    commonDistinction:
      "Random sampling versus exhaustive grid search—random search allocates trials across all dimensions rather than concentrating on grid intersections.",
    limitation:
      "No guarantee of finding the global optimum; results depend on trial count and range specification.",
    learnBefore: ["grid-search", "cross-validation"],
    learnAfter: ["bayesian-optimization", "hyperparameter-tuning"],
  },
  "bayesian-optimization": {
    coreMeaning:
      "Bayesian optimization models the validation score as a function of hyperparameters using a surrogate (typically Gaussian process), selecting each new trial to balance exploration and exploitation.",
    workflowLocation:
      "Expensive hyperparameter tuning when each training run is costly—deep networks, large ensembles, or long simulations.",
    functionRole:
      "Finds strong hyperparameter settings with fewer evaluations than grid or random search.",
    mechanism:
      "A surrogate estimates the objective surface; an acquisition function (e.g., expected improvement) picks the next point to evaluate. Each trial updates the surrogate.",
    example:
      "Twenty sequential trials tune transformer fine-tuning learning rate and weight decay, each trial taking two GPU hours.",
    commonDistinction:
      "Sequential model-guided search versus parallel random or grid evaluation without learning from prior trials.",
    limitation:
      "Surrogate overhead and complexity; less beneficial when individual trials are cheap.",
    learnBefore: ["random-search", "cross-validation"],
    learnAfter: ["hyperparameter-tuning", "nested-cv"],
  },
  "bias-variance": {
    coreMeaning:
      "The bias-variance tradeoff describes how model complexity affects two sources of prediction error: bias (systematic underfitting from overly simple models) and variance (sensitivity to training sample noise from overly flexible models).",
    workflowLocation:
      "Model selection and diagnostic analysis when comparing training versus validation error across complexity levels.",
    functionRole:
      "Explains why increasing model complexity first reduces error then increases it as variance dominates.",
    mechanism:
      "Expected prediction error decomposes into bias², variance, and irreducible noise. Simple models have high bias; complex models fit training noise, raising variance.",
    equation: eq(
      "E[(y − ŷ)²] = Bias² + Variance + Irreducible Error",
      "Expected squared error equals squared bias plus variance plus noise that no model can remove.",
      "Underfitting corresponds to high bias; overfitting to high variance. Optimal complexity minimizes the sum.",
      [
        { symbol: "Bias", meaning: "Systematic error from model being too simple" },
        { symbol: "Variance", meaning: "Error from sensitivity to training sample fluctuations" },
        { symbol: "Irreducible Error", meaning: "Noise inherent in the data-generating process" },
      ]
    ),
    example:
      "A shallow tree underfits (high bias); an unconstrained deep tree overfits (high variance); a pruned tree at moderate depth minimizes validation error.",
    commonDistinction:
      "Error decomposition framework versus individual symptoms—overfitting is high variance; underfitting is high bias.",
    limitation:
      "Decomposition is most intuitive for squared error; classification requires analogous frameworks.",
    learnBefore: ["overfitting", "underfitting", "cross-validation"],
    learnAfter: ["regularization", "model-selection"],
  },
  "hyperparameter-tuning": {
    coreMeaning:
      "Hyperparameter tuning is the process of selecting configuration values—learning rate, tree depth, regularization strength—that control training but are not learned from data.",
    workflowLocation:
      "After model family selection and before final test evaluation, using validation or cross-validation.",
    functionRole:
      "Finds settings that maximize generalization performance within the chosen model family.",
    mechanism:
      "Search strategies include grid search, random search, and Bayesian optimization. All must respect partition boundaries to avoid leakage.",
    example:
      "Random forest tree count and max depth are tuned via five-fold cross-validation before locking settings for test evaluation.",
    commonDistinction:
      "Tuning configuration before training versus updating parameters during training.",
    limitation:
      "Tuning on the test set invalidates reported metrics; use validation or nested cross-validation exclusively.",
    learnBefore: ["hyperparameter", "cross-validation"],
    learnAfter: ["grid-search", "nested-cv", "testing"],
  },
  regularization: {
    coreMeaning:
      "Regularization adds penalties or constraints during training to discourage excessive model complexity and reduce overfitting.",
    workflowLocation:
      "Applied during training as part of the loss function or as architectural constraints.",
    functionRole:
      "Controls variance by limiting parameter magnitude or model structure.",
    mechanism:
      "L2 (ridge) penalizes squared weights; L1 (lasso) encourages sparsity; dropout randomly disables neurons; early stopping halts training when validation error rises.",
    equation: eq(
      "J_reg(θ) = J(θ) + λ Σⱼ θⱼ²   (L2 / Ridge)",
      "The regularized loss adds a penalty proportional to squared parameter values scaled by λ.",
      "Larger λ shrinks weights toward zero, reducing variance at the cost of increased bias. L1 penalties can zero out weights entirely for feature selection.",
      [
        { symbol: "J(θ)", meaning: "Original training loss" },
        { symbol: "λ", meaning: "Regularization strength (hyperparameter)" },
        { symbol: "θⱼ", meaning: "Individual model parameters" },
      ]
    ),
    example:
      "A logistic regression with L2 penalty maintains stable coefficients when two hundred correlated features are present.",
    commonDistinction:
      "Explicit complexity penalty versus simply using a simpler model family with fewer parameters.",
    limitation:
      "Excessive regularization causes underfitting; λ must be tuned via validation.",
    learnBefore: ["overfitting", "loss-function"],
    learnAfter: ["bias-variance", "hyperparameter-tuning"],
  },
};
