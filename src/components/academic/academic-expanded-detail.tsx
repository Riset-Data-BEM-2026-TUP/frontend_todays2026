'use client';

import { useState } from 'react';
import { ExternalLink, Sparkles, X, Target, ListChecks, HelpCircle, ShieldCheck, Globe } from 'lucide-react';
import type { AcademicPlatformItem } from './academic-data';

interface AcademicExpandedDetailProps {
  item: AcademicPlatformItem;
  onClose: () => void;
}

export function AcademicExpandedDetail({ item, onClose }: AcademicExpandedDetailProps) {
  const [activeTab, setActiveTab] = useState<'fitur' | 'panduan' | 'faq'>('fitur');

  return (
    <div className="relative flex flex-col md:flex-row h-[620px] max-h-[85vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-cream border-2 border-forest/30 shadow-2xl shadow-forest-deep/30">
      {/* Left Column: Fixed Identity Banner & Quick Link */}
      <div
        className={`relative md:w-5/12 lg:w-4/12 h-full bg-gradient-to-br ${item.bannerGradient} p-6 sm:p-8 text-cream flex flex-col justify-between shrink-0 overflow-hidden`}
      >
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-15 bhumara-pattern-bg pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-forest-deep/90 backdrop-blur-md px-4 py-1 text-xs sm:text-sm font-extrabold text-sand border border-cream/20 shadow-sm">
            {item.singkatan}
          </span>
          <span className="rounded-full bg-rust px-3.5 py-1 text-xs font-black uppercase tracking-wider text-cream shadow-sm flex items-center gap-1">
            <Sparkles className="size-3.5" /> Portal Resmi
          </span>
        </div>

        {/* Middle Identity */}
        <div className="relative z-10 my-4 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-sand block">
            {item.kategori}
          </span>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-cream font-extrabold leading-tight drop-shadow-sm">
            {item.nama}
          </h2>
        </div>

        {/* Bottom Direct URL Button Card */}
        <div className="relative z-10 space-y-3.5 rounded-2xl border border-sand/40 bg-sand/15 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sand">
            <ShieldCheck className="size-4 text-rust shrink-0" />
            <span>Single Sign-On (SSO) TelU</span>
          </div>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-rust px-4 py-3 text-xs sm:text-sm font-black text-cream hover:bg-rust/90 transition-all shadow-md shadow-rust/20 group"
          >
            <Globe className="size-4" />
            <span>Buka Portal Platform</span>
            <ExternalLink className="size-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Right Column: Fixed Height Content & Hidden Scrollbar Panel */}
      <div className="relative md:w-7/12 lg:w-8/12 h-full flex flex-col flex-1 bg-cream overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-sand/40 bg-sand/10 px-6 py-3.5 shrink-0">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-rust flex items-center gap-2">
            <Sparkles className="size-4" /> Panduan & Informasi Akademik
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

        {/* Navigation Tabs (Scrollbar Hidden) */}
        <div className="flex border-b border-sand/30 bg-sand/15 px-6 pt-3 gap-2 shrink-0 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('fitur')}
            className={`flex items-center gap-2.5 px-5 py-3 text-xs sm:text-base font-bold rounded-t-xl transition-all whitespace-nowrap ${
              activeTab === 'fitur'
                ? 'bg-cream text-forest-deep border-t-2 border-x border-sand/60 shadow-sm font-extrabold'
                : 'text-forest/70 hover:text-forest-deep hover:bg-cream/40'
            }`}
          >
            <Target className="size-4 sm:size-5 text-rust" />
            <span>Profil & Fitur Utama</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('panduan')}
            className={`flex items-center gap-2.5 px-5 py-3 text-xs sm:text-base font-bold rounded-t-xl transition-all whitespace-nowrap ${
              activeTab === 'panduan'
                ? 'bg-cream text-forest-deep border-t-2 border-x border-sand/60 shadow-sm font-extrabold'
                : 'text-forest/70 hover:text-forest-deep hover:bg-cream/40'
            }`}
          >
            <ListChecks className="size-4 sm:size-5 text-rust" />
            <span>Panduan Akses</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-2.5 px-5 py-3 text-xs sm:text-base font-bold rounded-t-xl transition-all whitespace-nowrap ${
              activeTab === 'faq'
                ? 'bg-cream text-forest-deep border-t-2 border-x border-sand/60 shadow-sm font-extrabold'
                : 'text-forest/70 hover:text-forest-deep hover:bg-cream/40'
            }`}
          >
            <HelpCircle className="size-4 sm:size-5 text-rust" />
            <span>Kendala & Solusi</span>
          </button>
        </div>

        {/* Scrollable Content Panel (Hidden Scrollbar + Fixed Height Container) */}
        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-7 space-y-6 overscroll-contain"
        >
          {/* TAB 1: PROFIL & FITUR */}
          {activeTab === 'fitur' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-rust mb-2">
                  Penjelasan Platform
                </h3>
                <p className="text-sm sm:text-base text-forest-deep leading-relaxed font-semibold">
                  {item.deskripsiLengkap}
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-rust mb-3">
                  Fitur Utama Mahasiswa
                </h3>
                <div className="space-y-2.5">
                  {item.fiturUtama.map((fitur, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3.5 rounded-2xl border border-sand/40 bg-sand/10 p-3.5 sm:p-4 transition-colors hover:border-sand/70 hover:bg-sand/20"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-rust text-cream font-black text-xs">
                        {idx + 1}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-forest-deep leading-snug">
                        {fitur}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PANDUAN AKSES */}
          {activeTab === 'panduan' && (
            <div className="space-y-4">
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-rust mb-1">
                Langkah-Langkah Login & Akses
              </h3>
              <div className="space-y-3">
                {item.panduanAkses.map((langkah, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 rounded-2xl border border-sand/50 bg-cream p-4 shadow-sm hover:border-rust/40 transition-colors"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-rust/15 text-rust font-black text-xs mt-0.5">
                      ✓
                    </span>
                    <span className="text-sm sm:text-base font-bold text-forest-deep leading-snug">
                      {langkah}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: KENDALA & FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-rust mb-1">
                Penanganan Masalah Akses
              </h3>
              <div className="rounded-2xl border-l-4 border-rust border-y border-r border-sand/40 bg-sand/15 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2.5 text-rust font-display text-base sm:text-lg font-extrabold">
                  <HelpCircle className="size-5 sm:size-6 shrink-0" />
                  <span>Solusi Kendala Login / Akses</span>
                </div>
                <p className="text-sm sm:text-base text-forest-deep font-semibold leading-relaxed">
                  {item.kendalaSolusi}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-sand/40 bg-sand/10 px-6 py-4 flex items-center justify-between gap-3 shrink-0">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-rust px-5 py-2.5 text-xs sm:text-sm font-black text-cream hover:bg-rust/90 transition-colors shadow-md shadow-rust/20"
          >
            <Globe className="size-4" />
            <span>Kunjungi {item.singkatan}</span>
            <ExternalLink className="size-3.5 ml-0.5 opacity-80" />
          </a>

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
