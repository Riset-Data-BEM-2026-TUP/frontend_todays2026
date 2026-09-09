'use client';

import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export type EventState = 'ongoing' | 'upcoming' | 'completed';

export type CalendarTicketData = {
  /** Tanggal (angka besar), mis. "3". */
  day: string;
  /** Bulan & tahun, mis. "September 2026". */
  monthYear: string;
  /** Judul kegiatan yang ditonjolkan. */
  label?: string;
  /** Lokasi kegiatan. */
  location?: string;
  /** Status kegiatan relatif hari ini (dari backend). */
  state?: EventState;
};

const STATE_LABEL: Record<EventState, string> = {
  ongoing: 'Sedang berlangsung',
  upcoming: 'Akan datang',
  completed: 'Telah selesai',
};

/**
 * Kartu "tiket" tanggal untuk hero Timeline — menampilkan kegiatan yang SEDANG
 * berlangsung hari ini; bila tidak ada, kegiatan upcoming terdekat (data DB,
 * bukan hardcoded). Bila data belum tersedia, komponen tidak dirender.
 */
export function CalendarTicketBadge({ day, monthYear, label, location, state }: CalendarTicketData) {
  const isOngoing = state === 'ongoing';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="card-clouds relative w-60 sm:w-64 overflow-hidden rounded-3xl border border-sand/60 bg-cream shadow-xl shadow-forest-deep/10 select-none"
      aria-label={`${state ? STATE_LABEL[state] + ': ' : ''}${day} ${monthYear}`}
    >
      {/* Header: bulan & tahun + indikator status */}
      <div className="flex items-center justify-between bg-forest-deep px-5 py-3.5 text-cream">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 shrink-0 text-sand" />
          <span className="text-xs font-black uppercase tracking-widest text-sand">{monthYear}</span>
        </div>
        <span
          className={`size-2 rounded-full ${isOngoing ? 'bg-rust animate-pulse' : 'bg-sand/60'}`}
          aria-hidden
        />
      </div>

      {/* Tanggal besar + status + label kegiatan */}
      <div className="px-5 pb-5 pt-6 text-center">
        <span className="block font-display text-7xl font-black leading-none text-forest-deep">{day}</span>
        {state && (
          <span
            className={`mt-2 block text-[11px] font-black uppercase tracking-widest ${
              isOngoing ? 'text-rust' : 'text-forest/55'
            }`}
          >
            {STATE_LABEL[state]}
          </span>
        )}
        {label && (
          <span className="mt-3 inline-block rounded-full bg-rust/12 px-4 py-1.5 text-xs font-bold leading-snug text-rust">
            {label}
          </span>
        )}
      </div>

      {/* Footer: lokasi */}
      {location && (
        <div className="flex items-center justify-center gap-2 border-t border-dashed border-sand/70 px-5 py-3 text-xs font-bold text-forest-deep">
          <MapPin className="size-4 shrink-0 text-rust" />
          <span className="truncate">{location}</span>
        </div>
      )}
    </motion.div>
  );
}
