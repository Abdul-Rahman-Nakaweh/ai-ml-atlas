import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

export function KNNDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "k-NN assigns a label to the query point (highlighted) from the majority class among its k nearest training neighbors in feature space."
      }
      title="k-nearest neighbors classification"
    >
      <DiagramSvg viewBox="0 0 280 160" minWidth={240}>
        <circle cx={140} cy={80} r={55} fill="none" stroke={c.accent} strokeWidth={1.5} strokeDasharray="5 4" />
        <circle cx={140} cy={80} r={8} fill={c.warn} stroke={c.textBright} strokeWidth={2} />
        <text x={140} y={105} textAnchor="middle" fill={c.warn} fontSize={8} fontFamily={font}>
          Query
        </text>
        {[
          [120, 65],
          [155, 70],
          [130, 95],
        ].map(([x, y], i) => (
          <circle key={`na-${i}`} cx={x} cy={y} r={5} fill={c.positive} />
        ))}
        {[
          [165, 55],
          [100, 90],
          [70, 70],
          [180, 100],
          [200, 85],
        ].map(([x, y], i) => (
          <circle key={`nb-${i}`} cx={x} cy={y} r={5} fill={c.negative} opacity={i < 2 ? 1 : 0.4} />
        ))}
        <text x={140} y={148} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          k = 3 nearest → majority vote
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
