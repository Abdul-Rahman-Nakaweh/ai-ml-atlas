import { VisualFigure, visualColors as c } from "./shared";

export function KNNDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "k-NN assigns a label to the query point (highlighted) from the majority class among its k nearest training neighbors in feature space."
      }
      title="k-nearest neighbors classification"
    >
      <svg viewBox="0 0 280 160" className="w-full min-w-[240px] h-auto" aria-hidden>
        <circle cx={140} cy={80} r={55} fill="none" stroke={c.accent} strokeWidth={1.5} strokeDasharray="5 4" />
        {/* query */}
        <circle cx={140} cy={80} r={8} fill={c.warn} stroke={c.textBright} strokeWidth={2} />
        <text x={140} y={105} textAnchor="middle" fill={c.warn} fontSize={8} fontFamily="system-ui">
          Query
        </text>
        {/* neighbors class A */}
        {[
          [120, 65],
          [155, 70],
          [130, 95],
        ].map(([x, y], i) => (
          <circle key={`na-${i}`} cx={x} cy={y} r={5} fill={c.positive} />
        ))}
        {/* neighbors class B */}
        {[
          [165, 55],
          [100, 90],
          [70, 70],
          [180, 100],
          [200, 85],
        ].map(([x, y], i) => (
          <circle key={`nb-${i}`} cx={x} cy={y} r={5} fill={c.negative} opacity={i < 2 ? 1 : 0.4} />
        ))}
        <text x={50} y={148} fill={c.text} fontSize={8} fontFamily="system-ui">
          k = 3 nearest → majority vote
        </text>
      </svg>
    </VisualFigure>
  );
}
