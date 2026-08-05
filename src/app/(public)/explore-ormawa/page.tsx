import type { Metadata } from 'next';
import { AnimatedSection, TextReveal } from '@/components/ui/animated-section';
import { PageDecor } from '@/components/ui/jungle-decor';
import { ExpandingOrmawaGrid } from '@/components/explore-ormawa/expanding-ormawa-grid';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Explore Ormawa & UKM — PKKMB BHUMARA 2026',
  description:
    'Direktori Organisasi Kemahasiswaan & Unit Kegiatan Mahasiswa Telkom University Purwokerto.',
};

export default function ExploreOrmawaPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32 pb-24 min-h-dvh">
      <PageDecor critter="oranghutan" />

      {/* Page Header */}
      <AnimatedSection>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} className="text-rust" />
          <span className="font-display text-xs font-bold uppercase tracking-widest text-rust">
            DIREKTORI ORGANISASI KAMPUS
          </span>
        </div>
        <h1 className="font-display text-4xl text-forest-deep sm:text-5xl leading-tight">
          <TextReveal text="Explore Ormawa & UKM" />
        </h1>
        <p className="mt-4 text-base sm:text-lg text-forest/80 font-medium leading-relaxed max-w-2xl">
          Jelajahi beragam pilihan Organisasi Kemahasiswaan (Ormawa) & Unit Kegiatan Mahasiswa (UKM) di Telkom University Purwokerto.
        </p>
      </AnimatedSection>

      {/* Interactive Expanding Grid for Ormawa */}
      <AnimatedSection delay={0.2} className="mt-10">
        <ExpandingOrmawaGrid />
      </AnimatedSection>
    </div>
  );
}
