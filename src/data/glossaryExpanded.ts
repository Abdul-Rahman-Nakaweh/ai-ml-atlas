import type { GlossaryEntry } from "@/types";

/** Priority glossary entries with non-repetitive, field-distinct content */
export const expandedGlossaryEntries: GlossaryEntry[] = [
  {
    id: "pca",
    term: "PCA",
    fullName: "Principal Component Analysis",
    definition:
      "A linear method that transforms original features into orthogonal principal components ordered by variance.",
    locationInWorkflow: "Feature extraction, typically after scaling and before model training.",
    functionRole: "Reduces dimensionality and can reduce correlation among input variables.",
    technicalBasis:
      "Maximizes retained variance using eigenvectors of the covariance matrix or singular value decomposition on centered data.",
    practicalExample:
      "Compressing twenty correlated sensor channels into five components before fault classification.",
    commonDistinction:
      "Feature extraction that creates new variables, not feature selection that discards original columns.",
    limitations:
      "Components are linear combinations of originals, which weakens interpretability; nonlinear structure is not captured.",
    relatedTerms: ["Standardization", "Dimensionality reduction", "Feature extraction", "Variance"],
    techniqueId: "pca",
  },
  {
    id: "svm",
    term: "SVM",
    fullName: "Support Vector Machine",
    definition:
      "A classifier (or regressor) that finds a decision boundary maximizing the margin between classes.",
    locationInWorkflow: "Model selection and training for tabular classification or regression.",
    functionRole: "Separates classes with a margin-based boundary; kernels allow nonlinear separation.",
    technicalBasis:
      "Convex optimization over support vectors; the kernel trick computes inner products in an implicit feature space.",
    practicalExample:
      "Classifying pass or fail on a production line from ten scaled measurement features.",
    commonDistinction:
      "Often compared to logistic regression, which estimates class probabilities rather than maximizing margin.",
    limitations:
      "Training cost can grow with sample size; kernel and regularization choices require validation.",
    relatedTerms: ["Margin", "Kernel", "Logistic regression", "Standardization"],
    techniqueId: "svm",
  },
  {
    id: "knn",
    term: "k-NN",
    fullName: "k-Nearest Neighbors",
    definition:
      "An instance-based learner that assigns a label or value from the k training points nearest to the query.",
    locationInWorkflow: "Model selection; inference requires access to the stored training set.",
    functionRole:
      "Provides flexible decision boundaries without an explicit parameter-fitting optimization phase.",
    technicalBasis: "Distance metrics in feature space; majority vote or local averaging at query time.",
    practicalExample:
      "Assigning a product category from the three customers with the most similar purchase history.",
    commonDistinction:
      "A lazy learner that stores examples, unlike models that compress knowledge into fixed parameters.",
    limitations:
      "Memory and inference latency scale with training-set size; performance often degrades in high dimensions.",
    relatedTerms: ["Distance metrics", "Standardization", "Prototype selection", "Curse of dimensionality"],
    techniqueId: "knn",
  },
  {
    id: "decision-tree",
    term: "Decision Tree",
    definition:
      "A model that recursively partitions feature space with binary splits at internal nodes.",
    locationInWorkflow: "Model selection and training.",
    functionRole: "Produces interpretable rules for classification or regression.",
    technicalBasis:
      "Greedy split search minimizing impurity (Gini or entropy) or mean squared error in child nodes.",
    practicalExample:
      "Approving credit when income exceeds a threshold and the debt ratio remains below a second threshold.",
    commonDistinction:
      "A single interpretable tree versus ensembles such as Random Forest that aggregate many trees.",
    limitations:
      "High variance; small data perturbations can change structure; deep trees overfit without constraints.",
    relatedTerms: ["Random Forest", "Information gain", "Overfitting", "Pruning"],
    techniqueId: "decision-tree",
  },
  {
    id: "random-forest",
    term: "Random Forest",
    definition:
      "An ensemble of decision trees trained on bootstrap samples with random feature subsets at each split.",
    locationInWorkflow: "Model selection for tabular classification or regression.",
    functionRole: "Reduces variance of a single tree by aggregating decorrelated predictors.",
    technicalBasis: "Bagging combined with random subspace splits; predictions by vote or mean.",
    practicalExample:
      "Predicting equipment failure from maintenance logs with hundreds of heterogeneous columns.",
    commonDistinction:
      "Bagging ensemble versus gradient boosting, which fits trees sequentially to correct residuals.",
    limitations:
      "Larger memory and firmware footprint than one tree; less transparent than a single rule set.",
    relatedTerms: ["Decision Tree", "Gradient Boosting", "Bagging", "Feature importance"],
    techniqueId: "random-forest",
  },
  {
    id: "cross-validation",
    term: "Cross-Validation",
    definition:
      "A resampling procedure that trains on fold subsets and evaluates on held-out folds within the training pool.",
    locationInWorkflow: "Validation during development and hyperparameter tuning.",
    functionRole:
      "Estimates generalization more stably than a single split, especially when data are limited.",
    technicalBasis:
      "k-fold partitioning; stratification preserves class ratios; nested cross-validation separates tuning from estimation.",
    practicalExample:
      "Choosing tree depth by averaging validation accuracy across five folds.",
    commonDistinction:
      "Repeated development estimates versus the test set, which should be used once for final reporting.",
    limitations:
      "Computationally expensive; misleading if folds ignore temporal order or group structure.",
    relatedTerms: ["Train/test split", "Nested cross-validation", "Data leakage", "Stratification"],
    techniqueId: "cross-validation",
  },
  {
    id: "data-leakage",
    term: "Data Leakage",
    definition:
      "When information outside the training partition influences training, preprocessing, or model selection.",
    locationInWorkflow:
      "Can occur during preprocessing, feature engineering, validation, and hyperparameter tuning.",
    functionRole:
      "Explains why reported metrics may not reflect performance on truly unseen data at deployment.",
    technicalBasis:
      "Statistical dependence introduced by pooling data or using future or test labels during fitting steps.",
    practicalExample:
      "Fitting a standard scaler on the full dataset before splitting into train and test partitions.",
    commonDistinction:
      "A pipeline integrity failure, not an inherent limitation of a particular learning algorithm.",
    limitations:
      "Difficult to detect in time-series, grouped, or pipeline-transformed workflows.",
    relatedTerms: ["Test set", "Cross-validation", "Preprocessing", "Monitoring"],
    techniqueId: "data-leakage",
  },
  {
    id: "accuracy",
    term: "Accuracy",
    definition: "The proportion of predictions that match the true label.",
    locationInWorkflow: "Evaluation, after the model and decision threshold are fixed.",
    functionRole: "Summarizes overall correctness when misclassification costs are roughly symmetric.",
    technicalBasis: "(True positives + true negatives) divided by all confusion-matrix cells.",
    practicalExample: "Reporting 92% correct classifications on a balanced digit-recognition benchmark.",
    commonDistinction:
      "Overall correctness versus precision and recall, which isolate false-positive and false-negative rates.",
    limitations:
      "Misleading under class imbalance; can hide poor performance on rare but critical classes.",
    relatedTerms: ["Precision", "Recall", "Confusion matrix", "Class imbalance"],
    techniqueId: "accuracy",
  },
  {
    id: "precision",
    term: "Precision",
    definition: "Among predicted positives, the fraction that are true positives.",
    locationInWorkflow: "Evaluation for classification when false positives are costly.",
    functionRole: "Measures how reliable positive predictions are.",
    technicalBasis: "True positives divided by (true positives + false positives) at a chosen threshold.",
    practicalExample:
      "Spam filtering that prioritizes precision so legitimate messages are rarely marked as spam.",
    commonDistinction: "Addresses false positives; recall addresses missed actual positives.",
    limitations:
      "Can be high while recall is low if the model rarely predicts the positive class.",
    relatedTerms: ["Recall", "F1-score", "Confusion matrix", "Threshold"],
    techniqueId: "precision",
  },
  {
    id: "recall",
    term: "Recall",
    definition: "Among actual positives, the fraction correctly identified.",
    locationInWorkflow: "Evaluation when failing to detect a positive case is costly.",
    functionRole: "Measures sensitivity to the positive class.",
    technicalBasis: "True positives divided by (true positives + false negatives); also called sensitivity.",
    practicalExample: "Medical screening that emphasizes recall to limit undetected positive cases.",
    commonDistinction: "Sensitivity for positives versus specificity, which concerns true negatives.",
    limitations:
      "Can be raised alongside many false positives by lowering the classification threshold.",
    relatedTerms: ["Precision", "Specificity", "F1-score", "ROC-AUC"],
    techniqueId: "recall",
  },
  {
    id: "f1",
    term: "F1-score",
    definition: "The harmonic mean of precision and recall.",
    locationInWorkflow: "Evaluation when both false positives and false negatives matter.",
    functionRole: "Combines two error types into one scalar that penalizes extreme imbalance between them.",
    technicalBasis: "F1 = 2 × precision × recall / (precision + recall).",
    practicalExample:
      "Named-entity detection evaluated with F1 when both missed spans and false spans reduce quality.",
    commonDistinction:
      "A single-threshold summary versus ROC-AUC, which reflects ranking quality across thresholds.",
    limitations: "One number does not show the precision–recall trade-off implied by the threshold.",
    relatedTerms: ["Precision", "Recall", "ROC-AUC", "Confusion matrix"],
    techniqueId: "f1-score",
  },
  {
    id: "roc-auc",
    term: "ROC-AUC",
    fullName: "Area Under the ROC Curve",
    definition:
      "The area under the curve plotting true positive rate against false positive rate across thresholds.",
    locationInWorkflow: "Evaluation for binary classification, especially under class imbalance.",
    functionRole: "Summarizes ranking quality without committing to one decision threshold.",
    technicalBasis: "Integrates true positive rate versus false positive rate as the threshold varies.",
    practicalExample:
      "Comparing fraud detectors by AUC when the operating threshold is not yet fixed.",
    commonDistinction:
      "Threshold-free ranking metric versus precision and recall at a single operating point.",
    limitations:
      "Can appear strong even when precision or recall at an operational threshold remains unacceptable.",
    relatedTerms: ["Precision", "Recall", "Threshold", "Class imbalance"],
    techniqueId: "roc-auc",
  },
  {
    id: "quantization",
    term: "Quantization",
    definition:
      "Mapping model weights and activations from floating-point to lower-precision numeric representations.",
    locationInWorkflow: "Optimization and compression before deployment.",
    functionRole: "Reduces storage and accelerates inference under memory and energy constraints.",
    technicalBasis:
      "Linear quantization with scale and zero-point; applied post-training or during quantization-aware training.",
    practicalExample: "Converting a float32 image classifier to int8 for on-device inference.",
    commonDistinction:
      "Numeric precision reduction versus pruning, which removes parameters or structures.",
    limitations:
      "Can shift predictions; accuracy must be re-checked on representative hardware and data.",
    relatedTerms: ["Pruning", "TensorFlow Lite", "TinyML", "Deployment verification"],
    techniqueId: "quantization",
  },
  {
    id: "pruning",
    term: "Pruning",
    definition: "Removing weights, neurons, or structures with low estimated contribution to the output.",
    locationInWorkflow: "Compression between training and deployment.",
    functionRole: "Shrinks model size and inference cost while targeting acceptable accuracy loss.",
    technicalBasis: "Magnitude-based or structured sparsity, often followed by fine-tuning.",
    practicalExample: "Removing 30% of convolutional filters before exporting a vision model to the edge.",
    commonDistinction:
      "Structural or weight removal versus quantization, which keeps parameters at lower precision.",
    limitations:
      "Unstructured sparsity may not accelerate inference without hardware support; may require retraining.",
    relatedTerms: ["Quantization", "Knowledge distillation", "Model compression"],
    techniqueId: "pruning",
  },
  {
    id: "transformer",
    term: "Transformer",
    definition:
      "A neural architecture that models sequences using self-attention and position-aware representations.",
    locationInWorkflow: "Model selection, pretraining, and fine-tuning in modern NLP and multimodal systems.",
    functionRole: "Mixes contextual information across tokens in parallel rather than solely via recurrence.",
    technicalBasis:
      "Stacked multi-head self-attention layers with feed-forward blocks, residuals, and normalization.",
    practicalExample: "A document classifier built on a pretrained encoder-only Transformer.",
    commonDistinction:
      "Attention-based blocks versus RNNs that propagate hidden state sequentially through time.",
    limitations:
      "Memory cost grows with sequence length; training and serving require substantial compute.",
    relatedTerms: ["Attention", "BERT", "GPT", "Embeddings"],
    techniqueId: "transformer",
  },
  {
    id: "attention",
    term: "Attention",
    definition:
      "A mechanism that forms a weighted combination of values based on compatibility between queries and keys.",
    locationInWorkflow: "Core computation inside Transformers and some encoder–decoder models.",
    functionRole: "Emphasizes inputs most relevant to the current prediction or representation.",
    technicalBasis: "Scaled dot-product attention: softmax(QKᵀ/√d)V; multi-head uses parallel subspaces.",
    practicalExample:
      "Machine translation attending to the appropriate source word when generating each target word.",
    commonDistinction:
      "General attention versus self-attention, where queries and keys come from the same sequence.",
    limitations: "Full attention has quadratic memory and compute cost in sequence length.",
    relatedTerms: ["Self-attention", "Transformer", "Embeddings", "Positional encoding"],
    techniqueId: "attention",
  },
  {
    id: "embedding",
    term: "Embedding",
    definition:
      "A dense vector representation of a discrete object, arranged so semantic similarity maps to geometric proximity.",
    locationInWorkflow: "Feature extraction and representation in NLP, retrieval, and recommendation.",
    functionRole: "Enables similarity search and neural processing of tokens, items, or documents.",
    technicalBasis:
      "Learned lookup tables or contextual encoders trained with language-modeling or contrastive objectives.",
    practicalExample:
      "Representing support tickets as vectors for routing to the nearest specialist team.",
    commonDistinction:
      "Static token embeddings versus contextual embeddings that change with surrounding text.",
    limitations:
      "Quality depends on training corpus and domain; large indexes require storage and maintenance.",
    relatedTerms: ["Tokenization", "RAG", "Vector database", "BERT"],
    techniqueId: "embeddings",
  },
  {
    id: "tokenization",
    term: "Tokenization",
    definition:
      "The procedure that segments raw text into discrete units mapped to vocabulary indices for a language model.",
    locationInWorkflow: "Input preparation before embedding lookup in language and code models.",
    functionRole: "Converts variable-length text into a fixed vocabulary the model can process.",
    technicalBasis: "Subword algorithms such as byte-pair encoding balance vocabulary size and term coverage.",
    practicalExample: 'Splitting a rare word such as "unhappiness" into recognized subword pieces.',
    commonDistinction: "Segmentation into units versus embeddings, which assign vectors to those units.",
    limitations:
      "Affects sequence length, multilingual coverage, and handling of numbers, symbols, and code.",
    relatedTerms: ["Token", "Transformer", "Context window", "BERT"],
    techniqueId: "tokenization",
  },
  {
    id: "rag",
    term: "RAG",
    fullName: "Retrieval-Augmented Generation",
    definition:
      "An architecture that retrieves relevant passages at inference time and conditions generation on that evidence.",
    locationInWorkflow: "Deployment combining search infrastructure with a language model.",
    functionRole: "Grounds answers in external, updatable corpora instead of parametric memory alone.",
    technicalBasis: "Embedding-based retrieval, ranking, and chunking followed by attention-conditioned generation.",
    practicalExample:
      "An internal policy assistant retrieving handbook sections before answering human-resources questions.",
    commonDistinction:
      "Retrieval grounding at inference time versus fine-tuning, which stores knowledge in updated weights.",
    limitations:
      "Answer quality is bounded by retrieval recall; adds latency and requires corpus maintenance.",
    relatedTerms: ["Embeddings", "Vector database", "LLM", "Hallucination"],
    techniqueId: "rag",
  },
  {
    id: "tinyml",
    term: "TinyML",
    fullName: "Tiny Machine Learning",
    definition:
      "Machine learning inference on microcontrollers under strict memory, energy, and latency constraints.",
    locationInWorkflow: "Embedded deployment after compression and verification.",
    functionRole: "Enables on-device decisions without continuous cloud connectivity.",
    technicalBasis:
      "Quantized operators, static memory arenas, and exports such as TensorFlow Lite Micro integrated in C firmware.",
    practicalExample:
      "Classifying vibration signatures on an MCU attached to industrial rotating equipment.",
    commonDistinction:
      "MCU-class constraints versus mobile TensorFlow Lite deployments with more RAM and an operating system.",
    limitations:
      "Limited operator support and model capacity; requires parity checks across Python, export, and device.",
    relatedTerms: ["Quantization", "TensorFlow Lite Micro", "Hardware-aware selection", "Embedded C"],
    techniqueId: "tinyml",
  },
  {
    id: "onnx",
    term: "ONNX",
    fullName: "Open Neural Network Exchange",
    definition:
      "An open interchange format for representing trained models between training frameworks and inference runtimes.",
    locationInWorkflow: "Deployment export and cross-framework interoperability.",
    functionRole: "Decouples the environment where a model is trained from where it is executed.",
    technicalBasis: "A versioned graph of operators and tensors shared across converters and runtimes.",
    practicalExample: "Exporting a PyTorch model to ONNX for inference in a C++ production service.",
    commonDistinction:
      "A portable graph format versus a runtime such as TensorFlow Lite that executes the graph on device.",
    limitations: "Not every operator converts cleanly; runtime operator support varies by platform.",
    relatedTerms: ["TensorFlow Lite", "Deployment", "Quantization", "Model compression"],
    techniqueId: "onnx",
  },
  {
    id: "tflm",
    term: "TensorFlow Lite Micro",
    definition:
      "A TensorFlow Lite variant for microcontrollers that uses static memory allocation and no operating-system dependency.",
    locationInWorkflow: "TinyML deployment on resource-constrained MCUs.",
    functionRole: "Executes converted models within fixed flash and SRAM budgets in firmware.",
    technicalBasis:
      "Interpreter with a fixed tensor arena, a reduced operator set, and a C API for embedded integration.",
    practicalExample:
      "Running a quantized keyword-spotting model on an Arm Cortex-M4 with 256 KB of SRAM.",
    commonDistinction:
      "MCU-focused static runtime versus full TensorFlow Lite on mobile platforms with more resources.",
    limitations:
      "Limited operator coverage; integration and on-device debugging require embedded engineering effort.",
    relatedTerms: ["TinyML", "Quantization", "Embedded C", "ONNX"],
    techniqueId: "tflm",
  },
];
