import { HeroSection } from "@/components/HeroSection";
import { GlossarySearch } from "./GlossarySearch";

export const metadata = {
  title: "Glossary | AI/ML Atlas",
  description: "Quick recall for acronyms—with links to full technique cards.",
};

export default function GlossaryPage() {
  return (
    <>
      <HeroSection
        title="Glossary"
        subtitle="Quick recall—not deep reading. Link through to concept cards when you need depth."
      />
      <GlossarySearch />
    </>
  );
}
