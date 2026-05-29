import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import { decisionGuides } from "@/data/decisionGuides";
export const metadata = {
  title: "Decision Guides | AI/ML Atlas",
  description: "Choose techniques based on your data, constraints, and goals.",
};

export default function GuidesPage() {
  return (
    <>
      <HeroSection
        title="Decision Guides"
        subtitle="Practical scenarios—what to try first, what to compare, what to avoid."
      />
      <section className="section-padding">
        <PageContainer>
          <PageIntro
            title="Layer: Decide"
            what="Situation-based recommendations—not hype-driven defaults."
            why="The right method depends on data type, imbalance, interpretability, and deployment limits."
            next={[
              { label: "Common Mistakes", href: "/mistakes" },
              { label: "Comparisons", href: "/comparisons" },
            ]}
          />

          <div className="mt-10 space-y-6">
            {decisionGuides.map((guide) => (
              <article key={guide.id} id={guide.id} className="glass-card scroll-mt-24 p-6">
                <h2 className="text-xl font-semibold text-white">{guide.title}</h2>
                <p className="mt-2 text-sm text-slate-400">
                  <span className="font-medium text-cyan-400/80">Situation: </span>
                  {guide.situation}
                </p>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-semibold uppercase text-emerald-400/80">
                      Recommended starting points
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm text-slate-400">
                      {guide.recommended.map((r) => (
                        <li key={r}>+ {r}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase text-violet-400/80">
                      Compare against
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm text-slate-400">
                      {guide.compareAgainst.map((c) => (
                        <li key={c}>↔ {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xs font-semibold uppercase text-amber-500/80">What to avoid</h3>
                  <ul className="mt-2 space-y-1 text-sm text-slate-400">
                    {guide.avoid.map((a) => (
                      <li key={a}>− {a}</li>
                    ))}
                  </ul>
                </div>
                <p className="mt-4 text-sm">
                  <span className="font-medium text-slate-400">Key metrics: </span>
                  <span className="text-slate-300">{guide.keyMetrics.join(" · ")}</span>
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Related: {guide.relatedConcepts.join(" · ")}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Add guides in{" "}
            <code className="text-cyan-400/80">src/data/decisionGuides.ts</code>
          </p>
        </PageContainer>
      </section>
    </>
  );
}
