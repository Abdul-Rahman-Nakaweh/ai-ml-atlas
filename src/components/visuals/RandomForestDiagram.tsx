import { VisualFigure, visualColors as c } from "./shared";

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
      <svg viewBox="0 0 300 130" className="w-full min-w-[260px] h-auto" aria-hidden>
        <MiniTree x={10} y={10} />
        <MiniTree x={70} y={10} />
        <MiniTree x={130} y={10} />
        <MiniTree x={190} y={10} />
        <text x={35} y={58} fill={c.text} fontSize={7} fontFamily="system-ui">
          Tree 1
        </text>
        <text x={95} y={58} fill={c.text} fontSize={7} fontFamily="system-ui">
          Tree 2
        </text>
        <text x={155} y={58} fill={c.text} fontSize={7} fontFamily="system-ui">
          Tree 3
        </text>
        <text x={215} y={58} fill={c.text} fontSize={7} fontFamily="system-ui">
          Tree n
        </text>
        {[35, 95, 155, 215].map((x) => (
          <line key={x} x1={x} y1={62} x2={150} y2={82} stroke={c.arrow} strokeWidth={0.75} />
        ))}
        <rect x={100} y={82} width={100} height={28} rx={5} fill={c.accentDim} stroke={c.accent} strokeWidth={1.5} />
        <text x={150} y={100} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily="system-ui">
          Vote / Average
        </text>
        <text x={150} y={122} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
          Final prediction
        </text>
      </svg>
    </VisualFigure>
  );
}
