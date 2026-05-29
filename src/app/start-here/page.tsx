import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import { LearningPathCard } from "@/components/LearningPathCard";
import { learningPaths } from "@/data/learningPaths";

export const metadata = {
  title: "Start Here | AI/ML Atlas",
  description: "Where to begin your guided tour of the AI/ML Atlas.",
};

export default function StartHerePage() {
  const starter = learningPaths.filter((p) =>
    ["beginner-ml", "classical-ml", "evaluation"].includes(p.id)
  );

  return (
    <>
      <HeroSection
        title="Start Here"
        subtitle="A guided entry point—not a wall of definitions."
      />
      <section className="section-padding">
        <PageContainer narrow>
          <PageIntro
            title="Begin with structure, not acronyms"
            what="This page routes you into learning paths, the ML pipeline map, and the technique library in a sensible order."
            why="AI/ML only feels random when concepts are disconnected. The atlas is organized so each idea has a place, a purpose, and neighbors."
            next={[
              { label: "How to Use the Atlas", href: "/how-to-use" },
              { label: "Learning Paths", href: "/paths" },
              { label: "ML Pipeline", href: "/pipeline" },
            ]}
          />

          <div className="mt-10 space-y-4">
            <h2 className="text-lg font-semibold text-white">Recommended first paths</h2>
            {starter.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>

          <div className="mt-12 glass-card p-6">
            <h2 className="font-semibold text-white">Three layers of the atlas</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <strong className="text-cyan-400">1. Learning Paths</strong> — guided sequences (what to learn first).
              </li>
              <li>
                <strong className="text-violet-400">2. Knowledge Maps</strong> — generations, pipeline, math lenses.
              </li>
              <li>
                <strong className="text-emerald-400">3. Concept Cards</strong> — searchable techniques and glossary terms.
              </li>
            </ul>
            <Link href="/how-to-use" className="mt-4 inline-block text-sm text-cyan-400 hover:text-cyan-300">
              Read how to use all three →
            </Link>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
