import Link from "next/link";
import {
  Layers,
  GitBranch,
  Library,
  Sigma,
  BookOpen,
  Cpu,
  Sparkles,
  BarChart3,
  Compass,
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { FeatureCard } from "@/components/FeatureCard";
import { GenerationCard } from "@/components/GenerationCard";
import { PipelineStageCard } from "@/components/PipelineStageCard";
import { TechniqueCard } from "@/components/TechniqueCard";
import { InfoCallout } from "@/components/InfoCallout";
import { generations } from "@/data/generations";
import { pipelineStages } from "@/data/pipelineStages";
import { techniques } from "@/data/techniques";

const features = [
  {
    title: "AI Generations",
    description: "Gen 1 classical ML, Gen 2 deep learning, Gen 3 transformers—how each era fits together.",
    href: "/generations",
    icon: Layers,
    accent: "emerald" as const,
  },
  {
    title: "ML Pipeline",
    description: "From problem definition through deployment and monitoring—the full workflow map.",
    href: "/pipeline",
    icon: GitBranch,
    accent: "cyan" as const,
  },
  {
    title: "Technique Library",
    description: "Searchable concept cards with trade-offs, math links, and pipeline placement.",
    href: "/techniques",
    icon: Library,
    accent: "violet" as const,
  },
  {
    title: "Math Foundations",
    description: "Connect vectors, probability, gradients, and attention to the techniques that use them.",
    href: "/math",
    icon: Sigma,
    accent: "cyan" as const,
  },
  {
    title: "Glossary",
    description: "Quick-recall acronym cards with context and related concepts.",
    href: "/glossary",
    icon: BookOpen,
    accent: "amber" as const,
  },
  {
    title: "TinyML / Embedded ML",
    description: "Memory, latency, and verification constraints for microcontroller deployment.",
    href: "/tinyml",
    icon: Cpu,
    accent: "emerald" as const,
  },
  {
    title: "LLM & Modern AI",
    description: "Transformers, RAG, agents, fine-tuning, and Gen 3 deployment considerations.",
    href: "/llm",
    icon: Sparkles,
    accent: "violet" as const,
  },
  {
    title: "Evaluation & Validation",
    description: "Metrics, splits, and common mistakes—why accuracy alone is not enough.",
    href: "/evaluation",
    icon: BarChart3,
    accent: "cyan" as const,
  },
];

const lenses = [
  { name: "Generation", desc: "Classical ML → Deep Learning → Transformers" },
  { name: "Pipeline stage", desc: "Where a technique sits in the workflow" },
  { name: "Purpose", desc: "Classification, regression, retrieval, embedded, etc." },
  { name: "Math foundation", desc: "Probability, gradients, distance, attention" },
  { name: "Deployment context", desc: "Cloud, mobile, API, or TinyML constraints" },
];

export default function HomePage() {
  const previewTechniques = techniques.slice(0, 4);
  const previewStages = pipelineStages.slice(0, 3);

  return (
    <>
      <HeroSection
        title="AI/ML Atlas"
        subtitle="A practical knowledge map for understanding, comparing, and deploying machine learning techniques."
        description="AI/ML Atlas organizes artificial intelligence concepts by generation, pipeline stage, purpose, math foundation, and deployment context so techniques are understood in relation to the full system."
        primaryCta={{ label: "Explore Generations", href: "/generations" }}
        secondaryCta={{ label: "Browse Techniques", href: "/techniques" }}
      />

      <section className="section-padding border-b border-atlas-border/30">
        <PageContainer>
          <SectionHeader
            title="Why AI/ML feels overwhelming"
            subtitle="The field is dense with acronyms, overlapping techniques, and hype. Without structure, it is easy to apply methods blindly or confuse tools with understanding."
          />
          <InfoCallout variant="tip" title="Why this exists">
            AI/ML Atlas exists to help you understand the role, purpose, trade-offs, and connections behind each concept—not just memorize definitions. Every technique is placed in context: which pipeline stage it belongs to, which generation it emerged from, what math supports it, and when it should (or should not) be used.
          </InfoCallout>
        </PageContainer>
      </section>

      <section className="section-padding border-b border-atlas-border/30 bg-atlas-surface/20">
        <PageContainer>
          <SectionHeader
            title="The Atlas organizes AI/ML by five lenses"
            subtitle="Use these lenses together to build a mental map instead of isolated flashcards."
            align="center"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {lenses.map((lens) => (
              <div
                key={lens.name}
                className="glass-card p-4 text-center transition hover:border-cyan-500/30"
              >
                <Compass className="mx-auto h-6 w-6 text-cyan-400" />
                <h3 className="mt-3 font-semibold text-white">{lens.name}</h3>
                <p className="mt-1 text-xs text-slate-400">{lens.desc}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="section-padding border-b border-atlas-border/30">
        <PageContainer>
          <SectionHeader title="Explore the atlas" subtitle="Jump to the section that matches your current question." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <FeatureCard key={f.href} {...f} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="section-padding border-b border-atlas-border/30 bg-atlas-surface/20">
        <PageContainer>
          <div className="flex items-end justify-between gap-4 mb-8">
            <SectionHeader
              title="ML Pipeline preview"
              subtitle="Fourteen stages from problem definition to monitoring."
              className="mb-0"
            />
            <Link href="/pipeline" className="shrink-0 text-sm text-cyan-400 hover:text-cyan-300">
              View full pipeline →
            </Link>
          </div>
          <div className="space-y-4">
            {previewStages.map((stage) => (
              <PipelineStageCard key={stage.id} stage={stage} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="section-padding border-b border-atlas-border/30">
        <PageContainer>
          <div className="flex items-end justify-between gap-4 mb-8">
            <SectionHeader
              title="AI Generations preview"
              subtitle="Three eras of machine learning—and what stayed the same."
              className="mb-0"
            />
            <Link href="/generations" className="shrink-0 text-sm text-cyan-400 hover:text-cyan-300">
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

      <section className="section-padding border-b border-atlas-border/30 bg-atlas-surface/20">
        <PageContainer>
          <div className="flex items-end justify-between gap-4 mb-8">
            <SectionHeader
              title="Technique library preview"
              subtitle="Expandable concept cards—click any card for full detail."
              className="mb-0"
            />
            <Link href="/techniques" className="shrink-0 text-sm text-cyan-400 hover:text-cyan-300">
              Search all techniques →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {previewTechniques.map((t) => (
              <TechniqueCard key={t.id} technique={t} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="section-padding">
        <PageContainer narrow>
          <SectionHeader
            title="How to use this atlas"
            subtitle="A suggested path for building structured understanding."
            align="center"
          />
          <ol className="space-y-4">
            {[
              "Start with AI Generations to see how classical ML, deep learning, and transformers relate.",
              "Understand the ML Pipeline so every technique has a place in the workflow.",
              "Explore the Technique Library with filters for generation, stage, and purpose.",
              "Use the Glossary for quick recall of acronyms and terms.",
              "Connect terms to Math Foundations and deployment context (TinyML, MLOps, LLM pages).",
            ].map((step, i) => (
              <li
                key={step}
                className="flex gap-4 glass-card p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-sm font-bold text-cyan-400">
                  {i + 1}
                </span>
                <span className="text-slate-300">{step}</span>
              </li>
            ))}
          </ol>
        </PageContainer>
      </section>
    </>
  );
}
