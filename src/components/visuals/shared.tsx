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

/** Consistent visual card wrapper — padding, border, caption below diagram */
export function VisualFigure({ caption, children, className, title }: VisualFigureProps) {
  return (
    <figure
      className={cn(
        "rounded-lg border border-atlas-border/50 bg-atlas-surface/40 p-4 sm:p-5 w-full max-w-xl",
        className
      )}
      role="img"
      aria-label={title ?? caption}
    >
      <div className="w-full overflow-x-auto overflow-y-visible py-1 px-1">{children}</div>
      <figcaption className="mt-3 text-xs leading-relaxed text-slate-500 border-t border-atlas-border/30 pt-3">
        {caption}
      </figcaption>
    </figure>
  );
}

/** @deprecated Alias for VisualFigure */
export const VisualCard = VisualFigure;

interface DiagramSvgProps {
  viewBox: string;
  children: React.ReactNode;
  minWidth?: number;
  className?: string;
}

/** Responsive SVG with safe margins and no clipping */
export function DiagramSvg({ viewBox, children, minWidth = 240, className }: DiagramSvgProps) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className={cn("w-full h-auto block", className)}
      style={{ minWidth, maxHeight: "none" }}
      aria-hidden
    >
      {children}
    </svg>
  );
}
