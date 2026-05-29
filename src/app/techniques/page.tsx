import { HeroSection } from "@/components/HeroSection";
import { TechniqueLibrary } from "./TechniqueLibrary";

export const metadata = {
  title: "Technique Library | AI/ML Atlas",
  description: "Searchable library of AI/ML techniques with trade-offs, pipeline placement, and related concepts.",
};

export default function TechniquesPage() {
  return (
    <>
      <HeroSection
        title="Technique Library"
        subtitle="Searchable concept cards—not a flat glossary."
        description="Each technique is connected to its generation, pipeline stage, purpose, math foundation, and deployment notes. Click a card to expand full details."
      />
      <TechniqueLibrary />
    </>
  );
}
