'use client';

import { useState } from 'react';
import { Clock, MapPin, Shirt, CheckSquare, ListOrdered, X, ExternalLink, Sparkles } from 'lucide-react';
import type { DayTimelineData } from './timeline-data';

interface TimelineExpandedDetailProps {
  day: DayTimelineData;
  onClose: () => void;
}

export function TimelineExpandedDetail({ day, onClose }: TimelineExpandedDetailProps) {
  const [activeTab, setActiveTab] = useState<'rundown' | 'checklist' | 'dresscode'>('rundown');

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

          <div className="flex items-start gap-3 pt-2.5 border-t border-sand/20">
            <div className="p-2 rounded-xl bg-rust/20 text-rust shrink-0">
              <MapPin className="size-5 text-rust" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-wider text-sand">
                Lokasi Kegiatan
              </span>
              <span className="text-sm sm:text-base font-bold text-cream leading-snug">
                {day.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Fixed Height Content & Hidden Scrollbar Panel */}
      <div className="relative md:w-7/12 lg:w-8/12 h-full flex flex-col flex-1 bg-cream overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-sand/40 bg-sand/10 px-6 py-3.5 shrink-0">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-rust flex items-center gap-2">
            <Sparkles className="size-4" /> Rangkaian Kegiatan Hari ke-{day.dayNumber}
          </span>
          <button
            onClick={onClose}
            type="button"
            aria-label="Tutup detail"
            className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-sand/30 text-forest-deep hover:bg-rust hover:text-white transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation Tabs (Sleek Segmented Pill, Scrollbar Hidden) */}
        <div className="flex border-b border-sand/30 bg-sand/15 px-6 pt-3 gap-2 shrink-0 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('rundown')}
            className={`flex items-center gap-2.5 px-5 py-3 text-xs sm:text-base font-bold rounded-t-xl transition-all whitespace-nowrap ${
              activeTab === 'rundown'
                ? 'bg-cream text-forest-deep border-t-2 border-x border-sand/60 shadow-sm font-extrabold'
                : 'text-forest/70 hover:text-forest-deep hover:bg-cream/40'
            }`}
          >
            <ListOrdered className="size-4 sm:size-5 text-rust" />
            <span>Rundown Agenda</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-2.5 px-5 py-3 text-xs sm:text-base font-bold rounded-t-xl transition-all whitespace-nowrap ${
              activeTab === 'checklist'
                ? 'bg-cream text-forest-deep border-t-2 border-x border-sand/60 shadow-sm font-extrabold'
                : 'text-forest/70 hover:text-forest-deep hover:bg-cream/40'
            }`}
          >
            <CheckSquare className="size-4 sm:size-5 text-rust" />
            <span>Barang Bawaan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dresscode')}
            className={`flex items-center gap-2.5 px-5 py-3 text-xs sm:text-base font-bold rounded-t-xl transition-all whitespace-nowrap ${
              activeTab === 'dresscode'
                ? 'bg-cream text-forest-deep border-t-2 border-x border-sand/60 shadow-sm font-extrabold'
                : 'text-forest/70 hover:text-forest-deep hover:bg-cream/40'
            }`}
          >
            <Shirt className="size-4 sm:size-5 text-rust" />
            <span>Ketentuan Dresscode</span>
          </button>
        </div>

        {/* Scrollable Content Panel (Hidden Scrollbar + Fixed Height Container) */}
        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-7 space-y-6 overscroll-contain"
        >
          {/* RUNDOWN TAB */}
          {activeTab === 'rundown' && (
            <div className="space-y-4">
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-rust">
                Susunan Acara Jam-demi-Jam
              </h3>
              <div className="relative border-l-2 border-rust/30 pl-5 space-y-4">
                {day.rundown.map((item, idx) => (
                  <div key={idx} className="relative group">
                    <span className="absolute -left-[27px] top-2 size-3.5 rounded-full border-2 border-cream bg-rust shadow-sm" />
                    
                    <div className="rounded-2xl border border-sand/40 bg-sand/10 p-4 transition-all hover:bg-sand/20 hover:border-sand/70">
                      <span className="inline-block rounded-md bg-forest-deep px-3 py-1 text-xs sm:text-sm font-extrabold text-sand mb-2">
                        {item.time}
                      </span>
                      <h4 className="font-display text-base sm:text-xl text-forest-deep font-bold leading-snug">
                        {item.activity}
                      </h4>
                      {item.notes && (
                        <p className="mt-1.5 text-xs sm:text-sm font-semibold text-forest/90 flex items-center gap-1.5">
                          <span>📍</span> <span>{item.notes}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHECKLIST TAB */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-rust">
                Perlengkapan Wajib Dipersiapkan
              </h3>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {day.checklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl border border-sand/50 bg-cream p-4 shadow-sm hover:border-rust/40 transition-colors"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-rust/15 text-rust font-extrabold text-xs mt-0.5">
                      ✓
                    </span>
                    <span className="text-sm sm:text-base font-bold text-forest-deep leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DRESSCODE TAB */}
          {activeTab === 'dresscode' && (
            <div className="space-y-4">
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-rust">
                Ketentuan Seragam & Pakaian
              </h3>
              <div className="rounded-2xl border-l-4 border-rust border-y border-r border-sand/40 bg-sand/15 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2.5 text-rust font-display text-base sm:text-lg font-extrabold">
                  <Shirt className="size-5 sm:size-6 shrink-0" />
                  <span>Ketentuan Pakaian Resmi</span>
                </div>
                <p className="text-sm sm:text-base text-forest-deep font-semibold leading-relaxed">
                  {day.dresscode}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-sand/40 bg-sand/10 px-6 py-4 flex items-center justify-between gap-3 shrink-0">
          {day.mapUrl ? (
            <a
              href={day.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-forest-deep px-5 py-2.5 text-xs sm:text-sm font-extrabold text-cream hover:bg-rust transition-colors shadow-sm"
            >
              <MapPin className="size-4 text-sand" />
              <span>Petunjuk Lokasi Maps</span>
              <ExternalLink className="size-3.5 ml-0.5 opacity-80" />
            </a>
          ) : <div />}

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-forest/30 bg-cream px-6 py-2.5 text-xs sm:text-sm font-extrabold text-forest-deep hover:bg-sand/20 transition-colors"
          >
            Tutup Detail
          </button>
        </div>
      </div>
    </div>
  );
}
