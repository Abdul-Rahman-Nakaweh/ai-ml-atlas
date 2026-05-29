import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import { commonMistakes } from "@/data/commonMistakes";
import Link from "next/link";

export const metadata = {
  title: "Common Mistakes | AI/ML Atlas",
};

export default function MistakesPage() {
  return (
    <>
      <HeroSection
        title="Common Mistakes"
        subtitle="Frequent pitfalls—and better practices that match real ML workflow."
      />
      <section className="section-padding">
        <PageContainer>
          <PageIntro
            title="Learn what not to do"
            what="Mistakes in validation, metrics, preprocessing, deployment, and communication."
            why="Many project failures are process errors, not wrong algorithms."
            next={[
              { label: "Evaluation page", href: "/evaluation" },
              { label: "Decision Guides", href: "/guides" },
            ]}
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {commonMistakes.map((m) => (
              <article key={m.id} className="glass-card p-5">
                <h3 className="font-semibold text-amber-300/90">{m.mistake}</h3>
                <p className="mt-2 text-sm text-slate-400">
                  <span className="font-medium text-slate-300">Why it matters: </span>
                  {m.whyItMatters}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  <span className="font-medium text-emerald-400/80">Better practice: </span>
                  {m.betterPractice}
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  Related: {m.relatedConcepts.join(" · ")}
                </p>
                {m.techniqueIds && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.techniqueIds.map((tid) => (
                      <Link
                        key={tid}
                        href={`/techniques#${tid}`}
                        className="text-xs text-cyan-400 hover:text-cyan-300"
                      >
                        {tid} →
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
