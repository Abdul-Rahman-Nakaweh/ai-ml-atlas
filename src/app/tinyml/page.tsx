import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { InfoCallout } from "@/components/InfoCallout";
import { ComparisonTable } from "@/components/ComparisonTable";

export const metadata = {
  title: "TinyML / Embedded ML | AI/ML Atlas",
  description: "Microcontroller ML constraints, model choices, optimization, and deployment verification.",
};

const constraints = [
  { name: "Latency", desc: "Inference must complete within real-time deadlines (control loops, wake-word, etc.)." },
  { name: "Flash", desc: "Program storage limits total firmware including model weights and code." },
  { name: "SRAM", desc: "Runtime RAM for activations, buffers, and stack—often the tightest bottleneck." },
  { name: "Firmware size", desc: "Total binary size affects OTA updates and manufacturing cost." },
  { name: "Stack/heap", desc: "Static allocation is preferred; dynamic allocation may be disallowed on MCUs." },
  { name: "Power / energy", desc: "Battery devices need low-duty-cycle inference and sleep between runs." },
  { name: "Numeric precision", desc: "int8/float16 quantization changes outputs—must be validated." },
];

const modelTradeoffs = [
  { model: "k-NN", note: "Can require high memory—stores training samples on device" },
  { model: "Decision Tree", note: "Fast inference but tree depth increases flash size" },
  { model: "Linear SVM", note: "Compact weights; less flexible than nonlinear models" },
  { model: "Random Forest", note: "More robust; multiple trees increase size" },
  { model: "Small neural nets", note: "Powerful but need TFLM/embedded NN tooling and careful sizing" },
];

export default function TinyMLPage() {
  return (
    <>
      <HeroSection
        title="TinyML / Embedded ML"
        subtitle="When the deployment target is a microcontroller—not a cloud GPU."
        description="Accuracy alone is not enough. Latency, memory, firmware size, power, and prediction parity between Python, exported C, and the device determine whether a model is truly deployable."
      />

      <section className="section-padding">
        <PageContainer>
          <InfoCallout variant="warning" title="Why deployment verification matters">
            Python training predictions often differ from exported C or on-device inference due to quantization, preprocessing differences, or compiler optimizations. Compare sample-by-sample across Python → exported C → microcontroller before trusting field performance.
          </InfoCallout>

          <div className="mt-10">
            <SectionHeader title="What is TinyML?" />
            <p className="max-w-3xl text-slate-400 leading-relaxed">
              TinyML runs machine learning on microcontrollers with severe constraints—typically kilobytes to low megabytes of RAM, limited flash, and milliwatt power budgets. Unlike cloud ML, you cannot assume abundant memory, floating-point speed, or easy model updates. Hardware-aware model selection should start early, not after training a large model in Python.
            </p>
          </div>

          <div className="mt-12">
            <SectionHeader title="Embedded constraints" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {constraints.map((c) => (
                <div key={c.name} className="glass-card p-4">
                  <h3 className="font-semibold text-cyan-300">{c.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <SectionHeader title="Model choices & trade-offs" />
            <ComparisonTable
              headers={["Model family", "Embedded consideration"]}
              rows={modelTradeoffs.map((m) => ({
                label: m.model,
                cells: [m.note],
              }))}
            />
          </div>

          <div className="mt-12">
            <SectionHeader title="Optimization methods" />
            <ul className="grid gap-3 sm:grid-cols-2 text-sm text-slate-400">
              {[
                "Quantization (int8 weights/activations)",
                "Pruning sparse weights",
                "Feature reduction and PCA before inference",
                "Prototype selection for k-NN (reduce stored samples)",
                "Resource-aware hyperparameter tuning (tree depth, forest size)",
              ].map((item) => (
                <li key={item} className="glass-card px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div>
              <SectionHeader title="Deployment verification" className="mb-4" />
              <ol className="space-y-2 text-sm text-slate-400">
                <li>1. Compare Python predictions on a fixed test set</li>
                <li>2. Compare exported C (or TFLM) predictions on the same inputs</li>
                <li>3. Compare microcontroller predictions with identical preprocessing</li>
                <li>4. Use sample-by-sample matching; investigate any mismatch</li>
              </ol>
            </div>
            <div>
              <SectionHeader title="Benchmarking checklist" className="mb-4" />
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Repeated inference timing (avg / min / max / std if possible)</li>
                <li>• Average time per sample at operational batch size</li>
                <li>• Firmware size and model/header file size</li>
                <li>• Static RAM and peak RAM during inference</li>
                <li>• Flash usage and energy per inference (if measurable)</li>
              </ul>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
