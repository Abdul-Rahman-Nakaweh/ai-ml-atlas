import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

export function PCADiagram({ caption }: { caption?: string }) {
  const points = [
    [80, 95],
    [95, 80],
    [110, 88],
    [125, 72],
    [140, 85],
    [155, 68],
    [170, 78],
    [185, 62],
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "PCA projects correlated points onto the direction of maximum variance (first principal component), reducing dimensionality while retaining spread."
      }
      title="Principal component projection in 2D"
    >
      <DiagramSvg viewBox="0 0 280 160" minWidth={240}>
        <line x1={40} y1={130} x2={250} y2={50} stroke={c.accent} strokeWidth={2} strokeDasharray="4 3" />
        <text x={255} y={48} fill={c.accent} fontSize={8} fontFamily={font}>
          PC1
        </text>
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        ))}
        {points.map(([x, y], i) => {
          const t = 0.35;
          const px = x + (250 - x) * t * 0.3;
          const py = y + (50 - y) * t * 0.3;
          return (
            <line key={`proj-${i}`} x1={x} y1={y} x2={px} y2={py} stroke={c.neutral} strokeWidth={0.75} opacity={0.6} />
          );
        })}
        <text x={132} y={145} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Original features (correlated)
        </text>
        <text x={145} y={38} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Projected component
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
