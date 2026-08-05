'use client';

import { Clock, MapPin, ChevronRight } from 'lucide-react';
import type { DayTimelineData } from './timeline-data';

interface TimelineDayCardProps {
  day: DayTimelineData;
  onClick: (rect: DOMRect) => void;
  isEven: boolean;
}

export function TimelineDayCard({ day, onClick, isEven }: TimelineDayCardProps) {
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
      className={`day-grid-card group relative grid cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${
        isEven
          ? 'border-forest/20 bg-cream/90 hover:bg-cream hover:border-rust/40'
          : 'border-sage/30 bg-sage/15 hover:bg-sage/25 hover:border-forest/40'
      } shadow-md hover:shadow-xl md:grid-cols-[7.5rem_1fr_auto]`}
    >
      {/* Column 1: Number & Day Badge */}
      <div className="flex items-center gap-3 border-b border-forest/10 px-5 py-4 md:block md:border-b-0 md:border-r md:py-5">
        <span className="font-display text-4xl sm:text-5xl leading-none text-forest-deep/30 transition-colors group-hover:text-rust font-black">
          {day.dayNumber}
        </span>
        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-rust md:mt-2 md:block">
          {day.dayLabel}
        </span>
      </div>

      {/* Column 2: Content Details */}
      <div className="px-5 py-4 md:px-6 md:py-5">
        <p className="text-xs sm:text-sm font-extrabold text-forest-deep uppercase tracking-wide">
          {day.dateStr}
        </p>
        
        <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-forest-deep leading-tight group-hover:text-rust transition-colors">
          {day.title}
        </h3>

        <div className="mt-3.5 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-forest-deep">
          <span className="inline-flex items-center gap-2">
            <Clock className="size-4 text-rust shrink-0" />
            <span>{day.timeRange}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4 text-rust shrink-0" />
            <span>{day.location}</span>
          </span>
        </div>
      </div>

      {/* Column 3: Hover Accent Line & CTA Arrow */}
      <div className="hidden items-center px-6 md:flex gap-3">
        <span className="h-0.5 w-8 bg-forest/20 transition-all duration-300 group-hover:w-14 group-hover:bg-rust" />
        <span className="flex size-9 items-center justify-center rounded-full bg-forest-deep/10 text-forest-deep transition-all group-hover:bg-rust group-hover:text-cream">
          <ChevronRight className="size-5" />
        </span>
      </div>
    </div>
  );
}
