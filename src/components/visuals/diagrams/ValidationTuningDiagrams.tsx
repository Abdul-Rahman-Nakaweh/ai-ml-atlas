import { VisualFigure, visualColors as c } from "../shared";
import { DiagramSvg } from "./DiagramSvg";

const font = "system-ui, sans-serif";

export function NestedCVDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Nested cross-validation uses an outer loop for unbiased performance estimation and an inner loop for hyperparameter tuning, preventing information leakage."
      }
      title="Nested cross-validation"
    >
      <DiagramSvg viewBox="0 0 280 132" minWidth={240}>
        <rect x={16} y={20} width={248} height={88} rx={6} fill="none" stroke={c.accent} strokeWidth={1.5} strokeDasharray="5 3" />
        <text x={140} y={16} textAnchor="middle" fill={c.accent} fontSize={8} fontFamily={font}>
          Outer CV (generalization estimate)
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={24 + i * 46}
            y={28}
            width={40}
            height={24}
            rx={3}
            fill={i === 0 ? c.positiveDim : c.accentDim}
            stroke={i === 0 ? c.positive : c.accent}
            strokeWidth={1}
          />
        ))}
        <rect x={32} y={58} width={216} height={40} rx={4} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={140} y={74} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Inner CV (hyperparameter search)
        </text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={52 + i * 56} y={80} width={44} height={12} rx={2} fill={c.negative} fillOpacity={0.35} stroke={c.negative} strokeWidth={0.75} />
        ))}
        <text x={140} y={124} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Outer test fold never used for tuning
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function GridSearchDiagram({ caption }: { caption?: string }) {
  const grid = [
    [0.3, 0.5, 0.7],
    [0.4, 0.6, 0.8],
    [0.5, 0.7, 0.9],
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "Grid search exhaustively evaluates a Cartesian product of hyperparameter values, selecting the combination with the best cross-validated score."
      }
      title="Hyperparameter grid search"
    >
      <DiagramSvg viewBox="0 0 220 140" minWidth={200}>
        <text x={110} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Parameter grid
        </text>
        <text x={28} y={36} fill={c.text} fontSize={7} fontFamily={font} transform="rotate(-90 28 36)">
          param B
        </text>
        <text x={110} y={132} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          param A →
        </text>
        {grid.map((row, ri) =>
          row.map((score, ci) => {
            const isBest = ri === 1 && ci === 1;
            return (
              <g key={`${ri}-${ci}`}>
                <rect
                  x={48 + ci * 48}
                  y={44 + ri * 28}
                  width={42}
                  height={24}
                  rx={3}
                  fill={isBest ? c.positiveDim : c.accentDim}
                  stroke={isBest ? c.positive : c.accent}
                  strokeWidth={isBest ? 2 : 0.75}
                />
                <text
                  x={69 + ci * 48}
                  y={60 + ri * 28}
                  textAnchor="middle"
                  fill={isBest ? c.positive : c.text}
                  fontSize={7}
                  fontFamily={font}
                >
                  {score.toFixed(1)}
                </text>
              </g>
            );
          })
        )}
        <text x={110} y={128} textAnchor="middle" fill={c.positive} fontSize={7} fontFamily={font}>
          ★ best CV score
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function BiasVarianceDiagram({ caption }: { caption?: string }) {
  const curves = [
    { d: "M 40 88 Q 80 84 120 72 Q 160 60 200 52", label: "Train", stroke: c.positive },
    { d: "M 40 88 Q 80 80 120 68 Q 160 62 200 60", label: "Val", stroke: c.warn },
  ];
  const regions = [
    { x: 44, label: "Underfit", sub: "High bias" },
    { x: 108, label: "Optimal", sub: "Balanced" },
    { x: 172, label: "Overfit", sub: "High variance" },
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "The bias–variance tradeoff: underfitting (high bias) fails to capture signal; overfitting (high variance) memorizes noise; optimal complexity generalizes best."
      }
      title="Bias-variance tradeoff"
    >
      <DiagramSvg viewBox="0 0 240 128" minWidth={220}>
        <line x1={32} y1={96} x2={216} y2={96} stroke={c.grid} strokeWidth={1} />
        <line x1={32} y1={96} x2={32} y2={28} stroke={c.grid} strokeWidth={1} />
        {curves.map((curve) => (
          <path key={curve.label} d={curve.d} fill="none" stroke={curve.stroke} strokeWidth={1.5} />
        ))}
        <line x1={108} y1={28} x2={108} y2={96} stroke={c.accent} strokeWidth={1} strokeDasharray="3 2" />
        {regions.map((r) => (
          <g key={r.label}>
            <text x={r.x} y={108} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
              {r.label}
            </text>
            <text x={r.x} y={118} textAnchor="middle" fill={c.text} fontSize={6} fontFamily={font}>
              {r.sub}
            </text>
          </g>
        ))}
        <text x={20} y={48} fill={c.positive} fontSize={6} fontFamily={font}>
          Error
        </text>
        <text x={200} y={104} fill={c.text} fontSize={6} fontFamily={font}>
          Complexity →
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
