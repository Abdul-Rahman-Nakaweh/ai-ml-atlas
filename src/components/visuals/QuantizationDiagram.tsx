import { VisualFigure, visualColors as c } from "./shared";

export function QuantizationDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Quantization maps floating-point weights to lower-precision integers, reducing storage and accelerating inference with possible small accuracy change."
      }
      title="Numeric precision reduction"
    >
      <svg viewBox="0 0 300 120" className="w-full min-w-[260px] h-auto" aria-hidden>
        <text x={75} y={22} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily="system-ui">
          float32
        </text>
        <rect x={20} y={30} width={110} height={36} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        <text x={75} y={52} textAnchor="middle" fill={c.accent} fontSize={8} fontFamily="monospace">
          0.8472913
        </text>
        <path d="M 140 48 L 165 48" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#qarrow)" />
        <text x={152} y={40} textAnchor="middle" fill={c.text} fontSize={7} fontFamily="system-ui">
          scale
        </text>
        <defs>
          <marker id="qarrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={225} y={22} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily="system-ui">
          int8
        </text>
        <rect x={170} y={30} width={110} height={36} rx={4} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={225} y={52} textAnchor="middle" fill={c.positive} fontSize={10} fontFamily="monospace">
          108
        </text>
        <text x={150} y={95} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
          Smaller memory footprint · faster inference
        </text>
      </svg>
    </VisualFigure>
  );
}
