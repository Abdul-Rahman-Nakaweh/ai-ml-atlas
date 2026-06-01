import { cn } from "@/lib/utils";

/** Shared SVG palette for dark-mode educational diagrams */
export const visualColors = {
  grid: "#2a3548",
  text: "#94a3b8",
  textBright: "#e2e8f0",
  accent: "#38bdf8",
  accentDim: "rgba(56, 189, 248, 0.25)",
  positive: "#34d399",
  positiveDim: "rgba(52, 211, 153, 0.2)",
  negative: "#a78bfa",
  negativeDim: "rgba(167, 139, 250, 0.2)",
  warn: "#fbbf24",
  neutral: "#64748b",
  arrow: "#64748b",
} as const;

interface VisualFigureProps {
  caption: string;
  children: React.ReactNode;
  className?: string;
  /** Accessible title for the diagram */
  title?: string;
}

export function VisualFigure({ caption, children, className, title }: VisualFigureProps) {
  return (
    <figure
      className={cn(
        "rounded-lg border border-atlas-border/50 bg-atlas-surface/40 p-4 max-w-lg",
        className
      )}
      role="img"
      aria-label={title ?? caption}
    >
      <div className="w-full overflow-x-auto">{children}</div>
      <figcaption className="mt-3 text-xs leading-relaxed text-slate-500">{caption}</figcaption>
    </figure>
  );
}
