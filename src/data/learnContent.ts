import type { FormalConcept, LearnBlock, LearnChapter } from "@/types/learn";

/**
 * Edit Learn page content here.
 *
 * Two structures drive the page:
 *   1. `formalConcepts` — reusable concept panels rendered with formal headings
 *      (Definition, Role in the Workflow, Purpose, Technical Basis, etc.).
 *   2. `learnChapters` — the ordered chapters of the Learn page. Each chapter has
 *      subsections, and each subsection holds an array of blocks
 *      (paragraph | list | table | callout | concept).
 *
 * To add a concept panel, add an entry to `formalConcepts`, then reference it in a
 * chapter subsection with the `c("id")` helper. To add prose, tables, lists, or
 * callouts, push the corresponding block object into a subsection's `blocks`.
 */
export const formalConcepts: Record<string, FormalConcept> = {
  "ai-ml-dl": {
    id: "ai-ml-dl",
    title: "Artificial Intelligence, Machine Learning, and Deep Learning",
    definition:
      "Artificial intelligence (AI) denotes systems that perform tasks associated with perception, reasoning, or decision-making. Machine learning (ML) is a subset of AI in which behavior is learned from data rather than encoded explicitly. Deep learning (DL) is a subset of ML that employs neural networks with multiple layers to learn hierarchical representations directly from raw inputs.",
    roleInWorkflow:
      "These terms describe the scope of methods available before problem definition and model selection. They establish expectations for data requirements, interpretability, and deployment complexity.",
    purpose:
      "To distinguish general intelligent systems from data-driven learning, and to distinguish manually engineered representations from representation-learning architectures that dominate modern perception and language tasks.",
    technicalBasis:
      "ML relies on optimization of parameters against a loss function over a dataset. DL additionally relies on composable nonlinear transformations (layers) trained by gradient-based methods, which allows features to be learned rather than hand-specified.",
    practicalApplication:
      "Tabular business problems often begin with classical ML; unstructured sensory, visual, or textual data often require DL or pretrained transformer models.",
    limitations:
      "A broader label does not imply that the most complex method is appropriate. Deep learning in particular requires substantial data, compute, and validation discipline, and frequently underperforms classical models on small structured datasets.",
    tradeOffs:
      "Increasing the generality of the paradigm typically increases data demand, opacity of internal representations, and operational cost.",
    relatedConcepts: ["Supervised learning", "Loss function", "Generalization", "Deployment constraints"],
    recommendedSequence: { before: [], after: ["Data and features", "Training and inference"] },
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
      "PCA identifies directions of maximum variance via eigen-decomposition of the covariance matrix or singular value decomposition (SVD) of the centered data matrix. Each component is a linear projection of the original features.",
    practicalApplication:
      "Applied to continuous, scaled tabular data when linear correlation structure dominates and interpretability of raw features is secondary.",
    limitations:
      "Components are linear combinations of original features, which reduces direct interpretability. Nonlinear structure is not captured without extensions (e.g., kernel PCA). Fitting on the full dataset including the test partition induces leakage.",
    tradeOffs:
      "Variance retention versus loss of nonlinear structure and interpretability; computational efficiency versus fidelity of representation.",
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
  "linear-models": {
    id: "linear-models",
    title: "Linear Models",
    definition:
      "Linear models predict an output as a weighted sum of input features, optionally passed through a link function. Linear regression predicts a continuous value; logistic regression maps the weighted sum through a sigmoid to estimate class probability.",
    roleInWorkflow:
      "Model selection and training. Linear models are frequently used as interpretable baselines against which more complex families are justified.",
    purpose:
      "To model relationships that are approximately linear in the chosen feature space, providing fast training, low memory footprint, and coefficient-level interpretability.",
    technicalBasis:
      "Parameters are estimated by minimizing a loss function—mean squared error for regression, cross-entropy for logistic regression—often with L1 (lasso) or L2 (ridge) regularization to control overfitting.",
    practicalApplication:
      "Tabular problems with informative engineered features, risk scoring, and any setting in which coefficient interpretation or compact deployment is required.",
    limitations:
      "Cannot represent nonlinear interactions without explicit feature construction; sensitive to multicollinearity and to unscaled features when regularized.",
    tradeOffs:
      "Interpretability and efficiency versus restricted expressive capacity.",
    relatedConcepts: ["Regularization", "Logistic regression", "Feature engineering", "SVM"],
    recommendedSequence: { before: ["Loss minimization", "Feature scaling"], after: ["SVM", "Tree-based models"] },
  },
  svm: {
    id: "svm",
    title: "Support Vector Machine (SVM)",
    definition:
      "A Support Vector Machine constructs a decision boundary that maximizes the margin between classes, optionally using kernel functions to represent nonlinear separation in a higher-dimensional space.",
    roleInWorkflow: "Model selection and training for classification (and regression variants).",
    purpose: "To obtain robust boundaries in medium-dimensional feature spaces with clear margin structure.",
    technicalBasis:
      "Convex optimization over support vectors; the kernel trick computes inner products in an implicit feature space without explicit transformation.",
    practicalApplication:
      "Medium-scale classification with scaled features; linear SVMs are well suited to compact embedded deployment.",
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
    purpose: "Nonparametric classification or regression without an explicit training-phase optimization.",
    technicalBasis: "Distance metrics (e.g., Euclidean) in feature space; lazy learning that defers computation to inference time.",
    practicalApplication: "Small datasets, baselines, and teaching illustrations of bias-variance and distance geometry.",
    limitations:
      "Inference cost and memory scale with training-set size; performance degrades in high dimensions without careful feature design; requires consistent scaling.",
    tradeOffs: "Simplicity and flexibility versus memory, latency, and the curse of dimensionality.",
    relatedConcepts: ["Distance metrics", "Standardization", "Prototype selection", "Curse of dimensionality"],
    commonErrors: ["Omitting feature scaling", "Selecting k without cross-validation"],
    recommendedSequence: { before: ["Distance metrics", "Train/validation split"], after: ["SVM", "Decision trees"] },
  },
  "decision-tree": {
    id: "decision-tree",
    title: "Decision Tree",
    definition:
      "A Decision Tree partitions the feature space through recursive binary splits that minimize impurity (classification) or error (regression) in the resulting child nodes.",
    roleInWorkflow: "Model selection and training; outputs an interpretable rule structure.",
    purpose: "Interpretable modeling with mixed feature types and nonlinear decision boundaries.",
    technicalBasis: "Greedy split search using the Gini index, entropy, or mean-squared-error reduction.",
    practicalApplication: "When rule-based explanations are required; embedded systems with controlled depth.",
    limitations: "High variance for a single tree; sensitivity to small data perturbations; overfitting without pruning or ensembling.",
    tradeOffs: "Interpretability versus stability and peak predictive performance.",
    relatedConcepts: ["Random Forest", "Information gain", "Overfitting", "Ensemble methods"],
    recommendedSequence: { before: ["Impurity measures", "Overfitting"], after: ["Random Forest", "Gradient boosting"] },
  },
  "random-forest": {
    id: "random-forest",
    title: "Random Forest and Gradient Boosting",
    definition:
      "Ensemble methods combine many trees. Random Forest trains trees on bootstrap samples with random feature subsets and aggregates by voting or averaging. Gradient boosting fits trees sequentially, each correcting the residual errors of the previous ensemble.",
    roleInWorkflow: "Model selection for tabular classification or regression.",
    purpose:
      "Reduce the variance of single trees (bagging) or reduce bias by sequential correction (boosting), while maintaining strong performance on structured data.",
    technicalBasis:
      "Random Forest uses bagging and the random subspace method to decorrelate trees. Gradient boosting performs additive stage-wise optimization of a differentiable loss.",
    practicalApplication:
      "Default strong baselines for tabular problems; gradient boosting frequently achieves state-of-the-art accuracy on structured data.",
    limitations:
      "Model size can be large for embedded deployment; less interpretable than a single tree; boosting is sensitive to hyperparameters and can overfit without early stopping.",
    tradeOffs: "Predictive robustness versus model size, training time, and explainability.",
    relatedConcepts: ["Decision Tree", "Bagging", "Boosting", "Feature importance"],
    recommendedSequence: { before: ["Decision Tree", "Cross-validation"], after: ["Model compression", "Hardware-aware selection"] },
  },
  "neural-networks": {
    id: "neural-networks",
    title: "Neural Networks (MLP, CNN, RNN, LSTM)",
    definition:
      "Neural networks compose layers of nonlinear transformations of learned representations. Multilayer perceptrons (MLPs) operate on vectors; convolutional networks (CNNs) exploit spatial locality; recurrent networks (RNNs) and Long Short-Term Memory (LSTM) units model sequential state.",
    roleInWorkflow: "Model selection and training for perception and sequence tasks; the basis of deep learning.",
    purpose: "To learn hierarchical features directly from raw inputs such as images, audio, and sequences.",
    technicalBasis:
      "Parameters are trained by backpropagation of gradients of a loss function. Convolutions share weights across spatial positions; recurrent and LSTM units maintain and gate state across time steps.",
    practicalApplication: "Image classification (CNN), time series and speech (RNN/LSTM), and general nonlinear function approximation (MLP).",
    limitations:
      "Require substantial labeled data and compute; reduced interpretability; sensitive to architecture and optimization choices; prone to overfitting without regularization.",
    tradeOffs: "Representational power versus data demand, compute, and transparency.",
    relatedConcepts: ["Backpropagation", "Autoencoders", "Transformers", "Regularization"],
    recommendedSequence: { before: ["Linear models", "Loss minimization"], after: ["Transformer architecture", "Model compression"] },
  },
  transformer: {
    id: "transformer",
    title: "Transformer Architecture",
    definition:
      "The Transformer is a neural architecture that models sequences using self-attention and position-aware representations rather than recurrent state alone.",
    roleInWorkflow: "Model selection for language, code, and many multimodal tasks; pretraining followed by fine-tuning.",
    purpose: "Capture long-range dependencies and contextual relationships at scale, with parallelizable training.",
    technicalBasis:
      "Multi-head self-attention computes weighted combinations of token representations; feed-forward layers, residual connections, and normalization stabilize training.",
    practicalApplication: "Natural language processing, code models, Vision Transformers (ViT), and large-scale generative systems.",
    limitations: "Quadratic memory in sequence length; high training and inference cost; evaluation and safety challenges at scale.",
    tradeOffs: "Representational power versus compute, memory, and operational risk.",
    relatedConcepts: ["Attention", "Embeddings", "BERT", "GPT", "Fine-tuning"],
    recommendedSequence: { before: ["Neural networks", "Embeddings"], after: ["LLMs", "RAG"] },
  },
  attention: {
    id: "attention",
    title: "Attention and Self-Attention",
    definition:
      "Attention computes a weighted aggregation of values based on the compatibility between queries and keys, allowing the model to emphasize relevant inputs. Self-attention applies this mechanism within a single sequence so that each element attends to every other element.",
    roleInWorkflow: "Core computation within Transformers and many encoder-decoder models.",
    purpose: "Dynamic, input-dependent focus across sequence elements or modalities.",
    technicalBasis: "Scaled dot-product attention: softmax(QKᵀ/√d)V; multi-head attention projects into parallel subspaces and concatenates the results.",
    practicalApplication: "Machine translation, language modeling, and Vision Transformers.",
    limitations: "Computational and memory cost grows quadratically with sequence length.",
    tradeOffs: "Contextual modeling capacity versus resource requirements.",
    relatedConcepts: ["Self-attention", "Transformer", "Embeddings", "Positional encoding"],
    recommendedSequence: { before: ["Linear algebra", "Sequence models"], after: ["Transformers", "LLMs"] },
  },
  "generative-models": {
    id: "generative-models",
    title: "Generative Models",
    definition:
      "Generative models learn the structure of a data distribution well enough to produce new samples that resemble the training data. Examples include large language models for text, diffusion models for images, and autoencoder-based methods for compact latent representations.",
    roleInWorkflow: "Model selection for synthesis, augmentation, and representation tasks; frequently used through pretrained checkpoints.",
    purpose: "To synthesize plausible data, learn reusable representations, or condition generation on prompts or retrieved context.",
    technicalBasis:
      "Language models are trained by next-token prediction; diffusion models learn to reverse a gradual noising process; autoencoders reconstruct inputs through a bottleneck. All optimize a likelihood or reconstruction objective.",
    practicalApplication: "Text generation and summarization, image synthesis, data augmentation, and anomaly detection through reconstruction error.",
    limitations:
      "May produce confident but incorrect output (hallucination); evaluation is difficult because there is no single ground-truth target; training cost is high.",
    tradeOffs: "Flexibility and creativity versus controllability, factual reliability, and evaluation difficulty.",
    relatedConcepts: ["LLMs", "Diffusion models", "Autoencoders", "Hallucination"],
    recommendedSequence: { before: ["Neural networks", "Transformer architecture"], after: ["RAG", "Evaluation of generative systems"] },
  },
  metrics: {
    id: "metrics",
    title: "Classification Metrics: Accuracy, Precision, Recall, Specificity, F1",
    definition:
      "Accuracy is the proportion of correct predictions. Precision is the proportion of predicted positives that are true positives. Recall (sensitivity) is the proportion of actual positives correctly identified. Specificity is the proportion of actual negatives correctly identified. F1-score is the harmonic mean of precision and recall.",
    roleInWorkflow: "Evaluation stage, after model training and threshold selection.",
    purpose:
      "Metric selection should reflect the task objective, class distribution, risk level, and the relative cost of false positives and false negatives.",
    technicalBasis:
      "All quantities are derived from the confusion matrix of true/false positives and negatives. F1 balances precision and recall when both error types matter; ROC-AUC summarizes ranking quality across all thresholds.",
    practicalApplication:
      "Use accuracy only when classes are balanced and misclassification costs are symmetric; use precision, recall, F1, and ROC-AUC under class imbalance or asymmetric costs.",
    limitations: "A single metric summarizes away the operational threshold choice; accuracy can mask failure on rare but important classes.",
    tradeOffs: "Simplicity of reporting versus alignment with domain-specific costs.",
    relatedConcepts: ["Confusion matrix", "ROC-AUC", "Class imbalance", "Threshold tuning"],
    recommendedSequence: { before: ["Confusion matrix"], after: ["ROC-AUC", "Cost-sensitive learning"] },
  },
  "regression-metrics": {
    id: "regression-metrics",
    title: "Regression Metrics: MAE, RMSE, R²",
    definition:
      "Mean Absolute Error (MAE) is the average absolute difference between predictions and targets. Root Mean Squared Error (RMSE) is the square root of the average squared difference. The coefficient of determination (R²) is the proportion of variance in the target explained by the model.",
    roleInWorkflow: "Evaluation stage for continuous-valued prediction tasks.",
    purpose: "To quantify the magnitude of prediction error and the explanatory power of a regression model.",
    technicalBasis:
      "MAE treats all errors linearly; RMSE squares errors and therefore penalizes large deviations more heavily; R² compares model error against the variance of a naive mean predictor.",
    practicalApplication:
      "Report MAE when the cost of error scales linearly and outliers should not dominate; report RMSE when large errors are disproportionately costly; report R² to communicate relative explanatory power.",
    limitations: "R² can be misleading on nonlinear relationships and can be inflated by adding predictors; RMSE is sensitive to outliers.",
    tradeOffs: "Robustness to outliers (MAE) versus sensitivity to large errors (RMSE).",
    relatedConcepts: ["Loss function", "Overfitting", "Cross-validation"],
    recommendedSequence: { before: ["Loss minimization"], after: ["Cross-validation", "Residual analysis"] },
  },
  "cross-validation": {
    id: "cross-validation",
    title: "Cross-Validation and Nested Cross-Validation",
    definition:
      "Cross-validation partitions data into multiple folds, repeatedly training on subsets and evaluating on held-out folds to estimate generalization performance. Nested cross-validation adds an inner loop for hyperparameter selection so that tuning does not contaminate the performance estimate.",
    roleInWorkflow: "Validation stage; supports model and hyperparameter selection.",
    purpose: "Obtain more stable performance estimates than a single split, especially with limited data, and separate tuning from final estimation.",
    technicalBasis: "Resampling from the training distribution; stratification preserves class proportions in classification; the outer loop of nested CV estimates generalization while the inner loop selects hyperparameters.",
    practicalApplication: "Hyperparameter tuning and model comparison before final test evaluation.",
    limitations:
      "Computationally expensive; produces invalid estimates if folds ignore temporal or grouped structure; must remain separate from the final test set.",
    tradeOffs: "Estimate reliability versus computational cost.",
    relatedConcepts: ["Train/test split", "Nested cross-validation", "Data leakage", "Stratification"],
    commonErrors: ["Tuning on the test set", "Leakage within folds from global preprocessing"],
    recommendedSequence: { before: ["Train/test split"], after: ["Data leakage", "Final test evaluation"] },
  },
  "data-leakage": {
    id: "data-leakage",
    title: "Data Leakage",
    definition:
      "Data leakage occurs when information from outside the training set—including test data or future observations—influences training, preprocessing, or model selection, producing optimistically biased performance estimates.",
    roleInWorkflow: "Affects the validation, preprocessing, and feature engineering stages.",
    purpose: "Recognition of leakage is necessary to ensure that reported metrics reflect deployable generalization.",
    technicalBasis: "Statistical dependence introduced by improper partitioning or by fitting transformations on pooled data.",
    practicalApplication: "Audit pipelines before publication or deployment; fit scalers and feature selectors on training data only.",
    limitations: "Leakage can be subtle in temporal, grouped, or pipeline-transformed data.",
    tradeOffs: "Convenience of global transforms versus validity of evaluation.",
    relatedConcepts: ["Cross-validation", "Test-set discipline", "Preprocessing"],
    commonErrors: ["Scaling before splitting", "Feature selection using test labels"],
    recommendedSequence: { before: ["Train/validation/test splits"], after: ["Nested cross-validation", "Pipeline versioning"] },
  },
  quantization: {
    id: "quantization",
    title: "Quantization",
    definition:
      "Quantization maps model weights and activations from floating-point to lower-precision representations (e.g., int8) to reduce storage and accelerate inference.",
    roleInWorkflow: "Optimization/compression, after training and before deployment.",
    purpose: "Meet memory, latency, and energy constraints on edge and microcontroller hardware.",
    technicalBasis: "Linear quantization with a scale and zero-point, applied either post-training or through quantization-aware training.",
    practicalApplication: "Mobile, embedded, and microcontroller deployment, after accuracy validation on representative data.",
    limitations: "May reduce accuracy; numerical behavior must be verified on the target hardware.",
    tradeOffs: "Efficiency versus fidelity of predictions.",
    relatedConcepts: ["Pruning", "Knowledge distillation", "TensorFlow Lite", "Deployment verification"],
    commonErrors: ["Deploying quantized models without sample-level parity checks"],
    recommendedSequence: { before: ["Trained float model baseline"], after: ["TFLite Micro", "Embedded verification"] },
  },
  pruning: {
    id: "pruning",
    title: "Pruning",
    definition: "Pruning removes weights, neurons, or structures with low estimated contribution to the model output.",
    roleInWorkflow: "Optimization/compression between training and deployment.",
    purpose: "Reduce model size and inference cost while preserving acceptable accuracy.",
    technicalBasis: "Magnitude-based or structured pruning, with optional fine-tuning to recover lost accuracy.",
    practicalApplication: "Neural network compression for edge inference.",
    limitations: "May require retraining; unstructured sparsity may not accelerate inference without hardware support.",
    tradeOffs: "Sparsity and size versus the effort required to recover accuracy.",
    relatedConcepts: ["Quantization", "Knowledge distillation", "Model compression"],
    recommendedSequence: { before: ["Trained neural network"], after: ["Quantization", "Hardware benchmarking"] },
  },
  "knowledge-distillation": {
    id: "knowledge-distillation",
    title: "Knowledge Distillation",
    definition:
      "Knowledge distillation trains a small 'student' model to reproduce the behavior of a larger, more accurate 'teacher' model, using the teacher's output distribution as a richer training signal than hard labels alone.",
    roleInWorkflow: "Optimization/compression, producing a deployable model from a larger trained reference.",
    purpose: "Transfer the predictive quality of a large model into a compact model suitable for constrained deployment.",
    technicalBasis:
      "The student minimizes a loss that combines the true labels with the teacher's softened probability outputs (soft targets), which convey inter-class similarity information.",
    practicalApplication: "Producing compact language or vision models for mobile and edge inference.",
    limitations: "Requires a trained teacher and additional training; the student rarely matches the teacher exactly.",
    tradeOffs: "Compactness versus a typically small accuracy gap relative to the teacher.",
    relatedConcepts: ["Quantization", "Pruning", "Model compression"],
    recommendedSequence: { before: ["Trained teacher model"], after: ["Quantization", "Deployment verification"] },
  },
  "hardware-aware": {
    id: "hardware-aware",
    title: "Hardware-Aware Model Selection",
    definition:
      "Hardware-aware model selection chooses algorithms and model configurations according to the latency, SRAM, flash, firmware size, and energy budgets of the target device—not accuracy alone.",
    roleInWorkflow: "Model selection and optimization prior to final deployment sign-off.",
    purpose: "Ensure the chosen model is deployable and verifiable on production hardware.",
    technicalBasis: "Profiling inference time and memory; comparing numeric pipelines across runtimes and precisions.",
    practicalApplication: "Embedded ML, mobile, and fixed-function accelerators.",
    limitations: "Early estimates may diverge from final integrated firmware without on-device measurement.",
    tradeOffs: "Predictive performance versus deployability constraints.",
    relatedConcepts: ["TinyML", "Quantization", "k-NN memory footprint", "Random Forest size"],
    recommendedSequence: { before: ["Problem constraints definition"], after: ["Deployment verification", "Monitoring"] },
  },
  tokenization: {
    id: "tokenization",
    title: "Tokenization",
    definition:
      "Tokenization segments raw text into discrete units (tokens) such as subwords, which are then mapped to integer identifiers consumable by a language model.",
    roleInWorkflow: "Input representation for language models, preceding embedding lookup.",
    purpose: "Convert unbounded text into a fixed vocabulary of units that balance vocabulary size against sequence length.",
    technicalBasis: "Subword algorithms (e.g., byte-pair encoding) learn frequent character sequences so that rare words decompose into known pieces.",
    practicalApplication: "All Transformer-based language and code models; token counts determine context-window usage and cost.",
    limitations: "Tokenization choices affect sequence length, multilingual coverage, and the handling of numbers and code.",
    tradeOffs: "Vocabulary size versus sequence length and coverage of rare terms.",
    relatedConcepts: ["Embeddings", "Transformer", "Context window"],
    recommendedSequence: { before: ["Text preprocessing"], after: ["Embeddings", "Attention"] },
  },
  embeddings: {
    id: "embeddings",
    title: "Embeddings",
    definition:
      "Embeddings are dense vector representations of discrete objects (tokens, documents, users, items) positioned so that semantic similarity corresponds to geometric proximity.",
    roleInWorkflow: "Feature extraction and representation for retrieval, classification, and generation.",
    purpose: "Encode meaning in a continuous space suitable for neural computation and similarity search.",
    technicalBasis: "Learned lookup tables or contextual encoders trained with language-modeling or contrastive objectives.",
    practicalApplication: "Information retrieval, RAG, recommendation, and transfer learning.",
    limitations: "Quality depends on the training corpus and domain match; large collections require storage and index maintenance.",
    tradeOffs: "Expressiveness versus the infrastructure required for vector search.",
    relatedConcepts: ["Tokenization", "RAG", "Vector database", "BERT"],
    recommendedSequence: { before: ["Tokenization", "Linear algebra"], after: ["RAG", "Fine-tuning"] },
  },
  rag: {
    id: "rag",
    title: "Retrieval-Augmented Generation (RAG)",
    definition:
      "RAG retrieves relevant documents or passages at inference time and conditions a generative model on that evidence to produce grounded outputs.",
    roleInWorkflow: "Deployment architecture combining retrieval systems with language models.",
    purpose: "Ground generation in external, updatable knowledge and reduce reliance on parametric memory alone.",
    technicalBasis: "Embedding-based retrieval from a vector database, followed by attention-conditioned generation; chunking and ranking strongly affect recall.",
    practicalApplication: "Enterprise question answering, documentation assistants, and knowledge bases.",
    limitations: "Retrieval quality bounds answer quality; index search adds latency; corpora require maintenance.",
    tradeOffs: "Grounding and freshness versus system complexity.",
    relatedConcepts: ["Vector database", "Embeddings", "LLM", "Faithfulness evaluation"],
    recommendedSequence: { before: ["Embeddings", "LLM basics"], after: ["Agents", "Monitoring"] },
  },
  "fine-tuning": {
    id: "fine-tuning",
    title: "Fine-Tuning and LoRA",
    definition:
      "Fine-tuning adapts a pretrained model to a specific task or domain by continued training on task data. Parameter-efficient methods such as Low-Rank Adaptation (LoRA) update a small number of additional parameters while keeping the original weights frozen.",
    roleInWorkflow: "Adaptation stage between pretraining and deployment.",
    purpose: "Specialize a general model to a domain without the cost of training from scratch.",
    technicalBasis: "LoRA injects low-rank weight updates into selected layers, dramatically reducing the number of trainable parameters and memory required for adaptation.",
    practicalApplication: "Domain-specific assistants, classification on top of pretrained encoders, and instruction tuning.",
    limitations: "Requires representative task data; full fine-tuning is costly and can degrade general capabilities (catastrophic forgetting).",
    tradeOffs: "Adaptation quality versus compute, data requirements, and the risk of overfitting.",
    relatedConcepts: ["Transfer learning", "Embeddings", "RAG", "Catastrophic forgetting"],
    recommendedSequence: { before: ["Transformer architecture", "Embeddings"], after: ["Evaluation", "Deployment"] },
  },
  agents: {
    id: "agents",
    title: "Agents and Tool Use",
    definition:
      "An agent is a system that uses a language model to plan and execute multi-step tasks, invoking external tools—search, code execution, APIs, or databases—and incorporating their results into subsequent reasoning.",
    roleInWorkflow: "Deployment-level orchestration built on top of language models and retrieval.",
    purpose: "Extend a model beyond text generation to act on external systems and complete goal-directed tasks.",
    technicalBasis: "Structured prompting and output parsing route model decisions to tool calls; results are fed back into the context for the next step.",
    practicalApplication: "Automated research assistants, code agents, and workflow automation.",
    limitations: "Error compounding across steps, difficulty of evaluation, latency and cost of multiple model calls, and safety considerations for tool access.",
    tradeOffs: "Autonomy and capability versus reliability, cost, and control.",
    relatedConcepts: ["Tool use", "RAG", "Hallucination", "Evaluation challenges"],
    recommendedSequence: { before: ["LLM basics", "RAG"], after: ["Monitoring", "Evaluation of generative systems"] },
  },
  tinyml: {
    id: "tinyml",
    title: "TinyML and Embedded Machine Learning",
    definition:
      "TinyML denotes machine learning inference on microcontrollers and severely resource-constrained devices, where memory, energy, and latency budgets dominate design.",
    roleInWorkflow: "Deployment under hardware constraints; typically follows compression and verification.",
    purpose: "Enable on-device inference without cloud dependency for privacy, latency, or connectivity reasons.",
    technicalBasis: "Quantized operators, static memory allocation, and toolchain export (e.g., TensorFlow Lite Micro) integrated with C firmware.",
    practicalApplication: "Sensors, wearables, and industrial controllers.",
    limitations:
      "Limited model capacity; restricted operator sets; mandatory verification against training-framework predictions.",
    tradeOffs: "Autonomy and efficiency versus model capability.",
    relatedConcepts: ["Quantization", "Hardware-aware selection", "Python-to-C verification"],
    commonErrors: [
      "Optimizing only for accuracy",
      "Skipping parity checks between Python, exported C, and device output",
    ],
    recommendedSequence: { before: ["Quantization", "Compact classical models"], after: ["On-device monitoring"] },
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
      "This chapter establishes the vocabulary and principles required for every subsequent chapter: how a learning problem is formulated, how data are represented, and how training, validation, testing, and inference are distinguished. Read it before proceeding, because the remaining chapters assume this language.",
    subsections: [
      {
        id: "scope",
        title: "Scope of AI, Machine Learning, and Deep Learning",
        blocks: [
          c("ai-ml-dl"),
          {
            type: "paragraph",
            content:
              "A formal study of machine learning assumes three components: a dataset of observations, a model family parameterized by learnable quantities, and an objective (loss) function minimized through optimization. Generalization—performance on unseen data—depends on problem formulation, data quality, model capacity, and validation discipline, not on the sophistication of the algorithm alone.",
          },
          {
            type: "callout",
            variant: "info",
            title: "Distinction: AI vs ML vs Deep Learning",
            content:
              "These are nested categories, not competing ones. Artificial intelligence is the broadest field; machine learning is the subset that learns behavior from data; deep learning is the subset of machine learning that uses multi-layer neural networks to learn representations. A system can be 'AI' without learning from data at all (for example, a hand-written rule engine).",
          },
        ],
      },
      {
        id: "vocabulary",
        title: "Core Vocabulary: Data, Features, Labels, Models, Parameters",
        blocks: [
          {
            type: "list",
            title: "Core entities",
            items: [
              "Dataset: a collection of samples used for estimation and evaluation.",
              "Feature: a measurable input variable describing each sample.",
              "Label or target: the quantity to be predicted in supervised learning.",
              "Model: a parameterized mapping from inputs to outputs.",
              "Parameters: values learned during training, such as weights and biases.",
              "Hyperparameters: configuration set before training, such as learning rate, tree depth, or the number of neighbors k.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            title: "Distinction: Parameters vs Hyperparameters",
            content:
              "Parameters are learned by the optimization procedure from the training data (for example, the coefficients of a linear model). Hyperparameters are chosen by the practitioner before training and govern how learning proceeds (for example, regularization strength or tree depth). Hyperparameters are selected using the validation set, never the test set.",
          },
        ],
      },
      {
        id: "training-inference",
        title: "Training, Validation, Testing, and Inference",
        blocks: [
          {
            type: "paragraph",
            content:
              "These four activities occur at different points in the lifecycle and must not be conflated. Training adjusts parameters to reduce empirical loss on the training partition. Validation estimates performance during development and guides hyperparameter selection. Testing provides a single, final, unbiased estimate of generalization. Inference is the application of the finished model to new observations in production.",
          },
          {
            type: "table",
            headers: ["Activity", "Data used", "Purpose", "How often"],
            rows: [
              { label: "Training", cells: ["Training set", "Estimate model parameters", "Repeatedly during development"] },
              { label: "Validation", cells: ["Validation set / CV folds", "Select hyperparameters and models", "Repeatedly during development"] },
              { label: "Testing", cells: ["Held-out test set", "Final unbiased performance estimate", "Once, at the conclusion"] },
              { label: "Inference", cells: ["New production inputs", "Generate predictions in deployment", "Continuously in production"] },
            ],
          },
          {
            type: "callout",
            variant: "warning",
            title: "Distinction: Validation vs Testing",
            content:
              "The validation set is consulted many times to make modeling decisions, so performance on it becomes optimistically biased. The test set must be touched only once, after all decisions are finalized, to obtain an honest estimate of generalization. Repeatedly evaluating on the test set silently converts it into a validation set.",
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
              "Learning is typically cast as minimization of a loss function that measures the discrepancy between predictions and targets—for example, mean squared error for regression or cross-entropy for classification. Optimization (often gradient-based) adjusts parameters to reduce this loss. However, minimizing training loss alone does not guarantee acceptable deployment performance: a model can memorize training data while failing on new inputs.",
          },
          {
            type: "callout",
            variant: "tip",
            title: "The central tension: overfitting vs underfitting",
            content:
              "A model with too little capacity underfits and cannot capture the underlying pattern; a model with too much capacity overfits and memorizes noise. Regularization, appropriate model capacity, and honest validation are the tools used to find the balance that generalizes.",
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
      "Machine learning practice is often grouped into three generations distinguished by how representations are obtained, the data modalities involved, and the scale of deployment. The generations differ in architecture and scale; they share a dependence on data representation, mathematical modeling, optimization, loss minimization, and evaluation.",
    subsections: [
      {
        id: "overview",
        title: "Three Generations at a Glance",
        blocks: [
          {
            type: "table",
            headers: ["Generation", "Representation", "Typical data", "Primary constraint"],
            rows: [
              {
                label: "Gen 1: Classical ML",
                cells: ["Hand-crafted or tabular features", "Structured tables", "Quality of feature engineering"],
              },
              {
                label: "Gen 2: Deep neural networks",
                cells: ["Learned hierarchical features", "Images, audio, sequences", "Data volume and compute"],
              },
              {
                label: "Gen 3: Transformers and modern AI",
                cells: ["Attention-based context", "Text and multimodal corpora", "Cost, safety, and evaluation"],
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            title: "What remains constant across all generations",
            content:
              "Although the generations differ in architecture and scale, all of them still rely on data representation, mathematical modeling, optimization, loss/error minimization, and evaluation. A transformer and a linear regression are trained by the same underlying principle: define an objective and minimize it on data.",
          },
        ],
      },
      {
        id: "gen1",
        title: "Generation 1: Classical Machine Learning",
        blocks: [
          {
            type: "paragraph",
            content:
              "Definition. Generation 1 comprises algorithms that learn from structured, tabular data using features that a practitioner has engineered explicitly. The model itself is comparatively simple; predictive quality depends heavily on the quality of the features supplied to it.",
          },
          {
            type: "list",
            title: "Profile",
            items: [
              "Typical data types: structured tables of numeric and categorical variables.",
              "Representative models: Linear Regression, Logistic Regression, SVM, k-NN, Decision Trees, Random Forests, Gradient Boosting.",
              "Strengths: interpretability, fast training, low data and compute requirements, strong performance on tabular problems.",
              "Limitations: requires manual feature engineering; limited ability to model raw perceptual data such as images or audio.",
            ],
          },
        ],
      },
      {
        id: "gen2",
        title: "Generation 2: Deep Neural Networks",
        blocks: [
          {
            type: "paragraph",
            content:
              "Definition. Generation 2 replaces hand-crafted features with representations learned automatically through layered neural networks. Convolutional networks learn spatial features from images; recurrent and LSTM networks learn temporal features from sequences.",
          },
          {
            type: "list",
            title: "Profile",
            items: [
              "Typical data types: images, audio, video, and sequential signals.",
              "Representative models: MLPs, CNNs, RNNs, LSTMs, Autoencoders.",
              "Strengths: learns features directly from raw data; strong performance on perception tasks.",
              "Limitations: requires large labeled datasets and significant compute; reduced interpretability.",
              "What changed from Gen 1: features are learned rather than engineered, shifting effort from feature design to data collection and architecture design.",
            ],
          },
        ],
      },
      {
        id: "gen3",
        title: "Generation 3: Transformers and Modern AI",
        blocks: [
          {
            type: "paragraph",
            content:
              "Definition. Generation 3 is defined by the Transformer architecture and attention-based context modeling, combined with large-scale pretraining on broad corpora. Models are frequently pretrained once and then adapted to many downstream tasks.",
          },
          {
            type: "list",
            title: "Profile",
            items: [
              "Typical data types: text, code, and multimodal corpora at very large scale.",
              "Representative models and systems: Transformers, BERT, GPT, Vision Transformers, large language models (LLMs), retrieval-augmented generation (RAG), agents, and embeddings.",
              "Strengths: transfer learning, broad generalization, and generation across modalities.",
              "Limitations: high training and inference cost; difficult evaluation; safety, reliability, and factuality concerns.",
              "What changed from Gen 2: attention enables long-range context and parallel training; pretraining enables reuse across tasks.",
            ],
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
      "The pipeline is a sequential workflow in which each stage produces artifacts consumed by the next. Errors introduced early—particularly in problem definition, data leakage, or preprocessing—propagate to deployment. This chapter explains where each technique belongs in the process, which is the foundation for the chapters that follow.",
    subsections: [
      {
        id: "stages",
        title: "The Connected Workflow",
        blocks: [
          {
            type: "paragraph",
            content:
              "The pipeline proceeds as follows: Problem Definition → Data Collection → Data Cleaning → Preprocessing → Feature Engineering → Feature Selection / Extraction → Model Selection → Training → Hyperparameter Tuning → Validation → Evaluation → Optimization → Deployment → Monitoring. Each arrow represents an artifact handed to the next stage; understanding these hand-offs is more important than memorizing the names.",
          },
          { type: "visual", visualType: "pipeline-flow" },
          {
            type: "table",
            headers: ["Stage", "Definition / role", "Common techniques", "Output", "Common errors"],
            rows: [
              {
                label: "Problem Definition",
                cells: [
                  "Specify the task, target, and success criteria",
                  "Stakeholder analysis, metric selection",
                  "Task type, target, constraints, success metric",
                  "Optimizing a metric misaligned with the objective",
                ],
              },
              {
                label: "Data Collection",
                cells: [
                  "Acquire representative samples",
                  "Sampling, logging, labeling",
                  "Raw dataset",
                  "Sampling bias; unrepresentative data",
                ],
              },
              {
                label: "Data Cleaning",
                cells: [
                  "Resolve missing, duplicate, or erroneous values",
                  "Imputation, deduplication, outlier handling",
                  "Cleaned dataset",
                  "Discarding informative records; silent imputation",
                ],
              },
              {
                label: "Preprocessing",
                cells: [
                  "Transform inputs into model-ready form",
                  "Scaling, encoding, normalization",
                  "Fitted transformers (training statistics only)",
                  "Fitting transforms on the full dataset (leakage)",
                ],
              },
              {
                label: "Feature Engineering",
                cells: [
                  "Construct domain-informed variables",
                  "Aggregations, interactions, domain transforms",
                  "Enriched feature set",
                  "Leaking the target into engineered features",
                ],
              },
              {
                label: "Feature Selection / Extraction",
                cells: [
                  "Reduce dimensionality or choose informative features",
                  "Filter/wrapper selection, PCA, embeddings",
                  "Reduced or transformed feature set",
                  "Selecting features using test labels",
                ],
              },
              {
                label: "Model Selection",
                cells: [
                  "Choose a model family appropriate to the data",
                  "Baselines, candidate comparison",
                  "Candidate model(s)",
                  "Choosing by popularity rather than fit",
                ],
              },
              {
                label: "Training",
                cells: [
                  "Estimate parameters by minimizing loss",
                  "Gradient descent, tree induction",
                  "Trained model artifact",
                  "Training on data that overlaps the test set",
                ],
              },
              {
                label: "Hyperparameter Tuning",
                cells: [
                  "Search configurations that govern learning",
                  "Grid/random search, Bayesian optimization",
                  "Selected hyperparameters",
                  "Tuning against the test set",
                ],
              },
              {
                label: "Validation",
                cells: [
                  "Estimate generalization during development",
                  "Hold-out, cross-validation, nested CV",
                  "Unbiased development metrics",
                  "Ignoring temporal or grouped structure",
                ],
              },
              {
                label: "Evaluation",
                cells: [
                  "Measure final performance against the objective",
                  "Task-appropriate metrics on the test set",
                  "Final metrics",
                  "Reporting accuracy under class imbalance",
                ],
              },
              {
                label: "Optimization",
                cells: [
                  "Compress for efficient inference",
                  "Quantization, pruning, distillation",
                  "Deployable, efficient model",
                  "Skipping accuracy re-validation after compression",
                ],
              },
              {
                label: "Deployment",
                cells: [
                  "Serve the model in production",
                  "APIs, ONNX, TFLite, embedded C",
                  "Runtime artifact with documented preprocessing",
                  "Training–serving skew",
                ],
              },
              {
                label: "Monitoring",
                cells: [
                  "Track performance and drift over time",
                  "Drift detection, logging, alerting",
                  "Operational metrics and alerts",
                  "Assuming static performance after launch",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "feature-distinction",
        title: "Critical Distinctions Within the Pipeline",
        blocks: [
          {
            type: "callout",
            variant: "info",
            title: "Distinction: Preprocessing vs Feature Engineering",
            content:
              "Preprocessing standardizes or encodes raw inputs so they are valid for a model (scaling, imputation, one-hot encoding). Feature engineering creates new, domain-informed variables that expose structure the model could not easily discover on its own (for example, deriving 'transactions per day' from raw timestamps).",
          },
          {
            type: "callout",
            variant: "info",
            title: "Distinction: Feature Selection vs Feature Extraction",
            content:
              "Feature selection retains a subset of the original features and discards the rest, preserving interpretability. Feature extraction constructs new features as combinations of the originals (for example, PCA components or learned embeddings), which can be more compact but less interpretable. Conflating the two leads to incorrect pipeline design.",
          },
          {
            type: "callout",
            variant: "warning",
            title: "Distinction: Model Parameters vs Hyperparameters (in the pipeline)",
            content:
              "Parameters are produced by the Training stage; hyperparameters are chosen by the Hyperparameter Tuning stage using validation data. Keeping these stages separate is what allows the Evaluation stage to remain unbiased.",
          },
          c("pca"),
        ],
      },
    ],
  },
  {
    id: "models",
    order: 4,
    title: "Model Families",
    overview:
      "Model families differ in inductive bias, suitable data modality, interpretability, and deployment profile. Model selection should be justified by problem structure and constraints, not by popularity. This chapter surveys the major families and provides formal entries for the most representative members.",
    subsections: [
      {
        id: "families-overview",
        title: "Comparison of Model Families",
        blocks: [
          {
            type: "table",
            headers: ["Family", "Representative examples", "Suitable data", "Key strength"],
            rows: [
              { label: "Linear models", cells: ["Linear Regression, Logistic Regression", "Tabular, linearly separable", "Interpretable, efficient"] },
              { label: "Instance-based", cells: ["k-NN", "Small tabular", "No training phase, flexible"] },
              { label: "Tree-based", cells: ["Decision Tree", "Mixed tabular", "Interpretable rules"] },
              { label: "Ensemble", cells: ["Random Forest, Gradient Boosting", "Tabular", "High accuracy, robust"] },
              { label: "Neural networks", cells: ["MLP, CNN, RNN, LSTM", "Images, audio, sequences", "Learned representations"] },
              { label: "Transformers", cells: ["BERT, GPT, ViT", "Text, multimodal", "Long-range context"] },
              { label: "Generative models", cells: ["LLMs, diffusion models", "Text, images", "Sample synthesis"] },
            ],
          },
        ],
      },
      {
        id: "linear-instance",
        title: "Linear and Instance-Based Models",
        blocks: [c("linear-models"), c("knn")],
      },
      {
        id: "trees",
        title: "Tree-Based and Ensemble Models",
        blocks: [c("decision-tree"), c("random-forest")],
      },
      {
        id: "kernel",
        title: "Margin-Based Models",
        blocks: [c("svm")],
      },
      {
        id: "neural",
        title: "Neural Networks and Transformers",
        blocks: [c("neural-networks"), c("transformer"), c("attention")],
      },
      {
        id: "generative",
        title: "Generative Models",
        blocks: [c("generative-models")],
      },
    ],
  },
  {
    id: "evaluation",
    order: 5,
    title: "Evaluation and Validation",
    overview:
      "Evaluation is not the act of reporting a single number; it is a controlled process for determining whether a model generalizes reliably. This chapter explains why metric selection must match the task objective, why accuracy alone is insufficient, and how validation methodology protects against optimistic bias.",
    subsections: [
      {
        id: "objective",
        title: "Matching Metrics to the Objective",
        blocks: [
          {
            type: "paragraph",
            content:
              "Metric selection should reflect the task objective, the class distribution, the risk level, and the relative cost of false positives and false negatives. A medical screening test that must not miss positive cases prioritizes recall; a spam filter that must not discard legitimate mail prioritizes precision. Reporting a single metric without reference to these factors obscures the actual operational behavior of the model.",
          },
          {
            type: "callout",
            variant: "warning",
            title: "Why accuracy alone is insufficient",
            content:
              "On an imbalanced dataset where 99% of cases are negative, a model that always predicts 'negative' achieves 99% accuracy while detecting nothing of interest. Accuracy is meaningful only when classes are balanced and the costs of the two error types are symmetric.",
          },
        ],
      },
      {
        id: "confusion-matrix",
        title: "The Confusion Matrix and Classification Metrics",
        blocks: [
          {
            type: "paragraph",
            content:
              "Most classification metrics are derived from the confusion matrix, which tabulates predictions against actual labels into true positives, false positives, true negatives, and false negatives. Precision, recall, specificity, and F1 are different summaries of this same table; ROC-AUC summarizes ranking quality across all decision thresholds rather than at a single one.",
          },
          { type: "visual", visualType: "confusion-matrix" },
          { type: "visual", visualType: "metric-relations" },
          c("metrics"),
        ],
      },
      {
        id: "regression",
        title: "Regression Metrics",
        blocks: [c("regression-metrics")],
      },
      {
        id: "validation",
        title: "Validation Methodology and Test-Set Discipline",
        blocks: [
          {
            type: "paragraph",
            content:
              "A train/test split sets aside data for a final estimate; a validation set (or cross-validation) supports model and hyperparameter selection without consuming the test set. Nested cross-validation separates tuning from performance estimation when hyperparameters are optimized. Stratified folds preserve class proportions; temporal data require splits that respect time ordering.",
          },
          { type: "visual", visualType: "data-split" },
          c("cross-validation"),
          c("data-leakage"),
          {
            type: "callout",
            variant: "tip",
            title: "Handling class imbalance",
            content:
              "Under class imbalance, prefer precision, recall, F1, and ROC-AUC over accuracy, and consider resampling, class weights, or threshold adjustment. Crucially, any resampling must be applied within cross-validation folds—never before the split—to avoid leakage.",
          },
        ],
      },
    ],
  },
  {
    id: "optimization",
    order: 6,
    title: "Optimization and Deployment",
    overview:
      "After a model is trained and validated, it must be made efficient enough to run under practical constraints and then served reliably. Deployment is not only the question of whether a model runs; it is whether the model runs reliably under constraints such as latency, memory, firmware size, numerical precision, and available hardware support.",
    subsections: [
      {
        id: "compression",
        title: "Model Compression Methods",
        blocks: [
          {
            type: "paragraph",
            content:
              "Compression reduces the size and inference cost of a trained model so that it fits the deployment target. The three principal techniques—quantization, pruning, and knowledge distillation—are frequently combined, and each must be followed by re-validation of accuracy on representative data.",
          },
          { type: "visual", visualType: "quantization" },
          c("quantization"),
          c("pruning"),
          c("knowledge-distillation"),
        ],
      },
      {
        id: "runtimes",
        title: "Export Runtimes and Embedded Integration",
        blocks: [
          {
            type: "list",
            title: "Common deployment targets",
            items: [
              "API or cloud serving for scalable, latency-tolerant inference.",
              "ONNX: an open exchange format that decouples training frameworks from runtimes for portability.",
              "TensorFlow Lite: optimized inference for mobile and edge devices.",
              "TensorFlow Lite Micro: inference on microcontrollers with static memory allocation.",
              "Embedded C deployment: hand-integrated inference for the most constrained or specialized firmware.",
            ],
          },
          c("hardware-aware"),
          {
            type: "callout",
            variant: "warning",
            title: "Deployment verification",
            content:
              "Verification should include sample-level comparison of predictions across the training framework, the exported intermediate runtime, and final device execution. Preprocessing must be versioned and shipped with the model to prevent training–serving skew, in which the data seen in production differs subtly from the data seen during training.",
          },
        ],
      },
    ],
  },
  {
    id: "modern-ai",
    order: 7,
    title: "Modern AI and Large Language Models",
    overview:
      "Modern AI systems combine large pretrained Transformers with retrieval, fine-tuning, and agentic orchestration. Despite their scale, these systems rest on the same core ideas developed in earlier chapters: representation, optimization, data, evaluation, and deployment constraints. Evaluation must address faithfulness, safety, and cost in addition to fluency.",
    subsections: [
      {
        id: "representation",
        title: "From Text to Representation",
        blocks: [
          {
            type: "paragraph",
            content:
              "A language model first segments text into tokens, then maps those tokens to embeddings, then mixes information across the sequence using attention. These three steps—tokenization, embedding, attention—are the bridge between raw text and the Transformer layers studied in the Model Families chapter.",
          },
          { type: "visual", visualType: "attention" },
          c("tokenization"),
          c("embeddings"),
        ],
      },
      {
        id: "systems",
        title: "Systems Built on Language Models",
        blocks: [
          {
            type: "paragraph",
            content:
              "Large language models are Transformer-based models trained on broad corpora by next-token prediction. Practical systems extend them in three principal ways: retrieval grounds generation in external knowledge (RAG); fine-tuning adapts the model to a domain; and agents allow the model to invoke tools and act over multiple steps.",
          },
          c("rag"),
          c("fine-tuning"),
          c("agents"),
        ],
      },
      {
        id: "risks",
        title: "Hallucination and Evaluation Challenges",
        blocks: [
          {
            type: "paragraph",
            content:
              "Hallucination denotes confident but incorrect generation. Because generative outputs have no single ground-truth target, evaluation is intrinsically harder than for classification or regression. Mitigation includes retrieval grounding, constrained tool use, human review for high-stakes decisions, and task-specific evaluation protocols that go beyond a single scalar metric.",
          },
          {
            type: "callout",
            variant: "info",
            title: "The same principles, at a larger scale",
            content:
              "RAG depends on embedding quality and retrieval recall; fine-tuning is optimization against a loss on domain data; deployment is bounded by latency and cost. Modern AI does not abandon the foundations—it applies them under more demanding constraints.",
          },
        ],
      },
    ],
  },
  {
    id: "tinyml",
    order: 8,
    title: "TinyML and Embedded AI",
    overview:
      "Embedded AI operates under strict resource ceilings. Model selection and compression must be co-designed with the firmware architecture and confirmed by measurement on the target hardware. This chapter connects the earlier material directly to embedded machine learning research and practice.",
    subsections: [
      {
        id: "constraints",
        title: "Microcontroller Constraints",
        blocks: [
          {
            type: "list",
            title: "Implementation considerations",
            items: [
              "Latency: the maximum allowable inference time per decision cycle.",
              "Flash: upper bound on stored program and model weights.",
              "SRAM: upper bound on activations and working memory during inference.",
              "Firmware size: total binary impact, including the runtime and the model.",
              "Numeric precision: the effect of quantization on output fidelity.",
              "Power and energy: duty cycle and battery lifetime.",
            ],
          },
          c("tinyml"),
        ],
      },
      {
        id: "tradeoffs",
        title: "Model Trade-offs Under Constraints",
        blocks: [
          {
            type: "paragraph",
            content:
              "On constrained devices, model choice is governed as much by memory and latency as by accuracy. The following trade-offs frequently determine which model is deployable.",
          },
          { type: "visual", visualType: "tinyml-tradeoff" },
          {
            type: "table",
            headers: ["Model", "Embedded strength", "Embedded limitation"],
            rows: [
              { label: "Linear SVM", cells: ["Compact and efficient; few parameters", "Limited flexibility for nonlinear problems"] },
              { label: "Decision Tree", cells: ["Fast and interpretable", "Size can grow with depth"] },
              { label: "Random Forest", cells: ["Improves robustness over a single tree", "Increases memory and firmware cost"] },
              { label: "k-NN", cells: ["Simple to implement", "Memory-heavy: stores training examples"] },
              { label: "Neural network", cells: ["Powerful representation learning", "Often requires quantization or specialized deployment tools"] },
            ],
          },
          c("hardware-aware"),
        ],
      },
      {
        id: "verification",
        title: "Python-to-C-to-Device Verification",
        blocks: [
          {
            type: "paragraph",
            content:
              "Numerical behavior can diverge between a training framework and an embedded target. A disciplined verification flow detects such divergence before it reaches production.",
          },
          {
            type: "list",
            title: "Verification flow",
            items: [
              "Record Python predictions on a fixed test set in the training framework.",
              "Compare exported C (or TensorFlow Lite Micro) predictions on identical inputs.",
              "Compare on-device predictions on the same inputs.",
              "Perform a sample-by-sample comparison and document any divergence and the acceptable tolerance.",
            ],
          },
          {
            type: "callout",
            variant: "tip",
            title: "Verification flow, in one line",
            content:
              "Python predictions → exported C predictions → device predictions → sample-by-sample comparison. Parity across all three stages is the evidence that the deployed model behaves as validated.",
          },
        ],
      },
    ],
  },
];
