import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

export function DataSplitDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Data are partitioned so training fits parameters, validation guides development choices, and the test set provides a final unbiased estimate used once."
      }
      title="Train, validation, and test partitions"
    >
      <DiagramSvg viewBox="0 0 360 108" minWidth={280}>
        <rect x={10} y={24} width={200} height={40} rx={6} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        <text x={110} y={49} textAnchor="middle" fill={c.textBright} fontSize={11} fontFamily={font}>
          Training set
        </text>
        <rect x={220} y={24} width={60} height={40} rx={6} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={250} y={49} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Val.
        </text>
        <rect x={290} y={24} width={60} height={40} rx={6} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={320} y={49} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Test
        </text>
        <text x={110} y={88} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Parameter estimation
        </text>
        <text x={250} y={88} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Model selection
        </text>
        <text x={320} y={88} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Final metric
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
