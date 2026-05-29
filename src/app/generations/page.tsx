import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { GenerationCard } from "@/components/GenerationCard";
import { InfoCallout } from "@/components/InfoCallout";
import { ComparisonTable } from "@/components/ComparisonTable";
import { generations, generationComparisons } from "@/data/generations";

export const metadata = {
  title: "AI Generations | AI/ML Atlas",
  description: "Gen 1 classical ML, Gen 2 deep learning, and Gen 3 transformers compared.",
};

export default function GenerationsPage() {
  return (
    <>
      <HeroSection
        title="AI Generations"
        subtitle="Three major eras of machine learning—and the threads that connect them."
        description="Despite different architectures and scale, every generation still relies on data, optimization, loss minimization, and honest evaluation."
      />

      <section className="section-padding">
        <PageContainer>
          <div className="grid gap-8 lg:grid-cols-1">
            {generations.map((gen, i) => (
              <GenerationCard key={gen.id} generation={gen} index={i} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="section-padding border-t border-atlas-border/30 bg-atlas-surface/20">
        <PageContainer>
          <SectionHeader
            title="What changed between generations"
            subtitle="Understanding evolution helps you pick the right tool—not just the newest one."
          />

          <div className="grid gap-6 lg:grid-cols-2 mb-10">
            <InfoCallout variant="info" title="Gen 1 → Gen 2">
              <ul className="list-disc pl-4 space-y-1">
                {generationComparisons.gen1ToGen2.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InfoCallout>
            <InfoCallout variant="info" title="Gen 2 → Gen 3">
              <ul className="list-disc pl-4 space-y-1">
                {generationComparisons.gen2ToGen3.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InfoCallout>
          </div>

          <InfoCallout variant="tip" title="What stayed the same">
            <ul className="list-disc pl-4 space-y-1">
              {generationComparisons.stayedTheSame.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </InfoCallout>

          <div className="mt-12">
            <SectionHeader title="Quick comparison" />
            <ComparisonTable
              headers={["Aspect", "Gen 1", "Gen 2", "Gen 3"]}
              rows={[
                {
                  label: "Core mechanism",
                  cells: [
                    "Features + classical algorithms",
                    "Learned representations (layers)",
                    "Attention + scale + pretraining",
                  ],
                },
                {
                  label: "Typical data",
                  cells: ["Tabular, engineered", "Images, audio, sequences", "Text, multimodal, documents"],
                },
                {
                  label: "Interpretability",
                  cells: ["Often high", "Often lower", "Often lowest at scale"],
                },
                {
                  label: "Deployment",
                  cells: ["Often easiest", "Moderate (GPU/edge)", "Often cloud-first; distillation for edge"],
                },
                {
                  label: "Evaluation",
                  cells: ["Clear metrics", "Task metrics + tuning", "Harder: hallucination, safety, RAG quality"],
                },
              ]}
            />
          </div>
        </PageContainer>
      </section>
    </>
  );
}
