import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

function MiniTree({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={18} y={0} width={36} height={14} rx={3} fill={c.accentDim} stroke={c.accent} strokeWidth={0.75} />
      <line x1={28} y1={14} x2={18} y2={26} stroke={c.grid} strokeWidth={0.75} />
      <line x1={36} y1={14} x2={46} y2={26} stroke={c.grid} strokeWidth={0.75} />
      <rect x={8} y={26} width={20} height={12} rx={2} fill={c.positiveDim} stroke={c.positive} strokeWidth={0.75} />
      <rect x={36} y={26} width={20} height={12} rx={2} fill={c.negativeDim} stroke={c.negative} strokeWidth={0.75} />
    </g>
  );
}

export function RandomForestDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Random Forest trains many decorrelated trees on bootstrap samples; final prediction aggregates votes (classification) or averages (regression)."
      }
      title="Ensemble voting in Random Forest"
    >
      <DiagramSvg viewBox="0 0 300 130" minWidth={260}>
        <MiniTree x={10} y={10} />
        <MiniTree x={70} y={10} />
        <MiniTree x={130} y={10} />
        <MiniTree x={190} y={10} />
        {[38, 98, 158, 218].map((x, i) => (
          <text key={x} x={x} y={58} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
            {["Tree 1", "Tree 2", "Tree 3", "Tree n"][i]}
          </text>
        ))}
        {[38, 98, 158, 218].map((x) => (
          <line key={x} x1={x} y1={62} x2={150} y2={82} stroke={c.arrow} strokeWidth={0.75} />
        ))}
        <rect x={100} y={82} width={100} height={28} rx={5} fill={c.accentDim} stroke={c.accent} strokeWidth={1.5} />
        <text x={150} y={100} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Vote / Average
        </text>
        <text x={150} y={122} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Final prediction
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
