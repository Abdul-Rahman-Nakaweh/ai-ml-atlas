import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

const STEPS = [
  { label: "Query", fill: c.accentDim, stroke: c.accent },
  { label: "Retriever", fill: c.negativeDim, stroke: c.negative },
  { label: "Docs", fill: c.positiveDim, stroke: c.positive },
  { label: "Generator", fill: c.accentDim, stroke: c.accent },
  { label: "Answer", fill: c.positiveDim, stroke: c.positive },
];

export function RAGDiagram({ caption }: { caption?: string }) {
  const boxW = 52;
  const gap = 10;
  const startX = 12;
  const totalW = startX * 2 + STEPS.length * boxW + (STEPS.length - 1) * gap;

  return (
    <VisualFigure
      caption={
        caption ??
        "RAG retrieves relevant passages from an external corpus, then conditions a generator on those documents to produce a grounded answer."
      }
      title="Retrieval-augmented generation pipeline"
    >
      <DiagramSvg viewBox={`0 0 ${totalW} 108`} minWidth={300}>
        <text x={totalW / 2} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Retrieve context → generate answer
        </text>
        <defs>
          <marker id="ragArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        {STEPS.map((step, i) => {
          const x = startX + i * (boxW + gap);
          return (
            <g key={step.label}>
              <rect x={x} y={32} width={boxW} height={32} rx={5} fill={step.fill} stroke={step.stroke} strokeWidth={1} />
              <text x={x + boxW / 2} y={52} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
                {step.label}
              </text>
              {i < STEPS.length - 1 && (
                <line
                  x1={x + boxW + 2}
                  y1={48}
                  x2={x + boxW + gap - 2}
                  y2={48}
                  stroke={c.arrow}
                  strokeWidth={1.5}
                  markerEnd="url(#ragArrow)"
                />
              )}
            </g>
          );
        })}
        <text x={totalW / 2} y={92} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          External knowledge grounds the response
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
