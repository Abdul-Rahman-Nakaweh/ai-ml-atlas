import { VisualFigure, visualColors as c } from "./shared";

const POINTS = [
  { x: 60, y: 70, label: "cat", group: "animal" },
  { x: 75, y: 55, label: "dog", group: "animal" },
  { x: 90, y: 78, label: "kitten", group: "animal" },
  { x: 180, y: 50, label: "car", group: "vehicle" },
  { x: 195, y: 65, label: "truck", group: "vehicle" },
  { x: 210, y: 45, label: "bus", group: "vehicle" },
  { x: 130, y: 100, label: "query", group: "query" },
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
      <svg viewBox="0 0 280 130" className="w-full min-w-[240px] h-auto" aria-hidden>
        <ellipse cx={80} cy={65} rx={45} ry={35} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} strokeDasharray="3 2" opacity={0.5} />
        <ellipse cx={195} cy={55} rx={45} ry={35} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} strokeDasharray="3 2" opacity={0.5} />
        <text x={80} y={30} textAnchor="middle" fill={c.positive} fontSize={8} fontFamily="system-ui">
          Animals
        </text>
        <text x={195} y={25} textAnchor="middle" fill={c.negative} fontSize={8} fontFamily="system-ui">
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
            <text x={p.x} y={p.y - 10} textAnchor="middle" fill={c.text} fontSize={7} fontFamily="system-ui">
              {p.label}
            </text>
          </g>
        ))}
        <line x1={130} y1={100} x2={85} y2={72} stroke={c.warn} strokeWidth={1} strokeDasharray="3 2" opacity={0.7} />
        <text x={140} y={118} fill={c.text} fontSize={7} fontFamily="system-ui">
          Nearest neighbors in vector space
        </text>
      </svg>
    </VisualFigure>
  );
}
