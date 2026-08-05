import type { Metadata } from 'next';
import { ExpandingAcademicGrid } from '@/components/academic/expanding-academic-grid';
import { AnimatedSection, TextReveal } from '@/components/ui/animated-section';
import { PageDecor } from '@/components/ui/jungle-decor';

export const metadata: Metadata = {
  title: 'Platform Akademik - TODAYS 2026',
  description: 'Panduan portal akademik iGracias, CeLOE LMS, TelU Open Library, dan aplikasi mobile mahasiswa.',
};

export default function AcademicPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32 pb-32 sm:pb-40 min-h-dvh">
      <PageDecor
        critter="rusa"
        critterClassName="absolute bottom-48 right-0 hidden h-52 w-auto opacity-100 drop-shadow-xl lg:block"
      />

      {/* Page Header */}
      <AnimatedSection>
        <div className="max-w-3xl">
          <span className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-widest text-rust">
            SISTEM INFORMASI KAMPUS
          </span>
          <h1 className="mt-1 font-display text-4xl font-extrabold text-forest-deep sm:text-5xl lg:text-6xl leading-tight">
            <TextReveal text="Platform Akademik" />
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-forest-deep font-semibold leading-relaxed">
            Pusat akses resmi portal iGracias, e-learning CeLOE LMS, perpustakaan digital OpenLibrary, lisensi Office 365, dan aplikasi mobile mahasiswa Telkom University Purwokerto.
          </p>
        </div>
      </AnimatedSection>

      {/* Interactive Academic Grid & Details */}
      <AnimatedSection delay={0.2} className="mt-12 min-h-[920px] pb-12">
        <ExpandingAcademicGrid />
      </AnimatedSection>
    </div>
  );
}
