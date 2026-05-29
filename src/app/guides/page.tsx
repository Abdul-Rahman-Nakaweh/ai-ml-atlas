import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { StickyTOC } from "@/components/StickyTOC";
import { ComparisonTable } from "@/components/ComparisonTable";
import { decisionGuides } from "@/data/decisionGuides";
import { commonMistakes } from "@/data/commonMistakes";
import { comparisonSections } from "@/data/comparisons";

const guideToc = [
  { id: "model-selection", label: "Model Selection" },
  { id: "evaluation", label: "Evaluation Metrics" },
  { id: "deployment", label: "Deployment" },
  { id: "common-errors", label: "Common Errors" },
  { id: "comparisons", label: "Comparison Tables" },
];

export const metadata = {
  title: "Guides | AI/ML Atlas",
  description: "Formal decision support for model selection, evaluation, and deployment.",
};

export default function GuidesPage() {
  const modelGuides = decisionGuides.filter((g) =>
    ["tabular-data", "embedded-tinyml", "many-features", "text-understanding", "interpretability"].includes(g.id)
  );
  const evalGuides = decisionGuides.filter((g) => g.id === "imbalanced-data");
  const deployGuides = decisionGuides.filter((g) =>
    ["embedded-tinyml", "deployment-efficiency"].includes(g.id)
  );

  return (
    <div className="border-b border-atlas-border/30">
      <PageContainer className="py-12 md:py-16 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500/80">Guides</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Practical Decision Support</h1>
        <p className="mt-4 text-slate-400 leading-relaxed">
          Formal scenario-based guidance for selecting methods, metrics, and deployment strategies.
          For conceptual background, consult the{" "}
          <Link href="/learn" className="text-cyan-400 hover:text-cyan-300">
            Learn
          </Link>{" "}
          sequence first.
        </p>
      </PageContainer>

      <PageContainer className="pb-24">
        <div className="flex gap-12">
          <StickyTOC items={guideToc} title="Guide sections" />
          <div className="flex-1 max-w-4xl space-y-16">
            <nav className="lg:hidden flex flex-wrap gap-2 mb-8">
              {guideToc.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="text-xs rounded-full border border-atlas-border/60 px-3 py-1 text-slate-400"
                >
                  {t.label}
                </a>
              ))}
            </nav>

            <section id="model-selection" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-white">Model Selection Guide</h2>
              <p className="mt-4 text-slate-400 leading-relaxed max-w-prose">
                If the data are tabular and interpretability is required, begin with linear models
                or decision trees before proceeding to more complex ensembles. If the relationship
                is strongly nonlinear and data volume permits, compare tree ensembles or neural
                networks under cross-validation.
              </p>
              <div className="mt-8 space-y-6">
                {modelGuides.map((g) => (
                  <GuideBlock key={g.id} guide={g} />
                ))}
              </div>
            </section>

            <section id="evaluation" className="scroll-mt-24 border-t border-atlas-border/40 pt-16">
              <h2 className="text-2xl font-bold text-white">Evaluation Metric Guide</h2>
              <p className="mt-4 text-slate-400 leading-relaxed max-w-prose">
                Metric selection should reflect the task objective, class distribution, risk level,
                and cost of false positives or false negatives. If the dataset is imbalanced,
                accuracy should be supplemented with precision, recall, F1-score, ROC-AUC, and the
                confusion matrix.
              </p>
              <div className="mt-8 space-y-6">
                {evalGuides.map((g) => (
                  <GuideBlock key={g.id} guide={g} />
                ))}
              </div>
            </section>

            <section id="deployment" className="scroll-mt-24 border-t border-atlas-border/40 pt-16">
              <h2 className="text-2xl font-bold text-white">Deployment Guide</h2>
              <p className="mt-4 text-slate-400 leading-relaxed max-w-prose">
                If deployment is constrained by memory, evaluate model size, firmware size, SRAM
                use, and inference latency in addition to accuracy. Conduct sample-level verification
                between the training framework, exported runtime, and target device.
              </p>
              <div className="mt-8 space-y-6">
                {deployGuides.map((g) => (
                  <GuideBlock key={g.id} guide={g} />
                ))}
              </div>
            </section>

            <section id="common-errors" className="scroll-mt-24 border-t border-atlas-border/40 pt-16">
              <h2 className="text-2xl font-bold text-white">Common Errors</h2>
              <div className="mt-8 space-y-4">
                {commonMistakes.map((m) => (
                  <article key={m.id} className="border-l-2 border-amber-500/40 pl-5 py-2">
                    <h3 className="font-medium text-slate-200">{m.mistake}</h3>
                    <p className="mt-2 text-sm text-slate-400">
                      <span className="text-slate-500">Purpose of correction: </span>
                      {m.whyItMatters}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      <span className="text-slate-500">Recommended practice: </span>
                      {m.betterPractice}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section id="comparisons" className="scroll-mt-24 border-t border-atlas-border/40 pt-16">
              <h2 className="text-2xl font-bold text-white">Comparison Tables</h2>
              <div className="mt-8 space-y-10">
                {comparisonSections.map((s) => (
                  <div key={s.id}>
                    <h3 className="text-lg font-semibold text-slate-200">{s.title}</h3>
                    {s.description && (
                      <p className="mt-2 text-sm text-slate-500">{s.description}</p>
                    )}
                    <div className="mt-4">
                      <ComparisonTable headers={s.headers} rows={s.rows} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

function GuideBlock({
  guide,
}: {
  guide: (typeof decisionGuides)[0];
}) {
  return (
    <article className="rounded-xl border border-atlas-border/50 bg-atlas-surface/20 p-6">
      <h3 className="text-lg font-semibold text-white">{guide.title}</h3>
      <p className="mt-2 text-sm text-slate-400">{guide.situation}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm">
        <div>
          <p className="text-xs uppercase text-slate-500 font-semibold">Recommended</p>
          <ul className="mt-2 space-y-1 text-slate-400">
            {guide.recommended.map((r) => (
              <li key={r}>— {r}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-500 font-semibold">Avoid</p>
          <ul className="mt-2 space-y-1 text-slate-400">
            {guide.avoid.map((a) => (
              <li key={a}>— {a}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500">
        Key metrics: {guide.keyMetrics.join("; ")}
      </p>
    </article>
  );
}
