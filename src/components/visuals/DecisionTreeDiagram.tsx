import { VisualFigure, visualColors as c, DiagramSvg } from "./shared";

const font = "system-ui, sans-serif";

export function DecisionTreeDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "A decision tree applies sequential splits on features; each internal node is a rule and each leaf assigns a prediction."
      }
      title="Decision tree structure"
    >
      <DiagramSvg viewBox="0 0 260 150" minWidth={220}>
        <rect x={95} y={8} width={70} height={24} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        <text x={130} y={24} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          x₁ &lt; 0.5?
        </text>
        <line x1={110} y1={32} x2={70} y2={55} stroke={c.grid} strokeWidth={1} />
        <line x1={150} y1={32} x2={190} y2={55} stroke={c.grid} strokeWidth={1} />
        <rect x={35} y={55} width={70} height={22} rx={4} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={70} y={70} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          Class A
        </text>
        <rect x={145} y={55} width={70} height={22} rx={4} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={180} y={70} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          x₂ &lt; 1?
        </text>
        <line x1={165} y1={77} x2={145} y2={100} stroke={c.grid} strokeWidth={1} />
        <line x1={195} y1={77} x2={215} y2={100} stroke={c.grid} strokeWidth={1} />
        <rect x={110} y={100} width={55} height={20} rx={3} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={137} y={114} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          A
        </text>
        <rect x={185} y={100} width={55} height={20} rx={3} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={212} y={114} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          B
        </text>
        <text x={55} y={42} fill={c.text} fontSize={7} fontFamily={font}>
          Yes
        </text>
        <text x={168} y={42} fill={c.text} fontSize={7} fontFamily={font}>
          No
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
