'use client';

import { Clock, MapPin, X } from 'lucide-react';
import type { DayTimelineData } from './timeline-data';

interface TimelineExpandedDetailProps {
  day: DayTimelineData;
  onClose: () => void;
}

export function TimelineExpandedDetail({ day, onClose }: TimelineExpandedDetailProps) {
  return (
    <div className="relative flex flex-col md:flex-row h-[620px] max-h-[85vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-cream border-2 border-forest/30 shadow-2xl shadow-forest-deep/30">
      {/* Left Column: Fixed Banner & Metadata */}
      <div className="relative md:w-5/12 lg:w-4/12 h-full bg-gradient-to-br from-forest-deep via-forest to-forest-deep p-6 sm:p-8 text-cream flex flex-col justify-between shrink-0 overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-15 bhumara-pattern-bg pointer-events-none" />

        {/* Top Header info */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <span className="font-display text-5xl sm:text-6xl leading-none text-sand font-black drop-shadow-sm">
              {day.dayNumber}
            </span>
            <div className="flex flex-col gap-1">
              <span className="inline-block w-fit rounded-full bg-rust px-3.5 py-1 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cream shadow-sm">
                {day.dayLabel}
              </span>
              <span className="text-xs sm:text-sm font-bold text-cream/90">
                {day.dateStr}
              </span>
            </div>
          </div>

          <h2 className="mt-5 font-display text-2xl sm:text-3xl lg:text-4xl text-cream font-extrabold leading-tight drop-shadow-sm">
            {day.title}
          </h2>
        </div>

        {/* Bottom Quick Metadata - Prominent & High Contrast */}
        <div className="relative z-10 rounded-2xl border border-sand/40 bg-sand/15 p-4 space-y-3.5 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rust/20 text-rust shrink-0">
              <Clock className="size-5 text-rust" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-wider text-sand">
                Waktu Pelaksanaan
              </span>
              <span className="text-sm sm:text-base font-bold text-cream leading-snug">
                {day.timeRange}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Fixed Height Content & Hidden Scrollbar Panel */}
      <div className="relative md:w-7/12 lg:w-8/12 h-full flex flex-col flex-1 bg-cream overflow-hidden">
        {/* Top Header Bar (hanya tombol tutup) */}
        <div className="flex items-center justify-end border-b border-sand/40 bg-sand/10 px-6 py-3.5 shrink-0">
          <button
            onClick={onClose}
            type="button"
            aria-label="Tutup detail"
            className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-sand/30 text-forest-deep hover:bg-rust hover:text-white transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Satu panel informasi publik; rundown detail bersifat privat. */}
        <div className="flex items-center gap-2.5 border-b border-sand/30 bg-sand/15 px-10 py-3.5 shrink-0 text-xs sm:px-11 sm:text-base font-extrabold text-forest-deep">
          <span>Informasi Kegiatan</span>
        </div>

        {/* Informasi publik tanpa rundown detail atau navigasi tab. */}
        <div data-lenis-prevent className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-7 space-y-5 overscroll-contain">
          {day.summary && (
            <div className="rounded-2xl border border-sand/40 bg-sand/10 p-4 sm:p-5">
              <p className="text-sm sm:text-base font-medium leading-relaxed text-forest-deep/85">{day.summary}</p>
              {day.location && (
                <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm font-bold text-forest/75">
                  <MapPin className="size-4 shrink-0 text-rust" />
                  <span>{day.location}</span>
                </div>
              )}
            </div>
          )}

          {(day.checklist.length > 0 || day.dresscode) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {day.checklist.length > 0 && (
                <section className="rounded-2xl border border-sand/40 bg-sand/10 p-4 sm:p-5">
                  <h3 className="text-sm font-black text-forest-deep">Barang Bawaan</h3>
                  <ul className="mt-3 space-y-2 text-sm font-medium text-forest-deep/85">
                    {day.checklist.map((item, index) => (
                      <li key={`${day.id}-checklist-${index}`} className="flex gap-2">
                        <span className="text-rust">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {day.dresscode && (
                <section className="rounded-2xl border border-sand/40 bg-sand/10 p-4 sm:p-5">
                  <h3 className="text-sm font-black text-forest-deep">Ketentuan Dresscode</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-forest-deep/85">{day.dresscode}</p>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
