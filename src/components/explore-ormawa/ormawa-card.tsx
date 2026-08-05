'use client';

import { ExternalLink, Sparkles } from 'lucide-react';
import type { OrmawaItem } from './ormawa-data';

interface OrmawaCardProps {
  item: OrmawaItem;
  onClick: (rect: DOMRect) => void;
}

export function OrmawaCard({ item, onClick }: OrmawaCardProps) {
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onClick(rect);
  };

  return (
    <div
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const rect = e.currentTarget.getBoundingClientRect();
          onClick(rect);
        }
      }}
      className="ormawa-grid-card group relative flex flex-col justify-between h-full cursor-pointer overflow-hidden rounded-3xl border border-sand/60 bg-cream/90 p-5 sm:p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-rust/50 hover:shadow-2xl"
    >
      <div>
        {/* Banner Gradient Header */}
        <div
          className={`h-28 rounded-2xl bg-gradient-to-r ${item.bannerGradient} p-4 flex items-start justify-between relative overflow-hidden mb-4 border border-cream/20 shadow-inner`}
        >
          <div className="absolute inset-0 opacity-20 bhumara-pattern-bg" />
          <span className="relative z-10 rounded-full bg-forest-deep/90 backdrop-blur-md px-3.5 py-1 text-xs sm:text-sm font-black text-sand border border-cream/20 shadow-sm">
            {item.singkatan}
          </span>
          {item.isOpen ? (
            <span className="relative z-10 rounded-full bg-rust px-3.5 py-1 text-xs font-black uppercase tracking-wider text-cream shadow-md animate-pulse flex items-center gap-1">
              <Sparkles className="size-3.5" /> Open Recruitment
            </span>
          ) : (
            <span className="relative z-10 rounded-full bg-forest-deep/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-sand border border-sand/20">
              Registrasi Ditutup
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-black uppercase tracking-widest text-rust">
            {item.kategori}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl font-bold text-forest-deep group-hover:text-rust transition-colors leading-tight">
          {item.nama}
        </h3>

        {/* Short Description */}
        <p className="mt-2.5 text-sm sm:text-base text-forest-deep leading-relaxed font-semibold line-clamp-3">
          {item.deskripsi}
        </p>

        {/* Tag Chips */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-sage/20 border border-sage/40 px-3 py-1 text-xs font-bold text-forest-deep"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Aesthetic Card Footer Pill Button */}
      <div className="mt-6 pt-4 border-t border-sand/40 flex items-center justify-between gap-3">
        <span className="text-xs font-black uppercase tracking-wider text-forest-deep/70 truncate">
          {item.instagram}
        </span>

        <div className="inline-flex items-center gap-2 rounded-xl bg-forest-deep px-4 py-2 text-xs sm:text-sm font-black text-sand shadow-sm group-hover:bg-rust group-hover:text-cream transition-colors shrink-0">
          <span>Detail UKM</span>
          <ExternalLink className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
