'use client';

import { useQuery } from '@tanstack/react-query';
import { getTimeline, type TimelineEvent } from '@/lib/api/queries';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const statusStyle: Record<TimelineEvent['status'], string> = {
  completed: 'border-sage bg-sage/15 text-forest',
  ongoing: 'border-rust bg-rust/20 text-rust font-bold',
  upcoming: 'border-sand bg-sand/20 text-forest-deep',
};
const statusLabel: Record<TimelineEvent['status'], string> = {
  completed: 'Selesai',
  ongoing: 'Berlangsung',
  upcoming: 'Akan Datang',
};

function fmt(iso: string, end?: string | null) {
  const d = new Date(iso);
  const opt: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  const s = d.toLocaleDateString('id-ID', opt);
  if (end) {
    const e = new Date(end).toLocaleDateString('id-ID', opt);
    if (e !== s) return `${s} \u2013 ${e}`;
  }
  return s;
}

export function TimelineList({ limit }: { limit?: number }) {
  const { data, isLoading, isError } = useQuery({ queryKey: ['timeline'], queryFn: getTimeline });

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 py-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="size-6 border-3 border-rust border-t-transparent rounded-full"
        />
        <p className="text-base text-forest/80 font-medium">Memuat rangkaian agenda…</p>
      </div>
    );
  }

  if (isError) return <p className="text-base text-forest/80">Agenda belum tersedia. Silakan coba lagi nanti.</p>;

  const items = limit ? (data ?? []).slice(0, limit) : data ?? [];

  return (
    <ol className="relative border-l-2 border-sand/60 pl-6 sm:pl-8 space-y-10">
      {items.map((e, index) => (
        <motion.li
          key={e.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative"
        >
          {/* Animated Timeline Node */}
          <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center">
            {e.status === 'ongoing' && (
              <motion.span
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute size-5 rounded-full bg-rust/40"
              />
            )}
            <span
              className={`size-4 sm:size-5 rounded-full border-2 bg-cream transition-colors ${
                e.status === 'ongoing' ? 'border-rust bg-rust' : e.status === 'completed' ? 'border-sage bg-sage' : 'border-sand'
              }`}
            />
          </span>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-display text-base font-bold text-forest-deep">{fmt(e.startAt, e.endAt)}</span>
            <span className={`rounded-full border px-3 py-1 text-xs sm:text-sm font-semibold ${statusStyle[e.status]}`}>
              {statusLabel[e.status]}
            </span>
          </div>

          <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-ink">{e.judul}</h3>
          {e.deskripsi && <p className="mt-2 text-base text-forest/90 leading-relaxed max-w-2xl">{e.deskripsi}</p>}

          {e.lokasi && (
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-forest/80">
              <MapPin size={16} className="text-rust shrink-0" /> {e.lokasi}
            </p>
          )}

          {e.checklistItems?.length ? (
            <div className="mt-3.5 rounded-2xl border border-sand/50 bg-cream/70 p-4 max-w-xl">
              <p className="text-xs font-bold uppercase tracking-wider text-rust mb-2">Hal yang Perlu Dibawa / Dipersiapkan:</p>
              <ul className="space-y-1.5 text-sm text-forest/90 font-medium">
                {e.checklistItems.map((c) => (
                  <li key={c} className="flex items-center gap-2.5">
                    <span className="size-2 rounded-full bg-rust shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </motion.li>
      ))}
    </ol>
  );
}
