import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const AXES = [
  { label: "Accuracy", ideal: 0.9 },
  { label: "Latency", ideal: 0.3 },
  { label: "Memory", ideal: 0.25 },
  { label: "Firmware", ideal: 0.2 },
  { label: "Power", ideal: 0.15 },
];

export function TinyMLTradeoffDiagram({ caption }: { caption?: string }) {
  const cx = 160;
  const cy = 88;
  const r = 52;
  return (
    <VisualFigure
      caption={
        caption ??
        "Embedded deployment balances accuracy against latency, SRAM, flash, firmware size, and power; no single model optimizes all constraints simultaneously."
      }
      title="TinyML deployment trade-offs"
    >
      <DiagramSvg viewBox="0 0 320 175" minWidth={260}>
        {AXES.map((axis, i) => {
          const angle = (i / AXES.length) * Math.PI * 2 - Math.PI / 2;
          const x2 = cx + Math.cos(angle) * r;
          const y2 = cy + Math.sin(angle) * r;
          const val = axis.ideal;
          const x3 = cx + Math.cos(angle) * r * val;
          const y3 = cy + Math.sin(angle) * r * val;
          const lx = cx + Math.cos(angle) * (r + 22);
          const ly = cy + Math.sin(angle) * (r + 22);
          return (
            <g key={axis.label}>
              <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={c.grid} strokeWidth={1} />
              <line x1={cx} y1={cy} x2={x3} y2={y3} stroke={c.accent} strokeWidth={2} />
              <circle cx={x3} cy={y3} r={3} fill={c.accent} />
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
                {axis.label}
              </text>
            </g>
          );
        })}
        <polygon
          points={AXES.map((axis, i) => {
            const angle = (i / AXES.length) * Math.PI * 2 - Math.PI / 2;
            const val = axis.ideal;
            return `${cx + Math.cos(angle) * r * val},${cy + Math.sin(angle) * r * val}`;
          }).join(" ")}
          fill={c.accentDim}
          stroke={c.accent}
          strokeWidth={1}
          opacity={0.6}
        />
      </DiagramSvg>
    </VisualFigure>
  );
}
