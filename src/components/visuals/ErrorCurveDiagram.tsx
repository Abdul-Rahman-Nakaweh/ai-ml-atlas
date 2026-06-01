import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";
const labelBg = "rgba(15, 23, 42, 0.94)";

export type ErrorCurveVariant = "overfitting" | "underfitting";

function LegendPanel({
  x,
  y,
  items,
}: {
  x: number;
  y: number;
  items: { color: string; label: string }[];
}) {
  const rowH = 13;
  const padX = 6;
  const padY = 4;
  const lineW = 12;
  const textX = x + padX + lineW + 4;
  const width = 72;
  const height = padY * 2 + items.length * rowH;

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={3} fill={labelBg} stroke={c.grid} strokeWidth={0.75} />
      {items.map((item, i) => {
        const rowY = y + padY + i * rowH + rowH / 2;
        return (
          <g key={item.label}>
            <line x1={x + padX} y1={rowY} x2={x + padX + lineW} y2={rowY} stroke={item.color} strokeWidth={2} />
            <text x={textX} y={rowY + 3} fill={item.color} fontSize={7} fontFamily={font}>
              {item.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function CalloutLabel({
  x,
  y,
  width,
  text,
  anchorX,
  anchorY,
}: {
  x: number;
  y: number;
  width: number;
  text: string;
  anchorX: number;
  anchorY: number;
}) {
  const height = 16;
  const cx = x + width / 2;
  const cy = y + height / 2;

  return (
    <g>
      <line x1={cx} y1={y + height} x2={anchorX} y2={anchorY - 5} stroke={c.text} strokeWidth={0.75} opacity={0.7} />
      <rect x={x} y={y} width={width} height={height} rx={3} fill={labelBg} stroke={c.grid} strokeWidth={0.75} />
      <text x={cx} y={cy + 4} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
        {text}
      </text>
    </g>
  );
}

export function ErrorCurveDiagram({
  caption,
  variant = "overfitting",
}: {
  caption?: string;
  variant?: ErrorCurveVariant;
}) {
  const isUnderfitting = variant === "underfitting";
  const plot = { left: 44, top: 30, right: 268, bottom: 128 };

  return (
    <VisualFigure
      caption={
        caption ??
        (isUnderfitting
          ? "Underfitting: both training and validation error remain high because the model lacks capacity to capture the signal."
          : "Overfitting: training error continues to fall while validation error rises after a point, indicating poor generalization.")
      }
      title="Training versus validation error"
    >
      <DiagramSvg viewBox="0 0 320 172" minWidth={280}>
        <line x1={plot.left} y1={plot.bottom} x2={plot.right} y2={plot.bottom} stroke={c.grid} strokeWidth={1} />
        <line x1={plot.left} y1={plot.top} x2={plot.left} y2={plot.bottom} stroke={c.grid} strokeWidth={1} />
        <text x={plot.left - 4} y={plot.top + 4} textAnchor="end" fill={c.text} fontSize={8} fontFamily={font}>
          Error
        </text>
        <text x={(plot.left + plot.right) / 2} y={158} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Model complexity / epochs →
        </text>

        {isUnderfitting ? (
          <>
            <path d={`M ${plot.left} 96 Q 120 93 200 91 T ${plot.right} 89`} fill="none" stroke={c.accent} strokeWidth={2} />
            <path d={`M ${plot.left} 102 Q 120 99 200 97 T ${plot.right} 95`} fill="none" stroke={c.warn} strokeWidth={2} />
            <LegendPanel
              x={plot.left + 4}
              y={plot.top - 6}
              items={[
                { color: c.accent, label: "Training" },
                { color: c.warn, label: "Validation" },
              ]}
            />
            <g>
              <rect x={(plot.left + plot.right) / 2 - 62} y={72} width={124} height={18} rx={3} fill={labelBg} stroke={c.grid} strokeWidth={0.75} />
              <text x={(plot.left + plot.right) / 2} y={84} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
                High error on both sets
              </text>
            </g>
          </>
        ) : (
          <>
            <path d={`M ${plot.left} 118 C 90 98, 150 62, ${plot.right} 34`} fill="none" stroke={c.accent} strokeWidth={2} />
            <path
              d={`M ${plot.left} 112 C 88 88, 118 58, 138 56 C 158 54, 200 78, ${plot.right} 106`}
              fill="none"
              stroke={c.warn}
              strokeWidth={2}
            />
            <LegendPanel
              x={plot.left + 4}
              y={plot.top - 6}
              items={[
                { color: c.accent, label: "Training" },
                { color: c.warn, label: "Validation" },
              ]}
            />
            <circle cx={138} cy={56} r={4} fill={c.warn} stroke={c.textBright} strokeWidth={1} />
            <CalloutLabel x={154} y={30} width={118} text="Best generalization" anchorX={138} anchorY={56} />
            <g>
              <rect x={186} y={100} width={88} height={18} rx={3} fill={labelBg} stroke={c.grid} strokeWidth={0.75} />
              <text x={230} y={112} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
                Validation error rises
              </text>
            </g>
          </>
        )}
      </DiagramSvg>
    </VisualFigure>
  );
}
