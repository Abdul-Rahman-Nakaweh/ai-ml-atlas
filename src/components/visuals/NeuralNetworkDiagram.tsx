import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

function Layer({ x, nodes, label }: { x: number; nodes: number; label: string }) {
  const spacing = 28;
  const startY = 80 - ((nodes - 1) * spacing) / 2;
  return (
    <g>
      {Array.from({ length: nodes }).map((_, i) => (
        <circle
          key={i}
          cx={x}
          cy={startY + i * spacing}
          r={8}
          fill={c.accentDim}
          stroke={c.accent}
          strokeWidth={1}
        />
      ))}
      <text x={x} y={145} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
        {label}
      </text>
    </g>
  );
}

export function NeuralNetworkDiagram({ caption }: { caption?: string }) {
  const layers = [
    { x: 50, n: 3, label: "Input" },
    { x: 130, n: 4, label: "Hidden" },
    { x: 210, n: 2, label: "Output" },
  ];
  const connections: [number, number, number, number][] = [];
  layers.forEach((l, li) => {
    if (li === layers.length - 1) return;
    const next = layers[li + 1];
    const s1 = 80 - ((l.n - 1) * 28) / 2;
    const s2 = 80 - ((next.n - 1) * 28) / 2;
    for (let i = 0; i < l.n; i++) {
      for (let j = 0; j < next.n; j++) {
        connections.push([l.x, s1 + i * 28, next.x, s2 + j * 28]);
      }
    }
  });

  return (
    <VisualFigure
      caption={
        caption ??
        "A feedforward neural network passes activations through layers of connected units; weights are learned by backpropagation."
      }
      title="Feedforward neural network layers"
    >
      <DiagramSvg viewBox="0 0 260 155" minWidth={220}>
        {connections.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c.grid} strokeWidth={0.75} opacity={0.7} />
        ))}
        {layers.map((l) => (
          <Layer key={l.label} x={l.x} nodes={l.n} label={l.label} />
        ))}
      </DiagramSvg>
    </VisualFigure>
  );
}
