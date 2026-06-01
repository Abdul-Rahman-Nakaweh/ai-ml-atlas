import type { Concept } from "@/types/concept";
import { eq } from "./helpers";

export const modernAILessons: Partial<Record<string, Partial<Concept>>> = {
  tokenization: {
    coreMeaning:
      "Tokenization converts raw text into discrete tokens—the atomic units language models index, embed, and process. Tokens may be words, subwords, or characters depending on the vocabulary design.",
    workflowLocation:
      "First preprocessing step for NLP pipelines before embedding lookup and model input.",
    functionRole:
      "Bridges human-readable text and numeric model inputs by assigning each token a unique identifier.",
    mechanism:
      "Byte-pair encoding, WordPiece, or SentencePiece algorithms split text into subword units balanced between vocabulary size and coverage of rare words.",
    example:
      "The word 'unhappiness' splits into subword tokens ['un', 'happiness'] for a BERT encoder with a thirty-thousand-token vocabulary.",
    commonDistinction:
      "Tokenization produces integer IDs; embedding layers map those IDs to dense vectors in the next step.",
    limitation:
      "Vocabulary and tokenization scheme are model-specific; mismatched tokenizers break fine-tuned models.",
    learnBefore: ["feature", "preprocessing"],
    learnAfter: ["embeddings", "transformer"],
  },
  embeddings: {
    coreMeaning:
      "Embeddings map discrete entities—words, tokens, users, products—to dense vectors in a continuous space where geometric proximity reflects semantic or behavioral similarity.",
    workflowLocation:
      "Feature representation for retrieval, recommendation, and as input to neural models including Transformers.",
    functionRole:
      "Encodes categorical or discrete inputs as numeric vectors that capture relationships and reduce dimensionality versus one-hot encoding.",
    mechanism:
      "Each token or entity maps to a learned vector via a lookup table. Similarity is measured by dot product or cosine distance. Vectors are trained end-to-end or pretrained on large corpora.",
    example:
      "Product embeddings place frequently co-purchased items near each other, enabling nearest-neighbor recommendations without explicit rules.",
    commonDistinction:
      "Learned dense vectors versus one-hot encoding, which produces sparse orthogonal vectors with no similarity structure.",
    limitation:
      "Quality depends on training data coverage; rare tokens or cold-start entities receive poor or default vectors.",
    learnBefore: ["tokenization", "feature"],
    learnAfter: ["vector-database", "rag", "transformer"],
  },
  transformer: {
    coreMeaning:
      "The Transformer architecture processes sequences using self-attention and feed-forward blocks, enabling parallel computation over all token positions rather than step-by-step recurrence.",
    workflowLocation:
      "Foundation model pretraining and fine-tuning for language, code, vision, and multimodal tasks.",
    functionRole:
      "Models long-range dependencies and contextual relationships between all token pairs in a sequence.",
    mechanism:
      "Stacked encoder and/or decoder blocks apply multi-head self-attention, residual connections, and layer normalization. Position encodings inject order information.",
    example:
      "A BERT encoder is fine-tuned on support tickets to classify intent without recurrent processing over tokens.",
    commonDistinction:
      "Attention-based parallel processing versus RNN/LSTM sequential hidden state updates.",
    limitation:
      "Compute and memory scale quadratically with sequence length for dense attention; requires substantial data and compute.",
    learnBefore: ["embeddings", "attention"],
    learnAfter: ["bert", "gpt", "fine-tuning"],
  },
  attention: {
    coreMeaning:
      "Attention computes a weighted mixture of value vectors where weights reflect compatibility between a query and a set of keys, focusing computation on relevant inputs.",
    workflowLocation:
      "Core mechanism inside Transformers and many modern sequence, vision, and multimodal models.",
    functionRole:
      "Dynamically selects which inputs most influence each output position.",
    mechanism:
      "Attention weights = softmax(QKᵀ / √d_k); output = weights · V. Multi-head attention runs parallel attention operations in different subspaces.",
    equation: eq(
      "Attention(Q, K, V) = softmax(QKᵀ / √d_k) · V",
      "Queries Q compare against keys K to produce weights; values V are weighted and summed.",
      "Scaling by √d_k prevents dot products from growing large and saturating softmax. Each head learns different relationship patterns.",
      [
        { symbol: "Q", meaning: "Query matrix—what is being looked for" },
        { symbol: "K", meaning: "Key matrix—what is being matched against" },
        { symbol: "V", meaning: "Value matrix—content to aggregate" },
        { symbol: "d_k", meaning: "Dimension of keys (scaling factor)" },
      ]
    ),
    example:
      "In machine translation, attention weights highlight source words most relevant to each target token during decoding.",
    commonDistinction:
      "General attention versus self-attention, where Q, K, and V all come from the same sequence.",
    limitation:
      "Quadratic cost in sequence length; long contexts require sparse or linear attention variants.",
    learnBefore: ["embeddings", "neural-network"],
    learnAfter: ["self-attention", "transformer"],
  },
  "self-attention": {
    coreMeaning:
      "Self-attention computes relationships between all positions within a single sequence, allowing each token to gather context from every other token in the same input.",
    workflowLocation:
      "Inside each Transformer encoder or decoder block for language and sequence modeling.",
    functionRole:
      "Builds contextualized representations where each token's vector reflects the full surrounding sequence.",
    mechanism:
      "Q, K, and V are linear projections of the same input sequence. Each position attends to all positions including itself, producing context-aware embeddings.",
    example:
      "In the sentence 'The animal didn't cross the street because it was too tired,' self-attention links 'it' to 'animal' across the sentence.",
    commonDistinction:
      "Within-sequence attention versus cross-attention between separate encoder and decoder sequences.",
    limitation:
      "Memory and compute grow with sequence length squared; causal masking required for autoregressive decoding.",
    learnBefore: ["attention", "embeddings"],
    learnAfter: ["transformer", "bert"],
  },
  llm: {
    coreMeaning:
      "A Large Language Model is a neural network trained on vast text corpora to predict tokens, enabling text generation, completion, classification, and reasoning through prompting or fine-tuning.",
    workflowLocation:
      "Modern AI application layer for generation, summarization, classification, and agent orchestration.",
    functionRole:
      "Provides general-purpose language understanding and generation capabilities as a foundation for downstream applications.",
    mechanism:
      "Decoder-only (GPT-style) or encoder-decoder architectures trained with next-token prediction on large datasets. Scale (parameters and data) drives emergent capabilities.",
    example:
      "A customer support system uses an LLM to draft responses, classify ticket urgency, and summarize conversation history.",
    commonDistinction:
      "General pretrained language model versus task-specific fine-tuned or RAG-augmented deployment.",
    limitation:
      "Can produce incorrect or ungrounded content; requires evaluation, guardrails, and grounding for high-stakes use.",
    learnBefore: ["transformer", "tokenization", "embeddings"],
    learnAfter: ["gpt", "bert", "rag", "fine-tuning"],
  },
  gpt: {
    coreMeaning:
      "GPT (Generative Pre-trained Transformer) is a decoder-only Transformer trained autoregressively to predict the next token, enabling open-ended text generation and in-context learning.",
    workflowLocation:
      "Text generation, code completion, conversational agents, and as a backbone for fine-tuned applications.",
    functionRole:
      "Generates coherent continuations from prompts by sampling or searching over predicted token distributions.",
    mechanism:
      "Causal self-attention masks future tokens during training. Each generation step appends a token and re-feeds the growing sequence (or uses KV caching for efficiency).",
    example:
      "A developer uses GPT to generate unit test stubs from function signatures and docstrings.",
    commonDistinction:
      "Autoregressive decoder-only generation versus BERT's bidirectional encoder for understanding tasks.",
    limitation:
      "No built-in retrieval; factual accuracy depends on parametric memory and can degrade without RAG or fine-tuning.",
    learnBefore: ["transformer", "llm", "tokenization"],
    learnAfter: ["fine-tuning", "rag", "ai-agents"],
  },
  bert: {
    coreMeaning:
      "BERT (Bidirectional Encoder Representations from Transformers) pretrains a Transformer encoder with masked language modeling to produce contextual embeddings for understanding tasks.",
    workflowLocation:
      "Fine-tuning for classification, named entity recognition, question answering, and semantic similarity.",
    functionRole:
      "Produces rich bidirectional context representations suitable for discriminative NLP tasks.",
    mechanism:
      "Masked language modeling hides random tokens and trains the model to predict them using bidirectional context. Fine-tuning adds a task-specific head on top of encoder outputs.",
    example:
      "A BERT model fine-tuned on legal documents classifies contract clause types with ninety-four percent accuracy.",
    commonDistinction:
      "Bidirectional encoder for understanding versus GPT's unidirectional decoder for generation.",
    limitation:
      "Not designed for autoregressive generation; maximum input length bounded by positional encoding design.",
    learnBefore: ["transformer", "embeddings"],
    learnAfter: ["fine-tuning", "llm"],
  },
  vit: {
    coreMeaning:
      "Vision Transformer (ViT) applies the Transformer architecture to image classification by splitting images into fixed-size patches treated as token sequences.",
    workflowLocation:
      "Computer vision model selection when sufficient data and compute are available for Transformer-based vision.",
    functionRole:
      "Brings self-attention and scalable pretraining to image tasks previously dominated by CNNs.",
    mechanism:
      "Images are divided into patches; each patch is linearly embedded and combined with position encodings. Standard Transformer encoder blocks process the patch sequence.",
    example:
      "A ViT pretrained on ImageNet is fine-tuned on a medical imaging dataset with five thousand labeled X-rays.",
    commonDistinction:
      "Patch-sequence attention versus CNN's local convolution and translation-equivariant inductive bias.",
    limitation:
      "Requires large datasets or strong pretraining; less inherent spatial bias than CNNs on small data.",
    learnBefore: ["transformer", "cnn"],
    learnAfter: ["fine-tuning", "embeddings"],
  },
  rag: {
    coreMeaning:
      "Retrieval-Augmented Generation combines information retrieval with language model generation, conditioning outputs on externally retrieved documents rather than parametric memory alone.",
    workflowLocation:
      "LLM application design when factual freshness, domain specificity, or citation traceability are required.",
    functionRole:
      "Grounds generated text in verifiable source documents to improve accuracy and reduce hallucination.",
    mechanism:
      "The query is embedded; relevant passages are retrieved from a corpus and ranked; retrieved text is concatenated into the generator's prompt for conditional answer production.",
    example:
      "An internal policy assistant retrieves the three most relevant handbook sections before summarizing an employee's leave eligibility question.",
    commonDistinction:
      "Dynamic retrieval plus generation versus fine-tuning alone, which updates knowledge by retraining weights.",
    limitation:
      "Answer quality depends on retrieval recall; irrelevant or missing documents propagate into generated responses.",
    learnBefore: ["embeddings", "llm", "vector-database"],
    learnAfter: ["prompt-engineering", "hallucination"],
  },
  "vector-database": {
    coreMeaning:
      "A vector database stores embedding vectors and supports efficient similarity search to retrieve nearest neighbors by cosine distance, dot product, or Euclidean metric.",
    workflowLocation:
      "Retrieval infrastructure for RAG, semantic search, and recommendation systems.",
    functionRole:
      "Enables fast lookup of semantically similar items in large embedding collections.",
    mechanism:
      "Approximate nearest neighbor indexes (HNSW, IVF) trade exactness for speed. Embeddings are inserted with metadata; queries return top-k matches above a similarity threshold.",
    example:
      "A documentation search embeds each help article and returns the five closest matches to a user's natural language question.",
    commonDistinction:
      "Semantic vector search versus keyword search (BM25), which matches exact terms without embedding similarity.",
    limitation:
      "Index quality depends on embedding model choice; stale embeddings require re-indexing when the model changes.",
    learnBefore: ["embeddings"],
    learnAfter: ["rag", "prompt-engineering"],
  },
  "fine-tuning": {
    coreMeaning:
      "Fine-tuning adapts a pretrained model to a specific task or domain by continuing training on labeled or curated data, updating some or all model parameters.",
    workflowLocation:
      "After pretraining selection and before deployment for domain-specific or task-specific applications.",
    functionRole:
      "Specializes general pretrained capabilities to particular data distributions, vocabularies, or output formats.",
    mechanism:
      "Training continues from pretrained weights on task-specific data with a typically lower learning rate. Full fine-tuning updates all weights; parameter-efficient methods update subsets.",
    example:
      "A pretrained LLM is fine-tuned on five thousand labeled customer support conversations to classify ticket intent.",
    commonDistinction:
      "Weight updates on task data versus prompting alone, which does not change model parameters.",
    limitation:
      "Requires quality labeled data; full fine-tuning is compute-intensive and can cause catastrophic forgetting of general capabilities.",
    learnBefore: ["llm", "training", "loss-function"],
    learnAfter: ["lora", "rag"],
  },
  lora: {
    coreMeaning:
      "LoRA (Low-Rank Adaptation) fine-tunes models by inserting trainable low-rank matrices into attention layers while keeping the original pretrained weights frozen.",
    workflowLocation:
      "Parameter-efficient fine-tuning when full weight updates are too costly in memory or compute.",
    functionRole:
      "Adapts pretrained models to new tasks by training far fewer parameters than full fine-tuning.",
    mechanism:
      "Weight update is decomposed as ΔW = BA where B and A are low-rank matrices. Only B and A are trained; W remains frozen. At inference, BA can be merged into W.",
    equation: eq(
      "W′ = W + BA   (rank r ≪ dimension)",
      "The effective weight W′ equals frozen pretrained W plus the product of low-rank matrices B and A.",
      "Training only B and A reduces memory and storage. Rank r controls adaptation capacity versus efficiency.",
      [
        { symbol: "W", meaning: "Frozen pretrained weight matrix" },
        { symbol: "B, A", meaning: "Trainable low-rank matrices" },
        { symbol: "r", meaning: "Rank of the adaptation (hyperparameter)" },
      ]
    ),
    example:
      "A seven-billion-parameter LLM is adapted to medical Q&A by training LoRA adapters with rank sixteen on ten thousand examples.",
    commonDistinction:
      "Low-rank adapter training versus full fine-tuning, which updates every weight in the base model.",
    limitation:
      "Rank too low may underfit complex domain shifts; multiple LoRA adapters can be swapped but add deployment complexity.",
    learnBefore: ["fine-tuning", "transformer"],
    learnAfter: ["rag", "llm"],
  },
  "ai-agents": {
    coreMeaning:
      "An AI agent is a system in which a language model plans, decides, and executes multi-step tasks by invoking tools, APIs, or code, incorporating observations into subsequent actions.",
    workflowLocation:
      "Modern AI application orchestration for complex workflows requiring external data or actions.",
    functionRole:
      "Extends LLM capabilities beyond text generation to interactive task completion in environments with tools.",
    mechanism:
      "The model receives a goal, selects tools (search, calculator, database), executes them, observes results, and iterates until the task completes or a limit is reached.",
    example:
      "A research agent searches internal documents, extracts key figures, and compiles a summary report with citations across three tool-call rounds.",
    commonDistinction:
      "Autonomous multi-step tool use versus single-turn prompting without external action.",
    limitation:
      "Error propagation across steps; requires guardrails, tool validation, and cost monitoring.",
    learnBefore: ["llm", "tool-use"],
    learnAfter: ["rag", "hallucination"],
  },
  "tool-use": {
    coreMeaning:
      "Tool use enables language models to invoke external functions—search engines, calculators, APIs, code interpreters—to obtain information or perform actions beyond parametric knowledge.",
    workflowLocation:
      "Agent design and LLM application architecture when tasks require live data or computation.",
    functionRole:
      "Bridges language model reasoning with external systems that provide accurate, current, or computationally precise results.",
    mechanism:
      "The model generates structured tool calls (function name and arguments); the runtime executes them and returns observations appended to the conversation context.",
    example:
      "An LLM calls a weather API with a city parameter rather than guessing temperature from training data.",
    commonDistinction:
      "External tool execution versus retrieval alone—tools may compute, write, or act, not just fetch documents.",
    limitation:
      "Tool schemas must be well-defined; malformed calls and unchecked actions create reliability and security risks.",
    learnBefore: ["llm", "inference"],
    learnAfter: ["ai-agents", "rag"],
  },
  hallucination: {
    coreMeaning:
      "Hallucination in generative AI denotes fluent, confident output that is factually incorrect, unsupported by source material, or fabricated entirely.",
    workflowLocation:
      "Evaluation and safety review for LLM and RAG deployments before and after release.",
    functionRole:
      "Identifies a critical failure mode that must be measured, mitigated, and communicated to users.",
    mechanism:
      "Arises from parametric memorization limits, ambiguous prompts, weak retrieval recall in RAG systems, or optimization for fluency over factual accuracy.",
    example:
      "A legal assistant cites a non-existent statute with authoritative tone, misdirecting the user.",
    commonDistinction:
      "Fabricated content versus calibrated uncertainty or explicit abstention when evidence is insufficient.",
    limitation:
      "No single metric eliminates hallucination; mitigation requires retrieval, constraints, evaluation protocols, and human review.",
    learnBefore: ["llm", "rag"],
    learnAfter: ["rag", "deployment-verification"],
  },
  "prompt-engineering": {
    coreMeaning:
      "Prompt engineering designs input instructions, examples, and context formatting to elicit desired behavior from language models without changing model weights.",
    workflowLocation:
      "LLM application development before or instead of fine-tuning; iterative refinement during deployment.",
    functionRole:
      "Steers model outputs toward task requirements through careful input construction.",
    mechanism:
      "Techniques include system instructions, few-shot examples, chain-of-thought prompting, output format constraints, and role assignment.",
    example:
      "A classification prompt includes three labeled examples and instructs the model to respond with only the class name in JSON format.",
    commonDistinction:
      "Input design without weight updates versus fine-tuning, which changes model parameters.",
    limitation:
      "Fragile across model versions; does not add new factual knowledge beyond context window contents.",
    learnBefore: ["llm", "tokenization"],
    learnAfter: ["fine-tuning", "rag"],
  },
};
