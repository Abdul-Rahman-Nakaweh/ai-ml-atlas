import { VisualFigure, visualColors as c } from "./shared";

export function DataSplitDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Data are partitioned so training fits parameters, validation guides development choices, and the test set provides a final unbiased estimate used once."
      }
      title="Train, validation, and test partitions"
    >
      <svg viewBox="0 0 360 100" className="w-full min-w-[280px] h-auto" aria-hidden>
        <rect x={10} y={30} width={200} height={40} rx={6} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        <text x={110} y={55} textAnchor="middle" fill={c.textBright} fontSize={11} fontFamily="system-ui">
          Training set
        </text>
        <rect x={220} y={30} width={60} height={40} rx={6} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={250} y={55} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily="system-ui">
          Val.
        </text>
        <rect x={290} y={30} width={60} height={40} rx={6} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={320} y={55} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily="system-ui">
          Test
        </text>
        <text x={110} y={88} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
          Parameter estimation
        </text>
        <text x={250} y={88} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
          Model selection
        </text>
        <text x={320} y={88} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
          Final metric
        </text>
      </svg>
    </VisualFigure>
  );
}
