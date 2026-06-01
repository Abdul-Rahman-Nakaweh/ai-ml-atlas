import { redirect } from "next/navigation";

/** Compatibility route — glossary merged into Concept Library */
export default function GlossaryPage() {
  redirect("/library");
}
