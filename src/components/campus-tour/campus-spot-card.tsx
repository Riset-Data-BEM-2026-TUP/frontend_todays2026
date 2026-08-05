'use client';

import { MapPin, ExternalLink, Building2, Library, Cpu, Users, Trophy, Landmark } from 'lucide-react';
import type { CampusSpotItem } from './campus-tour-data';

interface CampusSpotCardProps {
  item: CampusSpotItem;
  onClick: (rect: DOMRect) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Library,
  Cpu,
  Users,
  Trophy,
  Landmark,
};

export function CampusSpotCard({ item, onClick }: CampusSpotCardProps) {
  const IconComponent = iconMap[item.iconName] || Building2;

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
      className="campus-spot-card group relative flex flex-col justify-between h-full cursor-pointer overflow-hidden rounded-3xl border border-sand/60 bg-cream/90 p-5 sm:p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-rust/50 hover:shadow-2xl"
    >
      <div>
        {/* Banner Gradient Header */}
        <div
          className={`h-32 rounded-2xl bg-gradient-to-r ${item.gradient} p-4 flex flex-col justify-between relative overflow-hidden mb-4 border border-cream/20 shadow-inner`}
        >
          <div className="absolute inset-0 opacity-20 bhumara-pattern-bg" />
          <div className="relative z-10 flex items-center justify-between">
            <span className="rounded-full bg-forest-deep/90 backdrop-blur-md px-3.5 py-1 text-xs font-black text-sand border border-cream/20 shadow-sm">
              {item.kategori}
            </span>
            <div className="p-2 rounded-xl bg-forest-deep/60 backdrop-blur-md text-cream">
              <IconComponent className="size-4.5 text-sand" />
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-1.5 text-xs font-extrabold text-cream/90 bg-forest-deep/60 backdrop-blur-md w-fit px-3 py-1 rounded-lg border border-cream/15">
            <MapPin className="size-3.5 text-rust shrink-0" />
            <span className="truncate">{item.lokasi}</span>
          </div>
        </div>

        {/* Spot Title */}
        <h3 className="font-display text-2xl font-bold text-forest-deep group-hover:text-rust transition-colors leading-tight">
          {item.nama}
        </h3>

        {/* Short Description */}
        <p className="mt-2.5 text-sm sm:text-base text-forest-deep leading-relaxed font-semibold line-clamp-2">
          {item.deskripsi}
        </p>

        {/* Sleek Facility Tag Chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {item.fasilitas.slice(0, 2).map((f) => (
            <span
              key={f}
              className="rounded-lg bg-sage/20 border border-sage/40 px-3 py-1 text-xs sm:text-sm font-bold text-forest-deep flex items-center gap-1.5"
            >
              <span className="text-rust">✓</span>
              <span>{f}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Aesthetic Card Footer Pill Button */}
      <div className="mt-6 pt-4 border-t border-sand/40 flex items-center justify-between gap-3">
        <span className="text-xs font-black uppercase tracking-wider text-forest-deep/70">
          TelU Purwokerto
        </span>

        <div className="inline-flex items-center gap-2 rounded-xl bg-forest-deep px-4 py-2 text-xs sm:text-sm font-black text-sand shadow-sm group-hover:bg-rust group-hover:text-cream transition-colors">
          <span>Detail Spot</span>
          <ExternalLink className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
