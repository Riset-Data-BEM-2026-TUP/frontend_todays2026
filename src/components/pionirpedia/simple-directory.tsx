'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, ExternalLink, Instagram, MapPin } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animated-section';
import { CardParallaxTilt } from '@/components/ui/card-parallax-tilt';
import { MaskedText } from '@/components/ui/masked-reveal';

export type SimpleDirectoryItem = {
  id: string;
  title: string;
  category: string;
  logoUrl?: string;
  summary: string;
  description: string;
  facts?: string[];
  href?: string;
  hrefLabel?: string;
};

type SimpleDirectoryProps = {
  items: SimpleDirectoryItem[];
  backLabel: string;
  /** Ringkasan singkat halaman, tampil di bawah judul (overview). */
  overview?: string;
};

export function SimpleDirectory({ items, backLabel, overview }: SimpleDirectoryProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [category, setCategory] = useState('Semua');

  const categories = useMemo(
    () => ['Semua', ...Array.from(new Set(items.map((item) => item.category)))],
    [items],
  );
  const visibleItems = items.filter((item) => category === 'Semua' || item.category === category);
  const activeItem = activeId ? items.find((item) => item.id === activeId) : null;

  /* ------------------------------- DETAIL VIEW ------------------------------- */
  if (activeItem) {
    const isMaps = activeItem.href?.includes('maps');
    const isInstagram = activeItem.href?.includes('instagram');
    const LinkIcon = isInstagram ? Instagram : isMaps ? MapPin : ExternalLink;

    return (
      <section className="relative mx-auto max-w-5xl px-4 pb-24 pt-24 sm:px-6 sm:pt-28">
        <button
          type="button"
          onClick={() => setActiveId(null)}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-sand/70 bg-cream px-4 py-2 text-sm font-bold text-forest-deep shadow-sm transition-colors hover:border-rust hover:text-rust cursor-pointer"
        >
          <ArrowLeft size={17} />
          Kembali ke {backLabel}
        </button>

        <AnimatedSection>
          <article className="card-clouds overflow-hidden rounded-3xl border border-sand/60 bg-cream shadow-xl">
            {/* Header */}
            <div className="border-b border-sand/40 bg-gradient-to-br from-sage/25 to-cream px-6 py-6 sm:px-9 sm:py-8">
              <div className="flex items-center gap-4">
                {activeItem.logoUrl && (
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-sand/60 bg-white p-2 shadow-sm">
                    <Image src={activeItem.logoUrl} alt={`Logo ${activeItem.title}`} fill sizes="64px" className="object-contain" />
                  </div>
                )}
                <div>
                  <span className="inline-block rounded-full bg-rust/12 px-3 py-1 text-xs font-black uppercase tracking-widest text-rust">
                    {activeItem.category}
                  </span>
                  <h1 className="mt-2 font-display text-3xl leading-tight text-forest-deep sm:text-4xl">
                    {activeItem.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="grid gap-8 p-6 sm:p-9 md:grid-cols-[1.5fr_1fr]">
              <div className="min-w-0">
                {activeItem.description && (
                  <p className="whitespace-pre-line text-justify text-[15px] leading-relaxed text-forest-deep/85 sm:text-base">
                    {activeItem.description}
                  </p>
                )}


              </div>

              {/* Aside: tautan (minimalist & clean) */}
              <aside className="self-start">
                {activeItem.href ? (
                  <a
                    href={activeItem.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-forest-deep px-5 py-3.5 text-sm font-bold text-cream shadow-md transition-all hover:-translate-y-0.5 hover:bg-rust"
                  >
                    <LinkIcon size={18} />
                    {activeItem.hrefLabel ?? 'Buka tautan'}
                    <ArrowUpRight size={16} className="opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <p className="rounded-2xl border border-dashed border-sand/60 bg-cream/50 px-4 py-3 text-center text-xs font-medium text-forest/60">
                    Tautan belum tersedia
                  </p>
                )}
              </aside>
            </div>
          </article>
        </AnimatedSection>
      </section>
    );
  }

  /* ------------------------------- LIST VIEW ------------------------------- */
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6 sm:pt-28">
      {/* Header + Overview */}
      <AnimatedSection>
        <h1 className="font-display text-4xl font-extrabold text-forest-deep sm:text-5xl leading-tight">
          <MaskedText text={backLabel} as="span" />
        </h1>
        {overview && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-forest-deep/80 sm:text-lg">
            {overview}
          </p>
        )}
      </AnimatedSection>

      {/* Category chips */}
      <div className="mt-7 mb-8 flex flex-wrap gap-2 sm:gap-2.5">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full px-4 py-2 text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
              category === item
                ? 'bg-rust text-cream shadow-md scale-105'
                : 'bg-sand/30 text-forest-deep hover:bg-sand/50'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <StaggerContainer key={category} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => (
          <StaggerItem key={item.id}>
            <CardParallaxTilt
              maxTilt={8}
              className="card-clouds h-full rounded-3xl border border-sand/60 bg-cream/90 shadow-md transition-colors duration-300 hover:border-rust/50 hover:shadow-2xl"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => setActiveId(item.id)}
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveId(item.id);
                  }
                }}
                className="group flex h-full cursor-pointer flex-col p-6"
              >

                <h2 className="font-display text-2xl font-bold leading-tight text-forest-deep transition-colors group-hover:text-rust">
                  {item.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-forest-deep/80 sm:text-base">
                  {item.summary}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-sand/40 pt-5">
                  <span className="inline-flex items-center rounded-full bg-sage/30 px-3 py-1 text-xs font-black uppercase tracking-wider text-forest-deep">
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-black text-forest-deep transition-colors group-hover:text-rust">
                    Baca
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </CardParallaxTilt>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {visibleItems.length === 0 && (
        <div className="rounded-3xl border border-dashed border-sand/60 bg-cream/50 p-12 text-center text-sm font-medium text-forest-deep/70">
          Belum ada informasi pada kategori ini.
        </div>
      )}
    </section>
  );
}
