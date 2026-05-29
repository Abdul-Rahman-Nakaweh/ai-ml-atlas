interface ComparisonTableProps {
  headers: string[];
  rows: { label: string; cells: string[] }[];
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-atlas-border/60">
      <table className="w-full min-w-[500px] text-left text-sm">
        <thead>
          <tr className="border-b border-atlas-border/60 bg-atlas-surface/80">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-semibold text-slate-200 first:sticky first:left-0 first:bg-atlas-surface/95"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-atlas-border/40 last:border-0 hover:bg-white/[0.02]"
            >
              <td className="px-4 py-3 font-medium text-cyan-300/90">{row.label}</td>
              {row.cells.map((cell, i) => (
                <td key={i} className="px-4 py-3 text-slate-400">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
