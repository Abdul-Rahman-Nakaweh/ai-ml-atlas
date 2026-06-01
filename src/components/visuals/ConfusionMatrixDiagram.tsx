import { VisualFigure, visualColors as c } from "./shared";

export function ConfusionMatrixDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Confusion matrix for binary classification: rows are actual class, columns are predicted class. Precision, recall, and accuracy are derived from these four counts."
      }
      title="Binary confusion matrix"
    >
      <svg viewBox="0 0 280 200" className="w-full min-w-[240px] h-auto" aria-hidden>
        <text x={140} y={18} textAnchor="middle" fill={c.text} fontSize={9} fontFamily="system-ui">
          Predicted
        </text>
        <text x={14} y={105} textAnchor="middle" fill={c.text} fontSize={9} fontFamily="system-ui" transform="rotate(-90 14 105)">
          Actual
        </text>
        <text x={95} y={36} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
          Negative
        </text>
        <text x={185} y={36} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
          Positive
        </text>
        <text x={42} y={78} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
          Neg.
        </text>
        <text x={42} y={148} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
          Pos.
        </text>
        {/* TN */}
        <rect x={55} y={48} width={75} height={55} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={92} y={72} textAnchor="middle" fill={c.positive} fontSize={10} fontWeight="600" fontFamily="system-ui">
          TN
        </text>
        <text x={92} y={88} textAnchor="middle" fill={c.text} fontSize={7} fontFamily="system-ui">
          True Neg.
        </text>
        {/* FP */}
        <rect x={135} y={48} width={75} height={55} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={172} y={72} textAnchor="middle" fill={c.negative} fontSize={10} fontWeight="600" fontFamily="system-ui">
          FP
        </text>
        <text x={172} y={88} textAnchor="middle" fill={c.text} fontSize={7} fontFamily="system-ui">
          False Pos.
        </text>
        {/* FN */}
        <rect x={55} y={108} width={75} height={55} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={92} y={132} textAnchor="middle" fill={c.negative} fontSize={10} fontWeight="600" fontFamily="system-ui">
          FN
        </text>
        <text x={92} y={148} textAnchor="middle" fill={c.text} fontSize={7} fontFamily="system-ui">
          False Neg.
        </text>
        {/* TP */}
        <rect x={135} y={108} width={75} height={55} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={172} y={132} textAnchor="middle" fill={c.positive} fontSize={10} fontWeight="600" fontFamily="system-ui">
          TP
        </text>
        <text x={172} y={148} textAnchor="middle" fill={c.text} fontSize={7} fontFamily="system-ui">
          True Pos.
        </text>
      </svg>
    </VisualFigure>
  );
}
