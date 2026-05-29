import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import { LearningPathCard, RelatedPaths } from "@/components/LearningPathCard";
import { learningPaths } from "@/data/learningPaths";
import { InfoCallout } from "@/components/InfoCallout";

export const metadata = {
  title: "Learning Paths | AI/ML Atlas",
  description: "Guided routes through AI/ML—from foundations to TinyML and transformers.",
};

export default function PathsPage() {
  return (
    <>
      <HeroSection
        title="Learning Paths"
        subtitle="Guided routes—what to learn first, what comes next, and why."
      />
      <section className="section-padding">
        <PageContainer>
          <PageIntro
            title="Layer 1: Learning Paths"
            what="Curated sequences with goals, prerequisites, common mistakes, and links to technique cards."
            why="Paths turn the atlas from a dictionary into a course-like map you can follow."
            next={[
              { label: "Technique Library", href: "/techniques" },
              { label: "ML Pipeline", href: "/pipeline" },
            ]}
          />

          <InfoCallout variant="tip" className="mt-8">
            Click any step on a path card, then open the full path below for the complete sequence and related paths.
          </InfoCallout>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {learningPaths.map((path) => (
              <div key={path.id} id={path.id} className="scroll-mt-24">
                <LearningPathCard path={path} />
                <div className="mt-4 glass-card p-4 text-sm">
                  <p className="font-medium text-slate-300">Full sequence</p>
                  <ol className="mt-2 list-decimal pl-5 space-y-1 text-slate-400">
                    {path.sequence.map((s) => (
                      <li key={s.label}>{s.label}</li>
                    ))}
                  </ol>
                  {path.commonMistakes.length > 0 && (
                    <>
                      <p className="mt-4 font-medium text-amber-400/80">Common mistakes on this path</p>
                      <ul className="mt-1 space-y-1 text-slate-400">
                        {path.commonMistakes.map((m) => (
                          <li key={m}>• {m}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p className="mt-4 text-xs text-slate-500">Related paths</p>
                  <div className="mt-2">
                    <RelatedPaths ids={path.relatedPathIds} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
