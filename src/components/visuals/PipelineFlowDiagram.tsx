import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

export function PipelineFlowDiagram({ caption }: { caption?: string }) {
  const stages = [
    "Problem",
    "Data",
    "Preprocess",
    "Features",
    "Model",
    "Train",
    "Validate",
    "Deploy",
  ];
  const boxW = 44;
  const gap = 6;
  const startX = 12;
  const totalW = startX * 2 + stages.length * boxW + (stages.length - 1) * gap;

  return (
    <VisualFigure
      caption={
        caption ??
        "Sequential ML workflow: each stage produces artifacts consumed by the next; errors in early stages propagate downstream."
      }
      title="Machine learning pipeline flow"
    >
      <DiagramSvg viewBox={`0 0 ${totalW} 72`} minWidth={320}>
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        {stages.map((label, i) => {
          const x = startX + i * (boxW + gap);
          return (
            <g key={label}>
              {i > 0 && (
                <line
                  x1={x - gap}
                  y1={36}
                  x2={x - 2}
                  y2={36}
                  stroke={c.arrow}
                  strokeWidth={1}
                  markerEnd="url(#arrowhead)"
                />
              )}
              <rect x={x} y={22} width={boxW} height={28} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
              <text x={x + boxW / 2} y={40} textAnchor="middle" fill={c.textBright} fontSize={6.5} fontFamily={font}>
                {label}
              </text>
            </g>
          );
        })}
      </DiagramSvg>
    </VisualFigure>
  );
}
