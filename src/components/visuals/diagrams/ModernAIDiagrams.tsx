import { VisualFigure, visualColors as c, DiagramSvg } from "../shared";

const font = "system-ui, sans-serif";

export function TokenizationDiagram({ caption }: { caption?: string }) {
  const tokens = ["The", "cat", "sat"];
  const sentX = 20;
  const sentW = 100;
  const sentY = 32;
  const tokStartX = 148;
  const tokW = 38;
  const tokGap = 6;
  return (
    <VisualFigure
      caption={
        caption ??
        "Tokenization splits raw text into discrete units (tokens)—words, subwords, or characters—that the model can embed and process."
      }
      title="Text tokenization"
    >
      <DiagramSvg viewBox="0 0 300 108" minWidth={260}>
        <defs>
          <marker id="tokArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={sentX + sentW / 2} y={24} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Sentence
        </text>
        <rect x={sentX} y={sentY} width={sentW} height={34} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1.5} />
        <text x={sentX + sentW / 2} y={sentY + 21} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          The cat sat
        </text>
        <path d={`M ${sentX + sentW + 4} ${sentY + 17} L ${tokStartX - 8} ${sentY + 17}`} stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#tokArrow)" />
        <text x={tokStartX + (tokens.length * tokW + (tokens.length - 1) * tokGap) / 2} y={24} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Tokens
        </text>
        {tokens.map((tok, i) => {
          const x = tokStartX + i * (tokW + tokGap);
          return (
            <g key={tok}>
              <rect x={x} y={sentY} width={tokW} height={34} rx={4} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
              <text x={x + tokW / 2} y={sentY + 21} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
                {tok}
              </text>
            </g>
          );
        })}
        <text x={150} y={88} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Each token → embedding vector
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function TransformerBlockDiagram({ caption }: { caption?: string }) {
  const blocks = [
    { x: 12, label: "Tokens", fill: c.accentDim, stroke: c.accent },
    { x: 78, label: "Attention", fill: c.positiveDim, stroke: c.positive },
    { x: 144, label: "FFN", fill: c.negativeDim, stroke: c.negative },
    { x: 210, label: "Output", fill: c.warn, fillOpacity: 0.15, stroke: c.warn },
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "A transformer block applies self-attention so tokens interact, then a feed-forward network (FFN) refines representations before the next layer."
      }
      title="Transformer block"
    >
      <DiagramSvg viewBox="0 0 278 112" minWidth={260}>
        <defs>
          <marker id="txArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={139} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Self-attention + FFN per layer
        </text>
        {blocks.map((b, i) => (
          <g key={b.label}>
            <rect x={b.x} y={28} width={54} height={40} rx={4} fill={b.fill} stroke={b.stroke} strokeWidth={1.5} />
            <text x={b.x + 27} y={52} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
              {b.label}
            </text>
            {i < blocks.length - 1 && (
              <path
                d={`M ${b.x + 56} 48 L ${blocks[i + 1].x - 4} 48`}
                stroke={c.arrow}
                strokeWidth={1.5}
                markerEnd="url(#txArrow)"
              />
            )}
          </g>
        ))}
        <text x={139} y={96} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Residual connections and layer norm omitted
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function VectorDatabaseDiagram({ caption }: { caption?: string }) {
  const queryX = 36;
  const queryY = 64;
  const vectors = [
    { x: 118, y: 38, match: false },
    { x: 142, y: 54, match: true },
    { x: 166, y: 46, match: false },
    { x: 130, y: 68, match: false },
    { x: 154, y: 72, match: false },
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "Vector databases store embedding vectors and retrieve nearest neighbors by similarity (cosine, dot product), enabling semantic search over unstructured data."
      }
      title="Vector similarity search"
    >
      <DiagramSvg viewBox="0 0 280 128" minWidth={240}>
        <circle cx={queryX} cy={queryY} r={10} fill={c.accent} stroke={c.textBright} strokeWidth={1.5} />
        <text x={queryX} y={queryY + 3} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          q
        </text>
        <text x={queryX} y={queryY - 16} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Query
        </text>
        {vectors.map((v, i) => (
          <g key={i}>
            <circle cx={v.x} cy={v.y} r={6} fill={v.match ? c.positiveDim : c.grid} stroke={v.match ? c.positive : c.neutral} strokeWidth={v.match ? 2 : 0.75} />
            {v.match && (
              <line x1={queryX + 10} y1={queryY} x2={v.x - 7} y2={v.y} stroke={c.positive} strokeWidth={1.5} strokeDasharray="3 2" />
            )}
          </g>
        ))}
        <rect x={196} y={36} width={72} height={56} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        <text x={232} y={56} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Vector DB
        </text>
        <text x={232} y={70} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          ANN index
        </text>
        <text x={232} y={82} textAnchor="middle" fill={c.positive} fontSize={7} fontFamily={font}>
          top-k match
        </text>
        <text x={140} y={116} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Nearest embedding → relevant document
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function FineTuningLoRADiagram({ caption }: { caption?: string }) {
  const barW = 14;
  const barGap = 8;
  const barCount = 4;
  const groupW = barCount * barW + (barCount - 1) * barGap;
  const leftCx = 78;
  const rightCx = 222;
  const barY = 38;
  const barH = 46;
  const leftStart = leftCx - groupW / 2;

  const wX = rightCx - 38;
  const wW = 34;
  const wH = 50;
  const adapterY = 42;
  const adapterH = 38;
  const aX = wX + wW + 12;
  const bX = aX + 16;

  return (
    <VisualFigure
      caption={
        caption ??
        "Full fine-tuning updates all base model weights; LoRA inserts low-rank adapter matrices, training far fewer parameters while preserving base knowledge."
      }
      title="Full fine-tuning versus LoRA"
    >
      <DiagramSvg viewBox="0 0 300 152" minWidth={260}>
        <line x1={150} y1={24} x2={150} y2={118} stroke={c.grid} strokeWidth={1} strokeDasharray="4 3" />

        {/* Full fine-tune panel */}
        <text x={leftCx} y={22} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Full fine-tune
        </text>
        {Array.from({ length: barCount }).map((_, i) => (
          <rect
            key={`f-${i}`}
            x={leftStart + i * (barW + barGap)}
            y={barY}
            width={barW}
            height={barH}
            rx={2}
            fill={c.accentDim}
            stroke={c.accent}
            strokeWidth={1.5}
          />
        ))}
        <text x={leftCx} y={barY + barH + 14} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          All weights trainable
        </text>

        {/* LoRA panel */}
        <text x={rightCx} y={22} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          LoRA adapter
        </text>
        <rect x={wX} y={barY - 2} width={wW} height={wH} rx={3} fill={c.grid} fillOpacity={0.35} stroke={c.grid} strokeWidth={1} />
        <text x={wX + wW / 2} y={barY + 18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          W
        </text>
        <text x={wX + wW / 2} y={barY + 32} textAnchor="middle" fill={c.text} fontSize={6} fontFamily={font}>
          frozen
        </text>
        <rect x={aX} y={adapterY} width={10} height={adapterH} rx={1} fill={c.positiveDim} stroke={c.positive} strokeWidth={1.5} />
        <text x={aX + 5} y={adapterY - 4} textAnchor="middle" fill={c.positive} fontSize={7} fontFamily={font}>
          A
        </text>
        <rect x={bX} y={adapterY} width={10} height={adapterH} rx={1} fill={c.positiveDim} stroke={c.positive} strokeWidth={1.5} />
        <text x={bX + 5} y={adapterY - 4} textAnchor="middle" fill={c.positive} fontSize={7} fontFamily={font}>
          B
        </text>
        <text x={rightCx} y={barY + barH + 14} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Train A·B only
        </text>

        <text x={150} y={138} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          LoRA: W′ = W + B·A
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function AgentToolUseDiagram({ caption }: { caption?: string }) {
  const nodes = [
    { x: 16, label: "Model", sub: "plan", fill: c.accentDim, stroke: c.accent },
    { x: 108, label: "Tool", sub: "API / code", fill: c.positiveDim, stroke: c.positive },
    { x: 200, label: "Result", sub: "observation", fill: c.negativeDim, stroke: c.negative },
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "Agentic systems let the model decide when to invoke external tools (search, calculators, APIs), incorporate results, and iterate toward a final answer."
      }
      title="Agent tool use loop"
    >
      <DiagramSvg viewBox="0 0 296 128" minWidth={260}>
        <defs>
          <marker id="agArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={148} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Reason → act → observe → repeat
        </text>
        {nodes.map((n, i) => (
          <g key={n.label}>
            <rect x={n.x} y={28} width={72} height={44} rx={4} fill={n.fill} stroke={n.stroke} strokeWidth={1.5} />
            <text x={n.x + 36} y={46} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
              {n.label}
            </text>
            <text x={n.x + 36} y={60} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
              {n.sub}
            </text>
            {i < nodes.length - 1 && (
              <path
                d={`M ${n.x + 76} 50 L ${nodes[i + 1].x - 4} 50`}
                stroke={c.arrow}
                strokeWidth={1.5}
                markerEnd="url(#agArrow)"
              />
            )}
          </g>
        ))}
        <path
          d="M 236 78 Q 148 98 52 78"
          fill="none"
          stroke={c.warn}
          strokeWidth={1.5}
          strokeDasharray="4 3"
          markerEnd="url(#agArrow)"
        />
        <text x={148} y={116} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Feedback loop until task complete
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
