import type { VisualAidType } from "@/types/visual";
import { VisualAidRenderer } from "./registry";

interface VisualIntuitionSectionProps {
  visualAid: VisualAidType;
  caption?: string;
}

/** Formal "Visual Intuition" block for Concept Library and Learn page */
export function VisualIntuitionSection({ visualAid, caption }: VisualIntuitionSectionProps) {
  return (
    <section className="rounded-lg border border-atlas-border/40 bg-atlas-bg/40 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
        Visual Intuition
      </h3>
      <VisualAidRenderer type={visualAid} caption={caption} />
    </section>
  );
}
