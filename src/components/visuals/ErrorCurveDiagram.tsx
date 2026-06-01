import { VisualFigure, visualColors as c } from "./shared";

export type ErrorCurveVariant = "overfitting" | "underfitting";

export function ErrorCurveDiagram({
  caption,
  variant = "overfitting",
}: {
  caption?: string;
  variant?: ErrorCurveVariant;
}) {
  const isUnderfitting = variant === "underfitting";
  return (
    <VisualFigure
      caption={
        caption ??
        (isUnderfitting
          ? "Underfitting: both training and validation error remain high because the model lacks capacity to capture the signal."
          : "Overfitting: training error continues to fall while validation error rises after a point, indicating poor generalization.")
      }
      title="Training versus validation error"
    >
      <svg viewBox="0 0 320 160" className="w-full min-w-[280px] h-auto" aria-hidden>
        <line x1={40} y1={130} x2={300} y2={130} stroke={c.grid} strokeWidth={1} />
        <line x1={40} y1={20} x2={40} y2={130} stroke={c.grid} strokeWidth={1} />
        <text x={170} y={150} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui">
          Model complexity / epochs
        </text>
        <text x={18} y={75} textAnchor="middle" fill={c.text} fontSize={8} fontFamily="system-ui" transform="rotate(-90 18 75)">
          Error
        </text>
        {isUnderfitting ? (
          <>
            <path d="M 45 95 Q 120 92 200 90 T 295 88" fill="none" stroke={c.accent} strokeWidth={2} />
            <text x={270} y={85} fill={c.accent} fontSize={8} fontFamily="system-ui">
              Training
            </text>
            <path d="M 45 100 Q 120 98 200 96 T 295 94" fill="none" stroke={c.warn} strokeWidth={2} />
            <text x={260} y={100} fill={c.warn} fontSize={8} fontFamily="system-ui">
              Validation
            </text>
            <text x={170} y={72} fill={c.text} fontSize={7} fontFamily="system-ui">
              High error on both sets
            </text>
          </>
        ) : (
          <>
            <path d="M 45 120 Q 120 90 200 55 T 295 35" fill="none" stroke={c.accent} strokeWidth={2} />
            <text x={280} y={32} fill={c.accent} fontSize={8} fontFamily="system-ui">
              Training
            </text>
            <path d="M 45 115 Q 100 95 140 75 Q 180 70 220 85 T 295 110" fill="none" stroke={c.warn} strokeWidth={2} />
            <text x={270} y={108} fill={c.warn} fontSize={8} fontFamily="system-ui">
              Validation
            </text>
            <circle cx={140} cy={75} r={4} fill={c.warn} />
            <text x={155} y={68} fill={c.text} fontSize={7} fontFamily="system-ui">
              Best generalization
            </text>
          </>
        )}
      </svg>
    </VisualFigure>
  );
}
