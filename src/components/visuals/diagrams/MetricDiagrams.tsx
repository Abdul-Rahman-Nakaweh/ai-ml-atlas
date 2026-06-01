import { VisualFigure, visualColors as c, DiagramSvg } from "../shared";



const font = "system-ui, sans-serif";



export function MAERMSEDiagram({ caption }: { caption?: string }) {

  const maeCx = 68;
  const rmseCx = 192;

  const points: [number, number][] = [

    [48, 68], [72, 52], [96, 56],

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

      <DiagramSvg viewBox="0 0 260 136" minWidth={240}>

        <line x1={130} y1={20} x2={130} y2={108} stroke={c.grid} strokeWidth={1} />



        <text x={maeCx} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font} fontWeight="600">

          MAE

        </text>

        <line x1={20} y1={88} x2={116} y2={88} stroke={c.grid} strokeWidth={1} />

        <line x1={20} y1={88} x2={20} y2={32} stroke={c.grid} strokeWidth={1} />

        <line x1={44} y1={80} x2={108} y2={40} stroke={c.accent} strokeWidth={1.5} />

        {points.map(([px, py], i) => {

          const predY = lineY(px);

          return (

            <g key={i}>

              <circle cx={px} cy={py} r={3.5} fill={c.positive} stroke={c.textBright} strokeWidth={1} />

              <line x1={px} y1={py} x2={px} y2={predY} stroke={c.negative} strokeWidth={1.5} strokeDasharray="2 2" />

            </g>

          );

        })}

        <text x={maeCx} y={104} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>

          |y − ŷ|

        </text>

        <text x={maeCx} y={118} textAnchor="middle" fill={c.positive} fontSize={7} fontFamily={font}>

          Linear error penalty

        </text>



        <text x={rmseCx} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font} fontWeight="600">

          RMSE

        </text>

        <line x1={144} y1={88} x2={240} y2={88} stroke={c.grid} strokeWidth={1} />

        <line x1={144} y1={88} x2={144} y2={32} stroke={c.grid} strokeWidth={1} />

        <line x1={168} y1={80} x2={232} y2={40} stroke={c.accent} strokeWidth={1.5} />

        {points.map(([px, py], i) => {

          const shiftedX = px + 96;

          const predY = lineY(px);

          return (

            <g key={`r-${i}`}>

              <circle cx={shiftedX} cy={py} r={3.5} fill={c.positive} stroke={c.textBright} strokeWidth={1} />

              <line x1={shiftedX} y1={py} x2={shiftedX} y2={predY} stroke={c.negative} strokeWidth={1.5} strokeDasharray="2 2" />

            </g>

          );

        })}

        <text x={rmseCx} y={104} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>

          √[(y − ŷ)²]

        </text>

        <text x={rmseCx} y={118} textAnchor="middle" fill={c.warn} fontSize={7} fontFamily={font}>

          Penalizes large errors

        </text>



        <text x={130} y={132} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>

          Vertical bars = individual residuals

        </text>

      </DiagramSvg>

    </VisualFigure>

  );

}



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
      <DiagramSvg viewBox="0 0 220 148" minWidth={200}>
        <text x={110} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Accuracy = correct / total
        </text>
        {Array.from({ length: total }).map((_, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const isCorrect = i < correct;
          return (
            <rect
              key={i}
              x={48 + col * 28}
              y={32 + row * 28}
              width={24}
              height={24}
              rx={4}
              fill={isCorrect ? c.positiveDim : c.negativeDim}
              stroke={isCorrect ? c.positive : c.negative}
              strokeWidth={1}
            />
          );
        })}
        <text x={110} y={100} textAnchor="middle" fill={c.textBright} fontSize={10} fontFamily={font}>
          7 / 10 = 70%
        </text>
        <text x={62} y={122} textAnchor="middle" fill={c.positive} fontSize={7} fontFamily={font}>
          ✓ correct
        </text>
        <text x={158} y={122} textAnchor="middle" fill={c.negative} fontSize={7} fontFamily={font}>
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
      <DiagramSvg viewBox="0 0 220 132" minWidth={200}>
        <line x1={36} y1={96} x2={184} y2={96} stroke={c.grid} strokeWidth={1} />
        <line x1={36} y1={96} x2={36} y2={24} stroke={c.grid} strokeWidth={1} />
        <line x1={36} y1={96} x2={184} y2={24} stroke={c.neutral} strokeWidth={1} strokeDasharray="4 3" />
        <path
          d="M 36 96 Q 60 96 80 72 Q 100 48 120 40 Q 140 32 184 24"
          fill={c.accentDim}
          stroke={c.accent}
          strokeWidth={2}
        />
        <text x={32} y={28} textAnchor="end" fill={c.text} fontSize={7} fontFamily={font}>
          TPR
        </text>
        <text x={110} y={104} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          FPR
        </text>
        <text x={110} y={16} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          AUC = area under curve
        </text>
        <text x={110} y={120} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Higher curve → better classifier
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
