import { VisualFigure, visualColors as c, DiagramSvg } from "../shared";

const font = "system-ui, sans-serif";
const labelBg = "rgba(15, 23, 42, 0.94)";

export function ActivationFunctionDiagram({ caption }: { caption?: string }) {
  const reluCx = 70;
  const sigCx = 190;
  const plotTop = 28;
  const plotBottom = 88;
  const plotMid = (plotTop + plotBottom) / 2;

  return (
    <VisualFigure
      caption={
        caption ??
        "Activation functions introduce nonlinearity after each layer. ReLU is common in hidden layers; sigmoid squashes values to a probability-like range."
      }
      title="ReLU versus sigmoid"
    >
      <DiagramSvg viewBox="0 0 260 132" minWidth={240}>
        <line x1={130} y1={plotTop - 4} x2={130} y2={plotBottom + 8} stroke={c.grid} strokeWidth={1} />

        <text x={reluCx} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font} fontWeight="600">
          ReLU
        </text>
        <line x1={24} y1={plotBottom} x2={116} y2={plotBottom} stroke={c.grid} strokeWidth={1} />
        <line x1={24} y1={plotBottom} x2={24} y2={plotTop} stroke={c.grid} strokeWidth={1} />
        <path d="M 24 58 L 58 58 L 116 28" fill="none" stroke={c.positive} strokeWidth={2} />
        <text x={reluCx} y={104} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          max(0, x)
        </text>
        <text x={reluCx} y={118} textAnchor="middle" fill={c.positive} fontSize={7} fontFamily={font}>
          Hidden layers
        </text>

        <text x={sigCx} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font} fontWeight="600">
          Sigmoid
        </text>
        <line x1={144} y1={plotBottom} x2={236} y2={plotBottom} stroke={c.grid} strokeWidth={1} />
        <line x1={144} y1={plotBottom} x2={144} y2={plotTop} stroke={c.grid} strokeWidth={1} />
        <line x1={144} y1={plotMid} x2={236} y2={plotMid} stroke={c.neutral} strokeWidth={0.75} strokeDasharray="3 2" />
        <path
          d="M 148 82 C 168 82, 176 32, 190 30 C 204 28, 212 82, 232 82"
          fill="none"
          stroke={c.accent}
          strokeWidth={2}
        />
        <text x={140} y={plotMid - 4} textAnchor="end" fill={c.text} fontSize={6} fontFamily={font}>
          1
        </text>
        <text x={140} y={plotBottom + 2} textAnchor="end" fill={c.text} fontSize={6} fontFamily={font}>
          0
        </text>
        <text x={sigCx} y={104} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          σ(x) → (0, 1)
        </text>
        <text x={sigCx} y={118} textAnchor="middle" fill={c.accent} fontSize={7} fontFamily={font}>
          Gates & probabilities
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function CNNDiagram({ caption }: { caption?: string }) {
  const gridSize = 5;
  const cell = 12;
  const startX = 24;
  const startY = 32;
  const gridCenterX = startX + (gridSize * cell) / 2;
  const filterOrigin = { row: 1, col: 1, size: 3 };

  return (
    <VisualFigure
      caption={
        caption ??
        "Convolutional layers slide learnable filters over spatial input grids, detecting local patterns and building hierarchical feature maps."
      }
      title="Convolutional filter over grid"
    >
      <DiagramSvg viewBox="0 0 260 124" minWidth={220}>
        <text x={gridCenterX} y={22} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Input grid
        </text>
        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;
          const highlighted =
            row >= filterOrigin.row &&
            row < filterOrigin.row + filterOrigin.size &&
            col >= filterOrigin.col &&
            col < filterOrigin.col + filterOrigin.size;
          return (
            <rect
              key={i}
              x={startX + col * cell}
              y={startY + row * cell}
              width={cell - 1}
              height={cell - 1}
              fill={highlighted ? c.accentDim : c.grid}
              fillOpacity={highlighted ? 1 : 0.4}
              stroke={highlighted ? c.accent : c.grid}
              strokeWidth={0.75}
            />
          );
        })}
        <rect
          x={startX + filterOrigin.col * cell - 1}
          y={startY + filterOrigin.row * cell - 1}
          width={filterOrigin.size * cell + 1}
          height={filterOrigin.size * cell + 1}
          fill="none"
          stroke={c.accent}
          strokeWidth={1.5}
          rx={1}
        />
        <defs>
          <marker id="cnnArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <path d="M 100 56 L 128 56" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#cnnArrow)" />
        <rect x={132} y={44} width={36} height={36} rx={3} fill={c.positiveDim} stroke={c.positive} strokeWidth={1.5} />
        <text x={150} y={58} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          3×3
        </text>
        <text x={150} y={72} textAnchor="middle" fill={c.text} fontSize={6} fontFamily={font}>
          filter
        </text>
        <path d="M 176 62 L 196 62" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#cnnArrow)" />
        <rect x={200} y={52} width={28} height={20} rx={3} fill={c.negativeDim} stroke={c.negative} strokeWidth={1.5} />
        <text x={214} y={66} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          map
        </text>
        <text x={130} y={112} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Filter slides → feature map
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function RNNLSTMDiagram({ caption }: { caption?: string }) {
  const steps = ["x₁", "x₂", "x₃", "x₄"];
  return (
    <VisualFigure
      caption={
        caption ??
        "Recurrent networks (RNN/LSTM) process sequences step by step, passing a hidden state forward to capture temporal dependencies."
      }
      title="Sequential RNN flow"
    >
      <DiagramSvg viewBox="0 0 280 108" minWidth={240}>
        <defs>
          <marker id="rnnArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.accent} />
          </marker>
        </defs>
        {steps.map((step, i) => (
          <g key={step}>
            <rect x={20 + i * 60} y={36} width={44} height={36} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1.5} />
            <text x={42 + i * 60} y={50} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
              h
            </text>
            <text x={42 + i * 60} y={64} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
              {step}
            </text>
            {i < steps.length - 1 && (
              <path
                d={`M ${64 + i * 60} 54 Q ${72 + i * 60} 24 ${80 + i * 60} 54`}
                fill="none"
                stroke={c.accent}
                strokeWidth={1.5}
                markerEnd="url(#rnnArrow)"
              />
            )}
          </g>
        ))}
        <text x={140} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Hidden state flows across time
        </text>
        <text x={140} y={96} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          {"Each step: h_t = f(h_{t-1}, x_t)"}
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function BackpropagationDiagram({ caption }: { caption?: string }) {
  const layers = [
    { x: 40, label: "Input" },
    { x: 110, label: "Hidden" },
    { x: 180, label: "Output" },
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "Backpropagation computes gradients of the loss with respect to each weight by applying the chain rule, flowing error signals backward through the network."
      }
      title="Backpropagation flow"
    >
      <DiagramSvg viewBox="0 0 240 120" minWidth={220}>
        <defs>
          <marker id="bpFwd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.positive} />
          </marker>
          <marker id="bpBwd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.negative} />
          </marker>
        </defs>
        {layers.map((l) => (
          <g key={l.label}>
            <circle cx={l.x} cy={52} r={16} fill={c.accentDim} stroke={c.accent} strokeWidth={1.5} />
            <text x={l.x} y={56} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
              {l.label}
            </text>
          </g>
        ))}
        <path d="M 58 52 L 92 52" stroke={c.positive} strokeWidth={1.5} markerEnd="url(#bpFwd)" />
        <path d="M 128 52 L 162 52" stroke={c.positive} strokeWidth={1.5} markerEnd="url(#bpFwd)" />
        <path d="M 162 68 L 128 68" stroke={c.negative} strokeWidth={1.5} strokeDasharray="4 2" markerEnd="url(#bpBwd)" />
        <path d="M 92 68 L 58 68" stroke={c.negative} strokeWidth={1.5} strokeDasharray="4 2" markerEnd="url(#bpBwd)" />
        <rect x={88} y={84} width={64} height={20} rx={4} fill={c.warn} fillOpacity={0.2} stroke={c.warn} strokeWidth={1} />
        <text x={120} y={98} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Loss L
        </text>
        <text x={120} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Forward → · ← Backward gradients
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function GradientDescentDiagram({ caption }: { caption?: string }) {
  const plot = { left: 52, top: 36, right: 196, bottom: 104 };
  const thetaMin = 128;
  const lossMinY = 42;
  const k = 0.0075;

  /** Convex bowl J(θ): loss decreases as θ approaches θ_min */
  const lossY = (theta: number) => lossMinY + k * (theta - thetaMin) ** 2;

  const thetas = [62, 86, 108, 122];
  const steps: [number, number][] = thetas.map((theta) => [theta, lossY(theta)] as [number, number]);
  const last = steps[steps.length - 1];

  const curvePoints = Array.from({ length: 25 }, (_, i) => {
    const theta = plot.left + (i / 24) * (plot.right - plot.left);
    return `${theta},${lossY(theta)}`;
  }).join(" L ");

  return (
    <VisualFigure
      caption={
        caption ??
        "Gradient descent iteratively moves parameters downhill along the loss surface, stepping in the direction opposite to the gradient."
      }
      title="Gradient descent on loss curve"
    >
      <DiagramSvg viewBox="0 0 248 140" minWidth={230}>
        <defs>
          <marker id="gdStep" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill={c.warn} />
          </marker>
        </defs>

        <line x1={plot.left} y1={plot.bottom} x2={plot.right} y2={plot.bottom} stroke={c.grid} strokeWidth={1} />
        <line x1={plot.left} y1={plot.top} x2={plot.left} y2={plot.bottom} stroke={c.grid} strokeWidth={1} />
        <text x={plot.left - 4} y={plot.top + 2} textAnchor="end" fill={c.text} fontSize={7} fontFamily={font}>
          Loss J(θ)
        </text>
        <text x={(plot.left + plot.right) / 2} y={132} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Parameters θ →
        </text>

        <path d={`M ${curvePoints}`} fill="none" stroke={c.accent} strokeWidth={2} />

        {steps.map(([x, y], i) => (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={i === steps.length - 1 ? 4.5 : 3.5}
              fill={i === steps.length - 1 ? c.positive : c.accentDim}
              stroke={c.positive}
              strokeWidth={1}
            />
            {i < steps.length - 1 && (
              <line
                x1={x}
                y1={y}
                x2={steps[i + 1][0]}
                y2={steps[i + 1][1]}
                stroke={c.warn}
                strokeWidth={1.25}
                strokeDasharray="3 2"
                markerEnd="url(#gdStep)"
              />
            )}
            {i === 0 && (
              <text x={x - 2} y={y + 14} textAnchor="middle" fill={c.text} fontSize={6} fontFamily={font}>
                start
              </text>
            )}
          </g>
        ))}

        <circle cx={thetaMin} cy={lossMinY} r={2} fill={c.positive} opacity={0.5} />

        <rect x={154} y={12} width={86} height={28} rx={4} fill={labelBg} stroke={c.grid} strokeWidth={0.75} />
        <text x={197} y={24} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          θ ← θ − α∇J
        </text>
        <text x={197} y={34} textAnchor="middle" fill={c.text} fontSize={6} fontFamily={font}>
          move opposite to gradient
        </text>

        <rect x={thetaMin - 28} y={lossMinY + 10} width={56} height={14} rx={3} fill={labelBg} stroke={c.grid} strokeWidth={0.75} />
        <text x={thetaMin} y={lossMinY + 20} textAnchor="middle" fill={c.positive} fontSize={7} fontFamily={font}>
          minimum
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
