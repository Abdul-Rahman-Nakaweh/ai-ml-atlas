import { VisualFigure, visualColors as c, DiagramSvg } from "../shared";

const font = "system-ui, sans-serif";

export function StandardizationDiagram({ caption }: { caption?: string }) {
  const beforeCx = 70;
  const afterCx = 210;

  return (
    <VisualFigure
      caption={
        caption ??
        "Standardization rescales features to zero mean and unit variance (z-scores), centering the distribution at 0 with comparable spread across features."
      }
      title="Feature standardization"
    >
      <DiagramSvg viewBox="0 0 280 128" minWidth={240}>
        <line x1={140} y1={20} x2={140} y2={100} stroke={c.grid} strokeWidth={1} />

        <text x={beforeCx} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Before
        </text>
        <line x1={24} y1={88} x2={116} y2={88} stroke={c.grid} strokeWidth={1} />
        <path
          d="M 28 88 Q 52 88 64 52 Q 76 28 88 52 Q 100 76 112 88"
          fill={c.accentDim}
          stroke={c.accent}
          strokeWidth={1.5}
        />
        <text x={beforeCx} y={108} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Varied scale
        </text>

        <text x={afterCx} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          After
        </text>
        <line x1={164} y1={88} x2={256} y2={88} stroke={c.grid} strokeWidth={1} />
        <line x1={afterCx} y1={32} x2={afterCx} y2={96} stroke={c.positive} strokeWidth={1} strokeDasharray="3 2" />
        <text x={afterCx} y={26} textAnchor="middle" fill={c.positive} fontSize={8} fontFamily={font}>
          μ = 0
        </text>
        <path
          d="M 168 88 Q 188 88 198 60 Q 210 32 222 60 Q 234 88 252 88"
          fill={c.accentDim}
          stroke={c.accent}
          strokeWidth={1.5}
        />
        <text x={afterCx} y={108} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          Centered at 0
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function NormalizationDiagram({ caption }: { caption?: string }) {
  const barX = 40;
  const barW = 200;
  return (
    <VisualFigure
      caption={
        caption ??
        "Min-max normalization maps values into a fixed range (typically [0, 1]), preserving relative ordering while bounding magnitude."
      }
      title="Min-max normalization"
    >
      <DiagramSvg viewBox="0 0 280 128" minWidth={240}>
        <rect x={barX} y={28} width={barW} height={56} rx={4} fill={c.grid} fillOpacity={0.3} stroke={c.grid} strokeWidth={1} />
        <rect x={barX} y={52} width={barW} height={32} rx={2} fill={c.accentDim} stroke={c.accent} strokeWidth={1.5} />
        <text x={barX} y={22} textAnchor="start" fill={c.text} fontSize={8} fontFamily={font}>
          0
        </text>
        <text x={barX + barW} y={22} textAnchor="end" fill={c.text} fontSize={8} fontFamily={font}>
          1
        </text>
        {[0.2, 0.45, 0.7, 0.9].map((v, i) => (
          <circle key={i} cx={barX + v * barW} cy={68} r={5} fill={c.positive} stroke={c.textBright} strokeWidth={1} />
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
  const catColX = 44;
  const binStartX = 118;
  const colW = 36;
  const headers = ["R", "B", "G"];
  const binCx = binStartX + (headers.length * colW) / 2;

  return (
    <VisualFigure
      caption={
        caption ??
        "One-hot encoding converts categorical values into binary indicator columns—exactly one column is 1 per row, eliminating false ordinal relationships."
      }
      title="One-hot encoding"
    >
      <DiagramSvg viewBox="0 0 280 132" minWidth={240}>
        <defs>
          <marker id="ohArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={catColX} y={18} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Category
        </text>
        {cats.map((cat, i) => (
          <g key={cat}>
            <rect x={16} y={28 + i * 24} width={56} height={20} rx={3} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
            <text x={catColX} y={42 + i * 24} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
              {cat}
            </text>
          </g>
        ))}
        <path d="M 76 52 L 96 52" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#ohArrow)" />
        <text x={binCx} y={10} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Binary columns
        </text>
        {headers.map((h, hi) => (
          <text key={h} x={binStartX + hi * colW + colW / 2} y={22} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
            {h}
          </text>
        ))}
        {matrix.map((row, ri) =>
          row.map((val, ci) => (
            <g key={`${ri}-${ci}`}>
              <rect
                x={binStartX + ci * colW}
                y={28 + ri * 24}
                width={colW - 4}
                height={20}
                rx={2}
                fill={val ? c.positiveDim : "transparent"}
                stroke={c.grid}
                strokeWidth={0.75}
              />
              <text
                x={binStartX + ci * colW + (colW - 4) / 2}
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
        <text x={140} y={118} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          One active bit per category
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function FeatureSelectionExtractionDiagram({ caption }: { caption?: string }) {
  const selBarW = 14;
  const selGap = 4;
  const selCount = 5;
  const selGroupW = selCount * selBarW + (selCount - 1) * selGap;
  const selCx = 72;

  const inBarW = 10;
  const inGap = 2;
  const inCount = 5;
  const inGroupW = inCount * inBarW + (inCount - 1) * inGap;
  const outBarW = 14;
  const outGap = 4;
  const outCount = 2;
  const extCx = 228;
  const inStartX = extCx - (inGroupW + 20 + outCount * outBarW + (outCount - 1) * outGap) / 2;

  return (
    <VisualFigure
      caption={
        caption ??
        "Feature selection retains a subset of original columns; feature extraction creates new derived representations (e.g. PCA components) from the inputs."
      }
      title="Feature selection versus extraction"
    >
      <DiagramSvg viewBox="0 0 300 136" minWidth={260}>
        <defs>
          <marker id="feArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={selCx} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Selection
        </text>
        {Array.from({ length: selCount }).map((_, i) => (
          <rect
            key={`s-${i}`}
            x={selCx - selGroupW / 2 + i * (selBarW + selGap)}
            y={28}
            width={selBarW}
            height={36}
            rx={2}
            fill={i % 2 === 0 ? c.positiveDim : c.grid}
            fillOpacity={i % 2 === 0 ? 1 : 0.25}
            stroke={i % 2 === 0 ? c.positive : c.grid}
            strokeWidth={0.75}
          />
        ))}
        <text x={selCx} y={78} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Keep subset of originals
        </text>

        <text x={extCx} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Extraction
        </text>
        {Array.from({ length: inCount }).map((_, i) => (
          <rect
            key={`e-in-${i}`}
            x={inStartX + i * (inBarW + inGap)}
            y={28}
            width={inBarW}
            height={36}
            rx={2}
            fill={c.accentDim}
            stroke={c.accent}
            strokeWidth={0.5}
          />
        ))}
        <path
          d={`M ${inStartX + inGroupW + 6} 46 L ${inStartX + inGroupW + 22} 46`}
          stroke={c.arrow}
          strokeWidth={1.5}
          markerEnd="url(#feArrow)"
        />
        {Array.from({ length: outCount }).map((_, i) => (
          <rect
            key={`e-out-${i}`}
            x={inStartX + inGroupW + 26 + i * (outBarW + outGap)}
            y={34}
            width={outBarW}
            height={24}
            rx={2}
            fill={c.negativeDim}
            stroke={c.negative}
            strokeWidth={1}
          />
        ))}
        <text x={extCx} y={78} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Transform → new features
        </text>
        <text x={150} y={118} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Selection reduces columns · Extraction creates them
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
