import Link from "next/link";
import { PageContainer } from "./PageContainer";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-atlas-border/40 bg-atlas-surface/30">
      <PageContainer className="py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-white">AI/ML Atlas</p>
            <p className="mt-1 max-w-md text-sm text-slate-500">
              A practical knowledge map for understanding, comparing, and deploying machine learning techniques.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <Link href="/techniques" className="hover:text-cyan-400 transition-colors">
              Technique Library
            </Link>
            <Link href="/glossary" className="hover:text-cyan-400 transition-colors">
              Glossary
            </Link>
            <Link href="/pipeline" className="hover:text-cyan-400 transition-colors">
              ML Pipeline
            </Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-600">
          Built for learning and reference. Expand with local data files—no database required for MVP.
        </p>
      </PageContainer>
    </footer>
  );
}
