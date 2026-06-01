import { VisualFigure, visualColors as c } from "../shared";
import { DiagramSvg } from "./DiagramSvg";

const font = "system-ui, sans-serif";

export function TokenizationDiagram({ caption }: { caption?: string }) {
  const tokens = ['"The"', '"cat"', '"sat"'];
  return (
    <VisualFigure
      caption={
        caption ??
        "Tokenization splits raw text into discrete units (tokens)—words, subwords, or characters—that the model can embed and process."
      }
      title="Text tokenization"
    >
      <DiagramSvg viewBox="0 0 280 108" minWidth={240}>
        <defs>
          <marker id="tokArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <rect x={16} y={32} width={108} height={36} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1.5} />
        <text x={70} y={54} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          The cat sat
        </text>
        <text x={70} y={24} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Sentence
        </text>
        <path d="M 130 50 L 158 50" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#tokArrow)" />
        {tokens.map((tok, i) => (
          <g key={tok}>
            <rect x={164 + i * 36} y={32} width={32} height={36} rx={4} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
            <text x={180 + i * 36} y={54} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
              {tok}
            </text>
          </g>
        ))}
        <text x={210} y={24} textAnchor="middle" fill={c.text} fontSize={8} fontFamily={font}>
          Tokens
        </text>
        <text x={140} y={92} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Each token maps to an embedding vector
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function TransformerBlockDiagram({ caption }: { caption?: string }) {
  const blocks = [
    { x: 16, label: "Tokens", fill: c.accentDim, stroke: c.accent },
    { x: 88, label: "Attention", fill: c.positiveDim, stroke: c.positive },
    { x: 160, label: "FFN", fill: c.negativeDim, stroke: c.negative },
    { x: 232, label: "Output", fill: c.warn, fillOpacity: 0.15, stroke: c.warn },
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "A transformer block applies self-attention so tokens interact, then a feed-forward network (FFN) refines representations before the next layer."
      }
      title="Transformer block"
    >
      <DiagramSvg viewBox="0 0 296 108" minWidth={260}>
        <defs>
          <marker id="txArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        {blocks.map((b, i) => (
          <g key={b.label}>
            <rect x={b.x} y={32} width={56} height={40} rx={4} fill={b.fill} stroke={b.stroke} strokeWidth={1.5} />
            <text x={b.x + 28} y={56} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
              {b.label}
            </text>
            {i < blocks.length - 1 && (
              <path
                d={`M ${b.x + 60} 52 L ${blocks[i + 1].x - 4} 52`}
                stroke={c.arrow}
                strokeWidth={1.5}
                markerEnd="url(#txArrow)"
              />
            )}
          </g>
        ))}
        <text x={148} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Self-attention + FFN per layer
        </text>
        <text x={148} y={96} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Residual connections & layer norm omitted
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function VectorDatabaseDiagram({ caption }: { caption?: string }) {
  const vectors = [
    { x: 48, y: 36, match: false },
    { x: 72, y: 52, match: true },
    { x: 96, y: 44, match: false },
    { x: 120, y: 60, match: false },
    { x: 144, y: 48, match: false },
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "Vector databases store embedding vectors and retrieve nearest neighbors by similarity (cosine, dot product), enabling semantic search over unstructured data."
      }
      title="Vector similarity search"
    >
      <DiagramSvg viewBox="0 0 260 120" minWidth={220}>
        <circle cx={48} cy={72} r={10} fill={c.accent} stroke={c.textBright} strokeWidth={1.5} />
        <text x={48} y={76} textAnchor="middle" fill={c.textBright} fontSize={6} fontFamily={font}>
          q
        </text>
        <text x={48} y={24} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Query
        </text>
        {vectors.map((v, i) => (
          <g key={i}>
            <circle cx={v.x + 80} cy={v.y} r={6} fill={v.match ? c.positiveDim : c.grid} stroke={v.match ? c.positive : c.neutral} strokeWidth={v.match ? 2 : 0.75} />
            {v.match && (
              <line x1={58} y1={72} x2={v.x + 74} y2={v.y + 4} stroke={c.positive} strokeWidth={1.5} strokeDasharray="3 2" />
            )}
          </g>
        ))}
        <rect x={168} y={28} width={80} height={64} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        <text x={208} y={48} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Vector DB
        </text>
        <text x={208} y={64} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          ANN index
        </text>
        <text x={208} y={78} textAnchor="middle" fill={c.positive} fontSize={7} fontFamily={font}>
          top-k match
        </text>
        <text x={130} y={112} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Similar embeddings → relevant documents
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function FineTuningLoRADiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Full fine-tuning updates all base model weights; LoRA inserts low-rank adapter matrices, training far fewer parameters while preserving base knowledge."
      }
      title="Full fine-tuning versus LoRA"
    >
      <DiagramSvg viewBox="0 0 280 128" minWidth={240}>
        <text x={70} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Full fine-tune
        </text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={`f-${i}`} x={24 + i * 22} y={28} width={18} height={48} rx={2} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        ))}
        <text x={70} y={88} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          All weights trainable
        </text>
        <text x={210} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          LoRA adapter
        </text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={`l-${i}`} x={164 + i * 22} y={28} width={18} height={48} rx={2} fill={c.grid} fillOpacity={0.4} stroke={c.grid} strokeWidth={0.75} />
        ))}
        <rect x={186} y={36} width={8} height={32} rx={1} fill={c.positiveDim} stroke={c.positive} strokeWidth={1.5} />
        <rect x={198} y={36} width={8} height={32} rx={1} fill={c.positiveDim} stroke={c.positive} strokeWidth={1.5} />
        <text x={210} y={88} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Frozen base + small A·B
        </text>
        <text x={140} y={116} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          LoRA: W′ = W + BA (low rank)
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
      <DiagramSvg viewBox="0 0 296 120" minWidth={260}>
        <defs>
          <marker id="agArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        {nodes.map((n, i) => (
          <g key={n.label}>
            <rect x={n.x} y={32} width={72} height={44} rx={4} fill={n.fill} stroke={n.stroke} strokeWidth={1.5} />
            <text x={n.x + 36} y={50} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
              {n.label}
            </text>
            <text x={n.x + 36} y={64} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
              {n.sub}
            </text>
            {i < nodes.length - 1 && (
              <path
                d={`M ${n.x + 76} 54 L ${nodes[i + 1].x - 4} 54`}
                stroke={c.arrow}
                strokeWidth={1.5}
                markerEnd="url(#agArrow)"
              />
            )}
          </g>
        ))}
        <path
          d="M 236 80 Q 148 100 52 80"
          fill="none"
          stroke={c.warn}
          strokeWidth={1.5}
          strokeDasharray="4 3"
          markerEnd="url(#agArrow)"
        />
        <text x={148} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Reason → act → observe → repeat
        </text>
        <text x={148} y={112} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Feedback loop until task complete
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
