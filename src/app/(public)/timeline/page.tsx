import type { Metadata } from 'next';
import { PageDecor } from '@/components/ui/jungle-decor';
import { CalendarTicketBadge, type CalendarTicketData } from '@/components/timeline/calendar-ticket-badge';
import { ExpandingTimelineGrid, type ApiEvent } from '@/components/timeline/expanding-timeline-grid';
import { AnimatedSection, TextReveal } from '@/components/ui/animated-section';
import { getTimelineEvents } from '@/lib/api/queries';

export const metadata: Metadata = {
  title: 'Timeline PKKMB BHUMARA 2026 — Telkom University Purwokerto',
  description:
    'Simpan rute empat hari orientasi, lokasi kegiatan, dresscode, dan rundown agenda PKKMB BHUMARA 2026.',
};

export const dynamic = 'force-dynamic';

const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

/**
 * Pilih kegiatan untuk badge tanggal (data DB, bukan mock):
 * 1) yang SEDANG berlangsung hari ini (status ongoing),
 * 2) bila tidak ada → upcoming terdekat,
 * 3) bila semua sudah lewat → kegiatan terakhir (paling baru).
 */
function pickFeatured(events: ApiEvent[]): CalendarTicketData | null {
  const main = events.filter((e) => e.day == null);
  const pool = main.length > 0 ? main : events;
  if (pool.length === 0) return null;

  const byDate = [...pool].sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  const chosen =
    byDate.find((e) => e.status === 'ongoing') ??
    byDate.find((e) => e.status === 'upcoming') ??
    byDate[byDate.length - 1];

  const d = new Date(chosen.startAt);
  return {
    day: String(d.getDate()),
    monthYear: `${BULAN[d.getMonth()]} ${d.getFullYear()}`,
    label: chosen.judul,
    location: 'Telkom University Purwokerto',
    state: chosen.status,
  };
}

export default async function TimelinePage() {
  const events = await getTimelineEvents();
  const firstEvent = pickFeatured(events);

  return (
    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-24 sm:pt-32 pb-24 min-h-dvh">
      <PageDecor critter="rusa" />

      {/* Hero Section */}
      <AnimatedSection className="grid gap-8 py-6 md:grid-cols-[1fr_auto] md:items-center md:py-10">
        <div>
          <h1 className="max-w-2xl font-display text-4xl font-extrabold text-forest-deep sm:text-5xl lg:text-6xl leading-[1.05]">
            <TextReveal text="Datang tepat waktu, pulang membawa cerita." />
          </h1>
          <p className="mt-4 max-w-xl text-base sm:text-lg text-forest/80 font-medium leading-relaxed">
            Simpan waktu dan lokasi setiap kegiatan agar perjalanan PKKMB BHUMARA 2026 Anda tetap lancar.
          </p>
        </div>

        {/* Ticket Badge — kegiatan paling awal dari data timeline */}
        {firstEvent && (
          <div className="flex justify-center">
            <CalendarTicketBadge {...firstEvent} />
          </div>
        )}
      </AnimatedSection>

      {/* Interactive Expanding Grid Timeline (data dari server → tampil di mana saja) */}
      <AnimatedSection delay={0.2} className="mt-8 sm:mt-12">
        <ExpandingTimelineGrid events={events} />
      </AnimatedSection>
    </div>
  );
}
