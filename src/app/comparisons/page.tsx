import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import { ComparisonTable } from "@/components/ComparisonTable";
import { comparisonSections } from "@/data/comparisons";

export const metadata = {
  title: "Comparisons | AI/ML Atlas",
};

export default function ComparisonsPage() {
  return (
    <>
      <HeroSection
        title="Comparison Tables"
        subtitle="Side-by-side views—algorithms, metrics, deployment, optimization, generations."
      />
      <section className="section-padding">
        <PageContainer>
          <PageIntro
            title="Compare before you commit"
            what="Tables for classical ML, metrics, deployment stages, optimization, and AI generations."
            why="Choosing methods is easier when trade-offs are visible in one scan."
            next={[{ label: "Decision Guides", href: "/guides" }]}
          />

          <div className="mt-10 space-y-12">
            {comparisonSections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                {section.description && (
                  <p className="mt-2 text-sm text-slate-400">{section.description}</p>
                )}
                <div className="mt-4">
                  <ComparisonTable headers={section.headers} rows={section.rows} />
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
