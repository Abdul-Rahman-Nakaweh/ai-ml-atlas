import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCallout } from "@/components/InfoCallout";
import { mathFoundations, acronymMathMappings } from "@/data/mathFoundations";

export const metadata = {
  title: "Math Foundations | AI/ML Atlas",
  description: "Connect math ideas to AI/ML techniques—not a full textbook, but a practical map.",
};

export default function MathPage() {
  return (
    <>
      <HeroSection
        title="Math Foundations"
        subtitle="AI/ML reuses the same mathematical ideas across algorithms and generations."
        description="The goal is not to teach advanced math in full, but to connect foundations to techniques so acronyms become understandable."
      />

      <section className="section-padding">
        <PageContainer>
          <InfoCallout variant="tip" title="Intuition over memorization">
            When a technique is simplified here, treat it as intuition—you should still verify assumptions for your specific problem and dataset.
          </InfoCallout>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mathFoundations.map((m) => (
              <article key={m.id} className="glass-card p-5">
                <h3 className="text-lg font-semibold text-white">{m.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{m.description}</p>
                <p className="mt-3 text-sm">
                  <span className="font-medium text-cyan-400/80">Intuition: </span>
                  <span className="text-slate-300">{m.intuition}</span>
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.usedIn.map((u) => (
                    <span
                      key={u}
                      className="rounded-md bg-violet-500/10 px-2 py-0.5 text-xs text-violet-300/90"
                    >
                      {u}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="section-padding border-t border-atlas-border/30 bg-atlas-surface/20">
        <PageContainer>
          <SectionHeader
            title="The math behind the acronyms"
            subtitle="Quick bridges from technique names to underlying ideas."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {acronymMathMappings.map((row) => (
              <div
                key={row.technique}
                className="glass-card flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-semibold text-cyan-300">{row.technique}</span>
                <span className="text-sm text-slate-400 sm:text-right">{row.math}</span>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
