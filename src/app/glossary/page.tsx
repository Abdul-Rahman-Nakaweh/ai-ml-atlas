import { HeroSection } from "@/components/HeroSection";
import { GlossarySearch } from "./GlossarySearch";

export const metadata = {
  title: "Glossary | AI/ML Atlas",
  description: "Searchable AI/ML acronym and term reference with context and related concepts.",
};

export default function GlossaryPage() {
  return (
    <>
      <HeroSection
        title="Glossary"
        subtitle="Quick recall for acronyms—with context, not isolated definitions."
      />
      <GlossarySearch />
    </>
  );
}
