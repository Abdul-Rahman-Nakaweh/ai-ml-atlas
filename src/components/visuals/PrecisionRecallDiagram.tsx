import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

export function PrecisionRecallDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Precision penalizes false positives among predicted positives; recall penalizes false negatives among actual positives. Each metric isolates a different error type."
      }
      title="Precision versus recall error focus"
    >
      <DiagramSvg viewBox="0 0 340 125" minWidth={280}>
        <text x={85} y={16} textAnchor="middle" fill={c.negative} fontSize={9} fontFamily="system-ui" fontWeight="600">
          Precision
        </text>
        <rect x={20} y={24} width={130} height={72} rx={5} fill={c.accentDim} stroke={c.accent} strokeWidth={1} opacity={0.35} />
        <text x={85} y={38} textAnchor="middle" fill={c.text} fontSize={7} fontFamily="system-ui">
          Predicted positive
        </text>
        <rect x={35} y={48} width={42} height={18} rx={3} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={56} y={60} textAnchor="middle" fill={c.positive} fontSize={7} fontFamily="system-ui">
          TP
        </text>
        <rect x={88} y={48} width={42} height={18} rx={3} fill={c.negativeDim} stroke={c.negative} strokeWidth={2} />
        <text x={109} y={60} textAnchor="middle" fill={c.negative} fontSize={7} fontFamily="system-ui">
          FP
        </text>
        <text x={85} y={84} textAnchor="middle" fill={c.text} fontSize={7} fontFamily="system-ui">
          Costly when alerts are wrong
        </text>

        <line x1={170} y1={10} x2={170} y2={108} stroke={c.grid} strokeWidth={1} />

        <text x={255} y={16} textAnchor="middle" fill={c.positive} fontSize={9} fontFamily="system-ui" fontWeight="600">
          Recall
        </text>
        <rect x={190} y={24} width={130} height={72} rx={5} fill={c.accentDim} stroke={c.accent} strokeWidth={1} opacity={0.35} />
        <text x={255} y={38} textAnchor="middle" fill={c.text} fontSize={7} fontFamily="system-ui">
          Actual positive
        </text>
        <rect x={205} y={48} width={42} height={18} rx={3} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={226} y={60} textAnchor="middle" fill={c.positive} fontSize={7} fontFamily="system-ui">
          TP
        </text>
        <rect x={258} y={48} width={42} height={18} rx={3} fill={c.negativeDim} stroke={c.negative} strokeWidth={2} />
        <text x={279} y={60} textAnchor="middle" fill={c.negative} fontSize={7} fontFamily="system-ui">
          FN
        </text>
        <text x={255} y={84} textAnchor="middle" fill={c.text} fontSize={7} fontFamily="system-ui">
          Costly when cases are missed
        </text>

        <text x={170} y={118} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
          Same confusion matrix — different denominators
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
