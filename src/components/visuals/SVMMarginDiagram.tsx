import { VisualFigure, visualColors as c } from "./shared";

export function SVMMarginDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "A maximum-margin hyperplane separates classes; the margin is the distance between the boundary and the nearest support vectors. Scaling features affects geometry."
      }
      title="SVM margin and separating hyperplane"
    >
      <svg viewBox="0 0 280 160" className="w-full min-w-[240px] h-auto" aria-hidden>
        {/* margin band */}
        <path d="M 50 95 L 230 45" stroke={c.accentDim} strokeWidth={18} strokeLinecap="round" opacity={0.5} />
        {/* decision boundary */}
        <line x1={45} y1={100} x2={235} y2={40} stroke={c.accent} strokeWidth={2} />
        <text x={240} y={38} fill={c.accent} fontSize={8} fontFamily="system-ui">
          Boundary
        </text>
        {/* class A */}
        {[
          [70, 110],
          [90, 105],
          [110, 115],
          [85, 125],
        ].map(([x, y], i) => (
          <circle key={`a-${i}`} cx={x} cy={y} r={5} fill={c.positive} opacity={0.9} />
        ))}
        {/* class B */}
        {[
          [150, 55],
          [170, 48],
          [190, 58],
          [210, 42],
        ].map(([x, y], i) => (
          <circle key={`b-${i}`} cx={x} cy={y} r={5} fill={c.negative} opacity={0.9} />
        ))}
        {/* support vectors */}
        <circle cx={118} cy={108} r={7} fill="none" stroke={c.warn} strokeWidth={2} />
        <circle cx={162} cy={52} r={7} fill="none" stroke={c.warn} strokeWidth={2} />
        <text x={140} y={85} fill={c.warn} fontSize={7} fontFamily="system-ui">
          Margin
        </text>
        <text x={50} y={148} fill={c.text} fontSize={8} fontFamily="system-ui">
          Class A
        </text>
        <text x={190} y={148} fill={c.text} fontSize={8} fontFamily="system-ui">
          Class B
        </text>
      </svg>
    </VisualFigure>
  );
}
