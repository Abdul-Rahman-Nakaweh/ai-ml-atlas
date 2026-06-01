import { VisualFigure, visualColors as c } from "../shared";
import { DiagramSvg } from "./DiagramSvg";

const font = "system-ui, sans-serif";

export function StandardizationDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Standardization rescales features to zero mean and unit variance (z-scores), centering the distribution at 0 with comparable spread across features."
      }
      title="Feature standardization"
    >
      <DiagramSvg viewBox="0 0 280 120" minWidth={240}>
        <line x1={40} y1={88} x2={240} y2={88} stroke={c.grid} strokeWidth={1} />
        <line x1={140} y1={24} x2={140} y2={96} stroke={c.positive} strokeWidth={1} strokeDasharray="3 2" />
        <text x={140} y={18} textAnchor="middle" fill={c.positive} fontSize={8} fontFamily={font}>
          μ = 0
        </text>
        <path
          d="M 60 88 Q 100 88 120 60 Q 140 32 160 60 Q 180 88 220 88"
          fill={c.accentDim}
          stroke={c.accent}
          strokeWidth={1.5}
        />
        <text x={70} y={108} fill={c.text} fontSize={7} fontFamily={font}>
          Before: varied scale
        </text>
        <text x={180} y={108} fill={c.textBright} fontSize={7} fontFamily={font}>
          After: centered at 0
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function NormalizationDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Min-max normalization maps values into a fixed range (typically [0, 1]), preserving relative ordering while bounding magnitude."
      }
      title="Min-max normalization"
    >
      <DiagramSvg viewBox="0 0 280 120" minWidth={240}>
        <rect x={40} y={28} width={200} height={56} rx={4} fill={c.grid} fillOpacity={0.3} stroke={c.grid} strokeWidth={1} />
        <rect x={40} y={52} width={200} height={32} rx={2} fill={c.accentDim} stroke={c.accent} strokeWidth={1.5} />
        <text x={40} y={22} fill={c.text} fontSize={8} fontFamily={font}>
          0
        </text>
        <text x={232} y={22} fill={c.text} fontSize={8} fontFamily={font}>
          1
        </text>
        {[0.2, 0.45, 0.7, 0.9].map((v, i) => (
          <circle key={i} cx={40 + v * 200} cy={68} r={5} fill={c.positive} stroke={c.textBright} strokeWidth={1} />
        ))}
        <text x={140} y={108} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          x_norm = (x − min) / (max − min)
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function OneHotEncodingDiagram({ caption }: { caption?: string }) {
  const cats = ["Red", "Blue", "Green"];
  const matrix = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "One-hot encoding converts categorical values into binary indicator columns—exactly one column is 1 per row, eliminating false ordinal relationships."
      }
      title="One-hot encoding"
    >
      <DiagramSvg viewBox="0 0 280 128" minWidth={240}>
        <defs>
          <marker id="ohArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={44} y={20} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Category
        </text>
        {cats.map((cat, i) => (
          <g key={cat}>
            <rect x={16} y={28 + i * 24} width={56} height={20} rx={3} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
            <text x={44} y={42 + i * 24} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
              {cat}
            </text>
          </g>
        ))}
        <path d="M 80 52 L 108 52" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#ohArrow)" />
        <text x={188} y={20} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Binary columns
        </text>
        {["R", "B", "G"].map((h, hi) => (
          <text key={h} x={132 + hi * 36} y={20} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
            {h}
          </text>
        ))}
        {matrix.map((row, ri) =>
          row.map((val, ci) => (
            <g key={`${ri}-${ci}`}>
              <rect
                x={116 + ci * 36}
                y={28 + ri * 24}
                width={32}
                height={20}
                rx={2}
                fill={val ? c.positiveDim : "transparent"}
                stroke={c.grid}
                strokeWidth={0.75}
              />
              <text
                x={132 + ci * 36}
                y={42 + ri * 24}
                textAnchor="middle"
                fill={val ? c.positive : c.neutral}
                fontSize={8}
                fontFamily={font}
              >
                {val}
              </text>
            </g>
          ))
        )}
        <text x={140} y={116} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          One active bit per category
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function FeatureSelectionExtractionDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Feature selection retains a subset of original columns; feature extraction creates new derived representations (e.g. PCA components) from the inputs."
      }
      title="Feature selection versus extraction"
    >
      <DiagramSvg viewBox="0 0 280 128" minWidth={240}>
        <text x={70} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Selection
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={`s-${i}`}
            x={24 + i * 18}
            y={28}
            width={14}
            height={36}
            rx={2}
            fill={i % 2 === 0 ? c.positiveDim : c.grid}
            fillOpacity={i % 2 === 0 ? 1 : 0.25}
            stroke={i % 2 === 0 ? c.positive : c.grid}
            strokeWidth={0.75}
          />
        ))}
        <text x={70} y={78} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Keep subset of originals
        </text>
        <text x={210} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Extraction
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`e-in-${i}`} x={164 + i * 12} y={28} width={10} height={36} rx={2} fill={c.accentDim} stroke={c.accent} strokeWidth={0.5} />
        ))}
        <path d="M 224 46 L 240 46" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#feArrow)" />
        <defs>
          <marker id="feArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        {[0, 1].map((i) => (
          <rect
            key={`e-out-${i}`}
            x={244 + i * 16}
            y={34}
            width={14}
            height={24}
            rx={2}
            fill={c.negativeDim}
            stroke={c.negative}
            strokeWidth={1}
          />
        ))}
        <text x={210} y={78} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Transform → new features
        </text>
        <text x={140} y={116} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Selection reduces columns · Extraction creates them
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
