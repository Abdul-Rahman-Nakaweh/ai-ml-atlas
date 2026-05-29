import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "./PageContainer";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-atlas-border/30">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <PageContainer className="relative py-16 md:py-24 lg:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-cyan-400/80">
            Knowledge Map
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {title.includes("AI/ML") ? (
              <>
                AI<span className="text-cyan-400">/</span>ML Atlas
              </>
            ) : (
              <span className="text-gradient">{title}</span>
            )}
          </h1>
          <p className="mt-4 text-lg text-slate-300 md:text-xl">{subtitle}</p>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-slate-400">{description}</p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-500 hover:to-cyan-400"
                >
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-atlas-border px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </PageContainer>
    </section>
  );
}
