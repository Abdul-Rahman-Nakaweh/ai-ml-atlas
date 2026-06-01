import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

export function MetricRelationsDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Classification metrics summarize different error types: precision concerns false positives; recall concerns false negatives; F1 balances both; accuracy summarizes all four cells."
      }
      title="Relationships among classification metrics"
    >
      <DiagramSvg viewBox="0 0 320 152" minWidth={280}>
        <rect x={120} y={12} width={80} height={28} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        <text x={160} y={30} textAnchor="middle" fill={c.accent} fontSize={9} fontFamily={font}>
          Confusion matrix
        </text>
        <line x1={160} y1={40} x2={80} y2={68} stroke={c.arrow} strokeWidth={1} />
        <line x1={160} y1={40} x2={160} y2={68} stroke={c.arrow} strokeWidth={1} />
        <line x1={160} y1={40} x2={240} y2={68} stroke={c.arrow} strokeWidth={1} />
        <rect x={40} y={68} width={80} height={26} rx={4} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={80} y={84} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Precision (FP)
        </text>
        <rect x={120} y={68} width={80} height={26} rx={4} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={160} y={84} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Recall (FN)
        </text>
        <rect x={200} y={68} width={80} height={26} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        <text x={240} y={84} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Accuracy
        </text>
        <line x1={120} y1={94} x2={160} y2={112} stroke={c.arrow} strokeWidth={1} strokeDasharray="3 2" />
        <line x1={200} y1={94} x2={160} y2={112} stroke={c.arrow} strokeWidth={1} strokeDasharray="3 2" />
        <rect x={120} y={108} width={80} height={24} rx={4} fill="rgba(251, 191, 36, 0.15)" stroke={c.warn} strokeWidth={1} />
        <text x={160} y={124} textAnchor="middle" fill={c.warn} fontSize={8} fontFamily={font}>
          F1-score
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
