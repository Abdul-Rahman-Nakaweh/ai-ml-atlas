import { Info, AlertTriangle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
};

const styles = {
  info: "border-cyan-500/30 bg-cyan-500/5 text-cyan-100",
  warning: "border-amber-500/30 bg-amber-500/5 text-amber-100",
  tip: "border-violet-500/30 bg-violet-500/5 text-violet-100",
};

interface InfoCalloutProps {
  title?: string;
  children: React.ReactNode;
  variant?: keyof typeof icons;
  className?: string;
}

export function InfoCallout({
  title,
  children,
  variant = "info",
  className,
}: InfoCalloutProps) {
  const Icon = icons[variant];
  return (
    <div
      className={cn(
        "rounded-xl border p-4 md:p-5",
        styles[variant],
        className
      )}
    >
      <div className="flex gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 opacity-80" />
        <div>
          {title && <p className="mb-1 font-semibold">{title}</p>}
          <div className="text-sm leading-relaxed opacity-90">{children}</div>
        </div>
      </div>
    </div>
  );
}
