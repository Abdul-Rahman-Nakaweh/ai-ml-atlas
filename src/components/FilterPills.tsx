"use client";

import { cn } from "@/lib/utils";

interface FilterPillsProps {
  label: string;
  options: readonly string[];
  selected: string;
  onSelect: (value: string) => void;
}

export function FilterPills({ label, options, selected, onSelect }: FilterPillsProps) {
  return (
    <div className="space-y-2">
      <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {["All", ...options].map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-all",
              selected === opt
                ? "border-cyan-500/50 bg-cyan-500/15 text-cyan-300"
                : "border-atlas-border/60 bg-atlas-surface/50 text-slate-400 hover:border-slate-500 hover:text-slate-200"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
