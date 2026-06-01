import type { ConceptEquation, ConceptEquationPart } from "@/types/concept";

/** Build a consistent equation block for the detail panel */
export function eq(
  expression: string,
  summary: string,
  connection: string,
  symbols: ConceptEquation["symbols"],
  useCase?: string
): ConceptEquation {
  return { expression, summary, connection, symbols, useCase };
}

/** Side-by-side formulas — each part keeps its description under its own expression */
export function eqParts(
  parts: ConceptEquationPart[],
  summary: string,
  connection: string,
  useCase?: string
): ConceptEquation {
  return {
    expression: parts.map((part) => part.expression).join("   |   "),
    summary,
    connection,
    symbols: [],
    parts,
    useCase,
  };
}

/** Standard confusion-matrix symbols reused across classification metrics */
export const CM_SYMBOLS = {
  tp: { symbol: "TP", meaning: "True positives — actual positive predicted positive" },
  tn: { symbol: "TN", meaning: "True negatives — actual negative predicted negative" },
  fp: { symbol: "FP", meaning: "False positives — actual negative predicted positive" },
  fn: { symbol: "FN", meaning: "False negatives — actual positive predicted negative" },
} as const;
