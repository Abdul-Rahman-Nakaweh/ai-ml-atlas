import type { FormalConcept, LearnBlock, LearnChapter } from "@/types/learn";

/** Edit Learn page chapters and formal concept panels here */
export const formalConcepts: Record<string, FormalConcept> = {
  "ai-ml-dl": {
    id: "ai-ml-dl",
    title: "Artificial Intelligence, Machine Learning, and Deep Learning",
    definition:
      "Artificial intelligence (AI) denotes systems that perform tasks associated with perception, reasoning, or decision-making. Machine learning (ML) is a subset of AI in which behavior is learned from data rather than encoded explicitly. Deep learning (DL) is a subset of ML that employs neural networks with multiple layers to learn hierarchical representations.",
    roleInWorkflow:
      "These terms describe the scope of methods available before problem definition and model selection. They establish expectations for data requirements, interpretability, and deployment complexity.",
    purpose:
      "To distinguish general intelligent systems from data-driven learning and from representation-learning architectures that dominate modern perception and language tasks.",
    technicalBasis:
      "ML relies on optimization of parameters against a loss function on datasets. DL additionally relies on composable nonlinear transformations (layers) trained by gradient-based methods.",
    practicalApplication:
      "Tabular business problems often begin with classical ML; unstructured sensory or textual data often requires DL or pretrained transformer models.",
    limitations:
      "Broader labels do not imply that the most complex method is appropriate. DL in particular requires substantial data, compute, and validation discipline.",
    tradeOffs:
      "Increasing generality of the paradigm typically increases data demand, opacity of internal representations, and operational cost.",
    relatedConcepts: ["Supervised learning", "Loss function", "Generalization", "Deployment constraints"],
    recommendedSequence: { before: [], after: ["Data and features", "Train/validation/test discipline"] },
  },
  pca: {
    id: "pca",
    title: "Principal Component Analysis (PCA)",
    definition:
      "Principal Component Analysis is a feature extraction method that transforms a set of possibly correlated variables into a smaller set of orthogonal components ordered by retained variance.",
    roleInWorkflow:
      "PCA belongs to feature selection/extraction, after preprocessing (typically scaling) and before model training.",
    purpose:
      "To reduce dimensionality, mitigate multicollinearity, and compress information for visualization or downstream modeling.",
    technicalBasis:
      "PCA identifies directions of maximum variance via eigen-decomposition of the covariance matrix or singular value decomposition (SVD) of the centered data matrix. Each component is a linear projection of original features.",
    practicalApplication:
      "Applied to continuous, scaled tabular data when linear correlation structure dominates and interpretability of raw features is secondary.",
    limitations:
      "Components are linear combinations of original features, which reduces direct interpretability. Nonlinear structure is not captured without extensions (e.g., kernel PCA). Fitting on the full dataset including test data induces leakage.",
    tradeOffs:
      "Variance retention versus loss of nonlinear structure and interpretability. Computational efficiency versus fidelity of representation.",
    relatedConcepts: ["Standardization", "Feature selection", "Embeddings", "Autoencoders"],
    commonErrors: [
      "Applying PCA without scaling continuous features",
      "Fitting PCA on training and test data jointly",
    ],
    recommendedSequence: {
      before: ["Standardization", "Covariance and linear algebra"],
      after: ["Linear models on reduced features", "Comparison with feature selection"],
    },
  },
  svm: {
    id: "svm",
    title: "Support Vector Machine (SVM)",
    definition:
      "A Support Vector Machine constructs a decision boundary that maximizes the margin between classes, optionally using kernel functions to represent nonlinear separation in a higher-dimensional space.",
    roleInWorkflow: "Model selection and training for classification (and regression variants).",
    purpose: "To obtain robust boundaries in medium-dimensional feature spaces with clear margin structure.",
    technicalBasis:
      "Convex optimization over support vectors; kernel trick computes inner products in implicit feature space.",
    practicalApplication:
      "Medium-scale classification with scaled features; linear SVMs for compact embedded deployment.",
    limitations:
      "Training cost can grow with sample size; kernel selection requires validation; probability calibration may require additional methods.",
    tradeOffs: "Margin quality and flexibility versus training time and tuning complexity.",
    relatedConcepts: ["Margin", "Kernel methods", "Logistic regression", "Standardization"],
    recommendedSequence: { before: ["Feature scaling", "Binary classification metrics"], after: ["Random Forest", "Neural networks"] },
  },
  knn: {
    id: "knn",
    title: "k-Nearest Neighbors (k-NN)",
    definition:
      "k-Nearest Neighbors is an instance-based method that assigns a label or value according to the majority vote or average of the k training points closest to the query in feature space.",
    roleInWorkflow: "Model selection; inference requires access to stored training data.",
    purpose: "Nonparametric classification or regression without explicit training-phase optimization.",
    technicalBasis: "Distance metrics (e.g., Euclidean) in feature space; lazy learning at inference time.",
    practicalApplication: "Small datasets, baselines, and teaching illustrations of bias-variance and distance geometry.",
    limitations:
      "Inference cost and memory scale with training set size; performance degrades in high dimensions without careful feature design; requires consistent scaling.",
    tradeOffs: "Simplicity and flexibility versus memory, latency, and curse of dimensionality.",
    relatedConcepts: ["Distance metrics", "Standardization", "Prototype selection", "Curse of dimensionality"],
    commonErrors: ["Omitting feature scaling", "Using k without cross-validation"],
    recommendedSequence: { before: ["Distance metrics", "Train/validation split"], after: ["SVM", "Decision trees"] },
  },
  "decision-tree": {
    id: "decision-tree",
    title: "Decision Tree",
    definition:
      "A Decision Tree partitions the feature space through recursive binary splits that minimize impurity (classification) or error (regression) in child nodes.",
    roleInWorkflow: "Model selection and training; outputs interpretable rule structure.",
    purpose: "Interpretable modeling with mixed feature types and nonlinear boundaries.",
    technicalBasis: "Greedy split search using Gini index, entropy, or mean squared error reduction.",
    practicalApplication: "When rule-based explanations are required; embedded systems with controlled depth.",
    limitations: "High variance of a single tree; sensitivity to small data perturbations; overfitting without pruning or ensembling.",
    tradeOffs: "Interpretability versus stability and peak predictive performance.",
    relatedConcepts: ["Random Forest", "Information gain", "Overfitting", "Ensemble methods"],
    recommendedSequence: { before: ["Impurity measures", "Overfitting"], after: ["Random Forest", "Gradient boosting"] },
  },
  "random-forest": {
    id: "random-forest",
    title: "Random Forest",
    definition:
      "Random Forest is an ensemble of decision trees trained on bootstrap samples with random feature subsets at each split; predictions aggregate by voting or averaging.",
    roleInWorkflow: "Model selection for tabular classification or regression.",
    purpose: "Reduce variance of single trees while maintaining strong performance on structured data.",
    technicalBasis: "Bagging and decorrelation of trees via random subspace method.",
    practicalApplication: "Default strong baseline for tabular problems when interpretability of a single tree is not mandatory.",
    limitations: "Model size can be large for embedded deployment; less interpretable than a single tree.",
    tradeOffs: "Predictive robustness versus model size and explainability.",
    relatedConcepts: ["Decision Tree", "Gradient Boosting", "Feature importance"],
    recommendedSequence: { before: ["Decision Tree", "Cross-validation"], after: ["Gradient Boosting", "Model compression"] },
  },
  "cross-validation": {
    id: "cross-validation",
    title: "Cross-Validation",
    definition:
      "Cross-validation partitions data into multiple folds, repeatedly training on subsets and evaluating on held-out folds to estimate generalization performance.",
    roleInWorkflow: "Validation stage; supports model and hyperparameter selection.",
    purpose: "Obtain more stable performance estimates than a single split, especially with limited data.",
    technicalBasis: "Resampling from the training distribution; stratification preserves class proportions in classification.",
    practicalApplication: "Hyperparameter tuning and model comparison before final test evaluation.",
    limitations:
      "Computationally expensive; inappropriate temporal structure if folds ignore time order; must remain separate from final test set.",
    tradeOffs: "Estimate reliability versus computational cost.",
    relatedConcepts: ["Train/test split", "Nested cross-validation", "Data leakage"],
    commonErrors: ["Tuning on the test set", "Leakage within folds from global preprocessing"],
    recommendedSequence: { before: ["Train/test split"], after: ["Nested cross-validation", "Final test evaluation"] },
  },
  "data-leakage": {
    id: "data-leakage",
    title: "Data Leakage",
    definition:
      "Data leakage occurs when information from outside the training set—including test data or future observations— influences training, preprocessing, or model selection, producing optimistically biased performance estimates.",
    roleInWorkflow: "Affects validation, preprocessing, and feature engineering stages.",
    purpose: "Recognition of leakage is necessary to ensure that reported metrics reflect deployable generalization.",
    technicalBasis:
      "Statistical dependence introduced by improper partitioning or transformation fit on pooled data.",
    practicalApplication: "Audit pipelines before publication or deployment; fit scalers and feature selectors on training data only.",
    limitations: "Leakage can be subtle in temporal, grouped, or pipeline-transformed data.",
    tradeOffs: "Convenience of global transforms versus validity of evaluation.",
    relatedConcepts: ["Cross-validation", "Test set discipline", "Preprocessing"],
    commonErrors: ["Scaling before split", "Feature selection using test labels"],
    recommendedSequence: { before: ["Train/validation/test splits"], after: ["Nested cross-validation", "MLOps versioning"] },
  },
  metrics: {
    id: "metrics",
    title: "Accuracy, Precision, Recall, and F1-score",
    definition:
      "Accuracy is the proportion of correct predictions. Precision is the proportion of predicted positives that are true positives. Recall is the proportion of actual positives correctly identified. F1-score is the harmonic mean of precision and recall.",
    roleInWorkflow: "Evaluation stage after model training and threshold selection.",
    purpose:
      "Metric selection should reflect the task objective, class distribution, risk level, and cost of false positives or false negatives.",
    technicalBasis: "Derived from the confusion matrix; F1 balances precision and recall when both error types matter.",
    practicalApplication:
      "Use accuracy only when classes are balanced and misclassification costs are symmetric; use precision/recall/F1 and ROC-AUC under imbalance or asymmetric costs.",
    limitations: "Single metrics summarize away operational threshold choices; accuracy can mask failure on rare classes.",
    tradeOffs: "Simplicity of reporting versus alignment with domain-specific costs.",
    relatedConcepts: ["Confusion matrix", "ROC-AUC", "Class imbalance", "Threshold tuning"],
    recommendedSequence: { before: ["Confusion matrix"], after: ["ROC-AUC", "Cost-sensitive learning"] },
  },
  quantization: {
    id: "quantization",
    title: "Quantization",
    definition:
      "Quantization maps model weights and activations from floating-point to lower-precision representations (e.g., int8) to reduce storage and accelerate inference.",
    roleInWorkflow: "Optimization/compression before deployment.",
    purpose: "Meet memory, latency, and energy constraints on edge and microcontroller hardware.",
    technicalBasis: "Linear quantization with scale and zero-point; post-training or quantization-aware training.",
    practicalApplication: "Mobile, embedded, and MCU deployment after accuracy validation on representative data.",
    limitations: "May reduce accuracy; numerical behavior must be verified on target hardware.",
    tradeOffs: "Efficiency versus fidelity of predictions.",
    relatedConcepts: ["Pruning", "TensorFlow Lite", "Deployment verification"],
    commonErrors: ["Deploying quantized models without sample-level parity checks"],
    recommendedSequence: { before: ["Trained float model baseline"], after: ["TFLite Micro", "Embedded verification"] },
  },
  pruning: {
    id: "pruning",
    title: "Pruning",
    definition:
      "Pruning removes weights, neurons, or structures with low estimated contribution to model output.",
    roleInWorkflow: "Optimization/compression between training and deployment.",
    purpose: "Reduce model size and inference cost while preserving acceptable accuracy.",
    technicalBasis: "Magnitude-based or structured pruning with optional fine-tuning recovery.",
    practicalApplication: "Neural network compression for edge inference.",
    limitations: "May require retraining; unstructured sparsity may not accelerate without hardware support.",
    tradeOffs: "Sparsity and size versus accuracy recovery effort.",
    relatedConcepts: ["Quantization", "Knowledge distillation", "Model compression"],
    recommendedSequence: { before: ["Trained neural network"], after: ["Quantization", "Hardware benchmarking"] },
  },
  transformer: {
    id: "transformer",
    title: "Transformer Architecture",
    definition:
      "The Transformer is a neural architecture that models sequences using self-attention and position-aware representations rather than recurrent state alone.",
    roleInWorkflow: "Model selection for language, code, and many multimodal tasks; pretraining and fine-tuning.",
    purpose: "Capture long-range dependencies and contextual relationships at scale.",
    technicalBasis:
      "Multi-head self-attention computes weighted combinations of token representations; feed-forward layers and normalization stabilize training.",
    practicalApplication: "NLP, code models, vision transformers, and large-scale generative systems.",
    limitations: "Quadratic memory in sequence length; high training and inference cost; evaluation and safety challenges at scale.",
    tradeOffs: "Representational power versus compute, memory, and operational risk.",
    relatedConcepts: ["Attention", "Embeddings", "BERT", "GPT", "Fine-tuning"],
    recommendedSequence: { before: ["Neural networks", "Embeddings"], after: ["LLMs", "RAG"] },
  },
  attention: {
    id: "attention",
    title: "Attention Mechanism",
    definition:
      "Attention computes a weighted aggregation of values based on compatibility between queries and keys, allowing the model to emphasize relevant inputs.",
    roleInWorkflow: "Core computation within Transformers and some encoder-decoder models.",
    purpose: "Dynamic, input-dependent focus across sequence elements or modalities.",
    technicalBasis: "Scaled dot-product attention: softmax(QKᵀ/√d)V; multi-head attention uses parallel subspaces.",
    practicalApplication: "Machine translation, language modeling, vision transformers.",
    limitations: "Computational and memory cost grows with sequence length.",
    tradeOffs: "Contextual modeling capacity versus resource requirements.",
    relatedConcepts: ["Self-attention", "Transformer", "Embeddings"],
    recommendedSequence: { before: ["Linear algebra", "Sequence models"], after: ["Transformers", "LLMs"] },
  },
  embeddings: {
    id: "embeddings",
    title: "Embeddings",
    definition:
      "Embeddings are dense vector representations of discrete objects (tokens, users, items) positioned so that semantic similarity corresponds to geometric proximity.",
    roleInWorkflow: "Feature extraction and representation for retrieval, classification, and generation.",
    purpose: "Encode meaning in a continuous space suitable for neural computation and similarity search.",
    technicalBasis: "Learned lookup tables or contextual encoders trained with language modeling or contrastive objectives.",
    practicalApplication: "Information retrieval, RAG, recommendation, transfer learning.",
    limitations: "Quality depends on training corpus and domain match; storage and index maintenance for large collections.",
    tradeOffs: "Expressiveness versus infrastructure for vector search.",
    relatedConcepts: ["Tokenization", "RAG", "Vector database", "BERT"],
    recommendedSequence: { before: ["Tokenization", "Linear algebra"], after: ["RAG", "Fine-tuning"] },
  },
  rag: {
    id: "rag",
    title: "Retrieval-Augmented Generation (RAG)",
    definition:
      "RAG retrieves relevant documents or passages at inference time and conditions a generative model on that evidence to produce outputs.",
    roleInWorkflow: "Deployment architecture combining retrieval systems with language models.",
    purpose: "Ground generation in external, updatable knowledge and reduce reliance on parametric memory alone.",
    technicalBasis: "Embedding-based retrieval plus attention-conditioned generation; chunking and ranking affect recall.",
    practicalApplication: "Enterprise Q&A, documentation assistants, knowledge bases.",
    limitations: "Retrieval quality bounds answer quality; latency from index search; maintenance of corpora.",
    tradeOffs: "Grounding and freshness versus system complexity.",
    relatedConcepts: ["Vector database", "Embeddings", "LLM", "Evaluation of faithfulness"],
    recommendedSequence: { before: ["Embeddings", "LLM basics"], after: ["Agents", "Monitoring"] },
  },
  tinyml: {
    id: "tinyml",
    title: "TinyML and Embedded Machine Learning",
    definition:
      "TinyML denotes machine learning inference on microcontrollers and severely resource-constrained devices where memory, energy, and latency budgets dominate design.",
    roleInWorkflow: "Deployment under hardware constraints; often follows compression and verification.",
    purpose: "Enable on-device inference without cloud dependency for privacy, latency, or connectivity reasons.",
    technicalBasis:
      "Quantized operators, static memory allocation, and toolchain export (e.g., TFLite Micro) with C integration.",
    practicalApplication: "Sensors, wearables, industrial controllers.",
    limitations:
      "Limited model capacity; restricted operator sets; mandatory verification against training-framework predictions.",
    tradeOffs: "Autonomy and efficiency versus model capability.",
    relatedConcepts: ["Quantization", "Hardware-aware selection", "Python-to-C verification"],
    commonErrors: [
      "Optimizing only for accuracy",
      "Skipping parity checks between Python, exported C, and device",
    ],
    recommendedSequence: { before: ["Quantization", "Classical compact models"], after: ["Monitoring on device"] },
  },
  "hardware-aware": {
    id: "hardware-aware",
    title: "Hardware-Aware Model Selection",
    definition:
      "Hardware-aware model selection chooses algorithms and model configurations according to latency, SRAM, flash, firmware size, and energy budgets of the target device—not accuracy alone.",
    roleInWorkflow: "Model selection and optimization prior to final deployment sign-off.",
    purpose: "Ensure the chosen model is deployable and verifiable on production hardware.",
    technicalBasis: "Profiling inference time and memory; comparing numeric pipelines across runtimes.",
    practicalApplication: "Embedded ML, mobile, and fixed-function accelerators.",
    limitations: "Early estimates may diverge from final integrated firmware without on-device measurement.",
    tradeOffs: "Predictive performance versus deployability constraints.",
    relatedConcepts: ["TinyML", "Quantization", "k-NN memory footprint", "Random Forest size"],
    recommendedSequence: { before: ["Problem constraints definition"], after: ["Deployment verification", "Monitoring"] },
  },
};

