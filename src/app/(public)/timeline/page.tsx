import type { Metadata } from 'next';
import { PageDecor } from '@/components/ui/jungle-decor';
import { CalendarTicketBadge } from '@/components/timeline/calendar-ticket-badge';
import { ExpandingTimelineGrid } from '@/components/timeline/expanding-timeline-grid';
import { AnimatedSection, TextReveal } from '@/components/ui/animated-section';

export const metadata: Metadata = {
  title: 'Timeline PKKMB BHUMARA 2026 — Telkom University Purwokerto',
  description:
    'Simpan rute empat hari orientasi, lokasi kegiatan, dresscode, dan rundown agenda PKKMB BHUMARA 2026.',
};

export default function TimelinePage() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-24 sm:pt-32 pb-24 min-h-dvh">
      <PageDecor critter="rusa" />

      {/* Hero Section */}
      <AnimatedSection className="grid gap-8 py-6 md:grid-cols-[1fr_auto] md:items-center md:py-10">
        <div>
          <span className="font-display text-xs font-bold uppercase tracking-widest text-rust">
            RUTE EMPAT HARI
          </span>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold text-forest-deep sm:text-5xl lg:text-6xl leading-[1.05]">
            <TextReveal text="Datang tepat waktu, pulang membawa cerita." />
          </h1>
          <p className="mt-4 max-w-xl text-base sm:text-lg text-forest/80 font-medium leading-relaxed">
            Simpan waktu dan lokasi setiap kegiatan agar perjalanan PKKMB BHUMARA 2026 Anda tetap lancar.
          </p>
        </div>

        {/* Ticket Badge */}
        <div className="flex justify-center">
          <CalendarTicketBadge />
        </div>
      </AnimatedSection>

      {/* Interactive Expanding Grid Timeline */}
      <AnimatedSection delay={0.2} className="mt-8 sm:mt-12">
        <ExpandingTimelineGrid />
      </AnimatedSection>
    </div>
  );
}
