import type { ConceptEquation, ConceptEquationPart } from "@/types/concept";
import { cn } from "@/lib/utils";

interface ConceptEquationSectionProps {
  equation: ConceptEquation;
  className?: string;
}

function EquationPartBlock({ part }: { part: ConceptEquationPart }) {
  return (
    <div className="flex flex-col rounded-lg border border-cyan-500/20 bg-atlas-bg/60 px-3 py-3 sm:px-4">
      {part.label && (
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{part.label}</p>
      )}
      <p className="font-mono text-sm leading-relaxed text-cyan-100/90 text-center sm:text-left" aria-label="Formal expression">
        {part.expression}
      </p>
      {part.symbols && part.symbols.length > 0 && (
        <dl className="mt-2.5 space-y-2 border-t border-atlas-border/30 pt-2.5">
          {part.symbols.map(({ symbol, meaning }) => (
            <div key={symbol}>
              <dt className="font-mono text-xs text-cyan-300/90">{symbol}</dt>
              <dd className="mt-0.5 text-sm leading-relaxed text-slate-400">{meaning}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

export function ConceptEquationSection({ equation, className }: ConceptEquationSectionProps) {
  const hasParts = equation.parts && equation.parts.length > 0;

  return (
    <section className={cn(className)}>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Equation or Formal Expression
      </h3>
      {hasParts ? (
        <div
          className={cn(
            "mt-2 grid gap-3",
            equation.parts!.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
          )}
        >
          {equation.parts!.map((part, index) => (
            <EquationPartBlock key={part.label ?? part.expression ?? index} part={part} />
          ))}
        </div>
      ) : (
        <div className="mt-2 rounded-lg border border-cyan-500/20 bg-atlas-bg/60 px-4 py-3">
          <p
            className="font-mono text-sm leading-relaxed text-cyan-100/90 text-center sm:text-left"
            aria-label="Formal expression"
          >
            {equation.expression}
          </p>
        </div>
      )}
      <p className="mt-2.5 text-sm leading-relaxed text-slate-300">{equation.summary}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{equation.connection}</p>
      {!hasParts && equation.symbols.length > 0 && (
        <dl className="mt-3 space-y-1.5">
          {equation.symbols.map(({ symbol, meaning }) => (
            <div key={symbol} className="flex gap-2 text-sm">
              <dt className="shrink-0 font-mono text-cyan-300/90 min-w-[3rem]">{symbol}</dt>
              <dd className="text-slate-400 leading-relaxed">{meaning}</dd>
            </div>
          ))}
        </dl>
      )}
      {equation.useCase && (
        <p className="mt-2.5 text-xs leading-relaxed text-slate-500 border-t border-atlas-border/30 pt-2.5">
          {equation.useCase}
        </p>
      )}
    </section>
  );
}
