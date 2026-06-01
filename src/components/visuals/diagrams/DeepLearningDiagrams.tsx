import { VisualFigure, visualColors as c } from "../shared";
import { DiagramSvg } from "./DiagramSvg";

const font = "system-ui, sans-serif";

export function CNNDiagram({ caption }: { caption?: string }) {
  const gridSize = 5;
  const cell = 12;
  const startX = 24;
  const startY = 28;
  return (
    <VisualFigure
      caption={
        caption ??
        "Convolutional layers slide learnable filters over spatial input grids, detecting local patterns and building hierarchical feature maps."
      }
      title="Convolutional filter over grid"
    >
      <DiagramSvg viewBox="0 0 260 120" minWidth={220}>
        <text x={60} y={18} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Input grid
        </text>
        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;
          const highlighted = row >= 1 && row <= 2 && col >= 1 && col <= 2;
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
        <path d="M 100 52 L 128 52" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#cnnArrow)" />
        <defs>
          <marker id="cnnArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <rect x={132} y={40} width={36} height={36} rx={3} fill={c.positiveDim} stroke={c.positive} strokeWidth={1.5} />
        <text x={150} y={62} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          3×3
        </text>
        <text x={150} y={74} textAnchor="middle" fill={c.text} fontSize={6} fontFamily={font}>
          filter
        </text>
        <path d="M 176 58 L 196 58" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#cnnArrow)" />
        <rect x={200} y={48} width={28} height={20} rx={3} fill={c.negativeDim} stroke={c.negative} strokeWidth={1.5} />
        <text x={214} y={62} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          map
        </text>
        <text x={130} y={108} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
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
  return (
    <VisualFigure
      caption={
        caption ??
        "Gradient descent iteratively moves parameters downhill along the loss surface, stepping in the direction opposite to the gradient."
      }
      title="Gradient descent on loss curve"
    >
      <DiagramSvg viewBox="0 0 220 120" minWidth={200}>
        <line x1={36} y1={96} x2={184} y2={96} stroke={c.grid} strokeWidth={1} />
        <line x1={36} y1={96} x2={36} y2={24} stroke={c.grid} strokeWidth={1} />
        <path
          d="M 44 88 Q 80 88 100 48 Q 120 28 176 40"
          fill="none"
          stroke={c.accent}
          strokeWidth={2}
        />
        {[
          [52, 82],
          [72, 68],
          [92, 52],
          [112, 38],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={4} fill={c.positive} stroke={c.textBright} strokeWidth={1} />
            {i < 3 && (
              <line x1={x} y1={y} x2={[72, 92, 112][i]} y2={[68, 52, 38][i]} stroke={c.warn} strokeWidth={1} strokeDasharray="3 2" />
            )}
          </g>
        ))}
        <text x={36} y={20} fill={c.text} fontSize={7} fontFamily={font}>
          Loss
        </text>
        <text x={170} y={104} fill={c.text} fontSize={7} fontFamily={font}>
          θ →
        </text>
        <text x={110} y={16} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          θ ← θ − η∇L
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
