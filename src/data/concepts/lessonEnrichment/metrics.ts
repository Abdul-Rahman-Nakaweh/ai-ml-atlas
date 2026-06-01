import type { Concept } from "@/types/concept";
import { eq, CM_SYMBOLS } from "./helpers";

export const metricLessons: Partial<Record<string, Partial<Concept>>> = {
  "confusion-matrix": {
    coreMeaning:
      "A confusion matrix tabulates predicted versus actual class labels for each class combination. For binary classification it contains four cells: true positives, false positives, true negatives, and false negatives.",
    workflowLocation:
      "Evaluation after generating predictions on validation or test data, before computing scalar metrics.",
    functionRole:
      "Organizes prediction outcomes by class so error types can be inspected and derived metrics computed.",
    mechanism:
      "Each cell counts how many samples of a given actual class received a given predicted class. Most classification metrics are algebraic functions of these counts.",
    example:
      "After a defect-detection trial, engineers inspect which product defect types are most frequently confused before adjusting imaging conditions.",
    commonDistinction:
      "Outcome counts for error analysis versus a single scalar such as accuracy that collapses the table into one number.",
    limitation:
      "The matrix alone does not encode asymmetric business costs of different error types or calibrate probability outputs.",
    learnBefore: ["validation", "testing"],
    learnAfter: ["accuracy", "precision", "recall", "f1-score"],
  },
  accuracy: {
    coreMeaning:
      "Accuracy is the proportion of all predictions—across every class—that match the true label. It summarizes overall correctness without distinguishing error types.",
    workflowLocation:
      "Evaluation when classes are roughly balanced and misclassification costs are approximately symmetric.",
    functionRole:
      "Provides a single interpretable score of overall classification correctness when classes are balanced.",
    mechanism:
      "Computed from confusion matrix counts: correct predictions divided by total predictions.",
    equation: eq(
      "Accuracy = (TP + TN) / (TP + TN + FP + FN)",
      "Accuracy measures the fraction of all predictions that are correct, regardless of class.",
      "High accuracy indicates general correctness but hides poor performance on minority classes when data are imbalanced.",
      [CM_SYMBOLS.tp, CM_SYMBOLS.tn, CM_SYMBOLS.fp, CM_SYMBOLS.fn],
      "Appropriate for balanced classes and symmetric error costs. Prefer precision, recall, or F1 when classes are imbalanced or error costs differ."
    ),
    example:
      "A digit classifier on a balanced benchmark reports 92% accuracy after final model selection on the held-out test set.",
    commonDistinction:
      "Overall correctness versus precision (reliability of positive predictions) and recall (coverage of actual positives).",
    limitation:
      "Misleading under class imbalance—a majority-class classifier can achieve high accuracy while failing minority classes entirely.",
    learnBefore: ["confusion-matrix"],
    learnAfter: ["precision", "recall", "f1-score"],
  },
  precision: {
    coreMeaning:
      "Precision measures how reliable positive predictions are—the fraction of predicted positives that are truly positive. It answers: when the model says positive, how often is it correct?",
    workflowLocation:
      "Evaluation when false positives carry high cost, such as spam filters, fraud alerts, or automated enforcement actions.",
    functionRole:
      "Quantifies the trustworthiness of positive predictions at a fixed decision threshold.",
    mechanism:
      "Only predicted positives appear in the denominator; false positives reduce precision.",
    equation: eq(
      "Precision = TP / (TP + FP)",
      "Precision is the fraction of predicted positives that are actually positive.",
      "Improving precision requires reducing false positives—often by raising the decision threshold, which may lower recall.",
      [CM_SYMBOLS.tp, CM_SYMBOLS.fp],
      "Prioritize precision when false alarms are costly—legal inbox filters, fraud alerts with manual review queues."
    ),
    example:
      "A legal inbox filter tracks weekly precision on the spam class because marking client mail as spam has severe operational consequences.",
    commonDistinction:
      "False positives dominate precision; false negatives dominate recall. Optimizing one typically reduces the other at a fixed model.",
    limitation:
      "Can be maximized by rarely predicting positive, yielding high precision but unacceptably low recall.",
    learnBefore: ["confusion-matrix", "recall"],
    learnAfter: ["f1-score", "roc-auc"],
  },
  recall: {
    coreMeaning:
      "Recall (sensitivity) measures coverage of the positive class—the fraction of actual positives the model correctly identifies. It answers: of all true positives, how many did the model find?",
    workflowLocation:
      "Screening and safety tasks where missing a positive case is especially harmful.",
    functionRole:
      "Quantifies completeness of positive detection at a fixed decision threshold.",
    mechanism:
      "Only actual positives appear in the denominator; false negatives reduce recall.",
    equation: eq(
      "Recall = TP / (TP + FN)",
      "Recall is the fraction of actual positives that the model correctly identifies.",
      "Improving recall requires reducing false negatives—often by lowering the decision threshold, which may increase false positives and reduce precision.",
      [CM_SYMBOLS.tp, CM_SYMBOLS.fn],
      "Prioritize recall in screening—medical tests, safety inspections, fraud detection where misses are expensive."
    ),
    example:
      "Medical screening prioritizes recall so undetected disease cases are minimized, accepting more follow-up tests from false positives.",
    commonDistinction:
      "Missed positives (false negatives) drive recall; spurious positives (false positives) drive precision.",
    limitation:
      "Can be raised by predicting positive for nearly all samples, often at the expense of many false positives.",
    learnBefore: ["confusion-matrix", "precision"],
    learnAfter: ["f1-score", "specificity", "roc-auc"],
  },
  specificity: {
    coreMeaning:
      "Specificity (true negative rate) measures how well the model identifies actual negatives—the fraction of true negatives correctly classified as negative.",
    workflowLocation:
      "Evaluation when correctly ruling out negatives matters, complementary to recall on the positive class.",
    functionRole:
      "Quantifies the model's ability to avoid false positives among actual negatives.",
    mechanism:
      "Computed from true negatives and false positives in the confusion matrix.",
    equation: eq(
      "Specificity = TN / (TN + FP)",
      "Specificity is the fraction of actual negatives correctly identified as negative.",
      "High specificity means few false positives among negatives. It pairs with recall: recall covers positives; specificity covers negatives.",
      [CM_SYMBOLS.tn, CM_SYMBOLS.fp],
      "Useful when false alarms among healthy or legitimate cases must be minimized."
    ),
    example:
      "A biometric access system tracks specificity to ensure authorized users are rarely denied due to false rejection of valid credentials.",
    commonDistinction:
      "Performance on actual negatives (specificity) versus performance on actual positives (recall/sensitivity).",
    limitation:
      "Like precision and recall, depends on the chosen threshold; report alongside the operating point.",
    learnBefore: ["confusion-matrix", "recall"],
    learnAfter: ["roc-auc", "f1-score"],
  },
  "f1-score": {
    coreMeaning:
      "F1-score is the harmonic mean of precision and recall, summarizing both error types in one scalar that penalizes extreme imbalance between them.",
    workflowLocation:
      "Evaluation when both false positives and false negatives matter at a fixed operating threshold.",
    functionRole:
      "Provides a single balanced score when precision and recall must both be considered.",
    mechanism:
      "The harmonic mean is stricter than the arithmetic average when either precision or recall is low.",
    equation: eq(
      "F1 = 2 × (Precision × Recall) / (Precision + Recall)",
      "F1 balances precision and recall into one score, penalizing models strong on only one metric.",
      "F1 is high only when both precision and recall are reasonably high. It is the standard metric for imbalanced extraction and entity tasks.",
      [
        { symbol: "Precision", meaning: "TP / (TP + FP)" },
        { symbol: "Recall", meaning: "TP / (TP + FN)" },
      ],
      "Use when both error types matter equally at one threshold. Use ROC-AUC when comparing ranking quality across thresholds."
    ),
    example:
      "Named-entity detection is scored with F1 because both missed entities and spurious spans reduce downstream extraction quality.",
    commonDistinction:
      "Single-threshold summary versus ROC-AUC, which evaluates ranking quality across all thresholds.",
    limitation:
      "Hides the operational precision–recall trade-off implied by the chosen threshold; does not weight error types asymmetrically.",
    learnBefore: ["precision", "recall"],
    learnAfter: ["roc-auc"],
  },
  "roc-auc": {
    coreMeaning:
      "ROC-AUC summarizes how well positive samples receive higher predicted scores than negatives across all possible decision thresholds. AUC of 1.0 indicates perfect ranking; 0.5 indicates random ordering.",
    workflowLocation:
      "Binary classification evaluation under imbalance when the operating threshold is not yet fixed.",
    functionRole:
      "Evaluates the model's ranking quality independent of a specific threshold choice.",
    mechanism:
      "The ROC curve plots true positive rate against false positive rate as the threshold varies. AUC is the area under that curve.",
    example:
      "Fraud detectors are compared by validation AUC before selecting the threshold that meets a minimum precision target in production.",
    commonDistinction:
      "Threshold-free ranking metric versus precision and recall computed at one operating point on the curve.",
    limitation:
      "Can appear strong while precision at the required business threshold remains unacceptable.",
    learnBefore: ["precision", "recall"],
    learnAfter: ["f1-score", "hyperparameter-tuning"],
  },
  mae: {
    coreMeaning:
      "Mean Absolute Error (MAE) is the average absolute difference between predicted and actual continuous values. It measures typical prediction error in the same units as the target.",
    workflowLocation:
      "Regression evaluation on validation and test sets after generating numeric predictions.",
    functionRole:
      "Quantifies average prediction error with equal weight on every deviation regardless of direction.",
    mechanism:
      "Each residual is absolute-valued before averaging, so positive and negative errors do not cancel.",
    equation: eq(
      "MAE = (1/n) Σᵢ |yᵢ − ŷᵢ|",
      "MAE averages the absolute difference between each true value yᵢ and prediction ŷᵢ.",
      "MAE treats all errors linearly—an error of 10 contributes twice as much as an error of 5. Outliers influence MAE less than they influence MSE.",
      [
        { symbol: "n", meaning: "Number of samples" },
        { symbol: "yᵢ", meaning: "True target value for sample i" },
        { symbol: "ŷᵢ", meaning: "Model prediction for sample i" },
      ],
      "Prefer MAE when outliers should not dominate the metric or when error units must be directly interpretable."
    ),
    example:
      "A demand forecast is evaluated with MAE in units of items per day so planners can interpret typical error magnitude directly.",
    commonDistinction:
      "Linear penalty on errors versus MSE, which squares errors and penalizes large mistakes more heavily.",
    limitation:
      "Does not distinguish systematic over- or under-prediction; two models with identical MAE may have different bias directions.",
    learnBefore: ["loss-function", "linear-regression"],
    learnAfter: ["mse", "rmse", "r-squared"],
  },
  mse: {
    coreMeaning:
      "Mean Squared Error (MSE) is the average squared difference between predicted and actual values. Squaring penalizes large errors more than small ones.",
    workflowLocation:
      "Regression evaluation and as the training loss for many regression models including linear regression.",
    functionRole:
      "Quantifies prediction error with emphasis on large deviations.",
    mechanism:
      "Squared residuals are averaged; the gradient of MSE with respect to predictions is proportional to the residual, enabling closed-form and gradient-based solutions.",
    equation: eq(
      "MSE = (1/n) Σᵢ (yᵢ − ŷᵢ)²",
      "MSE averages the squared difference between each true value and prediction.",
      "Minimizing MSE during training pushes predictions toward conditional means. Large outliers disproportionately influence the metric.",
      [
        { symbol: "n", meaning: "Number of samples" },
        { symbol: "yᵢ", meaning: "True target value" },
        { symbol: "ŷᵢ", meaning: "Model prediction" },
      ],
      "Standard regression loss; sensitive to outliers—consider MAE or Huber loss when outliers dominate."
    ),
    example:
      "Linear regression trained with MSE loss on housing prices penalizes large price errors more than small ones.",
    commonDistinction:
      "Squared-error emphasis versus MAE's linear absolute error; MSE units are squared target units unless RMSE is reported.",
    limitation:
      "Sensitive to outliers; a few extreme errors can dominate the average.",
    learnBefore: ["loss-function", "linear-regression"],
    learnAfter: ["rmse", "mae", "r-squared"],
  },
  rmse: {
    coreMeaning:
      "Root Mean Squared Error (RMSE) is the square root of MSE, restoring error units to match the target variable while retaining squared-error emphasis on large mistakes.",
    workflowLocation:
      "Regression evaluation when MSE is used but interpretable units are required.",
    functionRole:
      "Reports typical error magnitude in the same units as the target with sensitivity to large deviations.",
    mechanism:
      "RMSE = √MSE; mathematically equivalent ranking to MSE for model comparison but easier to communicate.",
    equation: eq(
      "RMSE = √[(1/n) Σᵢ (yᵢ − ŷᵢ)²]",
      "RMSE is the square root of the mean squared error, returning to original target units.",
      "Models that minimize MSE also minimize RMSE; RMSE is preferred for reporting because it is in interpretable units.",
      [
        { symbol: "n", meaning: "Number of samples" },
        { symbol: "yᵢ", meaning: "True target value" },
        { symbol: "ŷᵢ", meaning: "Model prediction" },
      ]
    ),
    example:
      "A temperature forecast reports RMSE of 1.8°C on the test set so operators can compare against operational tolerance bands.",
    commonDistinction:
      "Same ranking as MSE but interpretable units versus MAE which treats all errors linearly.",
    limitation:
      "Still sensitive to outliers due to squaring inside the root.",
    learnBefore: ["mse"],
    learnAfter: ["mae", "r-squared"],
  },
  "r-squared": {
    coreMeaning:
      "R² (coefficient of determination) measures the proportion of target variance explained by the model relative to predicting the mean. Values near 1 indicate strong fit; near 0 indicate the model explains little variance.",
    workflowLocation:
      "Regression evaluation alongside error metrics such as RMSE and MAE.",
    functionRole:
      "Summarizes goodness of fit as a unitless fraction of explained variance.",
    mechanism:
      "Compares residual sum of squares to total variance of the target around its mean.",
    equation: eq(
      "R² = 1 − [Σᵢ (yᵢ − ŷᵢ)²] / [Σᵢ (yᵢ − ȳ)²]",
      "R² is one minus the ratio of unexplained variance to total variance.",
      "High R² means predictions track target spread better than the mean baseline. Can be negative if the model is worse than predicting the mean.",
      [
        { symbol: "yᵢ", meaning: "True target value" },
        { symbol: "ŷᵢ", meaning: "Model prediction" },
        { symbol: "ȳ", meaning: "Mean of true targets" },
      ],
      "Use alongside RMSE or MAE; high R² on training data does not guarantee generalization."
    ),
    example:
      "A sales forecast model reports R² of 0.85 on validation data, indicating it explains most of the variance beyond a constant mean prediction.",
    commonDistinction:
      "Variance explained (R²) versus absolute error magnitude (RMSE/MAE)—a model can have high R² but large absolute errors if target variance is small.",
    limitation:
      "Increases with more features even if they add no real signal; adjusted R² penalizes complexity.",
    learnBefore: ["mse", "linear-regression"],
    learnAfter: ["rmse", "mae"],
  },
};
