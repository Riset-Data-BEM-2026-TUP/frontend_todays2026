import type { Metadata } from 'next';
import { TimelineList } from '@/components/timeline/timeline-list';
import { AnimatedSection, TextReveal } from '@/components/ui/animated-section';

export const metadata: Metadata = { title: 'Timeline' };

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
      <AnimatedSection>
        <span className="font-display text-xs font-bold uppercase tracking-widest text-rust">
          AGENDA & KEGIATAN
        </span>
        <h1 className="mt-1 font-display text-4xl font-extrabold text-forest-deep sm:text-5xl">
          <TextReveal text="Timeline BHUMARA 2026" />
        </h1>
        <p className="mt-3 text-lg text-forest/80 font-medium leading-relaxed max-w-2xl">
          Rangkaian jadwal & agenda resmi pelaksanaan PKKMB Telkom University Purwokerto 2026.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="mt-12">
        <TimelineList />
      </AnimatedSection>
    </div>
  );
}
