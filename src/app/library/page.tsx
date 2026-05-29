import { Suspense } from "react";
import { LibraryView } from "./LibraryView";

export const metadata = {
  title: "Library | AI/ML Atlas",
  description: "Reference library of AI/ML concepts, algorithms, metrics, and methods.",
};

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading library…</div>}>
      <LibraryView />
    </Suspense>
  );
}
