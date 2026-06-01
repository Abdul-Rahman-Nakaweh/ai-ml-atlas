import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

const NET_W = 80;

export function PruningDiagram({ caption }: { caption?: string }) {
  const beforeCx = 20 + NET_W / 2;
  const afterCx = 160 + NET_W / 2;

  return (
    <VisualFigure
      caption={
        caption ??
        "Pruning removes low-magnitude weights or entire nodes, reducing model size and inference cost with a controlled accuracy trade-off."
      }
      title="Network before and after pruning"
    >
      <DiagramSvg viewBox="0 0 280 118" minWidth={240}>
        <text x={beforeCx} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Before
        </text>
        <Network x={20} y={22} pruned={false} />
        <path d="M 115 58 L 135 58" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#pruneArrow)" />
        <defs>
          <marker id="pruneArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={afterCx} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          After pruning
        </text>
        <Network x={160} y={22} pruned={true} />
        <text x={beforeCx} y={106} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Dense connections
        </text>
        <text x={afterCx} y={106} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Smaller footprint
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

function Network({ x, y, pruned }: { x: number; y: number; pruned: boolean }) {
  const nodes = [
    [0, 0],
    [0, 24],
    [0, 48],
    [40, 12],
    [40, 36],
    [80, 24],
  ];
  const edges: [number, number][] = [
    [0, 3],
    [0, 4],
    [1, 3],
    [1, 4],
    [2, 3],
    [2, 4],
    [3, 5],
    [4, 5],
  ];
  const prunedEdges = new Set([1, 2, 4, 5]);

  return (
    <g transform={`translate(${x}, ${y})`}>
      {edges.map(([a, b], i) => {
        const removed = pruned && (prunedEdges.has(i) || a === 2 || b === 2);
        if (removed) return null;
        return (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1] + 8}
            x2={nodes[b][0]}
            y2={nodes[b][1] + 8}
            stroke={c.accent}
            strokeWidth={1.25}
            opacity={0.8}
          />
        );
      })}
      {nodes.map(([nx, ny], i) => {
        const removed = pruned && i === 2;
        return (
          <circle
            key={i}
            cx={nx}
            cy={ny + 8}
            r={removed ? 0 : 6}
            fill={removed ? "none" : c.accentDim}
            stroke={removed ? "none" : c.accent}
            strokeWidth={1}
            opacity={removed ? 0 : 1}
          />
        );
      })}
    </g>
  );
}
