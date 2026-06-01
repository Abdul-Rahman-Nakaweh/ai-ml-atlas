import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

export function TinyMLTradeoffDiagram({ caption }: { caption?: string }) {
  const cx = 160;
  const cy = 96;
  const r = 46;
  const labelR = r + 30;
  const AXES = [
    { label: "Accuracy", ideal: 0.9 },
    { label: "Latency", ideal: 0.3 },
    { label: "Memory", ideal: 0.25 },
    { label: "Firmware", ideal: 0.2 },
    { label: "Power", ideal: 0.15 },
  ];

  function labelAnchor(angle: number): "start" | "middle" | "end" {
    const deg = (angle * 180) / Math.PI;
    if (deg > -30 && deg < 30) return "start";
    if (deg > 150 || deg < -150) return "end";
    return "middle";
  }

  return (
    <VisualFigure
      caption={
        caption ??
        "Embedded deployment balances accuracy against latency, SRAM, flash, firmware size, and power; no single model optimizes all constraints simultaneously."
      }
      title="TinyML deployment trade-offs"
    >
      <DiagramSvg viewBox="0 0 320 196" minWidth={260}>
        {/* Title sits above the top (Accuracy) axis label */}
        <text x={160} y={10} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Competing constraints on device
        </text>
        {AXES.map((axis, i) => {
          const angle = (i / AXES.length) * Math.PI * 2 - Math.PI / 2;
          const x2 = cx + Math.cos(angle) * r;
          const y2 = cy + Math.sin(angle) * r;
          const val = axis.ideal;
          const x3 = cx + Math.cos(angle) * r * val;
          const y3 = cy + Math.sin(angle) * r * val;
          const lx = cx + Math.cos(angle) * labelR;
          const ly = cy + Math.sin(angle) * labelR;
          return (
            <g key={axis.label}>
              <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={c.grid} strokeWidth={1} />
              <line x1={cx} y1={cy} x2={x3} y2={y3} stroke={c.accent} strokeWidth={2} />
              <circle cx={x3} cy={y3} r={3} fill={c.accent} />
              <text
                x={lx}
                y={ly}
                textAnchor={labelAnchor(angle)}
                dominantBaseline="middle"
                fill={c.text}
                fontSize={8}
                fontFamily={font}
              >
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
        <text x={160} y={182} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Shrink one axis → another often worsens
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
