import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCallout } from "@/components/InfoCallout";

export const metadata = {
  title: "Evaluation & Validation | AI/ML Atlas",
  description: "Classification and regression metrics, validation strategies, and common evaluation mistakes.",
};

const classificationMetrics = [
  { name: "Confusion Matrix", desc: "TP, FP, TN, FN counts—foundation for other metrics." },
  { name: "Accuracy", desc: "Correct / total. Misleading when classes are imbalanced." },
  { name: "Precision", desc: "Of predicted positives, how many are true positives." },
  { name: "Recall", desc: "Of actual positives, how many were found (sensitivity)." },
  { name: "Specificity", desc: "Of actual negatives, how many were correctly rejected." },
  { name: "F1-score", desc: "Harmonic mean of precision and recall." },
  { name: "ROC-AUC", desc: "Ranking quality across thresholds; useful for imbalance." },
];

const regressionMetrics = [
  { name: "MAE", desc: "Mean absolute error—interpretable units." },
  { name: "MSE", desc: "Mean squared error—penalizes large errors." },
  { name: "RMSE", desc: "Root MSE—same units as target." },
  { name: "R²", desc: "Fraction of variance explained vs baseline mean." },
];

const validationStrategies = [
  "Train/test split",
  "Train / validation / test split",
  "Cross-validation",
  "Stratified cross-validation (classification)",
  "Nested cross-validation (tuning + honest evaluation)",
];

const commonMistakes = [
  "Data leakage from preprocessing or feature selection",
  "Tuning hyperparameters directly on the test set",
  "Ignoring class imbalance and reporting only accuracy",
  "Not fixing random seeds for reproducibility",
  "Not documenting preprocessing applied before split",
  "Choosing metrics that do not reflect real-world misclassification costs",
];

export default function EvaluationPage() {
  return (
    <>
      <HeroSection
        title="Evaluation & Validation"
        subtitle="Metrics and splits should match the problem context—not whatever is easiest to report."
      />

      <section className="section-padding">
        <PageContainer>
          <PageIntro
            title="Apply: Evaluation & Validation"
            what="Classification and regression metrics, validation strategies, leakage, and test discipline."
            why="A model is only useful if measured the right way for your risks and constraints."
            next={[
              { label: "Common Mistakes", href: "/mistakes" },
              { label: "Learning path", href: "/paths#evaluation" },
            ]}
          />
          <InfoCallout variant="warning" title="Accuracy is not always enough" className="mt-8">
            In fraud detection, medical screening, or rare-event prediction, missing a positive case may cost far more than a false alarm. Choose precision, recall, F1, or cost-weighted metrics accordingly.
          </InfoCallout>

          <div className="mt-10">
            <SectionHeader title="Classification metrics" />
            <div className="grid gap-3 sm:grid-cols-2">
              {classificationMetrics.map((m) => (
                <div key={m.name} className="glass-card p-4">
                  <h3 className="font-semibold text-cyan-300">{m.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <SectionHeader title="Regression metrics" />
            <div className="grid gap-3 sm:grid-cols-2">
              {regressionMetrics.map((m) => (
                <div key={m.name} className="glass-card p-4">
                  <h3 className="font-semibold text-emerald-300">{m.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <SectionHeader title="Validation strategies" className="mb-4" />
              <ul className="space-y-2 text-sm text-slate-400">
                {validationStrategies.map((v) => (
                  <li key={v} className="glass-card px-4 py-2">
                    {v}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeader title="Common mistakes" className="mb-4" />
              <ul className="space-y-2 text-sm text-slate-400">
                {commonMistakes.map((m) => (
                  <li key={m} className="flex gap-2 glass-card px-4 py-2">
                    <span className="text-amber-500">!</span> {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <SectionHeader
              title="Match evaluation to the problem"
              subtitle="A metric is a proxy for a real-world objective."
            />
            <p className="max-w-3xl text-slate-400 leading-relaxed">
              Before training, define what failure looks like in production: false alarms, missed detections, latency SLA breaches, or fairness across groups. Select metrics and validation splits that approximate those risks. Document them alongside the model version for reproducibility and MLOps handoff.
            </p>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
