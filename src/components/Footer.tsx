import Link from "next/link";
import { PageContainer } from "./PageContainer";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-atlas-border/40 bg-atlas-surface/20">
      <PageContainer className="py-10 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-semibold text-white">AI/ML Atlas</p>
            <p className="mt-1 text-sm text-slate-500">
              Structured learning atlas for machine learning.
            </p>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-slate-400">
            <Link href="/learn" className="hover:text-cyan-400">Learn</Link>
            <Link href="/library" className="hover:text-cyan-400">Library</Link>
            <Link href="/guides" className="hover:text-cyan-400">Guides</Link>
            <Link href="/glossary" className="hover:text-cyan-400">Glossary</Link>
          </nav>
        </div>
      </PageContainer>
    </footer>
  );
}
