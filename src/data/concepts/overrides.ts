import type { Concept } from "@/types/concept";

/** Rich, non-repetitive copy for high-traffic concepts (merged over technique + glossary) */
export const conceptOverrides: Partial<Record<string, Partial<Concept>>> = {
  ai: {
    functionRole:
      "Frames the scope of intelligent systems—defining what problem class (perception, reasoning, control) the solution must address.",
    learnBefore: [],
    learnAfter: ["ml", "dl"],
  },
  ml: {
    functionRole:
      "Provides the learning paradigm—turning data into parameterized models that generalize beyond the training sample.",
    learnBefore: ["ai", "dataset"],
    learnAfter: ["training", "validation"],
  },
  dl: {
    functionRole:
      "Enables representation learning from raw or weakly processed inputs when hand-crafted features are insufficient.",
    learnBefore: ["ml", "neural-network"],
    learnAfter: ["cnn", "transformer"],
  },
  dataset: {
    functionRole:
      "Supplies the empirical evidence from which patterns are estimated, validated, and ultimately judged.",
    learnBefore: ["feature", "label"],
    learnAfter: ["train-test-split", "preprocessing"],
  },
  feature: {
    functionRole:
      "Encodes information the model consumes—translating raw observations into a numeric form suitable for learning.",
    learnBefore: ["dataset"],
    learnAfter: ["feature-engineering", "preprocessing"],
  },
  label: {
    functionRole:
      "Defines the supervised target the optimizer aligns predictions with during training.",
    learnBefore: ["dataset", "feature"],
    learnAfter: ["loss-function", "training"],
  },
  model: {
    functionRole:
      "Implements the mapping from inputs to outputs whose parameters are fit to data under a chosen objective.",
    learnBefore: ["feature", "label"],
    learnAfter: ["training", "inference"],
  },
  parameter: {
    functionRole:
      "Stores learned knowledge—weights and biases updated by optimization to minimize training loss.",
    learnBefore: ["model", "training"],
    learnAfter: ["hyperparameter", "regularization"],
  },
  hyperparameter: {
    functionRole:
      "Controls the learning process itself—capacity, regularization strength, and optimization schedule set before training begins.",
    learnBefore: ["parameter", "training"],
    learnAfter: ["cross-validation", "grid-search"],
  },
  training: {
    functionRole:
      "Adjusts model parameters using labeled or unlabeled data to minimize a defined loss on the training partition.",
    learnBefore: ["model", "loss-function"],
    learnAfter: ["validation", "inference"],
  },
  validation: {
    functionRole:
      "Estimates generalization during development to compare models and tune hyperparameters without touching the test set.",
    learnBefore: ["training", "train-test-split"],
    learnAfter: ["testing", "cross-validation"],
  },
  testing: {
    functionRole:
      "Produces the final unbiased performance estimate after all modeling decisions are locked.",
    learnBefore: ["validation", "cross-validation"],
    learnAfter: ["accuracy", "deployment"],
  },
  inference: {
    functionRole:
      "Applies the trained model to new inputs to produce predictions or generations in production or batch settings.",
    learnBefore: ["training", "model"],
    learnAfter: ["deployment", "quantization"],
  },
  "loss-function": {
    functionRole:
      "Quantifies prediction error during training, defining the objective gradient descent minimizes.",
    learnBefore: ["label", "training"],
    learnAfter: ["gradient-descent", "backpropagation"],
  },
  standardization: {
    functionRole:
      "Puts continuous features on comparable scales so distance-based and gradient-based methods converge fairly.",
    mechanism:
      "z = (x − μ) / σ using training-set μ and σ only; the same transform is applied at inference.",
    example:
      "Sensor channels with different physical units are z-scored before k-NN or PCA so no single channel dominates distance.",
    commonDistinction:
      "Zero mean and unit variance versus min–max normalization, which bounds values to a fixed interval.",
    learnBefore: ["preprocessing", "feature"],
    learnAfter: ["pca", "svm"],
  },
  normalization: {
    functionRole:
      "Rescales features into a bounded range when algorithms expect inputs within fixed limits.",
    mechanism:
      "x_norm = (x − min) / (max − min) using training min and max; preserves relative order within each feature.",
    example:
      "Pixel intensities scaled to [0, 1] before feeding a neural network that uses sigmoid output activations.",
    commonDistinction:
      "Bounded interval scaling versus standardization, which uses mean and standard deviation.",
    learnBefore: ["preprocessing", "feature"],
    learnAfter: ["neural-network", "standardization"],
  },
  "feature-selection": {
    functionRole:
      "Reduces input dimensionality by removing irrelevant or redundant original columns before training.",
    mechanism:
      "Filter, wrapper, or embedded methods rank features; a subset of original column names is retained.",
    example:
      "Removing temperature sensors that correlate above 0.95 with another channel in a predictive maintenance pipeline.",
    commonDistinction:
      "Keeps a subset of original features; feature extraction creates new transformed representations.",
    learnBefore: ["feature", "preprocessing"],
    learnAfter: ["pca", "feature-extraction"],
  },
  "feature-extraction": {
    functionRole:
      "Constructs new input representations that capture structure more compactly than raw features alone.",
    mechanism:
      "Linear transforms (PCA), learned layers, or domain transforms produce derived features not present in raw columns.",
    example:
      "Computing FFT coefficients from vibration waveforms as inputs to a fault classifier.",
    commonDistinction:
      "Creates new features; feature selection only removes existing columns without transformation.",
    learnBefore: ["feature", "feature-selection"],
    learnAfter: ["pca", "embeddings"],
  },
  "linear-regression": {
    functionRole:
      "Models continuous targets as a weighted linear combination of inputs plus intercept.",
    mechanism:
      "Minimizes sum of squared residuals via closed-form normal equations or iterative gradient descent.",
    example:
      "Predicting house price from square footage and age using interpretable coefficients for each feature.",
    commonDistinction:
      "Continuous output with linear structure versus logistic regression for class probabilities.",
    learnBefore: ["feature", "loss-function"],
    learnAfter: ["logistic-regression", "regularization"],
  },
  "logistic-regression": {
    functionRole:
      "Estimates class membership probabilities using a linear score passed through a sigmoid or softmax.",
    mechanism:
      "Optimizes cross-entropy loss; decision boundaries are linear in feature space unless features are expanded.",
    example:
      "Email spam classification with probabilistic outputs and inspectable feature weights.",
    commonDistinction:
      "Probabilistic classification versus SVM margin maximization without default probability calibration.",
    learnBefore: ["linear-regression", "standardization"],
    learnAfter: ["svm", "roc-auc"],
  },
  tokenization: {
    functionRole:
      "Converts raw text into discrete tokens—the units language models index, embed, and process.",
    mechanism:
      "Subword, word, or character splits map strings to integer IDs via a fixed vocabulary or byte-pair encoding.",
    example:
      "Splitting 'unhappiness' into subword tokens ['un', 'happiness'] for a BERT encoder.",
    commonDistinction:
      "Tokenization is preprocessing; embeddings assign vectors after token IDs are known.",
    learnBefore: ["feature"],
    learnAfter: ["embeddings", "transformer"],
  },
  pca: {
    functionRole:
      "Reduces input dimensionality while preserving the largest variance patterns in continuous data.",
    coreMeaning:
      "Principal Component Analysis constructs orthogonal directions—principal components—each a linear combination of original features ordered by captured variance.",
    workflowLocation:
      "Applied after continuous features are scaled and before model training when linear dimensionality reduction is appropriate.",
    mechanism:
      "Centers the data, computes the covariance matrix, and extracts eigenvectors (or applies SVD); projecting onto the top-k components retains maximum variance under a linear transform.",
    example:
      "Twenty correlated vibration sensor channels on a factory line are compressed to five components before fault classification, reducing redundancy without dropping individual sensors by name.",
    commonDistinction:
      "Feature extraction, not feature selection—components are new axes, not a subset of original column names.",
    limitation:
      "Principal components are harder to interpret than raw sensors; nonlinear structure requires kernel PCA or other methods.",
    learnBefore: ["standardization", "feature", "preprocessing"],
    learnAfter: ["embeddings", "autoencoder"],
    technicalNote: "Fit PCA on training data only; apply the learned projection at inference.",
  },
  svm: {
    functionRole:
      "Finds the decision boundary with maximum separation between classes in feature space.",
    coreMeaning:
      "Support Vector Machines find the hyperplane that separates classes with the widest margin; only boundary-adjacent support vectors determine the solution.",
    workflowLocation:
      "Model selection and training for classification when feature scaling is feasible and dataset size is moderate.",
    mechanism:
      "Solves a convex optimization for maximum margin; kernel functions implicitly map inputs to higher dimensions for nonlinear boundaries. Feature scaling strongly affects geometry.",
    example:
      "A linear SVM classifies handwritten digits after z-score scaling, deployed as a compact weight vector on a microcontroller.",
    commonDistinction:
      "Margin-based boundary versus probabilistic logistic regression—SVMs optimize separation width, not calibrated class probabilities by default.",
    limitation:
      "Training cost scales poorly with sample count; kernel models are heavier at inference than linear SVMs.",
    learnBefore: ["standardization", "logistic-regression"],
    learnAfter: ["random-forest", "gradient-boosting"],
  },
  knn: {
    functionRole:
      "Predicts by local comparison—aggregating labels or values from the nearest stored training examples.",
    coreMeaning:
      "k-Nearest Neighbors is a lazy learner that stores training examples and predicts by aggregating the labels or values of the k closest points in feature space.",
    workflowLocation:
      "Model selection for small datasets or as an interpretable baseline before committing to parametric models.",
    mechanism:
      "At inference, computes distance (typically Euclidean) from the query to all stored samples; classification uses majority vote, regression uses the mean of neighbor targets.",
    example:
      "A wine quality baseline assigns the category of the three nearest labeled samples in standardized chemical feature space.",
    commonDistinction:
      "Instance-based memory versus models that compress patterns into fixed parameters—k-NN retains the full training set.",
    limitation:
      "Inference latency and memory grow with training set size; performance degrades in high dimensions without careful feature design.",
    learnBefore: ["standardization", "train-test-split"],
    learnAfter: ["svm", "decision-tree"],
  },
  "decision-tree": {
    functionRole:
      "Produces auditable if-then rules by recursively splitting features to minimize leaf impurity.",
    coreMeaning:
      "A decision tree recursively partitions feature space with if-then rules, assigning predictions at leaf nodes after each split reduces impurity.",
    workflowLocation:
      "Model selection when interpretable rules, mixed feature types, or fast embedded inference are priorities.",
    mechanism:
      "Greedy search selects splits that maximize impurity reduction (Gini, entropy, or MSE); depth and minimum leaf size control complexity.",
    example:
      "A credit approval tree asks about income and payment history in sequence, ending in approve or deny leaves auditable by compliance teams.",
    commonDistinction:
      "Single interpretable rule set versus Random Forest—one tree is readable but high-variance; ensembles trade interpretability for stability.",
    limitation:
      "Unconstrained depth on small data overfits easily; small input changes can alter the tree structure.",
    learnBefore: ["feature", "overfitting"],
    learnAfter: ["random-forest", "gradient-boosting"],
  },
  "random-forest": {
    functionRole:
      "Reduces variance by aggregating predictions from many decorrelated trees trained on bootstrap samples.",
    coreMeaning:
      "Random Forest is an ensemble of decorrelated decision trees trained on bootstrap samples; predictions aggregate votes or averages across trees.",
    workflowLocation:
      "Default strong choice for tabular classification or regression when accuracy matters more than a single readable rule set.",
    mechanism:
      "Bagging draws bootstrap training sets; random feature subsets at each split reduce tree correlation; final output is mode (classification) or mean (regression).",
    example:
      "A fraud detector trains two hundred shallow trees on resampled transaction rows and flags cases when a majority of trees vote fraudulent.",
    commonDistinction:
      "Parallel bagging ensemble versus sequential gradient boosting—Random Forest reduces variance; boosting reduces bias iteratively.",
    limitation:
      "Flash and RAM footprint scale with tree count; individual tree rules are no longer a single coherent policy.",
    learnBefore: ["decision-tree", "cross-validation"],
    learnAfter: ["gradient-boosting", "hardware-aware-selection"],
  },
  "cross-validation": {
    functionRole:
      "Stabilizes performance estimates by averaging results across multiple train–validation partitions.",
    coreMeaning:
      "Cross-validation repeatedly partitions the development pool into training and validation folds, averaging performance to stabilize generalization estimates.",
    workflowLocation:
      "Hyperparameter tuning and model comparison before the final held-out test evaluation.",
    mechanism:
      "k-fold or stratified schemes rotate the validation fold; nested cross-validation separates inner tuning from outer performance estimation.",
    example:
      "Selecting decision tree depth by mean validation F1 across five stratified folds on an imbalanced defect dataset.",
    commonDistinction:
      "Repeated development estimates for tuning—not the one-time final test score reported after all choices are locked.",
    limitation:
      "Invalid when folds ignore temporal order or group structure; cost grows with fold count and model training time.",
    learnBefore: ["train-test-split", "validation"],
    learnAfter: ["hyperparameter-tuning", "nested-cv"],
  },
  "confusion-matrix": {
    functionRole:
      "Organizes prediction outcomes by class so error types can be analyzed before computing scalar metrics.",
    coreMeaning:
      "A confusion matrix tabulates predicted versus actual class labels, counting true positives, false positives, true negatives, and false negatives.",
    workflowLocation:
      "Evaluation after generating predictions on validation or test data, before computing scalar metrics.",
    mechanism:
      "Each cell aggregates outcome counts; most classification metrics are algebraic functions of these four quantities.",
    example:
      "After a vision trial, engineers inspect which product defect types are most often confused before adjusting capture conditions.",
    commonDistinction:
      "Outcome counts for error analysis versus a single scalar such as accuracy that collapses the table.",
    limitation:
      "The matrix alone does not encode asymmetric business costs of different error types.",
    learnBefore: ["accuracy", "validation"],
    learnAfter: ["precision", "recall", "f1-score"],
  },
  accuracy: {
    functionRole:
      "Summarizes overall correctness when classes are balanced and error costs are symmetric.",
    coreMeaning:
      "Accuracy is the proportion of all predictions—across every class—that match the true label.",
    workflowLocation:
      "Evaluation when classes are roughly balanced and misclassification costs are approximately symmetric.",
    mechanism:
      "Computed as (TP + TN) divided by total predictions from the confusion matrix.",
    example:
      "Reporting 92% correct digit classifications on a balanced benchmark after final model selection.",
    commonDistinction:
      "Overall correctness versus precision (false positives among predicted positives) and recall (false negatives among actual positives).",
    limitation:
      "Misleading under class imbalance—a majority-class classifier can score high accuracy while failing minority classes.",
    learnBefore: ["confusion-matrix"],
    learnAfter: ["precision", "recall"],
  },
  precision: {
    functionRole:
      "Measures trustworthiness of positive predictions when false alarms are costly.",
    coreMeaning:
      "Precision measures how reliable positive predictions are—the fraction of predicted positives that are truly positive.",
    workflowLocation:
      "Evaluation when false positives carry high cost, such as spam filters, fraud alerts, or automated sanctions.",
    mechanism:
      "TP / (TP + FP); increases when false positives decrease at a fixed decision threshold.",
    example:
      "A legal inbox filter must rarely mark legitimate client mail as spam, so precision on the spam class is tracked weekly.",
    commonDistinction:
      "False positives dominate precision; false negatives dominate recall—optimizing one often reduces the other.",
    limitation:
      "Can be maximized by predicting positive rarely, yielding high precision but unacceptably low recall.",
    learnBefore: ["confusion-matrix", "recall"],
    learnAfter: ["f1-score", "roc-auc"],
  },
  recall: {
    functionRole:
      "Measures how completely the model finds actual positive cases when misses are costly.",
    coreMeaning:
      "Recall (sensitivity) measures coverage of the positive class—the fraction of actual positives the model correctly identifies.",
    workflowLocation:
      "Screening and safety tasks where missing a positive case is especially harmful.",
    mechanism:
      "TP / (TP + FN); rises when fewer actual positives are missed at a given threshold.",
    example:
      "Medical screening prioritizes recall so undetected disease cases are minimized, accepting more follow-up tests.",
    commonDistinction:
      "Missed positives (false negatives) drive recall; spurious positives (false positives) drive precision.",
    limitation:
      "Can be raised by lowering the threshold, often at the expense of many false positives.",
    learnBefore: ["confusion-matrix", "precision"],
    learnAfter: ["f1-score", "roc-auc"],
  },
  "f1-score": {
    functionRole:
      "Provides a single score balancing precision and recall when both error types matter equally.",
    coreMeaning:
      "F1-score is the harmonic mean of precision and recall, summarizing both error types in one scalar that penalizes extreme imbalance between them.",
    workflowLocation:
      "Evaluation when both false positives and false negatives matter at a fixed operating threshold.",
    mechanism:
      "F1 = 2PR / (P + R); the harmonic mean is stricter than the arithmetic average when either metric is low.",
    example:
      "Named-entity detection is scored with F1 because both missed entities and spurious spans reduce downstream extraction quality.",
    commonDistinction:
      "Single-threshold summary versus ROC-AUC, which evaluates ranking quality across all thresholds.",
    limitation:
      "Hides the operational precision–recall trade-off implied by the chosen threshold.",
    learnBefore: ["precision", "recall"],
    learnAfter: ["roc-auc"],
  },
  "roc-auc": {
    functionRole:
      "Evaluates ranking quality of scores across thresholds before an operating point is chosen.",
    coreMeaning:
      "ROC-AUC summarizes how well positive samples receive higher scores than negatives across all possible decision thresholds.",
    workflowLocation:
      "Binary classification under imbalance when the operating threshold is not yet fixed.",
    mechanism:
      "Plots true positive rate versus false positive rate as the threshold varies; AUC is the area under that curve.",
    example:
      "Comparing fraud detectors by AUC before selecting the threshold that meets a minimum precision target in production.",
    commonDistinction:
      "Threshold-free ranking metric versus precision and recall at one operating point on the ROC curve.",
    limitation:
      "Can appear strong while precision at the required business threshold remains unacceptable.",
    learnBefore: ["precision", "recall"],
    learnAfter: ["f1-score", "hyperparameter-tuning"],
  },
  overfitting: {
    functionRole:
      "Signals when a model memorizes training noise rather than learning patterns that generalize.",
    coreMeaning:
      "Overfitting occurs when a model captures idiosyncrasies of the training set that do not transfer to new samples.",
    workflowLocation:
      "Diagnosed during training and validation by comparing performance on training versus held-out data.",
    mechanism:
      "Excessive model capacity relative to data complexity, insufficient regularization, or training too long without early stopping.",
    example:
      "Near-perfect training accuracy but substantially lower validation accuracy on the same classification task.",
    commonDistinction:
      "High-variance overfitting versus underfitting from insufficient capacity—the former gaps train and validation; the latter keeps both high.",
    limitation:
      "Mitigation requires more data, regularization, simpler models, or better validation—not unlimited training epochs.",
    learnBefore: ["validation", "cross-validation"],
    learnAfter: ["regularization", "underfitting"],
  },
  underfitting: {
    functionRole:
      "Indicates the model lacks capacity or appropriate features to capture the underlying relationship.",
    coreMeaning:
      "Underfitting means the model is too simple to represent the underlying relationship, leaving high error on both training and validation data.",
    workflowLocation:
      "Model selection and training diagnostics when performance plateaus below acceptable levels.",
    mechanism:
      "High bias from limited capacity, overly aggressive regularization, or features that omit necessary signal.",
    example:
      "A linear boundary on data that require a nonlinear surface—both training and validation accuracy remain low.",
    commonDistinction:
      "Weak model bias versus overfitting from excessive flexibility—underfitting shows high error everywhere; overfitting shows a train–validation gap.",
    limitation:
      "Increasing complexity without validation discipline can shift the problem to overfitting rather than fix underfitting.",
    learnBefore: ["model", "training"],
    learnAfter: ["overfitting", "regularization"],
  },
  "data-leakage": {
    functionRole:
      "Identifies and eliminates paths where future or test information inflates reported model performance.",
    coreMeaning:
      "Data leakage is the introduction of test-set or future information into training, preprocessing, or feature construction, producing optimistically biased metrics.",
    workflowLocation:
      "Risk to audit throughout preprocessing, feature engineering, and validation—not only at model training.",
    mechanism:
      "Statistics computed on the full dataset, target-encoded labels from test rows, or temporal features that encode future outcomes all leak information.",
    example:
      "Fitting a scaler on train and test combined before cross-validation inflates reported accuracy.",
    commonDistinction:
      "Pipeline contamination versus legitimate feature engineering fit only on training folds.",
    limitation:
      "Leakage is often subtle in complex pipelines; prevention requires strict fit-transform discipline and temporal splits.",
    learnBefore: ["train-test-split", "preprocessing"],
    learnAfter: ["cross-validation", "validation"],
  },
  "neural-network": {
    functionRole:
      "Learns hierarchical feature representations through stacked nonlinear transformations of inputs.",
    coreMeaning:
      "A neural network is a stack of layers that transform inputs through weighted sums and nonlinear activations to produce predictions.",
    workflowLocation:
      "Model selection and training when tabular, vision, or sequence patterns require learned hierarchical representations.",
    mechanism:
      "Forward pass computes layer outputs; backpropagation adjusts weights to minimize a loss via gradient descent or adaptive optimizers.",
    example:
      "A three-layer MLP maps standardized sensor readings to equipment failure probability after training on labeled maintenance logs.",
    commonDistinction:
      "Fully connected layers versus convolution or attention architectures specialized for spatial or sequential structure.",
    limitation:
      "Requires careful scaling, sufficient data, and validation—capacity and training duration must be controlled to avoid overfitting.",
    learnBefore: ["gradient-descent", "loss-function"],
    learnAfter: ["cnn", "backpropagation"],
  },
  transformer: {
    functionRole:
      "Processes entire sequences in parallel using self-attention rather than step-by-step recurrence.",
    coreMeaning:
      "The Transformer architecture processes sequences with self-attention and feed-forward blocks, enabling parallel training over token relationships.",
    workflowLocation:
      "Foundation model pretraining and fine-tuning for language, code, and multimodal tasks.",
    mechanism:
      "Stacked encoder and/or decoder blocks apply multi-head self-attention, residual connections, and layer normalization; position information is injected via embeddings or rotary encodings.",
    example:
      "A BERT-style encoder is fine-tuned on support tickets to classify intent without recurrent recurrence over tokens.",
    commonDistinction:
      "Attention-based sequence model versus RNN/LSTM recurrence—Transformers scale better on long contexts with sufficient data.",
    limitation:
      "Compute and memory scale with sequence length; small datasets may still benefit from simpler baselines.",
    learnBefore: ["embeddings", "attention"],
    learnAfter: ["bert", "gpt", "fine-tuning"],
  },
  attention: {
    functionRole:
      "Dynamically weights which inputs contribute to each output position based on learned compatibility.",
    coreMeaning:
      "Attention computes a weighted mixture of values where weights reflect compatibility between queries and keys, focusing computation on relevant inputs.",
    workflowLocation:
      "Core mechanism inside Transformers and many modern sequence, vision, and multimodal models.",
    mechanism:
      "Softmax(QKᵀ / √d) produces attention weights over keys; the output is the weighted sum of value vectors. Multi-head attention runs parallel subspaces.",
    example:
      "In machine translation, attention weights highlight source words most relevant to each target token during decoding.",
    commonDistinction:
      "Self-attention (within one sequence) versus cross-attention (between encoder and decoder sequences).",
    limitation:
      "Quadratic cost in sequence length for dense attention; long contexts require sparse or linear approximations.",
    learnBefore: ["embeddings", "neural-network"],
    learnAfter: ["transformer", "self-attention"],
  },
  embeddings: {
    functionRole:
      "Represents discrete entities as dense vectors so geometric proximity reflects semantic similarity.",
    coreMeaning:
      "Embeddings map discrete items—words, users, products—to dense vectors so that proximity in vector space reflects semantic or behavioral similarity.",
    workflowLocation:
      "Feature representation for retrieval, recommendation, and as input to neural models including Transformers.",
    mechanism:
      "Learned or pretrained lookup tables assign each token or entity a fixed-dimension vector; similarity is measured by dot product or cosine distance.",
    example:
      "Product embeddings place frequently co-purchased items near each other, powering nearest-neighbor recommendations.",
    commonDistinction:
      "Learned dense vectors versus one-hot encoding—embeddings capture similarity and reduce dimensionality.",
    limitation:
      "Quality depends on training data coverage; rare tokens or cold-start entities may receive poor vectors.",
    learnBefore: ["feature", "tokenization"],
    learnAfter: ["vector-database", "rag"],
  },
  rag: {
    functionRole:
      "Grounds generated text in retrieved external documents to improve factual accuracy and freshness.",
    coreMeaning:
      "Retrieval-Augmented Generation grounds a language model's output in externally retrieved documents rather than parametric memory alone.",
    workflowLocation:
      "LLM application design when factual freshness, domain specificity, or citation traceability are required.",
    mechanism:
      "The query is embedded, relevant passages are retrieved and ranked, then concatenated into the generator's context for conditional answer production.",
    example:
      "An internal policy assistant retrieves the three most relevant handbook sections before summarizing an employee's leave question.",
    commonDistinction:
      "Retrieval plus generation versus fine-tuning alone—RAG updates knowledge by changing the corpus, not retraining all weights.",
    limitation:
      "Answer quality depends on retrieval recall; irrelevant or missing documents propagate into generated responses.",
    learnBefore: ["embeddings", "llm"],
    learnAfter: ["vector-database", "prompt-engineering"],
  },
  quantization: {
    functionRole:
      "Shrinks model memory and accelerates inference by representing weights in lower numeric precision.",
    coreMeaning:
      "Quantization reduces numeric precision of weights and activations—commonly from float32 to int8—to shrink memory and accelerate inference.",
    workflowLocation:
      "Optimization stage after training and before export to embedded or edge runtimes.",
    mechanism:
      "Affine mapping scales floating values to integer ranges with zero-point and scale parameters; post-training or quantization-aware training calibrates ranges.",
    example:
      "A vision model is converted to int8 TFLite, cutting weight storage roughly fourfold with a one-point accuracy drop on the validation set.",
    commonDistinction:
      "Precision reduction versus pruning (structural removal) or distillation (teacher–student transfer)—quantization keeps topology, changes numerics.",
    limitation:
      "May shift outputs; re-validate on representative hardware and data after conversion.",
    learnBefore: ["model-compression", "inference"],
    learnAfter: ["tflite", "deployment-verification"],
  },
  pruning: {
    functionRole:
      "Reduces model size and compute by removing weights or structures with minimal impact on accuracy.",
    coreMeaning:
      "Pruning removes low-impact weights, neurons, or entire structures from a trained model to reduce size and inference cost.",
    workflowLocation:
      "Model compression after initial training and before deployment to resource-constrained targets.",
    mechanism:
      "Magnitude-based or structured criteria identify removable parameters; fine-tuning often recovers accuracy after pruning.",
    example:
      "Thirty percent of smallest convolution filters are zeroed in a keyword-spotting network, then briefly retrained to restore wake-word accuracy.",
    commonDistinction:
      "Structural simplification versus quantization—pruning removes connections; quantization reduces bit width of remaining weights.",
    limitation:
      "Aggressive pruning can collapse accuracy unless followed by retraining or combined with distillation.",
    learnBefore: ["neural-network", "model-compression"],
    learnAfter: ["quantization", "knowledge-distillation"],
  },
  tinyml: {
    functionRole:
      "Delivers inference on microcontrollers where RAM, flash, latency, and power budgets are fixed constraints.",
    coreMeaning:
      "TinyML denotes machine learning inference on microcontrollers and other deeply embedded devices under strict latency, memory, firmware, and power budgets.",
    workflowLocation:
      "Deployment planning after model selection, compression, and on-device verification.",
    mechanism:
      "Models are compressed, converted to embedded runtimes (e.g., TFLite Micro), and scheduled on bare-metal or RTOS firmware with fixed tensor arenas.",
    example:
      "Vibration classification runs on a sensor MCU without cloud connectivity, waking the device only when an anomaly score exceeds a threshold.",
    commonDistinction:
      "On-device inference versus cloud serving—TinyML optimizes for kilobytes of RAM and milliwatt power, not datacenter throughput.",
    limitation:
      "Severe constraints force trade-offs; not every trained model fits without distillation, pruning, or architecture change.",
    learnBefore: ["quantization", "tflite"],
    learnAfter: ["deployment-verification", "embedded-c"],
  },
  "hardware-aware-selection": {
    functionRole:
      "Selects models that meet device constraints on latency, memory, and power—not accuracy alone.",
    coreMeaning:
      "Hardware-aware model selection chooses architectures and compression strategies jointly with target device limits on latency, SRAM, flash, firmware size, and power.",
    workflowLocation:
      "Model selection and optimization before committing to an embedded deployment path.",
    mechanism:
      "Benchmarks candidate models on representative hardware; Pareto analysis trades accuracy against memory, latency, and energy rather than optimizing accuracy alone.",
    example:
      "Three candidate classifiers are profiled on the production MCU; the shallowest forest meeting sub-10 ms inference and 128 KB flash is selected.",
    commonDistinction:
      "Deployment-feasible selection versus offline leaderboard accuracy—hardware constraints are part of the objective.",
    limitation:
      "Profiling is device-specific; a model optimal on one MCU may fail on another with different accelerators or memory maps.",
    learnBefore: ["tinyml", "model-compression"],
    learnAfter: ["quantization", "deployment-verification"],
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
    functionRole:
      "Detects numerical or preprocessing drift between development and production runtimes before release.",
    coreMeaning:
      "Deployment verification proves that inference outputs remain consistent across the training framework, exported runtime, and on-device execution.",
    workflowLocation:
      "After model export and before production sign-off on embedded or edge targets.",
    mechanism:
      "Identical inputs are run through Python, exported C or TFLite Micro, and firmware; outputs are compared within documented numeric tolerance.",
    example:
      "Fifty logged test vectors are asserted to match within int8 quantization tolerance between Python reference and MCU firmware.",
    commonDistinction:
      "Runtime parity checks versus offline accuracy alone on the training stack—verification catches export and preprocessing drift.",
    limitation:
      "Requires representative inputs and documented tolerance for quantized arithmetic; does not replace ongoing monitoring.",
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
    mechanism:
      "Arises from parametric memorization limits, ambiguous prompts, or weak retrieval recall when grounding is absent.",
    example: "A legal assistant citing a non-existent statute with authoritative tone.",
    commonDistinction: "Generation error versus epistemic uncertainty scores or abstention policies.",
    limitation: "Mitigation requires retrieval, constraints, evaluation protocols, and human review—not one metric.",
    learnBefore: ["llm", "rag"],
    learnAfter: ["rag", "ai-agents"],
    relatedConcepts: ["llm", "rag", "ai-agents"],
  },
};
