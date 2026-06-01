import { VisualFigure, visualColors as c, DiagramSvg } from "../shared";



const font = "system-ui, sans-serif";

const labelBg = "rgba(15, 23, 42, 0.94)";



export function KnowledgeDistillationDiagram({ caption }: { caption?: string }) {
  const arrowY = 56;

  return (
    <VisualFigure
      caption={
        caption ??
        "Knowledge distillation trains a smaller student model to mimic a larger teacher's soft probability outputs, transferring knowledge beyond hard labels."
      }
      title="Knowledge distillation"
    >
      <DiagramSvg viewBox="0 0 260 136" minWidth={220}>
        <defs>
          <marker id="kdArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.warn} />
          </marker>
        </defs>
        <text x={130} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Teacher guides student training
        </text>
        <rect x={24} y={28} width={88} height={52} rx={6} fill={c.accentDim} stroke={c.accent} strokeWidth={2} />
        <text x={68} y={50} textAnchor="middle" fill={c.textBright} fontSize={10} fontFamily={font}>
          Teacher
        </text>
        <text x={68} y={66} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          large model
        </text>
        <rect x={148} y={36} width={72} height={40} rx={6} fill={c.positiveDim} stroke={c.positive} strokeWidth={1.5} />
        <text x={184} y={54} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Student
        </text>
        <text x={184} y={68} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          compact
        </text>
        <path d={`M 112 ${arrowY} L 144 ${arrowY}`} stroke={c.warn} strokeWidth={1.5} markerEnd="url(#kdArrow)" />
        <text x={128} y={51} textAnchor="middle" fill={c.warn} fontSize={6} fontFamily={font}>
          soft labels
        </text>
        <text x={130} y={116} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          L = α·L_hard + (1−α)·L_soft
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function ONNXDiagram({ caption }: { caption?: string }) {
  const frameworks = [
    { x: 16, y: 28, label: "PyTorch", fill: c.accentDim, stroke: c.accent },
    { x: 16, y: 64, label: "TF", fill: c.positiveDim, stroke: c.positive },
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "ONNX provides a common intermediate representation so models trained in one framework can be exported and run in another runtime or deployment target."
      }
      title="ONNX model exchange"
    >
      <DiagramSvg viewBox="0 0 280 136" minWidth={240}>
        <defs>
          <marker id="onnxArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={140} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Framework-agnostic exchange
        </text>
        {frameworks.map((f) => (
          <g key={f.label}>
            <rect x={f.x} y={f.y} width={64} height={28} rx={4} fill={f.fill} stroke={f.stroke} strokeWidth={1.5} />
            <text x={f.x + 32} y={f.y + 18} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
              {f.label}
            </text>
            <path
              d={`M ${f.x + 68} ${f.y + 14} L 108 ${f.y + 14}`}
              stroke={c.arrow}
              strokeWidth={1.5}
              markerEnd="url(#onnxArrow)"
            />
          </g>
        ))}
        <rect x={112} y={40} width={56} height={48} rx={4} fill={c.negativeDim} stroke={c.negative} strokeWidth={2} />
        <text x={140} y={60} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          ONNX
        </text>
        <text x={140} y={74} textAnchor="middle" fill={c.text} fontSize={6} fontFamily={font}>
          .onnx
        </text>
        <path d="M 172 64 L 196 64" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#onnxArrow)" />
        <rect x={200} y={28} width={64} height={24} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        <text x={232} y={44} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          ONNX Runtime
        </text>
        <rect x={200} y={56} width={64} height={24} rx={4} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={232} y={72} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          TensorRT
        </text>
        <rect x={200} y={84} width={64} height={24} rx={4} fill={c.warn} fillOpacity={0.15} stroke={c.warn} strokeWidth={1} />
        <text x={232} y={100} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          CoreML
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function TFLiteDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "TensorFlow Lite converts and optimizes models for on-device inference—quantization and operator fusion reduce size and latency on mobile/embedded hardware."
      }
      title="TensorFlow Lite deployment"
    >
      <DiagramSvg viewBox="0 0 280 116" minWidth={240}>
        <defs>
          <marker id="tflArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={140} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Optimize → deploy to edge
        </text>
        <rect x={16} y={32} width={72} height={40} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1.5} />
        <text x={52} y={50} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          Trained
        </text>
        <text x={52} y={64} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          model
        </text>
        <path d="M 92 52 L 116 52" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#tflArrow)" />
        <rect x={120} y={32} width={64} height={40} rx={4} fill={c.positiveDim} stroke={c.positive} strokeWidth={1.5} />
        <text x={152} y={50} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
          TFLite
        </text>
        <text x={152} y={64} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          .tflite
        </text>
        <path d="M 188 52 L 212 52" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#tflArrow)" />
        <rect x={216} y={28} width={48} height={24} rx={3} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={240} y={44} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          Phone
        </text>
        <rect x={216} y={56} width={48} height={24} rx={3} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={240} y={72} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          MCU
        </text>
        <text x={140} y={100} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          Quantization · op fusion · delegates
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function DeploymentVerificationDiagram({ caption }: { caption?: string }) {
  const stages = [
    { x: 12, label: "Python", sub: "train", fill: c.accentDim, stroke: c.accent },
    { x: 88, label: "C/C++", sub: "convert", fill: c.positiveDim, stroke: c.positive },
    { x: 164, label: "Device", sub: "verify", fill: c.negativeDim, stroke: c.negative },
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "Deployment verification ensures the converted C/C++ or embedded binary produces outputs consistent with the training environment before shipping to hardware."
      }
      title="Deployment verification pipeline"
    >
      <DiagramSvg viewBox="0 0 260 120" minWidth={240}>
        <defs>
          <marker id="dvArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        <text x={130} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Parity check across stack
        </text>
        {stages.map((s, i) => (
          <g key={s.label}>
            <rect x={s.x} y={28} width={64} height={44} rx={4} fill={s.fill} stroke={s.stroke} strokeWidth={1.5} />
            <text x={s.x + 32} y={46} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
              {s.label}
            </text>
            <text x={s.x + 32} y={60} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
              {s.sub}
            </text>
            {i < stages.length - 1 && (
              <path
                d={`M ${s.x + 68} 50 L ${stages[i + 1].x - 4} 50`}
                stroke={c.arrow}
                strokeWidth={1.5}
                markerEnd="url(#dvArrow)"
              />
            )}
          </g>
        ))}
        <rect x={88} y={80} width={84} height={18} rx={3} fill={c.warn} fillOpacity={0.2} stroke={c.warn} strokeWidth={1} />
        <text x={130} y={92} textAnchor="middle" fill={c.warn} fontSize={7} fontFamily={font}>
          compare outputs ✓
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

