import type { Concept } from "@/types/concept";
import { eq } from "./helpers";

export const algorithmLessons: Partial<Record<string, Partial<Concept>>> = {
  "linear-regression": {
    coreMeaning:
      "Linear regression models a continuous target as a weighted sum of input features plus an intercept. It assumes a linear relationship between features and the expected target value.",
    workflowLocation:
      "Model selection and training for regression tasks with interpretable coefficients and moderate dimensionality.",
    functionRole:
      "Predicts continuous outcomes while providing directly interpretable feature weights.",
    mechanism:
      "Parameters are fit by minimizing sum of squared residuals—ordinary least squares has a closed-form solution; large datasets use iterative gradient descent.",
    equation: eq(
      "ŷ = w·x + b  (vector form: ŷ = wᵀx + b)",
      "The prediction ŷ is a linear combination of input features x with weights w plus bias b.",
      "Each weight wⱼ indicates how much feature j shifts the prediction per unit change. Minimizing MSE finds the best w and b on training data.",
      [
        { symbol: "ŷ", meaning: "Predicted continuous target" },
        { symbol: "w", meaning: "Weight vector (one coefficient per feature)" },
        { symbol: "x", meaning: "Input feature vector" },
        { symbol: "b", meaning: "Bias (intercept)" },
      ],
      "Assumes linearity and homoscedastic errors; nonlinear relationships require feature transforms or other models."
    ),
    example:
      "Predicting house price from square footage and age with coefficients showing dollars added per square foot and per year of age.",
    commonDistinction:
      "Continuous linear output versus logistic regression, which models class probabilities via a sigmoid.",
    limitation:
      "Cannot capture nonlinear interactions without explicit feature engineering; sensitive to multicollinearity among features.",
    learnBefore: ["feature", "loss-function", "mse"],
    learnAfter: ["logistic-regression", "regularization", "gradient-descent"],
  },
  "logistic-regression": {
    coreMeaning:
      "Logistic regression models class membership probabilities by applying a sigmoid (binary) or softmax (multiclass) function to a linear score of the inputs.",
    workflowLocation:
      "Model selection for interpretable binary or multiclass classification, often as a strong baseline.",
    functionRole:
      "Estimates calibrated class probabilities with linear decision boundaries in feature space.",
    mechanism:
      "A linear score z = wᵀx + b is passed through the sigmoid to produce p ∈ (0, 1). Training minimizes cross-entropy loss via gradient descent.",
    equation: eq(
      "p = 1 / (1 + e^(−z))   where   z = wᵀx + b",
      "The sigmoid maps linear score z to a probability p between 0 and 1.",
      "When z is large positive, p approaches 1; when z is large negative, p approaches 0. The decision boundary is where z = 0 (typically p = 0.5).",
      [
        { symbol: "p", meaning: "Predicted probability of the positive class" },
        { symbol: "z", meaning: "Linear score (log-odds before sigmoid)" },
        { symbol: "w, x, b", meaning: "Weights, features, and bias as in linear regression" },
        { symbol: "e", meaning: "Euler's number (base of natural log)" },
      ],
      "Decision boundaries are linear in feature space; nonlinear problems require feature expansion or other models."
    ),
    example:
      "Email spam classification with probabilistic outputs and inspectable feature weights showing which terms increase spam score.",
    commonDistinction:
      "Probabilistic linear classifier versus SVM margin maximization without default probability calibration.",
    limitation:
      "Linear boundaries only unless features are expanded; class imbalance may require weighting or threshold tuning.",
    learnBefore: ["linear-regression", "standardization"],
    learnAfter: ["svm", "roc-auc", "f1-score"],
  },
  svm: {
    coreMeaning:
      "Support Vector Machines find the hyperplane that separates classes with the maximum margin—the widest gap between the boundary and the nearest training points (support vectors).",
    workflowLocation:
      "Model selection for classification when feature scaling is feasible and dataset size is moderate.",
    functionRole:
      "Maximizes separation between classes, yielding a robust boundary determined by support vectors near the margin.",
    mechanism:
      "A convex optimization problem finds weights that maximize margin subject to correct classification. Kernel functions implicitly map inputs to higher dimensions for nonlinear boundaries.",
    equation: eq(
      "f(x) = sign(wᵀφ(x) + b)",
      "The classifier returns the sign of the decision function; φ(x) is the feature map (identity for linear SVM, implicit for kernels).",
      "Only support vectors—points on or within the margin—determine w and b. The margin width is 2/||w||.",
      [
        { symbol: "w", meaning: "Weight vector normal to the hyperplane" },
        { symbol: "φ(x)", meaning: "Feature map (kernel trick for nonlinear SVM)" },
        { symbol: "b", meaning: "Bias offsetting the hyperplane" },
      ],
      "Feature scaling is essential; unscaled features distort margin geometry. Training cost grows with sample count."
    ),
    example:
      "A linear SVM classifies handwritten digits after z-score scaling, deployed as a compact weight vector on a microcontroller.",
    commonDistinction:
      "Margin-based separation versus probabilistic logistic regression optimizing cross-entropy.",
    limitation:
      "Training cost scales poorly with very large datasets; kernel models increase inference complexity.",
    learnBefore: ["standardization", "logistic-regression"],
    learnAfter: ["random-forest", "gradient-boosting"],
  },
  knn: {
    coreMeaning:
      "k-Nearest Neighbors is a lazy instance-based learner that stores all training examples and predicts by aggregating the labels or values of the k closest points in feature space.",
    workflowLocation:
      "Model selection for small datasets, baselines, or when local structure matters and inference latency permits.",
    functionRole:
      "Predicts by local similarity without compressing training data into fixed parameters.",
    mechanism:
      "At inference, distance (typically Euclidean) is computed from the query to all stored samples. Classification uses majority vote; regression uses the mean of neighbor targets.",
    equation: eq(
      "ŷ = mode({yᵢ : xᵢ ∈ N_k(x)})   (classification)",
      "The prediction is the majority class among the k training points nearest to query x.",
      "Distance metric and k control bias-variance: small k fits local noise; large k smooths over local structure. Feature scaling strongly affects distances.",
      [
        { symbol: "N_k(x)", meaning: "Set of k training points closest to query x" },
        { symbol: "yᵢ", meaning: "Label of neighbor i" },
        { symbol: "k", meaning: "Number of neighbors considered" },
      ],
      "For regression, ŷ is the mean of neighbor targets. Store and search efficiently with indexing for large training sets."
    ),
    example:
      "A wine quality baseline assigns the category of the three nearest labeled samples in standardized chemical feature space.",
    commonDistinction:
      "Instance-based memory versus parametric models that compress patterns into fixed weights.",
    limitation:
      "Inference latency and memory grow with training set size; performance degrades in high dimensions without careful feature design.",
    learnBefore: ["standardization", "train-test-split"],
    learnAfter: ["svm", "decision-tree"],
  },
  "decision-tree": {
    coreMeaning:
      "A decision tree recursively partitions feature space with if-then rules. Each internal node tests a feature threshold; each leaf assigns a class label or numeric prediction.",
    workflowLocation:
      "Model selection when interpretable rules, mixed feature types, or fast embedded inference are priorities.",
    functionRole:
      "Produces auditable sequential decisions that map directly to human-readable policies.",
    mechanism:
      "Greedy splitting selects the feature and threshold that maximize impurity reduction (Gini, entropy for classification; MSE for regression). Depth and minimum leaf size control complexity.",
    example:
      "A credit approval tree evaluates income and payment history in sequence, ending in approve or deny leaves auditable by compliance teams.",
    commonDistinction:
      "Single interpretable tree versus Random Forest ensemble—one tree is readable but high-variance.",
    limitation:
      "Unconstrained depth on small data overfits; small input changes can alter tree structure (instability).",
    learnBefore: ["feature", "overfitting"],
    learnAfter: ["random-forest", "gradient-boosting"],
  },
  "random-forest": {
    coreMeaning:
      "Random Forest is an ensemble of decorrelated decision trees trained on bootstrap samples with random feature subsets at each split. Predictions aggregate votes or averages across trees.",
    workflowLocation:
      "Default strong choice for tabular classification or regression when accuracy matters more than a single readable rule set.",
    functionRole:
      "Reduces variance of individual trees by averaging diverse models trained on perturbed data.",
    mechanism:
      "Bagging draws bootstrap training sets; random feature subsets at splits reduce correlation between trees. Final output is mode (classification) or mean (regression).",
    example:
      "A fraud detector trains two hundred shallow trees on resampled transaction rows and flags cases when a majority vote fraudulent.",
    commonDistinction:
      "Parallel bagging versus sequential gradient boosting—Random Forest reduces variance; boosting reduces bias iteratively.",
    limitation:
      "Flash and RAM footprint scale with tree count; no single coherent rule set for audit.",
    learnBefore: ["decision-tree", "cross-validation"],
    learnAfter: ["gradient-boosting", "xgboost"],
  },
  "gradient-boosting": {
    coreMeaning:
      "Gradient boosting builds an ensemble sequentially: each new weak learner (typically a shallow tree) is trained to correct the residual errors of the combined model so far.",
    workflowLocation:
      "Model selection for tabular data when maximum predictive accuracy is the priority and training time permits sequential fitting.",
    functionRole:
      "Iteratively reduces bias by fitting each new model to the remaining error of the current ensemble.",
    mechanism:
      "An initial prediction is refined by adding trees fit to pseudo-residuals (negative gradients of the loss). A learning rate shrinks each tree's contribution to prevent overfitting.",
    equation: eq(
      "F_m(x) = F_{m−1}(x) + η · h_m(x)",
      "Each boosting round adds a new weak learner h_m scaled by learning rate η to the ensemble F.",
      "h_m is fit to the negative gradient of the loss at the current predictions. Smaller η requires more trees but often generalizes better.",
      [
        { symbol: "F_m", meaning: "Ensemble prediction after m rounds" },
        { symbol: "h_m", meaning: "Weak learner added at round m" },
        { symbol: "η", meaning: "Learning rate (shrinkage factor)" },
      ],
      "Watch validation loss for overfitting; early stopping and limited tree depth are common regularizers."
    ),
    example:
      "An XGBoost model for credit default adds fifty shallow trees sequentially, each correcting misclassified applicants from prior rounds.",
    commonDistinction:
      "Sequential error correction versus Random Forest's parallel bagging of independent trees.",
    limitation:
      "Sequential training is slower than bagging; sensitive to hyperparameters and prone to overfitting without early stopping.",
    learnBefore: ["decision-tree", "loss-function"],
    learnAfter: ["xgboost", "random-forest"],
  },
  xgboost: {
    coreMeaning:
      "XGBoost (Extreme Gradient Boosting) is an optimized implementation of gradient boosting with regularized objectives, efficient tree construction, and parallel processing support.",
    workflowLocation:
      "High-performance tabular model selection when gradient boosting is the chosen family.",
    functionRole:
      "Delivers state-of-the-art tabular performance with efficient training and built-in regularization.",
    mechanism:
      "Adds L1 and L2 penalties on leaf weights, uses second-order gradient approximation for split finding, and supports column subsampling and histogram-based splits.",
    example:
      "A Kaggle-style tabular competition winner uses XGBoost with five-fold cross-validation and early stopping on validation log-loss.",
    commonDistinction:
      "Optimized gradient boosting library versus generic sklearn GradientBoosting—XGBoost adds speed and regularization defaults.",
    limitation:
      "Still requires careful hyperparameter tuning and validation; less interpretable than a single decision tree.",
    learnBefore: ["gradient-boosting", "cross-validation"],
    learnAfter: ["random-forest", "hardware-aware-selection"],
  },
  "naive-bayes": {
    coreMeaning:
      "Naive Bayes applies Bayes' theorem with the assumption that features are conditionally independent given the class. It computes class posteriors from per-feature likelihoods.",
    workflowLocation:
      "Fast baseline for text classification, spam filtering, and high-dimensional sparse data.",
    functionRole:
      "Provides rapid probabilistic classification with minimal training cost.",
    mechanism:
      "Class priors multiply per-feature likelihoods (or log-sum for numerical stability). Gaussian, multinomial, or Bernoulli variants match feature types.",
    equation: eq(
      "P(C|x) ∝ P(C) · Πⱼ P(xⱼ|C)",
      "Posterior class probability is proportional to the class prior times the product of feature likelihoods under the independence assumption.",
      "The argmax class is predicted. Independence is rarely true but the classifier often works well for text and sparse counts.",
      [
        { symbol: "P(C|x)", meaning: "Posterior probability of class C given features x" },
        { symbol: "P(C)", meaning: "Prior probability of class C" },
        { symbol: "P(xⱼ|C)", meaning: "Likelihood of feature j given class C" },
      ]
    ),
    example:
      "A spam filter models word occurrence probabilities per class and multiplies them to score incoming messages.",
    commonDistinction:
      "Generative probabilistic model versus discriminative classifiers like logistic regression that model P(C|x) directly.",
    limitation:
      "Independence assumption is violated for correlated features; probability estimates may be poorly calibrated.",
    learnBefore: ["feature", "logistic-regression"],
    learnAfter: ["logistic-regression", "precision"],
  },
};
