import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

/** Parallel hyperplanes equidistant from the decision boundary */
function svmGeometry() {
  const boundary = { x1: 44, y1: 114, x2: 236, y2: 34 };
  const dx = boundary.x2 - boundary.x1;
  const dy = boundary.y2 - boundary.y1;
  const len = Math.hypot(dx, dy);
  /** Unit normal toward class A (larger x₂ / lower on plot) */
  const nx = -dy / len;
  const ny = dx / len;
  const margin = 20;

  const offsetLine = (d: number) => ({
    x1: boundary.x1 + d * nx,
    y1: boundary.y1 + d * ny,
    x2: boundary.x2 + d * nx,
    y2: boundary.y2 + d * ny,
  });

  const marginA = offsetLine(margin);
  const marginB = offsetLine(-margin);

  return {
    boundary,
    marginA,
    marginB,
    nx,
    ny,
    margin,
    onBoundary: (t: number) => ({
      x: boundary.x1 + t * dx,
      y: boundary.y1 + t * dy,
    }),
  };
}

export function SVMMarginDiagram({ caption }: { caption?: string }) {
  const g = svmGeometry();
  const classA = [
    [72, 118],
    [92, 112],
    [108, 122],
  ] as const;
  const classB = [
    [168, 48],
    [188, 42],
    [208, 52],
  ] as const;
  const svA = { x: 98, y: 108 };
  const svB = { x: 178, y: 46 };
  const mid = g.onBoundary(0.5);
  const marginMidA = { x: mid.x + g.nx * g.margin, y: mid.y + g.ny * g.margin };
  const marginMidB = { x: mid.x - g.nx * g.margin, y: mid.y - g.ny * g.margin };

  return (
    <VisualFigure
      caption={
        caption ??
        "A maximum-margin hyperplane separates classes; the margin is the distance between the boundary and the nearest support vectors. Scaling features affects geometry."
      }
      title="SVM margin and separating hyperplane"
    >
      <DiagramSvg viewBox="0 0 280 168" minWidth={240}>
        <line x1={36} y1={138} x2={248} y2={138} stroke={c.grid} strokeWidth={1} />
        <line x1={36} y1={28} x2={36} y2={138} stroke={c.grid} strokeWidth={1} />
        <text x={32} y={32} textAnchor="end" fill={c.text} fontSize={7} fontFamily={font}>
          x₂
        </text>
        <text x={248} y={150} textAnchor="end" fill={c.text} fontSize={7} fontFamily={font}>
          x₁ →
        </text>

        <path
          d={`M ${g.marginB.x1} ${g.marginB.y1} L ${g.marginB.x2} ${g.marginB.y2} L ${g.marginA.x2} ${g.marginA.y2} L ${g.marginA.x1} ${g.marginA.y1} Z`}
          fill={c.accentDim}
          opacity={0.35}
        />

        <line
          x1={g.marginA.x1}
          y1={g.marginA.y1}
          x2={g.marginA.x2}
          y2={g.marginA.y2}
          stroke={c.positive}
          strokeWidth={1}
          strokeDasharray="4 3"
          opacity={0.9}
        />
        <line
          x1={g.marginB.x1}
          y1={g.marginB.y1}
          x2={g.marginB.x2}
          y2={g.marginB.y2}
          stroke={c.negative}
          strokeWidth={1}
          strokeDasharray="4 3"
          opacity={0.9}
        />

        <line
          x1={g.boundary.x1}
          y1={g.boundary.y1}
          x2={g.boundary.x2}
          y2={g.boundary.y2}
          stroke={c.accent}
          strokeWidth={2.5}
        />
        <text x={g.boundary.x2 + 4} y={g.boundary.y2 + 4} fill={c.accent} fontSize={7} fontFamily={font}>
          Boundary
        </text>

        {classA.map(([x, y], i) => (
          <circle key={`a-${i}`} cx={x} cy={y} r={4.5} fill={c.positive} opacity={0.85} />
        ))}
        {classB.map(([x, y], i) => (
          <circle key={`b-${i}`} cx={x} cy={y} r={4.5} fill={c.negative} opacity={0.85} />
        ))}

        <circle cx={svA.x} cy={svA.y} r={6} fill={c.positiveDim} stroke={c.warn} strokeWidth={2} />
        <circle cx={svB.x} cy={svB.y} r={6} fill={c.negativeDim} stroke={c.warn} strokeWidth={2} />

        <line
          x1={marginMidB.x}
          y1={marginMidB.y}
          x2={marginMidA.x}
          y2={marginMidA.y}
          stroke={c.warn}
          strokeWidth={1.25}
        />
        <circle cx={marginMidB.x} cy={marginMidB.y} r={1.5} fill={c.warn} />
        <circle cx={marginMidA.x} cy={marginMidA.y} r={1.5} fill={c.warn} />
        <text
          x={mid.x + g.nx * 10}
          y={mid.y + g.ny * 10}
          textAnchor="middle"
          fill={c.warn}
          fontSize={7}
          fontFamily={font}
        >
          Margin
        </text>

        <text x={88} y={156} textAnchor="middle" fill={c.positive} fontSize={8} fontFamily={font}>
          Class A
        </text>
        <text x={192} y={156} textAnchor="middle" fill={c.negative} fontSize={8} fontFamily={font}>
          Class B
        </text>
        <text x={svA.x} y={svA.y + 16} textAnchor="middle" fill={c.text} fontSize={6} fontFamily={font}>
          SV
        </text>
        <text x={svB.x} y={svB.y - 10} textAnchor="middle" fill={c.text} fontSize={6} fontFamily={font}>
          SV
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
