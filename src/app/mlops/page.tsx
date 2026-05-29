import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCallout } from "@/components/InfoCallout";

export const metadata = {
  title: "MLOps / Deployment Lifecycle | AI/ML Atlas",
  description: "How models become reliable production systems: versioning, deployment targets, and monitoring.",
};

const deploymentTargets = [
  { target: "API", note: "REST/gRPC services; batch or online inference" },
  { target: "Cloud", note: "Managed endpoints, autoscaling, GPU pools" },
  { target: "Local app", note: "Desktop inference with ONNX or native runtimes" },
  { target: "Mobile app", note: "TFLite, Core ML, on-device privacy" },
  { target: "Web app", note: "Client-side WASM or server-backed inference" },
  { target: "Embedded device", note: "C firmware, TFLM, strict memory limits" },
];

const monitoringAreas = [
  "Data drift — input distribution changes vs training",
  "Performance drift — accuracy or business metrics degrade",
  "Latency and throughput — SLA violations",
  "Failures — timeouts, OOM, NaN outputs",
  "Bias and fairness — subgroup performance gaps",
];

export default function MLOpsPage() {
  return (
    <>
      <HeroSection
        title="MLOps / Deployment Lifecycle"
        subtitle="How models become real systems—not just notebook accuracy."
      />

      <section className="section-padding">
        <PageContainer>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="glass-card p-6">
              <SectionHeader title="Versioning & reproducibility" className="mb-4" />
              <ul className="space-y-2 text-sm text-slate-400">
                <li><strong className="text-slate-300">Model versioning</strong> — track weights, configs, and export artifacts</li>
                <li><strong className="text-slate-300">Dataset versioning</strong> — tie models to exact training data snapshots</li>
                <li><strong className="text-slate-300">Reproducibility</strong> — seeds, library versions, preprocessing hashes</li>
                <li><strong className="text-slate-300">Documentation</strong> — intended use, limits, and known failure modes</li>
              </ul>
            </article>
            <article className="glass-card p-6">
              <SectionHeader title="Model updates" className="mb-4" />
              <p className="text-sm text-slate-400 leading-relaxed">
                Production models need retraining triggers, rollback plans, and A/B or shadow deployment when replacing versions. Treat updates as controlled releases—not ad hoc notebook exports.
              </p>
            </article>
          </div>

          <div className="mt-12">
            <SectionHeader title="Deployment targets" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {deploymentTargets.map((d) => (
                <div key={d.target} className="glass-card p-4">
                  <h3 className="font-semibold text-cyan-300">{d.target}</h3>
                  <p className="mt-1 text-sm text-slate-400">{d.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <SectionHeader title="Monitoring in production" />
            <ul className="grid gap-2 sm:grid-cols-2">
              {monitoringAreas.map((m) => (
                <li key={m} className="glass-card px-4 py-3 text-sm text-slate-400">
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <InfoCallout variant="warning" title="Safety and reliability">
              Define fallbacks when the model is uncertain or inputs are out of distribution. Log predictions for audit where appropriate. For high-stakes domains, combine ML with rules, human review, and continuous monitoring—not deployment-and-forget.
            </InfoCallout>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
