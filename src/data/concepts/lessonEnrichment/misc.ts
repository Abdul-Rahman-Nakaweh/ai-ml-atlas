import type { Concept } from "@/types/concept";

/** Enrichment for hub concepts, preprocessing utilities, and remaining library entries */
export const miscLessons: Partial<Record<string, Partial<Concept>>> = {
  "label-encoding": {
    coreMeaning:
      "Label encoding assigns each category level an integer value. Unlike one-hot encoding, it produces a single column with ordinal integers.",
    workflowLocation:
      "Preprocessing for tree-based models that handle integer-coded categoricals natively.",
    functionRole:
      "Converts categorical strings to integers for models that accept numeric category indices.",
    mechanism:
      "A mapping from category strings to integers is fit on training data. Unseen categories at inference require an explicit handling policy.",
    example:
      "Product categories 'small', 'medium', 'large' map to 0, 1, 2 for a gradient boosting model.",
    commonDistinction:
      "Integer codes for tree models versus one-hot encoding for linear models—integers imply false ordinality for nominal data in linear methods.",
    limitation:
      "Inappropriate for linear or distance-based models on nominal data without one-hot expansion.",
    learnBefore: ["feature", "one-hot-encoding"],
    learnAfter: ["decision-tree", "random-forest"],
  },
  "min-max-scaling": {
    coreMeaning:
      "Min-max scaling is synonymous with min-max normalization: rescaling features to a bounded range, typically [0, 1], using training-set extrema.",
    workflowLocation:
      "Preprocessing when bounded inputs are required by the chosen algorithm or deployment runtime.",
    functionRole:
      "Maps each feature to a fixed interval while preserving relative order.",
    mechanism:
      "x_scaled = (x − min) / (max − min) using training statistics applied consistently to all partitions.",
    example:
      "Analog sensor readings bounded to [0, 1] before input to a neural network on an embedded device.",
    commonDistinction:
      "Same operation as normalization in this library; distinct from standardization (z-score).",
    limitation:
      "Outliers compress the useful range; production values outside training bounds extrapolate.",
    learnBefore: ["preprocessing"],
    learnAfter: ["normalization", "neural-network"],
  },
  "missing-value-imputation": {
    coreMeaning:
      "Missing value imputation replaces absent feature values with estimated substitutes—mean, median, mode, or model-based predictions—so algorithms receive complete inputs.",
    workflowLocation:
      "Preprocessing after data audit and before scaling or model training.",
    functionRole:
      "Prevents algorithms from failing on incomplete rows and preserves sample count.",
    mechanism:
      "Imputation statistics are computed on training data only. Common strategies: median for numeric, mode for categorical, or multivariate imputation for correlated features.",
    example:
      "Age missing values are filled with the training-set median separately for each customer segment stratum.",
    commonDistinction:
      "Replacing missing values versus removing rows with missing data (listwise deletion), which reduces sample size.",
    limitation:
      "Imputation reduces variance and may introduce bias if missingness is informative (not missing at random).",
    learnBefore: ["preprocessing", "dataset"],
    learnAfter: ["standardization", "feature-engineering"],
  },
  "outlier-handling": {
    coreMeaning:
      "Outlier handling identifies and treats extreme or anomalous observations that distort statistics, distance metrics, or model fitting.",
    workflowLocation:
      "Preprocessing after initial data exploration and before scaling or training.",
    functionRole:
      "Prevents a small number of extreme values from dominating means, variances, and model parameters.",
    mechanism:
      "Detection via IQR rules, z-score thresholds, or domain limits. Treatment includes clipping, transformation, removal, or robust methods.",
    example:
      "Transaction amounts above the ninety-ninth percentile are capped before training a fraud detection model.",
    commonDistinction:
      "Correcting extreme inputs versus treating outliers as the target class in anomaly detection.",
    limitation:
      "Legitimate rare events may be outliers; blind removal can delete important signal.",
    learnBefore: ["preprocessing", "dataset"],
    learnAfter: ["standardization", "autoencoder"],
  },
  "stratified-cv": {
    coreMeaning:
      "Stratified cross-validation preserves the class proportion of the full dataset in each fold, ensuring minority classes appear in every training and validation split.",
    workflowLocation:
      "Cross-validation setup for imbalanced classification tasks.",
    functionRole:
      "Prevents folds with zero minority-class samples that make metrics undefined or unstable.",
    mechanism:
      "Folds are constructed so each fold's class distribution approximates the overall dataset proportion.",
    example:
      "Five-fold stratified CV on a dataset with five percent fraud ensures each validation fold contains roughly five percent fraud cases.",
    commonDistinction:
      "Class-proportional folds versus standard k-fold, which may randomly omit minority classes from small folds.",
    limitation:
      "Requires sufficient samples per class; extremely rare classes may still appear in only some folds.",
    learnBefore: ["cross-validation"],
    learnAfter: ["f1-score", "precision"],
  },
  monitoring: {
    coreMeaning:
      "Monitoring tracks model performance, input distributions, and system health in production to detect degradation, drift, and failures after deployment.",
    workflowLocation:
      "Post-deployment operations after the model is serving live traffic.",
    functionRole:
      "Detects when retraining, rollback, or investigation is needed before business impact accumulates.",
    mechanism:
      "Metrics (latency, error rate, prediction distribution) are logged and compared against baselines. Alerts trigger on threshold breaches or statistical drift tests.",
    example:
      "A fraud model's daily precision is tracked; an alert fires when precision drops below eighty-five percent for three consecutive days.",
    commonDistinction:
      "Ongoing production observation versus one-time deployment verification before launch.",
    limitation:
      "Requires labeled feedback or proxy metrics; delayed labels slow detection of performance decay.",
    learnBefore: ["deployment", "testing"],
    learnAfter: ["data-leakage", "overfitting"],
  },
  deployment: {
    coreMeaning:
      "Deployment is the process of integrating a validated model into a production environment where it serves predictions to users or downstream systems.",
    workflowLocation:
      "Final stage after training, validation, testing, and optimization are complete.",
    functionRole:
      "Delivers model value to end users with acceptable latency, reliability, and resource consumption.",
    mechanism:
      "Models are exported to serving runtimes, wrapped in APIs or firmware, and connected to input pipelines. Scaling, versioning, and rollback procedures are established.",
    example:
      "A recommendation model deploys as a REST API behind a load balancer, serving predictions within fifty milliseconds at ninety-ninth percentile latency.",
    commonDistinction:
      "Production serving versus offline batch scoring on static files.",
    limitation:
      "Production inputs may drift from training data; deployment is the start of monitoring, not the end of ML work.",
    learnBefore: ["inference", "testing"],
    learnAfter: ["monitoring", "quantization"],
  },
  "model-selection": {
    coreMeaning:
      "Model selection is the process of choosing which algorithm family, architecture, and configuration best matches the problem, data, and deployment constraints.",
    workflowLocation:
      "After preprocessing and feature engineering, before final training and hyperparameter tuning.",
    functionRole:
      "Narrows the solution space to candidates that balance accuracy, interpretability, latency, and resource limits.",
    mechanism:
      "Baseline models establish performance floors. Candidates are compared via cross-validation on relevant metrics. Hardware profiling may eliminate infeasible options.",
    example:
      "Logistic regression, random forest, and gradient boosting are compared by validation AUC; random forest wins and proceeds to tuning.",
    commonDistinction:
      "Choosing the model family versus tuning hyperparameters within a fixed family.",
    limitation:
      "Selection on test data leaks information; all comparisons must use validation or cross-validation.",
    learnBefore: ["validation", "cross-validation"],
    learnAfter: ["hyperparameter-tuning", "hardware-aware-selection"],
  },
  "classical-ml": {
    coreMeaning:
      "Classical machine learning encompasses traditional algorithms—linear models, trees, ensembles, SVM, k-NN—applied to structured tabular data without deep neural architectures.",
    workflowLocation:
      "Model selection for tabular, small-to-medium datasets where interpretability and training efficiency matter.",
    functionRole:
      "Provides strong baselines and production-ready models for structured data problems.",
    mechanism:
      "Algorithms exploit feature matrix structure directly. Ensembles combine weak learners; linear models offer interpretable coefficients.",
    example:
      "A credit scoring pipeline uses gradient boosting on twelve engineered financial features, selected over a neural network for interpretability.",
    commonDistinction:
      "Traditional algorithms on tabular features versus deep learning on raw unstructured inputs.",
    limitation:
      "Manual feature engineering is often required; performance on raw images or long text is limited without deep models.",
    learnBefore: ["ml", "feature-engineering"],
    learnAfter: ["random-forest", "gradient-boosting"],
  },
  "evaluation-metrics": {
    coreMeaning:
      "Evaluation metrics are quantitative measures that assess model performance on validation or test data, selected to reflect the business objective and error costs.",
    workflowLocation:
      "Evaluation stage after predictions are generated on held-out data.",
    functionRole:
      "Translates prediction outcomes into comparable scores for model selection and reporting.",
    mechanism:
      "Metrics derive from confusion matrix counts, residual errors, or ranking quality. The chosen metric must align with operational priorities.",
    example:
      "A medical screening system tracks recall and specificity rather than accuracy because false negatives and false positives have asymmetric costs.",
    commonDistinction:
      "Development metrics for model selection versus monitoring metrics tracked in production over time.",
    limitation:
      "A single metric rarely captures all objectives; report complementary metrics and inspect confusion matrices.",
    learnBefore: ["validation", "confusion-matrix"],
    learnAfter: ["accuracy", "f1-score", "roc-auc"],
  },
  "feature-methods": {
    coreMeaning:
      "Feature methods collectively refer to preprocessing, feature engineering, feature selection, and feature extraction techniques that shape model inputs.",
    workflowLocation:
      "Span preprocessing and feature engineering stages before model training.",
    functionRole:
      "Determines the quality and form of information available to learning algorithms.",
    mechanism:
      "Pipelines chain cleaning, encoding, scaling, construction, and reduction steps with fit-transform discipline on training data.",
    example:
      "A tabular pipeline imputes missing values, one-hot encodes categories, scales numerics, and selects top features before training.",
    commonDistinction:
      "Input preparation methods versus model selection and training algorithms.",
    limitation:
      "Poor feature methods cap performance regardless of model sophistication; leakage in feature pipelines is a common hidden failure.",
    learnBefore: ["feature", "preprocessing"],
    learnAfter: ["feature-engineering", "pca"],
  },
  "preprocessing-methods": {
    coreMeaning:
      "Preprocessing methods transform raw data into clean, consistent numeric form—handling missing values, encoding categories, scaling features, and treating outliers.",
    workflowLocation:
      "After data collection and before feature engineering or model training.",
    functionRole:
      "Ensures algorithms receive valid, consistently formatted inputs.",
    mechanism:
      "Each method follows fit on training data, transform on all partitions. Pipelines serialize the full sequence for reproducible inference.",
    example:
      "A sklearn Pipeline chains imputation, standardization, and one-hot encoding before a classifier.",
    commonDistinction:
      "Data cleaning and formatting versus feature engineering, which adds predictive signal.",
    limitation:
      "Must be refit only on training data; preprocessing drift in production requires monitoring.",
    learnBefore: ["dataset", "feature"],
    learnAfter: ["standardization", "one-hot-encoding"],
  },
  "cross-validation-methods": {
    coreMeaning:
      "Cross-validation methods define how data is partitioned for repeated training and validation—k-fold, stratified, leave-one-out, group, and time-series variants.",
    workflowLocation:
      "Validation design during model development and hyperparameter tuning.",
    functionRole:
      "Provides reliable performance estimates by averaging across multiple data partitions.",
    mechanism:
      "Each method defines split strategy. Stratified preserves class ratios; group CV keeps related samples together; time-series CV respects temporal order.",
    example:
      "Time-series cross-validation trains on months one through six and validates on month seven, advancing the window forward.",
    commonDistinction:
      "Split strategy design versus the model or metric being evaluated.",
    limitation:
      "Wrong CV scheme for the data structure (e.g., random splits on time series) produces optimistically biased estimates.",
    learnBefore: ["cross-validation", "train-test-split"],
    learnAfter: ["nested-cv", "stratified-cv"],
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
      "Configuration search before training versus parameter updates during training.",
    limitation:
      "Tuning on the test set invalidates reported metrics; use validation or nested cross-validation exclusively.",
    learnBefore: ["hyperparameter", "cross-validation"],
    learnAfter: ["grid-search", "testing"],
  },
  "optimization-area": {
    coreMeaning:
      "The optimization area of the ML pipeline covers techniques that improve efficiency after initial training—compression, quantization, pruning, distillation, and hardware-aware selection.",
    workflowLocation:
      "After model validation and before deployment to resource-constrained targets.",
    functionRole:
      "Bridges accurate offline models and feasible production deployment.",
    mechanism:
      "Multiple compression techniques may be combined and validated on target hardware with deployment verification.",
    example:
      "A production pipeline quantizes, profiles on device, and verifies numeric parity before firmware release.",
    commonDistinction:
      "Post-training efficiency optimization versus training-time regularization.",
    limitation:
      "Each optimization step can degrade accuracy; trade-offs require validation on representative hardware.",
    learnBefore: ["training", "validation"],
    learnAfter: ["quantization", "model-compression"],
  },
  "modern-ai": {
    coreMeaning:
      "Modern AI encompasses large language models, Transformers, retrieval-augmented generation, agents, and multimodal systems that build on deep learning at scale.",
    workflowLocation:
      "Application layer for generation, retrieval, and agentic workflows built on pretrained foundation models.",
    functionRole:
      "Enables natural language interfaces, semantic search, and automated reasoning over unstructured data.",
    mechanism:
      "Pretrained models are adapted via prompting, fine-tuning, or RAG. Agents orchestrate multi-step tool use.",
    example:
      "An enterprise assistant combines RAG over internal documents with an LLM for grounded question answering.",
    commonDistinction:
      "Foundation-model-based systems versus classical ML on structured tabular features.",
    limitation:
      "Requires evaluation for hallucination, bias, and cost; not a replacement for all structured prediction tasks.",
    learnBefore: ["dl", "transformer"],
    learnAfter: ["llm", "rag"],
  },
  "rag-system": {
    coreMeaning:
      "A RAG system is the complete retrieval-augmented generation pipeline: embedding, indexing, retrieval, reranking, and conditional generation components working together.",
    workflowLocation:
      "LLM application architecture when grounded answers from a specific corpus are required.",
    functionRole:
      "Delivers factual, updatable responses by combining search infrastructure with language generation.",
    mechanism:
      "Documents are chunked, embedded, and indexed. Queries retrieve top-k chunks; the LLM generates answers conditioned on retrieved context.",
    example:
      "A compliance RAG system indexes policy PDFs, retrieves relevant paragraphs, and generates cited answers for auditor queries.",
    commonDistinction:
      "End-to-end system versus the RAG concept alone, which describes the retrieval-generation pattern.",
    limitation:
      "Chunking strategy, embedding quality, and retrieval recall all affect final answer accuracy.",
    learnBefore: ["rag", "vector-database"],
    learnAfter: ["prompt-engineering", "hallucination"],
  },
  "tinyml-system": {
    coreMeaning:
      "A TinyML system integrates sensor input, on-device inference, and firmware logic on microcontrollers under strict resource constraints.",
    workflowLocation:
      "Complete embedded deployment from sensor to action on MCU-class hardware.",
    functionRole:
      "Delivers autonomous intelligent behavior without cloud dependency.",
    mechanism:
      "Sensor data flows through preprocessing, TFLite Micro inference, and post-processing logic in a fixed-memory firmware loop.",
    example:
      "An always-on voice assistant detects a wake word on-device and only then streams audio to the cloud.",
    commonDistinction:
      "Full embedded system versus the TinyML concept describing the resource constraint paradigm.",
    limitation:
      "System-level integration complexity; model, firmware, and hardware must be co-designed.",
    learnBefore: ["tinyml", "tflm"],
    learnAfter: ["embedded-c", "deployment-verification"],
  },
  "deployment-practices": {
    coreMeaning:
      "Deployment practices are the engineering standards for releasing ML models safely—versioning, verification, rollback, monitoring, and documentation.",
    workflowLocation:
      "Organization-wide deployment stage spanning export, integration, release, and operations.",
    functionRole:
      "Ensures reliable, reproducible model releases with accountability and recovery options.",
    mechanism:
      "Model registries track versions; CI pipelines run verification tests; canary releases limit blast radius; monitoring detects drift.",
    example:
      "A team requires deployment verification tests, signed model artifacts, and a rollback procedure before any production release.",
    commonDistinction:
      "Engineering process and standards versus individual techniques like quantization.",
    limitation:
      "Process overhead must match risk; not every experiment requires full production rigor.",
    learnBefore: ["deployment", "testing"],
    learnAfter: ["monitoring", "deployment-verification"],
  },
  "transformer-architecture": {
    coreMeaning:
      "Transformer architecture refers to the specific stack of multi-head self-attention layers, feed-forward networks, residual connections, and layer normalization that defines modern sequence models.",
    workflowLocation:
      "Core building block for LLMs, encoders, decoders, and vision Transformers.",
    functionRole:
      "Provides a scalable, parallelizable architecture for modeling relationships in sequences and sets.",
    mechanism:
      "Each block applies self-attention (tokens attend to all tokens), followed by a position-wise feed-forward network, with residuals and normalization stabilizing training.",
    example:
      "GPT-3 stacks ninety-six Transformer decoder blocks, each with multi-head attention and MLP sublayers.",
    commonDistinction:
      "Architectural blueprint versus a specific pretrained model instance such as BERT or GPT.",
    limitation:
      "Quadratic attention cost; requires careful scaling laws and infrastructure for large models.",
    learnBefore: ["attention", "self-attention"],
    learnAfter: ["bert", "gpt", "vit"],
  },
};
