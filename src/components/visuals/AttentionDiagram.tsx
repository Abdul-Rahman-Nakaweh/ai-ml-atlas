import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const TOKENS = ["The", "model", "uses", "attention"];

export function AttentionDiagram({ caption }: { caption?: string }) {
  const positions = TOKENS.map((_, i) => ({ x: 50 + i * 55, y: 44 }));

  return (
    <VisualFigure
      caption={
        caption ??
        "Self-attention computes a weighted combination of token representations; thicker lines indicate higher attention weight toward the focused token."
      }
      title="Token self-attention weights"
    >
      <DiagramSvg viewBox="0 0 320 136" minWidth={280}>
        {positions.map((from, i) =>
          positions.map((to, j) => {
            if (i === j) return null;
            const weight = i === 2 || j === 2 ? 0.9 : 0.25;
            return (
              <line
                key={`${i}-${j}`}
                x1={from.x}
                y1={from.y + 12}
                x2={to.x}
                y2={to.y + 12}
                stroke={c.accent}
                strokeWidth={weight * 2}
                opacity={weight * 0.7}
              />
            );
          })
        )}
        {TOKENS.map((tok, i) => (
          <g key={tok}>
            <rect
              x={positions[i].x - 22}
              y={positions[i].y}
              width={44}
              height={24}
              rx={4}
              fill={i === 2 ? c.accentDim : "rgba(30, 41, 59, 0.8)"}
              stroke={i === 2 ? c.accent : c.grid}
              strokeWidth={1}
            />
            <text x={positions[i].x} y={positions[i].y + 16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily="system-ui">
              {tok}
            </text>
          </g>
        ))}
        <text x={160} y={120} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
          Query token attends across the sequence
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
