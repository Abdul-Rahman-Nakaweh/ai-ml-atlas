import { VisualFigure, visualColors as c } from "../shared";
import { DiagramSvg } from "./DiagramSvg";

const font = "system-ui, sans-serif";

export function AccuracyDiagram({ caption }: { caption?: string }) {
  const total = 10;
  const correct = 7;
  return (
    <VisualFigure
      caption={
        caption ??
        "Accuracy is the fraction of correct predictions: (true positives + true negatives) divided by total samples; misleading on imbalanced classes."
      }
      title="Classification accuracy"
    >
      <DiagramSvg viewBox="0 0 240 120" minWidth={220}>
        <text x={120} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Accuracy = correct / total
        </text>
        {Array.from({ length: total }).map((_, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const isCorrect = i < correct;
          return (
            <rect
              key={i}
              x={40 + col * 32}
              y={32 + row * 32}
              width={26}
              height={26}
              rx={4}
              fill={isCorrect ? c.positiveDim : c.negativeDim}
              stroke={isCorrect ? c.positive : c.negative}
              strokeWidth={1}
            />
          );
        })}
        <text x={120} y={108} textAnchor="middle" fill={c.textBright} fontSize={10} fontFamily={font}>
          7 / 10 = 70%
        </text>
        <text x={196} y={48} fill={c.positive} fontSize={7} fontFamily={font}>
          ✓ correct
        </text>
        <text x={196} y={80} fill={c.negative} fontSize={7} fontFamily={font}>
          ✗ wrong
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function ROCAUCDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "The ROC curve plots true positive rate against false positive rate across thresholds; AUC summarizes ranking quality (1.0 = perfect, 0.5 = random)."
      }
      title="ROC curve and AUC"
    >
      <DiagramSvg viewBox="0 0 220 120" minWidth={200}>
        <line x1={36} y1={96} x2={184} y2={96} stroke={c.grid} strokeWidth={1} />
        <line x1={36} y1={96} x2={36} y2={24} stroke={c.grid} strokeWidth={1} />
        <line x1={36} y1={96} x2={184} y2={24} stroke={c.neutral} strokeWidth={1} strokeDasharray="4 3" />
        <path
          d="M 36 96 Q 60 96 80 72 Q 100 48 120 40 Q 140 32 184 24"
          fill={c.accentDim}
          stroke={c.accent}
          strokeWidth={2}
        />
        <text x={36} y={20} fill={c.text} fontSize={7} fontFamily={font}>
          TPR
        </text>
        <text x={176} y={104} fill={c.text} fontSize={7} fontFamily={font}>
          FPR
        </text>
        <text x={120} y={16} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          AUC = area under curve
        </text>
        <text x={120} y={112} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Higher curve → better classifier
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function MAERMSEDiagram({ caption }: { caption?: string }) {
  const points: [number, number][] = [
    [48, 68], [72, 52], [96, 56], [120, 44], [144, 48], [168, 36],
  ];
  const lineY = (x: number) => 80 - (x - 48) * 0.22;
  return (
    <VisualFigure
      caption={
        caption ??
        "MAE averages absolute prediction errors; RMSE squares errors first, penalizing large mistakes more heavily—both measure regression fit quality."
      }
      title="MAE and RMSE errors"
    >
      <DiagramSvg viewBox="0 0 220 120" minWidth={200}>
        <line x1={36} y1={96} x2={184} y2={96} stroke={c.grid} strokeWidth={1} />
        <line x1={36} y1={96} x2={36} y2={24} stroke={c.grid} strokeWidth={1} />
        <line x1={44} y1={88} x2={176} y2={32} stroke={c.accent} strokeWidth={1.5} />
        {points.map(([px, py], i) => {
          const predY = lineY(px);
          return (
            <g key={i}>
              <circle cx={px} cy={py} r={4} fill={c.positive} stroke={c.textBright} strokeWidth={1} />
              <line x1={px} y1={py} x2={px} y2={predY} stroke={c.negative} strokeWidth={1.5} strokeDasharray="2 2" />
            </g>
          );
        })}
        <text x={110} y={16} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          |y − ŷ| → MAE · (y − ŷ)² → MSE
        </text>
        <text x={110} y={112} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Vertical bars = individual errors
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
