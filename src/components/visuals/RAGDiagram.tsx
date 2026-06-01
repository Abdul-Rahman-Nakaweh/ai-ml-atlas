import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const STEPS = [
  { label: "Query", fill: c.accentDim, stroke: c.accent },
  { label: "Retriever", fill: c.negativeDim, stroke: c.negative },
  { label: "Docs", fill: c.positiveDim, stroke: c.positive },
  { label: "Generator", fill: c.accentDim, stroke: c.accent },
  { label: "Answer", fill: c.positiveDim, stroke: c.positive },
];

export function RAGDiagram({ caption }: { caption?: string }) {
  const boxW = 54;
  const gap = 12;
  const startX = 16;
  const totalW = STEPS.length * boxW + (STEPS.length - 1) * gap + 32;

  return (
    <VisualFigure
      caption={
        caption ??
        "RAG retrieves relevant passages from an external corpus, then conditions a generator on those documents to produce a grounded answer."
      }
      title="Retrieval-augmented generation pipeline"
    >
      <DiagramSvg viewBox={`0 0 ${totalW} 100`} minWidth={280}>
        {STEPS.map((step, i) => {
          const x = startX + i * (boxW + gap);
          return (
            <g key={step.label}>
              <rect x={x} y={28} width={boxW} height={32} rx={5} fill={step.fill} stroke={step.stroke} strokeWidth={1} />
              <text x={x + boxW / 2} y={48} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily="system-ui">
                {step.label}
              </text>
              {i < STEPS.length - 1 && (
                <line
                  x1={x + boxW + 2}
                  y1={44}
                  x2={x + boxW + gap - 2}
                  y2={44}
                  stroke={c.arrow}
                  strokeWidth={1.5}
                  markerEnd="url(#ragArrow)"
                />
              )}
            </g>
          );
        })}
        <defs>
          <marker id="ragArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
      </DiagramSvg>
    </VisualFigure>
  );
}
