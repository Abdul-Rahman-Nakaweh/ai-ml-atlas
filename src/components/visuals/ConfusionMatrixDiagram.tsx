import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

export function ConfusionMatrixDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Confusion matrix for binary classification: rows are actual class, columns are predicted class. Precision, recall, and accuracy are derived from these four counts."
      }
      title="Binary confusion matrix"
    >
      <DiagramSvg viewBox="0 0 280 200" minWidth={240}>
        <text x={140} y={18} textAnchor="middle" fill={c.text} fontSize={9} fontFamily={font}>
          Predicted
        </text>
        <text x={14} y={105} textAnchor="middle" fill={c.text} fontSize={9} fontFamily={font} transform="rotate(-90 14 105)">
          Actual
        </text>
        <text x={93} y={36} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Negative
        </text>
        <text x={173} y={36} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Positive
        </text>
        <text x={42} y={76} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Neg.
        </text>
        <text x={42} y={136} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Pos.
        </text>
        <rect x={55} y={48} width={75} height={55} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={92} y={72} textAnchor="middle" fill={c.positive} fontSize={10} fontWeight="600" fontFamily={font}>
          TN
        </text>
        <text x={92} y={88} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          True Neg.
        </text>
        <rect x={135} y={48} width={75} height={55} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={172} y={72} textAnchor="middle" fill={c.negative} fontSize={10} fontWeight="600" fontFamily={font}>
          FP
        </text>
        <text x={172} y={88} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          False Pos.
        </text>
        <rect x={55} y={108} width={75} height={55} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={92} y={132} textAnchor="middle" fill={c.negative} fontSize={10} fontWeight="600" fontFamily={font}>
          FN
        </text>
        <text x={92} y={148} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          False Neg.
        </text>
        <rect x={135} y={108} width={75} height={55} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={172} y={132} textAnchor="middle" fill={c.positive} fontSize={10} fontWeight="600" fontFamily={font}>
          TP
        </text>
        <text x={172} y={148} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          True Pos.
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
