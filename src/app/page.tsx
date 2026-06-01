import Link from "next/link";
import { ArrowRight, BookOpen, GitCompare, Library, GraduationCap } from "lucide-react";
import { PageContainer } from "@/components/PageContainer";

const sequence = [
  "Foundations",
  "AI Generations",
  "ML Pipeline",
  "Model Families",
  "Evaluation",
  "Optimization",
  "Deployment",
  "Modern AI",
];

const hubs = [
  {
    title: "Learn the workflow",
    description:
      "A single guided sequence from foundations through pipeline stages, model families, evaluation, optimization, deployment, and modern AI systems.",
    href: "/learn",
    icon: GraduationCap,
  },
  {
    title: "Concept Library",
    description:
      "Searchable reference for algorithms, metrics, preprocessing, validation, deployment, and modern AI—with workflow context and related concepts.",
    href: "/library",
    icon: Library,
  },
  {
    title: "Compare methods",
    description:
      "Decision guides for model selection, evaluation metrics, deployment constraints, common errors, and comparative tables.",
    href: "/guides",
    icon: GitCompare,
  },
  {
    title: "Lookup and connect concepts",
    description:
      "Quick recall and deeper entries for individual terms, with learn-before and learn-after links.",
    href: "/library",
    icon: BookOpen,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-atlas-border/30 bg-gradient-to-b from-cyan-500/8 via-transparent to-transparent">
        <PageContainer className="py-16 md:py-24 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            AI<span className="text-cyan-400">/</span>ML Atlas
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-300 leading-relaxed">
            A structured learning atlas for understanding machine learning from fundamentals to
            deployment.
          </p>
          <p className="mt-6 text-base leading-relaxed text-slate-400 max-w-2xl">
            AI/ML Atlas is a structured learning system for understanding machine learning
            concepts by their role in the workflow, mathematical basis, practical use,
            limitations, and deployment context.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 transition"
            >
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/library"
              className="inline-flex items-center gap-2 rounded-lg border border-atlas-border px-6 py-3 text-sm font-medium text-slate-300 hover:border-slate-500 hover:text-white transition"
            >
              Open Concept Library
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* Purpose */}
      <section className="section-padding border-b border-atlas-border/30">
        <PageContainer className="max-w-3xl">
          <h2 className="text-2xl font-bold text-white">Purpose</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Artificial intelligence and machine learning encompass numerous algorithms, acronyms,
            metrics, and deployment methods. This atlas organizes those concepts into a learning
            sequence so that each term is understood by its function, context, mathematical basis,
            and practical constraints.
          </p>
        </PageContainer>
      </section>

      {/* Learning sequence */}
      <section className="section-padding border-b border-atlas-border/30 bg-atlas-surface/20">
        <PageContainer className="max-w-4xl">
          <h2 className="text-2xl font-bold text-white">Recommended learning sequence</h2>
          <p className="mt-3 text-slate-400 text-sm">
            Proceed in order on the Learn page, or use the Concept Library for targeted reference.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
            {sequence.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                {i > 0 && <span className="text-slate-600">→</span>}
                <span className="rounded-md border border-atlas-border/60 bg-atlas-card/50 px-3 py-1.5 text-slate-300">
                  {step}
                </span>
              </span>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Main hubs - horizontal cards */}
      <section className="section-padding border-b border-atlas-border/30">
        <PageContainer className="max-w-4xl space-y-4">
          <h2 className="text-2xl font-bold text-white mb-8">Main learning hubs</h2>
          {hubs.map((hub) => (
            <Link
              key={hub.href}
              href={hub.href}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-atlas-border/50 bg-atlas-surface/30 p-6 md:p-8 transition hover:border-cyan-500/30 hover:bg-atlas-surface/50"
            >
              <hub.icon className="h-8 w-8 text-cyan-400 shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition">
                  {hub.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{hub.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-600 group-hover:text-cyan-400 shrink-0" />
            </Link>
          ))}
          <Link
            href="/guides#deployment"
            className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-atlas-border/50 bg-atlas-surface/30 p-6 md:p-8 transition hover:border-cyan-500/30"
          >
            <GraduationCap className="h-8 w-8 text-emerald-400 shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Apply to deployment</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Formal guidance for evaluation, embedded systems (TinyML), large language models,
                and operational lifecycle (MLOps) as extensions of the core workflow.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-600 group-hover:text-cyan-400 shrink-0" />
          </Link>
        </PageContainer>
      </section>

      {/* Applied focus */}
      <section className="section-padding">
        <PageContainer className="max-w-3xl">
          <h2 className="text-2xl font-bold text-white">Applied extensions</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            The core Learn sequence establishes general principles. Applied topics extend those
            principles under additional constraints:{" "}
            <Link href="/learn#tinyml" className="text-cyan-400 hover:underline">
              TinyML and embedded AI
            </Link>{" "}
            address microcontroller limits;{" "}
            <Link href="/learn#modern-ai" className="text-cyan-400 hover:underline">
              modern AI and LLMs
            </Link>{" "}
            address large-scale language and retrieval systems; evaluation and deployment guides
            formalize metric selection and verification. These are integrated chapters, not
            isolated topics.
          </p>
        </PageContainer>
      </section>
    </>
  );
}
