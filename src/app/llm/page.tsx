import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { InfoCallout } from "@/components/InfoCallout";

export const metadata = {
  title: "LLM & Modern AI | AI/ML Atlas",
  description: "Transformers, LLMs, RAG, agents, fine-tuning, and Gen 3 deployment considerations.",
};

const sections = [
  {
    title: "Transformers",
    body: "Self-attention models process tokens in parallel and learn contextual relationships. They underpin BERT (encoder), GPT (decoder), and multimodal variants.",
  },
  {
    title: "Attention",
    body: "Queries, keys, and values determine how much each token attends to others. Multi-head attention learns different relationship types.",
  },
  {
    title: "Tokens & tokenization",
    body: "Text is split into subword tokens. Tokenizer choice affects vocabulary, context length, and fine-tuned model compatibility.",
  },
  {
    title: "Embeddings",
    body: "Dense vectors represent tokens or documents. Similar meanings map to nearby vectors—foundation for search and RAG.",
  },
  {
    title: "Large Language Models",
    body: "Scale + pretraining enables broad language, code, and reasoning tasks. Capabilities come with cost, bias, and hallucination risk.",
  },
  {
    title: "Prompting",
    body: "Instructions and examples steer behavior without weight updates. Fast to iterate but can be inconsistent across models and versions.",
  },
  {
    title: "Fine-tuning",
    body: "Continues training on domain data. Improves task fit but needs quality data, compute, and evaluation for regression or safety issues.",
  },
  {
    title: "LoRA & parameter-efficient fine-tuning",
    body: "Trains low-rank adapters instead of full weights—reduces memory and enables swappable domain adapters.",
  },
  {
    title: "RAG",
    body: "Retrieves relevant documents, injects them into context, then generates answers—grounds responses in external knowledge.",
  },
  {
    title: "Vector databases",
    body: "Approximate nearest neighbor indexes over embeddings for fast retrieval at scale.",
  },
  {
    title: "AI agents",
    body: "LLMs that plan multi-step tasks, maintain state, and invoke tools. Require guardrails, logging, and human oversight for high-stakes use.",
  },
  {
    title: "Tool use",
    body: "Models call APIs, calculators, or code interpreters. Expands capability but increases security and reliability considerations.",
  },
  {
    title: "Hallucination",
    body: "Confident but incorrect outputs. Mitigate with RAG, citations, constrained tools, and evaluation—not prompts alone.",
  },
  {
    title: "Context windows",
    body: "Maximum tokens processed in one pass. Long documents may need chunking, summarization, or retrieval.",
  },
  {
    title: "Evaluation challenges",
    body: "Open-ended outputs resist single metrics. Use task-specific rubrics, human eval, and grounded benchmarks where possible.",
  },
  {
    title: "Deployment considerations",
    body: "Latency, cost, privacy, model versioning, safety filters, and distillation to smaller edge models when cloud inference is too expensive.",
  },
];

export default function LLMPage() {
  return (
    <>
      <HeroSection
        title="LLM & Modern AI"
        subtitle="Gen 3 builds on the same core ideas—data, representations, optimization, evaluation—at much larger scale."
        description="Attention-based architectures enable transfer learning, generation, and retrieval-augmented systems. Understanding components helps you deploy responsibly, not just call APIs."
      />

      <section className="section-padding">
        <PageContainer>
          <InfoCallout variant="info" title="Same foundations, different scale">
            Modern LLMs still minimize loss on data, use embeddings and matrix math, and require validation—but evaluation is harder and deployment cost is higher. Connect new terms to the Math Foundations and Technique Library pages.
          </InfoCallout>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {sections.map((s) => (
              <article key={s.title} className="glass-card p-5">
                <h3 className="font-semibold text-violet-300">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.body}</p>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
