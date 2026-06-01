import { VisualFigure, visualColors as c } from "../shared";
import { DiagramSvg } from "./DiagramSvg";

const font = "system-ui, sans-serif";

export function KnowledgeDistillationDiagram({ caption }: { caption?: string }) {
  return (
    <VisualFigure
      caption={
        caption ??
        "Knowledge distillation trains a smaller student model to mimic a larger teacher's soft probability outputs, transferring knowledge beyond hard labels."
      }
      title="Knowledge distillation"
    >
      <DiagramSvg viewBox="0 0 260 120" minWidth={220}>
        <rect x={24} y={24} width={88} height={56} rx={6} fill={c.accentDim} stroke={c.accent} strokeWidth={2} />
        <text x={68} y={48} textAnchor="middle" fill={c.textBright} fontSize={10} fontFamily={font}>
          Teacher
        </text>
        <text x={68} y={64} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          large model
        </text>
        <path d="M 68 84 L 68 96" stroke={c.warn} strokeWidth={1.5} markerEnd="url(#kdArrow)" />
        <defs>
          <marker id="kdArrow" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,0 L6,6 L0,6 Z" fill={c.warn} />
          </marker>
        </defs>
        <text x={100} y={92} fill={c.warn} fontSize={7} fontFamily={font}>
          soft labels
        </text>
        <rect x={148} y={36} width={72} height={40} rx={6} fill={c.positiveDim} stroke={c.positive} strokeWidth={1.5} />
        <text x={184} y={54} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Student
        </text>
        <text x={184} y={68} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          compact
        </text>
        <text x={130} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Teacher guides student training
        </text>
        <text x={130} y={112} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
          L = α·L_hard + (1−α)·L_soft
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}

export function ONNXDiagram({ caption }: { caption?: string }) {
  const frameworks = [
    { x: 16, label: "PyTorch", fill: c.accentDim, stroke: c.accent },
    { x: 16, y: 56, label: "TF", fill: c.positiveDim, stroke: c.positive },
  ];
  return (
    <VisualFigure
      caption={
        caption ??
        "ONNX provides a common intermediate representation so models trained in one framework can be exported and run in another runtime or deployment target."
      }
      title="ONNX model exchange"
    >
      <DiagramSvg viewBox="0 0 280 120" minWidth={240}>
        <defs>
          <marker id="onnxArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        {frameworks.map((f) => (
          <g key={f.label}>
            <rect x={f.x} y={f.y ?? 24} width={64} height={28} rx={4} fill={f.fill} stroke={f.stroke} strokeWidth={1.5} />
            <text x={f.x + 32} y={(f.y ?? 24) + 18} textAnchor="middle" fill={c.textBright} fontSize={8} fontFamily={font}>
              {f.label}
            </text>
            <path
              d={`M ${f.x + 68} ${(f.y ?? 24) + 14} L 108 ${(f.y ?? 24) + 14}`}
              stroke={c.arrow}
              strokeWidth={1.5}
              markerEnd="url(#onnxArrow)"
            />
          </g>
        ))}
        <rect x={112} y={36} width={56} height={48} rx={4} fill={c.negativeDim} stroke={c.negative} strokeWidth={2} />
        <text x={140} y={58} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          ONNX
        </text>
        <text x={140} y={72} textAnchor="middle" fill={c.text} fontSize={6} fontFamily={font}>
          .onnx
        </text>
        <path d="M 172 60 L 200 60" stroke={c.arrow} strokeWidth={1.5} markerEnd="url(#onnxArrow)" />
        <rect x={204} y={24} width={60} height={24} rx={4} fill={c.accentDim} stroke={c.accent} strokeWidth={1} />
        <text x={234} y={40} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          ONNX Runtime
        </text>
        <rect x={204} y={56} width={60} height={24} rx={4} fill={c.positiveDim} stroke={c.positive} strokeWidth={1} />
        <text x={234} y={72} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          TensorRT
        </text>
        <rect x={204} y={88} width={60} height={24} rx={4} fill={c.warn} fillOpacity={0.15} stroke={c.warn} strokeWidth={1} />
        <text x={234} y={104} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          CoreML
        </text>
        <text x={140} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Framework-agnostic exchange
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
      <DiagramSvg viewBox="0 0 280 108" minWidth={240}>
        <defs>
          <marker id="tflArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
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
        <rect x={216} y={24} width={48} height={24} rx={3} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={240} y={40} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          Phone
        </text>
        <rect x={216} y={52} width={48} height={24} rx={3} fill={c.negativeDim} stroke={c.negative} strokeWidth={1} />
        <text x={240} y={68} textAnchor="middle" fill={c.textBright} fontSize={7} fontFamily={font}>
          MCU
        </text>
        <text x={140} y={16} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Optimize → deploy to edge
        </text>
        <text x={140} y={96} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
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
      <DiagramSvg viewBox="0 0 260 108" minWidth={240}>
        <defs>
          <marker id="dvArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.arrow} />
          </marker>
        </defs>
        {stages.map((s, i) => (
          <g key={s.label}>
            <rect x={s.x} y={32} width={64} height={44} rx={4} fill={s.fill} stroke={s.stroke} strokeWidth={1.5} />
            <text x={s.x + 32} y={50} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
              {s.label}
            </text>
            <text x={s.x + 32} y={64} textAnchor="middle" fill={c.text} fontSize={7} fontFamily={font}>
              {s.sub}
            </text>
            {i < stages.length - 1 && (
              <path
                d={`M ${s.x + 68} 54 L ${stages[i + 1].x - 4} 54`}
                stroke={c.arrow}
                strokeWidth={1.5}
                markerEnd="url(#dvArrow)"
              />
            )}
          </g>
        ))}
        <rect x={88} y={84} width={84} height={16} rx={3} fill={c.warn} fillOpacity={0.2} stroke={c.warn} strokeWidth={1} />
        <text x={130} y={96} textAnchor="middle" fill={c.warn} fontSize={7} fontFamily={font}>
          compare outputs ✓
        </text>
        <text x={130} y={18} textAnchor="middle" fill={c.textBright} fontSize={9} fontFamily={font}>
          Parity check across stack
        </text>
      </DiagramSvg>
    </VisualFigure>
  );
}
