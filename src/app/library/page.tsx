import { Suspense } from "react";
import { LibraryView } from "./LibraryView";

export const metadata = {
  title: "Concept Library | AI/ML Atlas",
  description:
    "Structured reference for AI/ML terms, algorithms, metrics, workflow methods, deployment, and modern AI techniques.",
};

export default function LibraryPage() {
  return (
    <Suspense
      fallback={<div className="p-12 text-center text-slate-500">Loading Concept Library…</div>}
    >
      <LibraryView />
    </Suspense>
  );
}
