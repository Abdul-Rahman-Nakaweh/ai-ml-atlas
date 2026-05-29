"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

interface StickyTOCProps {
  items: readonly TocItem[] | TocItem[];
  title?: string;
}

export function StickyTOC({ items, title = "Contents" }: StickyTOCProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const handler = (id: string) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(id);
      });
    };

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const obs = new IntersectionObserver(handler(item.id), {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      });
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  };

  return (
    <nav className="sticky top-24 hidden lg:block w-56 shrink-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
        {title}
      </p>
      <ol className="space-y-1 border-l border-atlas-border/60">
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => scrollTo(item.id)}
              className={cn(
                "-ml-px block w-full border-l-2 py-1.5 pl-4 text-left text-sm transition",
                active === item.id
                  ? "border-cyan-400 text-cyan-300"
                  : "border-transparent text-slate-500 hover:border-slate-600 hover:text-slate-300"
              )}
            >
              <span className="text-xs text-slate-600 mr-2">{i + 1}.</span>
              {item.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
