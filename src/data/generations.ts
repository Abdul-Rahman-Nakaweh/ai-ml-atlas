import type { GenerationData } from "@/types";

export const generations: GenerationData[] = [
  {
    id: "gen-1",
    name: "Gen 1: Classical Machine Learning",
    shortName: "Gen 1",
    description:
      "Algorithms that learn patterns from structured, often tabular features through explicit statistical or tree-based models.",
    coreIdea: "Learn patterns from structured features with interpretable models.",
    commonData: "Tabular data, engineered features, smaller datasets",
    examples: [
      "Linear Regression",
      "Logistic Regression",
      "SVM",
      "k-NN",
      "Decision Trees",
      "Random Forests",
      "Naive Bayes",
      "Gradient Boosting",
    ],
    strengths: [
      "Interpretable and auditable",
      "Efficient on modest hardware",
      "Strong baselines for structured data",
      "Easier to deploy on embedded systems",
    ],
    limitations: [
      "Depends heavily on feature engineering",
      "May struggle with raw images, audio, or long text",
      "Representation learning is manual, not learned end-to-end",
    ],
  },
  {
    id: "gen-2",
    name: "Gen 2: Deep Neural Networks",
    shortName: "Gen 2",
    description:
      "Neural networks that learn hierarchical feature representations through stacked layers and differentiable optimization.",
    coreIdea: "Learn feature representations through layers rather than hand-crafted features alone.",
    commonData: "Images, signals, audio, text sequences, time series",
    examples: ["MLPs", "CNNs", "RNNs", "LSTMs", "Autoencoders"],
    strengths: [
      "Automatic representation learning",
      "Strong performance on high-dimensional sensory data",
      "Composable architectures for many modalities",
    ],
    limitations: [
      "Requires more data and compute",
      "Harder to interpret than classical models",
      "Sensitive to architecture and training choices",
    ],
  },
  {
    id: "gen-3",
    name: "Gen 3: Transformers and Modern AI",
    shortName: "Gen 3",
    description:
      "Attention-based models that capture long-range context at scale, enabling transfer learning, generation, and retrieval-augmented systems.",
    coreIdea: "Attention-based models that learn context and relationships at scale.",
    commonData: "Text, images, code, multimodal documents, knowledge bases",
    examples: [
      "Transformers",
      "BERT",
      "GPT",
      "Vision Transformers",
      "LLMs",
      "RAG",
      "Agents",
      "Embeddings",
    ],
    strengths: [
      "Contextual understanding across long inputs",
      "Transfer learning from large pretrained models",
      "Generative and retrieval-augmented capabilities",
    ],
    limitations: [
      "High compute and memory cost",
      "Hallucinations and evaluation difficulty",
      "Data privacy and deployment complexity",
    ],
  },
];

export const generationComparisons = {
  gen1ToGen2: [
    "Moved from hand-crafted features to learned representations",
    "Increased data and compute requirements",
    "Better performance on images, audio, and sequences",
    "Reduced interpretability in exchange for flexibility",
  ],
  gen2ToGen3: [
    "Shifted from recurrence/convolution dominance to attention at scale",
    "Enabled large-scale pretraining and transfer learning",
    "Introduced generative AI, RAG, and agentic workflows",
    "Raised deployment cost and evaluation complexity",
  ],
  stayedTheSame: [
    "All generations rely on data, labels or objectives, and optimization",
    "Loss or error minimization remains central",
    "Train/validation/test discipline still applies",
    "Math foundations: linear algebra, probability, gradients",
    "Evaluation must match the real-world problem and risks",
  ],
};
