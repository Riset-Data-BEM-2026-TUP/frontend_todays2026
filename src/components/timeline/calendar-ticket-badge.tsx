'use client';

import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export function CalendarTicketBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: 6 }}
      animate={{ opacity: 1, scale: 1, rotate: 4 }}
      whileHover={{ scale: 1.04, rotate: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative mx-auto w-64 sm:w-72 overflow-hidden rounded-2xl border border-forest/20 bg-cream shadow-xl shadow-forest-deep/15 select-none"
      aria-label="PKKMB dimulai 12 Agustus 2026"
    >
      {/* Top Bar Header */}
      <div className="flex items-center justify-between bg-forest-deep px-5 py-4 text-cream">
        <div className="flex items-center gap-2">
          <Calendar className="size-4.5 text-sand shrink-0" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-sand">
            Agustus 2026
          </span>
        </div>
        <span className="inline-block size-2.5 rounded-full bg-rust animate-pulse" />
      </div>

      {/* Date display */}
      <div className="px-5 py-7 text-center bg-gradient-to-b from-cream to-sand/20">
        <span className="block font-display text-7xl sm:text-8xl leading-none text-forest-deep drop-shadow-sm font-black">
          12
        </span>
        <span className="mt-3 inline-block rounded-full bg-rust/15 px-4 py-1.5 text-xs sm:text-sm font-black text-rust">
          Hari Pertama Orientasi
        </span>
      </div>

      {/* Ticket Footer */}
      <div className="border-t border-dashed border-forest/20 px-5 py-3.5 text-center bg-cream/90 flex items-center justify-center gap-2 text-xs sm:text-sm font-extrabold text-forest-deep">
        <MapPin className="size-4 text-rust shrink-0" />
        <span>Telkom University Purwokerto</span>
      </div>
    </motion.div>
  );
}
