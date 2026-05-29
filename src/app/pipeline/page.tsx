import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import { SectionHeader } from "@/components/SectionHeader";
import { PipelineStageCard } from "@/components/PipelineStageCard";
import { PipelineTimeline } from "@/components/PipelineTimeline";
import { InfoCallout } from "@/components/InfoCallout";
import { pipelineStages } from "@/data/pipelineStages";

export const metadata = {
  title: "ML Pipeline | AI/ML Atlas",
  description: "Visual map of the full machine learning workflow from problem definition to monitoring.",
};

export default function PipelinePage() {
  return (
    <>
      <HeroSection
        title="ML Pipeline"
        subtitle="The full machine learning workflow—from defining the problem to monitoring production."
        description="Each stage has a purpose in the system. Skipping or blurring stages (especially validation and deployment verification) is a common source of failure."
      />

      <section className="section-padding">
        <PageContainer>
          <PageIntro
            title="Knowledge map: ML Pipeline"
            what="Fourteen stages from problem definition through monitoring—each with techniques, mistakes, and before/after context."
            why="The pipeline organizes the atlas; most techniques belong to a specific stage."
            next={[
              { label: "Technique Library", href: "/techniques" },
              { label: "Evaluation", href: "/evaluation" },
            ]}
          />

          <div className="mt-8 mb-10 lg:hidden">
            <p className="mb-4 text-sm font-medium text-slate-400">Quick timeline</p>
            <PipelineTimeline stages={pipelineStages} />
          </div>

          <InfoCallout variant="warning" title="Data leakage reminder" className="mt-4">
            Preprocessing, feature selection, and tuning must not use information from the test set. The test set should remain unseen until final evaluation.
          </InfoCallout>

          <div className="mt-10 relative">
            <div className="absolute left-0 top-0 bottom-0 hidden w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/30 to-emerald-500/50 md:block md:left-0" />
            <div className="space-y-6 md:pl-8">
              {pipelineStages.map((stage) => (
                <PipelineStageCard key={stage.id} stage={stage} />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <SectionHeader
              title="Related concepts across stages"
              subtitle="The pipeline is a system—stages interact."
            />
            <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
              Problem definition drives metric choice in evaluation. Preprocessing choices must match at deployment.
              Model selection should consider optimization and monitoring constraints early—not after training completes.
            </p>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
