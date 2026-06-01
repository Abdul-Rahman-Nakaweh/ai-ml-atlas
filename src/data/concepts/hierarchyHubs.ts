import type { Concept } from "@/types/concept";

/**
 * Broad "hub" concepts that organize smaller techniques.
 * These are lightweight library entries focused on structure, not full tutorials.
 */
export const hierarchyHubConcepts: Concept[] = [
  {
    id: "evaluation-metrics",
    name: "Evaluation Metrics",
    summary: "Quantitative measures for judging model quality on validation or test data.",
    libraryCategory: "Evaluation Metrics",
    conceptType: "metric",
    generation: "Cross-generation",
    pipelineStage: "evaluation",
    difficulty: "foundation",
    purpose: "evaluation",
    coreMeaning:
      "Evaluation metrics translate model predictions into comparable numbers—overall correctness, error types, ranking quality, or distance from targets.",
    workflowLocation: "Applied after predictions are generated on held-out validation or test partitions.",
    functionRole:
      "Provides objective criteria for comparing models, thresholds, and deployment readiness.",
    mechanism:
      "Each metric aggregates confusion-matrix cells, residuals, or score rankings according to a defined formula and business context.",
    example:
      "Selecting between two classifiers using F1 on a validation set while tracking precision for false-alarm cost.",
    commonDistinction:
      "Development metrics guide tuning; the final test metric is reported once after all choices are locked.",
    limitation:
      "No single metric captures every cost asymmetry—metric choice must match the application.",
    learnBefore: ["confusion-matrix", "validation"],
    learnAfter: ["precision", "recall", "roc-auc"],
    relatedConcepts: ["accuracy", "f1-score", "confusion-matrix"],
    conceptPath: [{ label: "ML Pipeline" }, { label: "Evaluation", conceptId: "validation" }, { label: "Evaluation Metrics" }],
    subtopics: ["confusion-matrix"],
    specificTechniques: [
      "accuracy",
      "precision",
      "recall",
      "specificity",
      "f1-score",
      "roc-auc",
      "mae",
      "rmse",
      "r-squared",
    ],
    recommendedNext: ["precision", "recall", "confusion-matrix"],
  },
  {
    id: "feature-methods",
    name: "Feature Methods",
    summary: "Approaches for constructing, selecting, and transforming input representations.",
    libraryCategory: "Preprocessing and Features",
    conceptType: "preprocessing",
    generation: "Cross-generation",
    pipelineStage: "feature engineering",
    difficulty: "intermediate",
    purpose: "preprocessing",
    coreMeaning:
      "Feature methods cover how raw observations become useful model inputs—through engineering, subset selection, or learned extraction.",
    workflowLocation: "Between preprocessing and model training in the ML pipeline.",
    functionRole:
      "Improves signal-to-noise ratio and reduces dimensionality so models learn efficiently.",
    mechanism:
      "Combines domain transforms, statistical selection, linear projection, or learned embeddings depending on data type.",
    example:
      "Building interaction terms, selecting top correlated sensors, then applying PCA before a tabular classifier.",
    commonDistinction:
      "Feature engineering creates inputs; feature selection removes columns; feature extraction builds new representations.",
    limitation:
      "Poor features cap every downstream algorithm regardless of model sophistication.",
    learnBefore: ["feature", "preprocessing"],
    learnAfter: ["pca", "embeddings"],
    relatedConcepts: ["feature-engineering", "feature-selection", "feature-extraction", "pca"],
    conceptPath: [{ label: "ML Pipeline" }, { label: "Features", conceptId: "feature" }, { label: "Feature Methods" }],
    subtopics: ["feature-engineering", "feature-selection", "feature-extraction"],
    specificTechniques: ["pca", "embeddings", "autoencoder"],
    recommendedNext: ["feature-selection", "pca"],
  },
  {
    id: "classical-ml",
    name: "Classical Machine Learning",
    summary: "Established algorithms for tabular and structured data before deep learning dominance.",
    libraryCategory: "Algorithms",
    conceptType: "algorithm",
    generation: "Gen 1",
    pipelineStage: "model selection",
    difficulty: "foundation",
    purpose: "general",
    coreMeaning:
      "Classical ML encompasses interpretable, efficient algorithms—linear models, trees, kernels, and ensembles—optimized for structured datasets.",
    workflowLocation: "Model selection when data are tabular, moderately sized, or deployment constraints favor simplicity.",
    functionRole:
      "Delivers strong baselines and deployable models without large-scale neural infrastructure.",
    mechanism:
      "Algorithms differ in decision boundaries, loss functions, and ensemble strategies but share supervised learning from labeled features.",
    example:
      "A random forest on customer churn features compared against logistic regression and gradient boosting.",
    commonDistinction:
      "Classical ML versus deep learning—structured tabular problems often favor classical methods; unstructured sensory data favors deep nets.",
    limitation:
      "Nonlinear structure without feature engineering may require ensembles or deep models.",
    learnBefore: ["ml", "feature"],
    learnAfter: ["random-forest", "gradient-boosting"],
    relatedConcepts: ["linear-regression", "svm", "random-forest"],
    conceptPath: [{ label: "ML Pipeline" }, { label: "Model Selection" }, { label: "Classical Machine Learning" }],
    specificTechniques: [
      "linear-regression",
      "logistic-regression",
      "svm",
      "knn",
      "decision-tree",
      "random-forest",
      "gradient-boosting",
      "naive-bayes",
    ],
    recommendedNext: ["logistic-regression", "random-forest"],
  },
  {
    id: "model-selection",
    name: "Model Selection",
    summary: "Criteria and trade-offs for choosing algorithms and architectures for a problem.",
    libraryCategory: "Validation and Tuning",
    conceptType: "validation",
    generation: "Cross-generation",
    pipelineStage: "model selection",
    difficulty: "intermediate",
    purpose: "general",
    coreMeaning:
      "Model selection weighs data type, interpretability, accuracy, latency, memory, training cost, and deployment target to pick a suitable approach.",
    workflowLocation: "After feature preparation and before committed training and tuning.",
    functionRole:
      "Narrows the algorithm search space to methods feasible for the problem and environment.",
    mechanism:
      "Uses baselines, validation metrics, resource profiling, and domain constraints—not accuracy alone.",
    example:
      "Choosing a shallow decision tree over a deep network when flash size on an MCU is capped at 64 KB.",
    commonDistinction:
      "Model selection chooses the family; hyperparameter tuning optimizes within the chosen family.",
    limitation:
      "Criteria must be revisited when data distribution or deployment hardware changes.",
    learnBefore: ["ml", "validation"],
    learnAfter: ["cross-validation", "hardware-aware-selection"],
    relatedConcepts: ["bias-variance", "cross-validation", "hardware-aware-selection"],
    conceptPath: [{ label: "ML Pipeline" }, { label: "Model Selection" }],
    subtopics: ["bias-variance", "hardware-aware-selection"],
    recommendedNext: ["cross-validation", "random-forest"],
  },
  {
    id: "deployment-practices",
    name: "Deployment",
    summary: "Moving trained models into production or embedded runtimes with verified behavior.",
    libraryCategory: "Deployment and TinyML",
    conceptType: "deployment",
    generation: "Cross-generation",
    pipelineStage: "deployment",
    difficulty: "advanced",
    purpose: "embedded deployment",
    coreMeaning:
      "Deployment covers export, compression, runtime integration, verification, and monitoring so models serve predictions reliably outside the training environment.",
    workflowLocation: "After optimization and before production sign-off or field release.",
    functionRole:
      "Ensures the model artifact, preprocessing, and runtime produce consistent, resource-bounded inference.",
    mechanism:
      "Combines format conversion, quantization, on-device profiling, and parity testing across environments.",
    example:
      "Exporting to TFLite Micro, verifying int8 outputs against Python, and profiling latency on target firmware.",
    commonDistinction:
      "Deployment delivers inference; training produces the artifact—preprocessing must travel with the model.",
    limitation:
      "Hardware-specific constraints require re-validation when the target device changes.",
    learnBefore: ["inference", "model-compression"],
    learnAfter: ["deployment-verification", "tinyml"],
    relatedConcepts: ["onnx", "tflite", "deployment-verification"],
    conceptPath: [{ label: "ML Pipeline" }, { label: "Deployment" }],
    subtopics: ["model-compression", "tinyml"],
    specificTechniques: ["onnx", "tflite", "tflm", "deployment-verification", "embedded-c"],
    recommendedNext: ["quantization", "deployment-verification"],
  },
  {
    id: "optimization-area",
    name: "Optimization",
    summary: "Techniques to improve model efficiency, size, and inference speed after training.",
    libraryCategory: "Deployment and TinyML",
    conceptType: "optimization",
    generation: "Cross-generation",
    pipelineStage: "optimization",
    difficulty: "intermediate",
    purpose: "optimization",
    coreMeaning:
      "Optimization in ML deployment focuses on compressing, accelerating, and adapting models while preserving acceptable accuracy.",
    workflowLocation: "After initial training and before export to production or embedded targets.",
    functionRole:
      "Bridges the gap between research accuracy and deployable resource budgets.",
    mechanism:
      "Applies quantization, pruning, distillation, and hardware-aware selection in combination as needed.",
    example:
      "Quantizing a vision model to int8, then pruning 20% of filters and re-validating on-device.",
    commonDistinction:
      "Training optimization (gradient descent) versus deployment optimization (compression)—different goals and tools.",
    limitation:
      "Each compression step can shift outputs; cumulative changes require verification.",
    learnBefore: ["training", "inference"],
    learnAfter: ["model-compression", "quantization"],
    relatedConcepts: ["model-compression", "quantization", "pruning"],
    conceptPath: [{ label: "ML Pipeline" }, { label: "Optimization" }],
    subtopics: ["model-compression"],
    specificTechniques: ["quantization", "pruning", "knowledge-distillation"],
    recommendedNext: ["quantization", "deployment-verification"],
  },
  {
    id: "modern-ai",
    name: "Modern AI",
    summary: "Large language models, retrieval systems, agents, and transformer-based applications.",
    libraryCategory: "Modern AI and LLMs",
    conceptType: "llm concept",
    generation: "Gen 3",
    pipelineStage: "cross-cutting",
    difficulty: "intermediate",
    purpose: "generation",
    coreMeaning:
      "Modern AI centers on scale, transformers, retrieval-augmented generation, and agentic systems that combine language models with tools and external knowledge.",
    workflowLocation: "Application design, fine-tuning, evaluation, and deployment of LLM-based systems.",
    functionRole:
      "Enables generative, retrieval, and agent workflows beyond classical predictive ML.",
    mechanism:
      "Tokenization, embeddings, attention, and conditional generation over retrieved or tool-augmented context.",
    example:
      "An enterprise assistant using RAG over internal docs with LoRA fine-tuning and tool use for calculations.",
    commonDistinction:
      "Modern AI (generative, retrieval) versus classical ML (predictive scoring on fixed features).",
    limitation:
      "Higher compute, evaluation complexity, and grounding requirements than tabular ML.",
    learnBefore: ["ml", "dl"],
    learnAfter: ["transformer", "rag"],
    relatedConcepts: ["llm", "transformer", "rag"],
    conceptPath: [{ label: "Modern AI" }],
    subtopics: ["transformer", "rag", "llm"],
    specificTechniques: ["tokenization", "embeddings", "fine-tuning", "lora", "ai-agents"],
    recommendedNext: ["transformer", "embeddings"],
  },
  {
    id: "rag-system",
    name: "RAG System",
    summary: "End-to-end retrieval-augmented generation architecture and its components.",
    libraryCategory: "Modern AI and LLMs",
    conceptType: "llm concept",
    generation: "Gen 3",
    pipelineStage: "deployment",
    difficulty: "advanced",
    purpose: "retrieval",
    coreMeaning:
      "A RAG system combines document indexing, embedding search, retrieval, optional reranking, and conditional generation to ground LLM outputs.",
    workflowLocation: "LLM application architecture when factual freshness or domain specificity is required.",
    functionRole:
      "Supplies external knowledge at inference time without retraining all model weights.",
    mechanism:
      "Chunks are embedded and stored; queries retrieve nearest passages that condition the generator.",
    example:
      "A policy bot retrieving handbook sections before answering employee benefit questions.",
    commonDistinction:
      "RAG augments inference; fine-tuning updates weights—often used together but solve different update paths.",
    limitation:
      "Retrieval quality bounds answer quality; poor recall produces confident but wrong responses.",
    learnBefore: ["embeddings", "llm"],
    learnAfter: ["vector-database", "prompt-engineering"],
    relatedConcepts: ["embeddings", "vector-database", "llm"],
    conceptPath: [{ label: "Modern AI", conceptId: "modern-ai" }, { label: "RAG" }],
    subtopics: ["embeddings", "vector-database"],
    specificTechniques: ["rag", "prompt-engineering"],
    recommendedNext: ["vector-database", "rag"],
  },
  {
    id: "transformer-architecture",
    name: "Transformer Architecture",
    summary: "The encoder-decoder building blocks of modern sequence and language models.",
    libraryCategory: "Modern AI and LLMs",
    conceptType: "llm concept",
    generation: "Gen 3",
    pipelineStage: "training",
    difficulty: "advanced",
    purpose: "generation",
    coreMeaning:
      "The transformer stack combines token embeddings, positional information, multi-head self-attention, and feed-forward blocks with residuals and normalization.",
    workflowLocation: "Foundation model design, fine-tuning, and understanding LLM internals.",
    functionRole:
      "Enables parallel sequence modeling that replaced recurrence for many language and vision tasks.",
    mechanism:
      "Attention weights connect all token pairs; feed-forward layers transform each position independently after mixing.",
    example:
      "BERT encoder blocks for text classification; GPT decoder blocks for autoregressive generation.",
    commonDistinction:
      "Transformer architecture versus a single attention mechanism—attention is one layer inside the full stack.",
    limitation:
      "Quadratic memory in sequence length; long contexts need architectural or sparse approximations.",
    learnBefore: ["embeddings", "attention"],
    learnAfter: ["bert", "gpt"],
    relatedConcepts: ["attention", "self-attention", "tokenization"],
    conceptPath: [{ label: "Modern AI", conceptId: "modern-ai" }, { label: "Transformers" }],
    subtopics: ["tokenization", "embeddings", "attention", "self-attention"],
    specificTechniques: ["transformer", "bert", "gpt", "vit"],
    variants: ["bert", "gpt", "vit"],
    recommendedNext: ["self-attention", "fine-tuning"],
  },
  {
    id: "cross-validation-methods",
    name: "Cross-Validation Methods",
    summary: "Resampling schemes for stable generalization estimates during model development.",
    libraryCategory: "Validation and Tuning",
    conceptType: "validation",
    generation: "Cross-generation",
    pipelineStage: "validation",
    difficulty: "intermediate",
    purpose: "validation",
    coreMeaning:
      "Cross-validation methods partition data into rotating train and validation folds to estimate how models generalize beyond a single split.",
    workflowLocation: "Hyperparameter tuning and model comparison before final testing.",
    functionRole:
      "Reduces variance in performance estimates compared to a single train-validation split.",
    mechanism:
      "k-fold, stratified, repeated, nested, and leave-one-out schemes differ in partition count, class balance, and tuning isolation.",
    example:
      "Five-fold stratified CV to select tree depth while preserving class proportions in each fold.",
    commonDistinction:
      "Cross-validation estimates development performance; the test set provides the final unbiased score once.",
    limitation:
      "Invalid when temporal or group structure is ignored; nested CV is required to tune without optimistic bias.",
    learnBefore: ["train-test-split", "validation"],
    learnAfter: ["nested-cv", "hyperparameter-tuning"],
    relatedConcepts: ["cross-validation", "stratified-cv", "nested-cv"],
    conceptPath: [{ label: "ML Pipeline" }, { label: "Validation", conceptId: "validation" }, { label: "Cross-Validation Methods" }],
    variants: ["cross-validation", "stratified-cv", "nested-cv"],
    recommendedNext: ["nested-cv", "grid-search"],
  },
  {
    id: "preprocessing-methods",
    name: "Preprocessing Methods",
    summary: "Transformations applied to raw data before feature engineering and modeling.",
    libraryCategory: "Preprocessing and Features",
    conceptType: "preprocessing",
    generation: "Cross-generation",
    pipelineStage: "preprocessing",
    difficulty: "foundation",
    purpose: "preprocessing",
    coreMeaning:
      "Preprocessing methods clean, scale, encode, and impute raw data so downstream algorithms receive consistent, usable inputs.",
    workflowLocation: "After data collection and before feature engineering or model training.",
    functionRole:
      "Corrects scale differences, missing values, outliers, and categorical encoding needs.",
    mechanism:
      "Fit-transform pipelines compute statistics on training data only, then apply the same transforms at inference.",
    example:
      "Imputing missing sensor readings, standardizing channels, and one-hot encoding categorical plant IDs.",
    commonDistinction:
      "Preprocessing prepares raw values; feature methods construct or select model-ready representations.",
    limitation:
      "Leakage from fitting on test data invalidates all downstream metrics.",
    learnBefore: ["dataset", "feature"],
    learnAfter: ["standardization", "feature-engineering"],
    relatedConcepts: ["standardization", "normalization", "one-hot-encoding"],
    conceptPath: [{ label: "ML Pipeline" }, { label: "Preprocessing", conceptId: "preprocessing" }],
    specificTechniques: [
      "standardization",
      "normalization",
      "one-hot-encoding",
      "missing-value-imputation",
      "outlier-handling",
    ],
    recommendedNext: ["standardization", "one-hot-encoding"],
  },
  {
    id: "tinyml-system",
    name: "TinyML System",
    summary: "Embedded machine learning under strict latency, memory, firmware, and power constraints.",
    libraryCategory: "Deployment and TinyML",
    conceptType: "deployment",
    generation: "Cross-generation",
    pipelineStage: "deployment",
    difficulty: "advanced",
    purpose: "embedded deployment",
    coreMeaning:
      "TinyML systems run inference on microcontrollers and edge devices where kilobytes of RAM, flash limits, and millisecond latency define feasibility.",
    workflowLocation: "End-to-end embedded deployment from model selection through firmware integration.",
    functionRole:
      "Delivers on-device intelligence without cloud dependency for sensing, control, and privacy-sensitive tasks.",
    mechanism:
      "Combines compression, TFLite Micro runtimes, fixed tensor arenas, and deployment verification on target silicon.",
    example:
      "Keyword spotting on an MCU waking the device from sleep with sub-10 ms inference.",
    commonDistinction:
      "TinyML versus cloud inference—constraints drive model family, size, and numeric precision choices.",
    limitation:
      "Not every trained model fits; architecture and compression must co-design with hardware.",
    learnBefore: ["quantization", "model-compression"],
    learnAfter: ["deployment-verification", "hardware-aware-selection"],
    relatedConcepts: ["tflm", "quantization", "hardware-aware-selection"],
    conceptPath: [{ label: "Embedded AI" }, { label: "TinyML", conceptId: "tinyml" }],
    subtopics: ["quantization", "deployment-verification", "hardware-aware-selection"],
    specificTechniques: ["tflm", "tflite", "embedded-c"],
    recommendedNext: ["hardware-aware-selection", "deployment-verification"],
  },
];
