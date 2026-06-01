import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

const POINTS = [
  { x: 58, y: 72, label: "cat", group: "animal", lx: 58, ly: 62 },
  { x: 74, y: 58, label: "dog", group: "animal", lx: 74, ly: 48 },
  { x: 88, y: 80, label: "kitten", group: "animal", lx: 88, ly: 94 },
  { x: 182, y: 52, label: "car", group: "vehicle", lx: 182, ly: 44 },
  { x: 198, y: 66, label: "truck", group: "vehicle", lx: 198, ly: 78 },
  { x: 212, y: 44, label: "bus", group: "vehicle", lx: 212, ly: 36 },
  { x: 128, y: 96, label: "query", group: "query", lx: 148, ly: 100 },
];

export function EmbeddingsDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Embeddings map items to vectors so semantically similar concepts cluster nearby; distance in vector space approximates relatedness."
      }
      title="Semantic clustering in embedding space"
    >
      <DiagramSvg viewBox="0 0 280 128" minWidth={240}>
        <ellipse cx={78} cy={68} rx={42} ry={34} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} strokeDasharray="3 2" opacity={0.5} />
        <ellipse cx={196} cy={56} rx={42} ry={34} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} strokeDasharray="3 2" opacity={0.5} />
        <text x={78} y={24} textAnchor="middle" fill={c.positive} fontSize={8} fontFamily={font}>
          Animals
        </text>
        <text x={196} y={20} textAnchor="middle" fill={c.negative} fontSize={8} fontFamily={font}>
          Vehicles
        </text>
        {POINTS.map((p) => (
          <g key={p.label}>
            <circle
              cx={p.x}
              cy={p.y}
              r={p.group === "query" ? 6 : 5}
              fill={p.group === "query" ? c.warn : p.group === "animal" ? c.positive : c.negative}
              opacity={0.85}
            />
            <text x={p.lx} y={p.ly} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
              {p.label}
            </text>
          </g>
        ))}
        <line x1={128} y1={96} x2={86} y2={74} stroke={c.warn} strokeWidth={1} strokeDasharray="3 2" opacity={0.7} />
        <text x={140} y={118} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Nearest neighbors in vector space
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
