import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

export function CrossValidationDiagram({ caption }: { caption?: string }) {
  const folds = [
    { label: "Val", fill: c.positiveDim, stroke: c.positive },
    { label: "1", fill: c.accentDim, stroke: c.accent },
    { label: "2", fill: c.accentDim, stroke: c.accent },
    { label: "3", fill: c.accentDim, stroke: c.accent },
    { label: "4", fill: c.accentDim, stroke: c.accent },
  ];
  const startX = 24;
  const foldW = 44;
  const gap = 6;

  return (
    <VisualFigure
      caption={
        caption ??
        "In k-fold cross-validation, each fold serves once as validation while the remaining folds train the model; metrics are averaged across rotations."
      }
      title="k-fold cross-validation rotation"
    >
      <DiagramSvg viewBox="0 0 300 115" minWidth={260}>
        <text x={150} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily="system-ui">
          Fold 1 held out for validation
        </text>
        {folds.map((fold, i) => {
          const x = startX + i * (foldW + gap);
          return (
            <g key={fold.label}>
              <rect x={x} y={30} width={foldW} height={36} rx={4} fill={fold.fill} stroke={fold.stroke} strokeWidth={1.5} />
              <text x={x + foldW / 2} y={52} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily="system-ui">
                {fold.label}
              </text>
            </g>
          );
        })}
        <path
          d="M 50 78 Q 100 88 150 78 T 250 78"
          fill="none"
          stroke={c.warn}
          strokeWidth={1.5}
          strokeDasharray="4 3"
          markerEnd="url(#cvArrow)"
        />
        <defs>
          <marker id="cvArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.warn} />
          </marker>
        </defs>
        <text x={150} y={100} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
          Validation fold rotates · mean score estimates generalization
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
