import { VisualFigure, visualColors as c, DiagramSvg } from "../shared";

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
      <DiagramSvg viewBox="0 0 288 148" minWidth={240}>
        <rect x={16} y={24} width={256} height={92} rx={6} fill="none" stroke={c.accent} strokeWidth={1.5} strokeDasharray="5 3" />
        <text x={144} y={18} textAnchor="middle" fill={c.accent} fontSize={8} fontFamily={font}>
          Outer CV (generalization estimate)
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={24 + i * 48}
            y={32}
            width={40}
            height={24}
            rx={3}
            fill={i === 0 ? c.positiveDim : c.accentDim}
            stroke={i === 0 ? c.positive : c.accent}
            strokeWidth={1}
          />
        ))}
        <rect x={32} y={64} width={224} height={44} rx={4} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={144} y={78} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Inner CV (hyperparameter search)
        </text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={56 + i * 64} y={86} width={48} height={14} rx={2} fill={c.negative} fillOpacity={0.35} stroke={c.negative} strokeWidth={0.75} />
        ))}
        <text x={144} y={132} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
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
  const originX = 72;
  const originY = 36;
  const cellW = 40;
  const cellH = 28;
  const rowGap = 5;
  const gridH = 3 * cellH + 2 * rowGap;
  const gridW = 3 * cellW;
  const gridCx = originX + gridW / 2;

  return (
    <VisualFigure
      caption={
        caption ??
        "Grid search exhaustively evaluates a Cartesian product of hyperparameter values, selecting the combination with the best cross-validated score."
      }
      title="Hyperparameter grid search"
    >
      <DiagramSvg viewBox="0 0 220 172" minWidth={220}>
        <text x={gridCx} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          CV score heatmap
        </text>

        <text
          x={originX - 14}
          y={originY + gridH / 2}
          textAnchor="middle"
          fill={c.text}
          fontSize={8}
          fontFamily={font}
          transform={`rotate(-90 ${originX - 14} ${originY + gridH / 2})`}
        >
          Param B
        </text>

        {grid.map((row, ri) =>
          row.map((score, ci) => {
            const isBest = ri === 1 && ci === 1;
            const x = originX + ci * cellW;
            const y = originY + ri * (cellH + rowGap);
            return (
              <g key={`${ri}-${ci}`}>
                <rect
                  x={x}
                  y={y}
                  width={cellW - 2}
                  height={cellH}
                  rx={3}
                  fill={isBest ? c.positiveDim : c.accentDim}
                  stroke={isBest ? c.positive : c.accent}
                  strokeWidth={isBest ? 2 : 0.75}
                />
                {isBest && (
                  <text x={x + (cellW - 2) / 2} y={y + 10} textAnchor="middle" fill={c.positive} fontSize={6} fontFamily={font}>
                    best
                  </text>
                )}
                <text
                  x={x + (cellW - 2) / 2}
                  y={y + (isBest ? 22 : cellH / 2 + 3)}
                  textAnchor="middle"
                  fill={isBest ? c.positive : c.text}
                  fontSize={8}
                  fontFamily={font}
                >
                  {score.toFixed(1)}
                </text>
              </g>
            );
          })
        )}

        <text x={gridCx} y={originY + gridH + 16} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Param A →
        </text>

        <text x={gridCx} y={158} textAnchor="middle" fill={c.positive} fontSize={7} fontFamily={font}>
          Winner = highest mean CV score
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function BiasVarianceDiagram({ caption }: { caption?: string }) {
  const curves = [
    { d: "M 40 88 Q 80 84 120 72 Q 160 60 200 52", label: "Train", stroke: c.positive, lx: 204, ly: 50 },
    { d: "M 40 88 Q 80 80 120 68 Q 160 62 200 60", label: "Val", stroke: c.warn, lx: 204, ly: 62 },
  ];
  const regions = [
    { x: 52, label: "Underfit", sub: "High bias" },
    { x: 120, label: "Optimal", sub: "Balanced" },
    { x: 188, label: "Overfit", sub: "High variance" },
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "The bias–variance tradeoff: underfitting (high bias) fails to capture signal; overfitting (high variance) memorizes noise; optimal complexity generalizes best."
      }
      title="Bias-variance tradeoff"
    >
      <DiagramSvg viewBox="0 0 240 148" minWidth={220}>
        <line x1={32} y1={96} x2={216} y2={96} stroke={c.grid} strokeWidth={1} />
        <line x1={32} y1={96} x2={32} y2={28} stroke={c.grid} strokeWidth={1} />
        {curves.map((curve) => (
          <g key={curve.label}>
            <path d={curve.d} fill="none" stroke={curve.stroke} strokeWidth={1.5} />
            <text x={curve.lx} y={curve.ly} fill={curve.stroke} fontSize={7} fontFamily={font}>
              {curve.label}
            </text>
          </g>
        ))}
        <line x1={120} y1={28} x2={120} y2={96} stroke={c.accent} strokeWidth={1} strokeDasharray="3 2" />
        <text x={22} y={62} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font} transform="rotate(-90 22 62)">
          Error
        </text>
        <text x={180} y={104} fill={c.text} fontSize={7} fontFamily={font}>
          Complexity →
        </text>
        {regions.map((r) => (
          <g key={r.label}>
            <text x={r.x} y={118} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
              {r.label}
            </text>
            <text x={r.x} y={130} textAnchor="middle" fill={c.text} fontSize={6} fontFamily={font}>
              {r.sub}
            </text>
          </g>
        ))}
      </DiagramSvg>
    </VisualFigure>
  );
}
