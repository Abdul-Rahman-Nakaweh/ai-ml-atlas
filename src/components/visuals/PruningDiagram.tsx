import { VisualFigure, visualColors as c } from "./shared";

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
  const prunedEdges = new Set([1, 2, 5]);

  return (
    <g transform={`translate(${x}, ${y})`}>
      {edges.map(([a, b], i) => {
        const dimmed = pruned && prunedEdges.has(i);
        return (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1] + 8}
            x2={nodes[b][0]}
            y2={nodes[b][1] + 8}
            stroke={dimmed ? c.grid : c.accent}
            strokeWidth={dimmed ? 0.5 : 1.25}
            opacity={dimmed ? 0.3 : 0.8}
            strokeDasharray={dimmed ? "2 2" : undefined}
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

export function PruningDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Pruning removes low-magnitude weights or entire nodes, reducing model size and inference cost with a controlled accuracy trade-off."
      }
      title="Network before and after pruning"
    >
      <svg viewBox="0 0 280 110" className="w-full min-w-[240px] h-auto" aria-hidden>
        <text x={50} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily="system-ui">
          Before
        </text>
        <Network x={10} y={20} pruned={false} />
        <path d="M 115 55 L 135 55" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#pruneArrow)" />
        <defs>
          <marker id="pruneArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={210} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily="system-ui">
          After pruning
        </text>
        <Network x={150} y={20} pruned={true} />
        <text x={140} y={100} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
          Fewer active connections · smaller footprint
        </text>
      </svg>
    </VisualFigure>
  );
}
