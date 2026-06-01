import { VisualFigure, visualColors as c } from "./shared";

export function MetricRelationsDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Classification metrics summarize different error types: precision concerns false positives; recall concerns false negatives; F1 balances both; accuracy summarizes all four cells."
      }
      title="Relationships among classification metrics"
    >
      <svg viewBox="0 0 320 140" className="w-full min-w-[280px] h-auto" aria-hidden>
        <rect x={120} y={10} width={80} height={32} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        <text x={160} y={30} textAnchor="middle" fill={c.accent} fontSize={9} fontFamily="system-ui">
          Confusion matrix
        </text>
        <line x1={160} y1={42} x2={80} y2={70} stroke={c.arrow} strokeWidth={1} />
        <line x1={160} y1={42} x2={160} y2={70} stroke={c.arrow} strokeWidth={1} />
        <line x1={160} y1={42} x2={240} y2={70} stroke={c.arrow} strokeWidth={1} />
        <rect x={40} y={70} width={80} height={28} rx={4} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={80} y={88} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily="system-ui">
          Precision (FP)
        </text>
        <rect x={120} y={70} width={80} height={28} rx={4} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={160} y={88} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily="system-ui">
          Recall (FN)
        </text>
        <rect x={200} y={70} width={80} height={28} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        <text x={240} y={88} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily="system-ui">
          Accuracy
        </text>
        <line x1={120} y1={98} x2={160} y2={115} stroke={c.arrow} strokeWidth={1} strokeDasharray="3 2" />
        <line x1={200} y1={98} x2={160} y2={115} stroke={c.arrow} strokeWidth={1} strokeDasharray="3 2" />
        <rect x={120} y={115} width={80} height={22} rx={4} fill="rgba(251, 191, 36, 0.15)" stroke={c.warn} strokeWidth={1} />
        <text x={160} y={130} textAnchor="middle" fill={c.warn} fontSize={8} fontFamily="system-ui">
          F1-score
        </text>
      </svg>
    </VisualFigure>
  );
}
