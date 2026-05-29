import type { LearnBlock, LearnChapter } from "@/types/learn";
import { FormalConceptPanel } from "./FormalConceptPanel";
import { ComparisonTable } from "./ComparisonTable";

function Block({ block }: { block: LearnBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base leading-relaxed text-slate-300 max-w-prose">
          {block.content}
        </p>
      );
    case "list":
      return (
        <div>
          {block.title && (
            <h4 className="text-sm font-semibold text-slate-200 mb-2">{block.title}</h4>
          )}
          <ul className="space-y-2 text-sm leading-relaxed text-slate-400 max-w-prose">
            {block.items?.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-slate-600 shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "concept":
      return block.concept ? <FormalConceptPanel concept={block.concept} /> : null;
    case "table":
      return block.headers && block.rows ? (
        <ComparisonTable headers={block.headers} rows={block.rows} />
      ) : null;
    default:
      return null;
  }
}

export function LearnChapterSection({ chapter }: { chapter: LearnChapter }) {
  return (
    <section id={chapter.id} className="scroll-mt-24 border-t border-atlas-border/40 pt-16 first:border-0 first:pt-0">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500/80">
          Chapter {chapter.order}
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white tracking-tight">
          {chapter.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-400">{chapter.overview}</p>
      </div>

      <div className="space-y-12">
        {chapter.subsections.map((sub) => (
          <div key={sub.id} id={`${chapter.id}-${sub.id}`} className="scroll-mt-28">
            <h3 className="text-xl font-semibold text-slate-100 mb-6">{sub.title}</h3>
            <div className="space-y-6">
              {sub.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
