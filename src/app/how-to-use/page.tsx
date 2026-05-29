import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import { Compass, GitBranch, Library, Search } from "lucide-react";

const modes = [
  {
    icon: Compass,
    title: "Learn by path",
    description:
      "Follow curated sequences on the Learning Paths page—from ML foundations to TinyML or transformers.",
    href: "/paths",
  },
  {
    icon: GitBranch,
    title: "Browse by generation or pipeline",
    description:
      "Use AI Generations for the big historical picture; use ML Pipeline to see where each step fits in a real project.",
    href: "/generations",
  },
  {
    icon: Library,
    title: "Explore concept cards",
    description:
      "The Technique Library explains individual algorithms, metrics, and methods with trade-offs and depth tabs.",
    href: "/techniques",
  },
  {
    icon: Search,
    title: "Search terms quickly",
    description:
      "The Glossary is for acronym recall—linking back to fuller technique cards when you need depth.",
    href: "/glossary",
  },
];

const siteMap = [
  { area: "Start", pages: "Home, Start Here, How to Use" },
  { area: "Learn", pages: "Paths, Generations, Pipeline" },
  { area: "Explore", pages: "Techniques, Glossary, Math" },
  { area: "Apply", pages: "Evaluation, TinyML, LLMs, MLOps" },
  { area: "Decide", pages: "Decision Guides, Common Mistakes, Comparisons" },
];

export const metadata = {
  title: "How to Use the Atlas | AI/ML Atlas",
};

export default function HowToUsePage() {
  return (
    <>
      <HeroSection
        title="How to Use the Atlas"
        subtitle="Four modes, one system—homepage guides, pipeline organizes, library explains."
      />
      <section className="section-padding">
        <PageContainer>
          <PageIntro
            title="Use the right layer for your question"
            what="Pick a mode based on whether you need direction, context, depth, or quick recall."
            why="Mixing these modes randomly is what makes AI/ML feel scattered—this site separates them on purpose."
            next={[{ label: "Learning Paths", href: "/paths" }]}
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {modes.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="glass-card flex gap-4 p-5 transition hover:border-cyan-500/40"
              >
                <m.icon className="h-8 w-8 shrink-0 text-cyan-400" />
                <div>
                  <h3 className="font-semibold text-white">{m.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{m.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-lg font-semibold text-white">Site map</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border border-atlas-border/60">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-atlas-border/60 bg-atlas-surface/50">
                    <th className="px-4 py-3 font-semibold text-slate-200">Area</th>
                    <th className="px-4 py-3 font-semibold text-slate-200">Pages</th>
                  </tr>
                </thead>
                <tbody>
                  {siteMap.map((row) => (
                    <tr key={row.area} className="border-b border-atlas-border/30">
                      <td className="px-4 py-3 text-cyan-300/90">{row.area}</td>
                      <td className="px-4 py-3 text-slate-400">{row.pages}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 glass-card p-6 text-sm text-slate-400">
            <p>
              <strong className="text-white">Applied sections</strong> connect knowledge to real use: Evaluation, TinyML, LLMs, and MLOps.
              <strong className="text-white"> Decide sections</strong> help you choose methods and avoid pitfalls.
            </p>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
