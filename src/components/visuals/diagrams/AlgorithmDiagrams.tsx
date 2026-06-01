import { VisualFigure, visualColors as c, DiagramSvg } from "../shared";

const font = "system-ui, sans-serif";

export function LinearRegressionDiagram({ caption }: { caption?: string }) {
  const points: [number, number][] = [
    [52, 72], [68, 64], [84, 58], [100, 52], [116, 46], [132, 42], [148, 36],
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "Linear regression fits a straight line that minimizes squared error between predicted and observed continuous targets."
      }
      title="Linear regression fit"
    >
      <DiagramSvg viewBox="0 0 220 120" minWidth={200}>
        <line x1={36} y1={96} x2={184} y2={96} stroke={c.grid} strokeWidth={1} />
        <line x1={36} y1={96} x2={36} y2={24} stroke={c.grid} strokeWidth={1} />
        <line x1={44} y1={88} x2={176} y2={32} stroke={c.accent} strokeWidth={2} />
        {points.map(([px, py], i) => (
          <circle key={i} cx={px} cy={py} r={4} fill={c.positive} stroke={c.textBright} strokeWidth={1} />
        ))}
        <text x={110} y={16} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          ŷ = w·x + b
        </text>
        <text x={110} y={112} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Minimize Σ(y − ŷ)²
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function LogisticRegressionDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Logistic regression models class probability with a sigmoid curve, mapping a linear score to values between 0 and 1."
      }
      title="Logistic regression sigmoid"
    >
      <DiagramSvg viewBox="0 0 220 120" minWidth={200}>
        <line x1={36} y1={96} x2={184} y2={96} stroke={c.grid} strokeWidth={1} />
        <line x1={36} y1={96} x2={36} y2={24} stroke={c.grid} strokeWidth={1} />
        <line x1={36} y1={60} x2={184} y2={60} stroke={c.neutral} strokeWidth={0.75} strokeDasharray="4 3" />
        <path
          d="M 40 92 C 70 92, 80 28, 110 32 C 140 36, 150 92, 180 92"
          fill="none"
          stroke={c.accent}
          strokeWidth={2}
        />
        <text x={32} y={32} textAnchor="end" fill={c.text} fontSize={7} fontFamily={font}>
          1
        </text>
        <text x={32} y={100} textAnchor="end" fill={c.text} fontSize={7} fontFamily={font}>
          0
        </text>
        <text x={110} y={16} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          P(y=1|x) = σ(w·x + b)
        </text>
        <text x={110} y={112} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Decision threshold at 0.5
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function GradientBoostingDiagram({ caption }: { caption?: string }) {
  const trees = [
    { x: 20, label: "Tree 1", err: "residuals" },
    { x: 100, label: "Tree 2", err: "residuals" },
    { x: 180, label: "Tree 3", err: "residuals" },
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "Gradient boosting trains weak learners sequentially; each new tree corrects the residual errors of the combined ensemble so far."
      }
      title="Sequential gradient boosting"
    >
      <DiagramSvg viewBox="0 0 260 120" minWidth={220}>
        <defs>
          <marker id="gbArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        {trees.map((t, i) => (
          <g key={t.label}>
            <rect x={t.x} y={32} width={56} height={40} rx={4} fill={c.positiveDim} stroke={c.positive} strokeWidth={1.5} />
            <text x={t.x + 28} y={50} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
              {t.label}
            </text>
            <text x={t.x + 28} y={64} textAnchor="middle" fill={c.text} fontSize={6} fontFamily={font}>
              fits {t.err}
            </text>
            {i < trees.length - 1 && (
              <path
                d={`M ${t.x + 60} 52 L ${trees[i + 1].x - 4} 52`}
                stroke={c.warn}
                strokeWidth={1.5}
                markerEnd="url(#gbArrow)"
              />
            )}
          </g>
        ))}
        <rect x={60} y={84} width={140} height={24} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        <text x={130} y={100} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          F(x) = F₀ + η·h₁ + η·h₂ + …
        </text>
        <text x={130} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Each tree fixes prior errors
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
