import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

export function QuantizationDiagram({ caption }: { caption?: string }) {
  const floatX = 20;
  const floatW = 110;
  const intX = 170;
  const intW = 110;
  const boxY = 34;
  const boxH = 36;

  return (
    <VisualFigure
      caption={
        caption ??
        "Quantization maps floating-point weights to lower-precision integers, reducing storage and accelerating inference with possible small accuracy change."
      }
      title="Numeric precision reduction"
    >
      <DiagramSvg viewBox="0 0 300 120" minWidth={260}>
        <text x={floatX + floatW / 2} y={26} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          float32
        </text>
        <rect x={floatX} y={boxY} width={floatW} height={boxH} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        <text x={floatX + floatW / 2} y={boxY + 22} textAnchor="middle" fill={c.accent} fontSize={8} fontFamily="monospace">
          0.8472913
        </text>
        <path d={`M ${floatX + floatW + 8} ${boxY + boxH / 2} L ${intX - 8} ${boxY + boxH / 2}`} stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#qarrow)" />
        <text x={(floatX + floatW + intX) / 2} y={boxY + boxH / 2 - 8} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          scale
        </text>
        <defs>
          <marker id="qarrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={intX + intW / 2} y={26} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          int8
        </text>
        <rect x={intX} y={boxY} width={intW} height={boxH} rx={4} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={intX + intW / 2} y={boxY + 22} textAnchor="middle" fill={c.positive} fontSize={10} fontFamily="monospace">
          108
        </text>
        <text x={floatX + floatW / 2} y={96} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          High precision
        </text>
        <text x={intX + intW / 2} y={96} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Smaller · faster
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
