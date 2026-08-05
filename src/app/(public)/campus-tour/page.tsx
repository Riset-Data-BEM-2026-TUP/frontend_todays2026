import type { Metadata } from 'next';
import { ExpandingCampusGrid } from '@/components/campus-tour/expanding-campus-grid';
import { AnimatedSection, TextReveal } from '@/components/ui/animated-section';
import { PageDecor } from '@/components/ui/jungle-decor';

export const metadata: Metadata = {
  title: 'Campus Tour - TODAYS 2026',
  description: 'Peta spasial & fasilitas gedung Telkom University Purwokerto.',
};

export default function CampusTourPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32 pb-32 sm:pb-40 min-h-dvh">
      <PageDecor critter="jerapah" />

      {/* Header */}
      <AnimatedSection>
        <div className="max-w-3xl">
          <span className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-widest text-rust">
            PETA & FASILITAS KAMPUS
          </span>
          <h1 className="mt-1 font-display text-4xl font-extrabold text-forest-deep sm:text-5xl lg:text-6xl leading-tight">
            <TextReveal text="Campus Tour Virtual" />
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-forest-deep font-semibold leading-relaxed">
            Kenali lingkungan, titik penting, dan fasilitas modern di Telkom University Purwokerto sebelum kamu mendarat di kampus. Klik setiap kartu lokasi untuk detail fasilitas lengkap & petunjuk navigasi.
          </p>
        </div>
      </AnimatedSection>

      {/* Expanding Grid of Campus Spots & Popup Modals */}
      <AnimatedSection delay={0.2} className="mt-12 min-h-[920px] pb-12">
        <ExpandingCampusGrid />
      </AnimatedSection>
    </div>
  );
}
