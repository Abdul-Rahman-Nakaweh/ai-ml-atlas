import type { VisualAidType } from "@/types/visual";
import { VisualAidRenderer } from "./registry";

interface VisualIntuitionSectionProps {
  visualType: VisualAidType;
  /** @deprecated Use visualType */
  visualAid?: VisualAidType;
  caption?: string;
}

/** Formal "Visual Intuition" block for Concept Library and Learn page */
export function VisualIntuitionSection({
  visualType,
  visualAid,
  caption,
}: VisualIntuitionSectionProps) {
  const type = visualType ?? visualAid;
  if (!type) return null;

  return (
    <section className="rounded-lg border border-atlas-border/40 bg-atlas-bg/40 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
        Visual Intuition
      </h3>
      <VisualAidRenderer type={type} caption={caption} />
    </section>
  );
}
