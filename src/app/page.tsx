import Link from "next/link";
import {
  Compass,
  GitBranch,
  Library,
  Cpu,
  Sparkles,
  BarChart3,
  Scale,
  AlertTriangle,
  Table2,
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { FeatureCard } from "@/components/FeatureCard";
import { LearningPathCard } from "@/components/LearningPathCard";
import { GenerationCard } from "@/components/GenerationCard";
import { PipelineTimeline } from "@/components/PipelineTimeline";
import { TechniqueCard } from "@/components/TechniqueCard";
import { learningPaths } from "@/data/learningPaths";
import { generations } from "@/data/generations";
import { pipelineStages } from "@/data/pipelineStages";
import { techniques } from "@/data/techniques";

const usageModes = [
  {
    title: "Learn by path",
    desc: "Follow curated sequences from foundations to TinyML or transformers.",
    href: "/paths",
  },
  {
    title: "Browse by AI generation",
    desc: "See how classical ML, deep learning, and modern AI relate.",
    href: "/generations",
  },
  {
    title: "Browse by ML pipeline",
    desc: "Place every technique in the workflow from problem definition to monitoring.",
    href: "/pipeline",
  },
  {
    title: "Search techniques & terms",
    desc: "Open concept cards and glossary entries for depth or quick recall.",
    href: "/techniques",
  },
];

const appliedAreas = [
  {
    title: "Evaluation & Validation",
    description: "Metrics, splits, leakage, and test discipline.",
    href: "/evaluation",
    icon: BarChart3,
    accent: "cyan" as const,
  },
  {
    title: "TinyML / Embedded ML",
    description: "Memory, latency, quantization, and device verification.",
    href: "/tinyml",
    icon: Cpu,
    accent: "emerald" as const,
  },
  {
    title: "LLMs & Modern AI",
    description: "Tokens, attention, RAG, agents, and deployment caveats.",
    href: "/llm",
    icon: Sparkles,
    accent: "violet" as const,
  },
  {
    title: "MLOps / Deployment",
    description: "Versioning, monitoring, drift, and reliable updates.",
    href: "/mlops",
    icon: GitBranch,
    accent: "amber" as const,
  },
];

const decideAreas = [
  {
    title: "Decision Guides",
    description: "Scenario-based recommendations: tabular data, imbalance, TinyML, text, and more.",
    href: "/guides",
    icon: Scale,
    accent: "cyan" as const,
  },
  {
    title: "Common Mistakes",
    description: "Validation, metrics, preprocessing, and deployment pitfalls.",
    href: "/mistakes",
    icon: AlertTriangle,
    accent: "amber" as const,
  },
  {
    title: "Comparison Tables",
    description: "Algorithms, metrics, optimization, and generation comparisons.",
    href: "/comparisons",
    icon: Table2,
    accent: "violet" as const,
  },
];

export default function HomePage() {
  const pathPreview = learningPaths.slice(0, 3);
  const techniquePreview = techniques.filter((t) =>
    ["linear-regression", "transformer", "cross-validation", "quantization"].includes(t.id)
  );

  return (
    <>
      <HeroSection
        title="AI/ML Atlas"
        subtitle="A practical knowledge map for understanding, comparing, and deploying machine learning techniques."
        primaryCta={{ label: "Start Here", href: "/start-here" }}
        secondaryCta={{ label: "Learning Paths", href: "/paths" }}
      />

      {/* What this atlas is for */}
      <section className="section-padding border-b border-atlas-border/30">
        <PageContainer narrow>
          <SectionHeader
            title="What this atlas is for"
            subtitle="AI/ML is filled with acronyms, algorithms, pipeline stages, math ideas, and deployment techniques. This site helps you understand where each concept fits, why it exists, what problem it solves, and what trade-offs it carries—not just what the acronym stands for."
          />
          <div className="grid gap-4 sm:grid-cols-3 text-center text-sm">
            <div className="glass-card p-4">
              <p className="font-semibold text-cyan-400">Learning Paths</p>
              <p className="mt-1 text-slate-500">Guided routes</p>
            </div>
            <div className="glass-card p-4">
              <p className="font-semibold text-violet-400">Knowledge Maps</p>
              <p className="mt-1 text-slate-500">Generations & pipeline</p>
            </div>
            <div className="glass-card p-4">
              <p className="font-semibold text-emerald-400">Concept Cards</p>
              <p className="mt-1 text-slate-500">Searchable depth</p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* How to use */}
      <section className="section-padding border-b border-atlas-border/30 bg-atlas-surface/20">
        <PageContainer>
          <SectionHeader
            title="How to use the atlas"
            subtitle="Four modes—pick the one that matches your question."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {usageModes.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="glass-card block p-4 transition hover:border-cyan-500/40"
              >
                <Compass className="h-5 w-5 text-cyan-400" />
                <h3 className="mt-3 font-semibold text-white">{m.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{m.desc}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-center text-sm">
            <Link href="/how-to-use" className="text-cyan-400 hover:text-cyan-300">
              Full guide: How to Use the Atlas →
            </Link>
          </p>
        </PageContainer>
      </section>

      {/* Learning paths preview */}
      <section className="section-padding border-b border-atlas-border/30">
        <PageContainer>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <SectionHeader
              title="Learning Paths"
              subtitle="Guided sequences—what to learn first and what comes next."
              className="mb-0"
            />
            <Link href="/paths" className="text-sm text-cyan-400 hover:text-cyan-300">
              All paths →
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {pathPreview.map((path) => (
              <LearningPathCard key={path.id} path={path} compact />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Generations */}
      <section className="section-padding border-b border-atlas-border/30 bg-atlas-surface/20">
        <PageContainer>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <SectionHeader
              title="AI Generations"
              subtitle="Gen 1 Classical ML · Gen 2 Deep Networks · Gen 3 Transformers & Modern AI"
              className="mb-0"
            />
            <Link href="/generations" className="text-sm text-cyan-400 hover:text-cyan-300">
              Compare generations →
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {generations.map((gen, i) => (
              <GenerationCard key={gen.id} generation={gen} index={i} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Pipeline */}
      <section className="section-padding border-b border-atlas-border/30">
        <PageContainer>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <SectionHeader
              title="ML Pipeline"
              subtitle="The backbone—fourteen stages from problem definition to monitoring."
              className="mb-0"
            />
            <Link href="/pipeline" className="text-sm text-cyan-400 hover:text-cyan-300">
              Full pipeline →
            </Link>
          </div>
          <PipelineTimeline stages={pipelineStages} limit={6} />
        </PageContainer>
      </section>

      {/* Technique library */}
      <section className="section-padding border-b border-atlas-border/30 bg-atlas-surface/20">
        <PageContainer>
          <SectionHeader
            title="Technique Library"
            subtitle="Search individual algorithms, metrics, preprocessing steps, tuning methods, and LLM concepts. Each card links pipeline stage, generation, math, trade-offs, and depth tabs (Quick → Intuition → Technical → Math → Practical → Deploy)."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {techniquePreview.map((t) => (
              <TechniqueCard key={t.id} technique={t} />
            ))}
          </div>
          <p className="mt-6 text-center">
            <Link
              href="/techniques"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-600/20 border border-cyan-500/30 px-5 py-2.5 text-sm font-medium text-cyan-300 hover:bg-cyan-600/30"
            >
              <Library className="h-4 w-4" />
              Browse & filter all techniques
            </Link>
          </p>
        </PageContainer>
      </section>

      {/* Applied */}
      <section className="section-padding border-b border-atlas-border/30">
        <PageContainer>
          <SectionHeader
            title="Applied areas"
            subtitle="Connect concepts to evaluation, edge deployment, modern AI, and production lifecycle."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {appliedAreas.map((a) => (
              <FeatureCard key={a.href} {...a} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Decide */}
      <section className="section-padding">
        <PageContainer>
          <SectionHeader
            title="Decision support"
            subtitle="Choose methods by scenario—compare options, avoid pitfalls, read comparison tables."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {decideAreas.map((d) => (
              <FeatureCard key={d.href} {...d} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/start-here" className="text-slate-400 hover:text-white">
              New here? Start Here
            </Link>
            <span className="text-slate-700">·</span>
            <Link href="/math" className="text-slate-400 hover:text-white">
              Math Foundations
            </Link>
            <span className="text-slate-700">·</span>
            <Link href="/glossary" className="text-slate-400 hover:text-white">
              Glossary
            </Link>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
