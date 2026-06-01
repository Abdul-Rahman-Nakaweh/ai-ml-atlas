import { VisualFigure, visualColors as c, DiagramSvg } from "../shared";

const font = "system-ui, sans-serif";

export function DatasetDiagram({ caption }: { caption?: string }) {
  const cols = ["ID", "Age", "Income", "Label"];
  const rows = [
    ["1", "34", "52k", "A"],
    ["2", "28", "41k", "B"],
    ["3", "45", "68k", "A"],
  ];
  const colW = 52;
  const rowH = 22;
  const startX = 16;
  const startY = 28;

  return (
    <VisualFigure
      caption={
        caption ??
        "A dataset is a structured collection of observations (rows) and variables (columns); each row is one sample, each column one feature or label."
      }
      title="Dataset as rows and columns"
    >
      <DiagramSvg viewBox="0 0 248 140" minWidth={220}>
        <text x={124} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Tabular dataset
        </text>
        {cols.map((col, i) => (
          <g key={col}>
            <rect
              x={startX + i * colW}
              y={startY}
              width={colW - 2}
              height={rowH}
              rx={3}
              fill={c.accentDim}
              stroke={c.accent}
              strokeWidth={1}
            />
            <text
              x={startX + i * colW + (colW - 2) / 2}
              y={startY + 14}
              textAnchor="middle"
              fill={c.textBright}
              fontSize={8}
              fontFamily={font}
            >
              {col}
            </text>
          </g>
        ))}
        {rows.map((row, ri) =>
          row.map((cell, ci) => (
            <g key={`${ri}-${ci}`}>
              <rect
                x={startX + ci * colW}
                y={startY + (ri + 1) * rowH}
                width={colW - 2}
                height={rowH}
                rx={2}
                fill={ci === cols.length - 1 ? c.positiveDim : "transparent"}
                stroke={c.grid}
                strokeWidth={0.75}
              />
              <text
                x={startX + ci * colW + (colW - 2) / 2}
                y={startY + (ri + 1) * rowH + 14}
                textAnchor="middle"
                fill={c.text}
                fontSize={8}
                fontFamily={font}
              >
                {cell}
              </text>
            </g>
          ))
        )}
        <text x={124} y={128} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Rows = samples · Columns = features / target
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function FeatureLabelDiagram({ caption }: { caption?: string }) {
  const features = ["x₁", "x₂", "x₃"];
  return (
    <VisualFigure
      caption={
        caption ??
        "Features (inputs) describe each observation; the label (target) is the quantity the model learns to predict from those features."
      }
      title="Features and label relationship"
    >
      <DiagramSvg viewBox="0 0 280 120" minWidth={240}>
        <defs>
          <marker id="flArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={70} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Features (X)
        </text>
        {features.map((f, i) => (
          <g key={f}>
            <rect x={24} y={28 + i * 26} width={92} height={20} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
            <text x={70} y={42 + i * 26} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
              {f}
            </text>
          </g>
        ))}
        <path d="M 128 54 L 168 54" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#flArrow)" />
        <rect x={172} y={36} width={88} height={36} rx={4} fill={c.positiveDim} stroke={c.positive} strokeWidth={1.5} />
        <text x={216} y={52} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Label (y)
        </text>
        <text x={216} y={66} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          target
        </text>
        <text x={140} y={108} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Model learns f(X) → y
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function TrainingInferenceDiagram({ caption }: { caption?: string }) {
  const stages = [
    { x: 16, label: "Training\nData", fill: c.accentDim, stroke: c.accent },
    { x: 108, label: "Model", fill: c.positiveDim, stroke: c.positive },
    { x: 200, label: "Predictions", fill: c.negativeDim, stroke: c.negative },
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "During training, the model adjusts its parameters on labeled data; at inference, the trained model maps new inputs to predictions without updating weights."
      }
      title="Training versus inference"
    >
      <DiagramSvg viewBox="0 0 296 118" minWidth={260}>
        <defs>
          <marker id="tiArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={148} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Training phase
        </text>
        {stages.map((s, i) => (
          <g key={s.label}>
            <rect x={s.x} y={24} width={72} height={40} rx={4} fill={s.fill} stroke={s.stroke} strokeWidth={1.5} />
            {s.label.split("\n").map((line, li) => (
              <text key={line} x={s.x + 36} y={42 + li * 12} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
                {line}
              </text>
            ))}
            {i < stages.length - 1 && (
              <path
                d={`M ${s.x + 76} 44 L ${stages[i + 1].x - 4} 44`}
                stroke={c.arrow}
                strokeWidth={1.5}
                markerEnd="url(#tiArrow)"
              />
            )}
          </g>
        ))}
        <rect x={108} y={72} width={72} height={32} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} strokeDasharray="4 3" />
        <text x={144} y={92} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Inference: new input → output
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function ParameterHyperparameterDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Parameters (weights, biases) are learned from data during training; hyperparameters (learning rate, depth) are set by the practitioner before training."
      }
      title="Parameters versus hyperparameters"
    >
      <DiagramSvg viewBox="0 0 280 140" minWidth={240}>
        <rect x={16} y={24} width={116} height={72} rx={6} fill={c.positiveDim} stroke={c.positive} strokeWidth={1.5} />
        <text x={74} y={44} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Parameters
        </text>
        <text x={74} y={60} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Learned from data
        </text>
        <text x={74} y={74} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          e.g. weights, biases
        </text>
        <rect x={148} y={24} width={116} height={72} rx={6} fill={c.warn} fillOpacity={0.15} stroke={c.warn} strokeWidth={1.5} />
        <text x={206} y={44} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Hyperparameters
        </text>
        <text x={206} y={60} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Configured by user
        </text>
        <text x={206} y={74} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          e.g. lr, max depth
        </text>
        <line x1={74} y1={98} x2={74} y2={110} stroke={c.positive} strokeWidth={1.5} />
        <polygon points="71,110 77,110 74,114" fill={c.positive} />
        <line x1={206} y1={98} x2={206} y2={110} stroke={c.warn} strokeWidth={1.5} />
        <polygon points="203,110 209,110 206,114" fill={c.warn} />
        <text x={74} y={126} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Updated each epoch
        </text>
        <text x={206} y={126} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Fixed per run
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