function c(id: keyof typeof formalConcepts): LearnBlock {
  return { type: "concept", concept: formalConcepts[id] };
}

export const learnChapters: LearnChapter[] = [
  {
    id: "foundations",
    order: 1,
    title: "Foundations of AI and Machine Learning",
    overview:
      "This chapter establishes the vocabulary and principles required for subsequent study: how learning is formulated, how data are represented, and how training differs from inference and evaluation.",
    subsections: [
      {
        id: "scope",
        title: "Scope of AI, ML, and Deep Learning",
        blocks: [
          { type: "concept", concept: formalConcepts["ai-ml-dl"] },
          {
            type: "paragraph",
            content:
              "A formal study of machine learning assumes a dataset of observations, a model family parameterized by learnable quantities, and an objective function minimized through optimization. Generalization—the performance on unseen data—depends on problem formulation, data quality, model capacity, and validation discipline.",
          },
        ],
      },
      {
        id: "data-model",
        title: "Data, Features, Labels, and Models",
        blocks: [
          {
            type: "list",
            title: "Core entities",
            items: [
              "Dataset: a collection of samples used for estimation and evaluation.",
              "Feature: a measurable input variable describing each sample.",
              "Label or target: the quantity to be predicted in supervised learning.",
              "Model: a parameterized mapping from inputs to outputs.",
              "Parameters: values learned during training (e.g., weights).",
              "Hyperparameters: configuration set prior to training (e.g., tree depth, learning rate).",
            ],
          },
          {
            type: "paragraph",
            content:
              "Training adjusts parameters to reduce empirical loss on training data. Inference applies the fitted model to new observations. Validation estimates performance during development; the test set provides a final, unbiased estimate when used only once at the conclusion of the study.",
          },
        ],
      },
      {
        id: "loss",
        title: "Loss Minimization and Generalization",
        blocks: [
          {
            type: "paragraph",
            content:
              "Learning is typically cast as minimization of a loss function that measures discrepancy between predictions and targets. However, minimizing training loss alone does not guarantee acceptable deployment performance. Regularization, validation, and appropriate model capacity are required to mitigate overfitting.",
          },
        ],
      },
    ],
  },
  {
    id: "generations",
    order: 2,
    title: "AI Generations",
    overview:
      "Machine learning practice is often grouped into three generations distinguished by representation learning, data modality, and deployment scale. The generations differ in architecture; they share dependence on data, optimization, and evaluation.",
    subsections: [
      {
        id: "overview",
        title: "Three Generations",
        blocks: [
          {
            type: "table",
            headers: ["Generation", "Representation", "Typical data", "Primary constraint"],
            rows: [
              {
                label: "Gen 1: Classical ML",
                cells: [
                  "Hand-crafted or tabular features",
                  "Structured tables",
                  "Feature engineering quality",
                ],
              },
              {
                label: "Gen 2: Deep neural networks",
                cells: [
                  "Learned hierarchical features",
                  "Images, audio, sequences",
                  "Data volume and compute",
                ],
              },
              {
                label: "Gen 3: Transformers and modern AI",
                cells: [
                  "Attention-based context",
                  "Text, multimodal corpora",
                  "Cost, safety, evaluation",
                ],
              },
            ],
          },
          {
            type: "list",
            title: "Consistent principles across generations",
            items: [
              "Dependence on representative data and clear objectives",
              "Mathematical formulation via loss minimization and constraints",
              "Requirement for validation and test discipline",
              "Deployment limits on memory, latency, and maintainability",
            ],
          },
          {
            type: "paragraph",
            content:
              "The transition from Gen 1 to Gen 2 introduced learned feature hierarchies at the cost of interpretability and increased resource demand. The transition from Gen 2 to Gen 3 introduced attention-based context modeling and large-scale pretraining, enabling transfer and generation but intensifying evaluation and operational complexity.",
          },
        ],
      },
    ],
  },
  {
    id: "pipeline",
    order: 3,
    title: "The Machine Learning Pipeline",
    overview:
      "The pipeline is a sequential workflow in which each stage produces artifacts consumed by the next. Errors introduced early—particularly in problem definition, leakage, or preprocessing—propagate to deployment.",
    subsections: [
      {
        id: "stages",
        title: "Connected Workflow",
        blocks: [
          {
            type: "paragraph",
            content:
              "Problem Definition → Data Collection → Data Cleaning → Preprocessing → Feature Engineering → Feature Selection/Extraction → Model Selection → Training → Hyperparameter Tuning → Validation → Evaluation → Optimization/Compression → Deployment → Monitoring.",
          },
          {
            type: "list",
            title: "Stage outputs (selected)",
            items: [
              "Problem Definition: task type, target, constraints, success criteria.",
              "Preprocessing: fitted scalers and encoders (training statistics only).",
              "Training: parameterized model artifact.",
              "Validation: selected hyperparameters and unbiased development metrics.",
              "Evaluation: final metrics on held-out test data.",
              "Deployment: exportable runtime artifact with documented preprocessing.",
              "Monitoring: drift statistics and operational logs.",
            ],
          },
        ],
      },
      {
        id: "feature-distinction",
        title: "Preprocessing, Feature Engineering, Selection, and Extraction",
        blocks: [
          {
            type: "paragraph",
            content:
              "Preprocessing standardizes or encodes raw inputs (scaling, imputation, one-hot encoding). Feature engineering constructs domain-informed variables. Feature selection retains a subset of original features; feature extraction constructs new representations (e.g., PCA, embeddings). Conflating selection with extraction leads to incorrect pipeline design and evaluation.",
          },
          c("pca"),
        ],
      },
    ],
  },
  {
    id: "models",
    order: 4,
    title: "Model Families and Techniques",
    overview:
      "Model families differ in inductive bias, data modality, interpretability, and deployment profile. Selection should be justified by problem structure and constraints, not by popularity alone.",
    subsections: [
      {
        id: "classical",
        title: "Classical and Instance-Based Models",
        blocks: [c("svm"), c("knn")],
      },
      {
        id: "trees",
        title: "Tree-Based and Ensemble Models",
        blocks: [c("decision-tree"), c("random-forest")],
      },
      {
        id: "neural",
        title: "Neural and Transformer Models",
        blocks: [
          {
            type: "paragraph",
            content:
              "Neural networks compose nonlinear transformations of learned representations. Convolutional architectures exploit spatial locality; recurrent architectures model sequential state; Transformers employ self-attention for contextual mixing. Generative models extend these representations to produce novel samples or text.",
          },
          c("transformer"),
          c("attention"),
        ],
      },
    ],
  },
  {
    id: "evaluation",
    order: 5,
    title: "Evaluation and Validation",
    overview:
      "Evaluation quantifies how well a model satisfies the stated objective on representative data. Validation design determines whether reported metrics are trustworthy.",
    subsections: [
      {
        id: "metrics",
        title: "Classification and Regression Metrics",
        blocks: [c("metrics")],
      },
      {
        id: "validation",
        title: "Validation Methodology",
        blocks: [
          c("cross-validation"),
          c("data-leakage"),
          {
            type: "paragraph",
            content:
              "Nested cross-validation separates tuning from performance estimation when hyperparameters are optimized. Stratified folds preserve class proportions. Temporal data require splits that respect time ordering. Metric selection should reflect the task objective, class distribution, risk level, and cost of false positives or false negatives.",
          },
        ],
      },
    ],
  },
  {
    id: "optimization",
    order: 6,
    title: "Optimization and Model Compression",
    overview:
      "Optimization in deployment contexts includes both training-time hyperparameter search and post-training compression for efficient inference.",
    subsections: [
      {
        id: "compression",
        title: "Compression Methods",
        blocks: [c("quantization"), c("pruning")],
      },
    ],
  },
  {
    id: "deployment",
    order: 7,
    title: "Deployment and Verification",
    overview:
      "Deployment translates a trained artifact into a production system. Verification ensures numerical and procedural equivalence between development and target runtimes.",
    subsections: [
      {
        id: "runtimes",
        title: "Export Runtimes and Embedded Integration",
        blocks: [
          {
            type: "list",
            title: "Common targets",
            items: [
              "API or cloud serving for scalable inference",
              "ONNX and framework-specific exporters for portability",
              "TensorFlow Lite for mobile and edge devices",
              "TensorFlow Lite Micro and embedded C for microcontrollers",
            ],
          },
          {
            type: "paragraph",
            content:
              "Deployment verification should include sample-level comparison of predictions across the training framework, exported intermediate runtime, and final device execution. Preprocessing must be versioned with the model to prevent training-serving skew.",
          },
          c("hardware-aware"),
        ],
      },
    ],
  },
  {
    id: "modern-ai",
    order: 8,
    title: "Modern AI and Large Language Models",
    overview:
      "Modern AI systems combine large pretrained Transformers with retrieval, fine-tuning, and agentic orchestration. Evaluation must address faithfulness, safety, and cost in addition to fluency.",
    subsections: [
      {
        id: "components",
        title: "Core Components",
        blocks: [
          {
            type: "paragraph",
            content:
              "Tokenization segments text into model units. Embeddings represent tokens or documents in continuous space. Large language models (LLMs) are Transformer-based models trained on broad corpora. Fine-tuning and parameter-efficient methods (e.g., LoRA) adapt general models to domain tasks. Agents extend LLMs with tool invocation and multi-step control flows.",
          },
          c("embeddings"),
          c("rag"),
        ],
      },
      {
        id: "risks",
        title: "Hallucination and Evaluation",
        blocks: [
          {
            type: "paragraph",
            content:
              "Hallucination denotes confident but incorrect generation. Mitigation includes retrieval grounding, constrained tool use, human review for high-stakes decisions, and task-specific evaluation protocols beyond single scalar metrics.",
          },
        ],
      },
    ],
  },
  {
    id: "tinyml",
    order: 9,
    title: "TinyML and Embedded AI",
    overview:
      "Embedded AI operates under strict resource ceilings. Model selection and compression must be co-designed with firmware architecture and measurement on target hardware.",
    subsections: [
      {
        id: "constraints",
        title: "Resource Constraints",
        blocks: [
          {
            type: "list",
            title: "Implementation considerations",
            items: [
              "Latency: maximum allowable inference time per decision cycle",
              "Flash and SRAM: upper bounds on stored weights and activations",
              "Firmware size: total binary impact including runtime and model",
              "Numeric precision: effects of quantization on outputs",
              "Power and energy: duty cycle and battery lifetime",
            ],
          },
          c("tinyml"),
        ],
      },
      {
        id: "verification",
        title: "Verification Workflow",
        blocks: [
          {
            type: "paragraph",
            content:
              "Recommended verification sequence: (1) record predictions in the training framework on a fixed test set; (2) compare exported C or TFLite Micro outputs on identical inputs; (3) compare on-device results; (4) document any divergence and acceptable tolerance.",
          },
        ],
      },
    ],
  },
];
