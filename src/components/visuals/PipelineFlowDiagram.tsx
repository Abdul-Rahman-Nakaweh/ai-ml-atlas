import { VisualFigure, visualColors as c } from "./shared";

const STAGES = [
  "Problem",
  "Data",
  "Preprocess",
  "Features",
  "Model",
  "Train",
  "Validate",
  "Deploy",
];

export function PipelineFlowDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Sequential ML workflow: each stage produces artifacts consumed by the next; errors in early stages propagate downstream."
      }
      title="Machine learning pipeline flow"
    >
      <svg viewBox="0 0 400 72" className="w-full min-w-[320px] h-auto" aria-hidden>
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        {STAGES.slice(0, -1).map((_, i) => (
          <line
            key={`line-${i}`}
            x1={8 + i * 48 + 42}
            y1={34}
            x2={8 + (i + 1) * 48 - 2}
            y2={34}
            stroke={c.arrow}
            strokeWidth={1}
            markerEnd="url(#arrowhead)"
          />
        ))}
        {STAGES.map((label, i) => {
          const x = 8 + i * 48;
          return (
            <g key={label}>
              <rect
                x={x}
                y={20}
                width={42}
                height={28}
                rx={4}
                fill={c.accentDim}
                stroke={c.accent}
                strokeWidth={1}
              />
              <text
                x={x + 21}
                y={38}
                textAnchor="middle"
                fill={c.textBright}
                fontSize={7}
                fontFamily="system-ui, sans-serif"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </VisualFigure>
  );
}
