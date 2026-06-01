interface DiagramSvgProps {
  viewBox: string;
  children: React.ReactNode;
  minWidth?: number;
}

export function DiagramSvg({ viewBox, children, minWidth = 240 }: DiagramSvgProps) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-auto"
      style={{ minWidth }}
      aria-hidden
    >
      {children}
    </svg>
  );
}
