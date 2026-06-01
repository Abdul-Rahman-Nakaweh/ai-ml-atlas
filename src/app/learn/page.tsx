import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { StickyTOC } from "@/components/StickyTOC";
import { LearnChapterSection } from "@/components/LearnContentRenderer";
import { learnChapters } from "@/data/learnContent";
import { learnToc } from "@/types/learn";

export const metadata = {
  title: "Learn | AI/ML Atlas",
  description:
    "Guided study of AI and machine learning from foundations through deployment and modern systems.",
};

export default function LearnPage() {
  return (
    <div className="border-b border-atlas-border/30 bg-gradient-to-b from-cyan-500/5 to-transparent">
      <PageContainer className="py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500/80">
            Guided Learning
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight">
            Learn
          </h1>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-400">
            Proceed through the chapters in order. Each section develops concepts by definition,
            role in the workflow, technical basis, practical application, limitations, and
            relations to adjacent topics. Use the table of contents to navigate within this page.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            For reference lookup of individual algorithms and metrics, use the{" "}
            <Link href="/library" className="text-cyan-400 hover:text-cyan-300">
              Concept Library
            </Link>
            .
          </p>
        </div>
      </PageContainer>

      <PageContainer className="pb-24">
        <div className="flex gap-12">
          <StickyTOC items={learnToc} title="Learning sequence" />
          <div className="min-w-0 flex-1 max-w-4xl space-y-0">
            {/* Mobile TOC */}
            <nav className="lg:hidden mb-10 flex flex-wrap gap-2">
              {learnToc.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="rounded-full border border-atlas-border/60 px-3 py-1 text-xs text-slate-400 hover:border-cyan-500/40 hover:text-cyan-300"
                >
                  {i + 1}. {item.label}
                </a>
              ))}
            </nav>
            {learnChapters.map((chapter) => (
              <LearnChapterSection key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
