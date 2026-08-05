'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, Filter, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import { CAMPUS_SPOTS, type CampusSpotItem } from './campus-tour-data';
import { CampusSpotCard } from './campus-spot-card';
import { CampusSpotExpandedDetail } from './campus-spot-expanded-detail';

export function ExpandingCampusGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<CampusSpotItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('Semua');
    CAMPUS_SPOTS.forEach((item) => set.add(item.kategori));
    return Array.from(set);
  }, []);

  const filteredSpots = useMemo(() => {
    return CAMPUS_SPOTS.filter((item) => {
      const matchCat = selectedCategory === 'Semua' || item.kategori === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.nama.toLowerCase().includes(q) ||
        item.lokasi.toLowerCase().includes(q) ||
        item.deskripsi.toLowerCase().includes(q) ||
        item.fasilitas.some((f) => f.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Anime.js staggered entrance animation on filter/search change
  useEffect(() => {
    const validCards = cardsRef.current.filter(Boolean);
    if (validCards.length > 0) {
      anime({
        targets: validCards,
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.95, 1],
        delay: anime.stagger(70, { start: 30 }),
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        duration: 500,
      });
    }
  }, [filteredSpots]);

  // Scroll locking & Lenis pause when detail modal is open
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('lenis-stopped');
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('lenis-stopped');
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('lenis-stopped');
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [activeItem]);

  return (
    <div className="space-y-8">
      {/* Controls Header: Search Bar & Category Filter Chips */}
      <div className="flex flex-col gap-4">
        {/* Top Row: Search Bar */}
        <div className="relative w-full max-w-xl flex items-center gap-3 rounded-2xl border border-sand bg-cream px-4 py-3 shadow-sm focus-within:border-rust focus-within:ring-2 focus-within:ring-rust/20 transition-all">
          <Search size={18} className="text-forest/60 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari Auditorium, Library, Lab RPL..."
            className="w-full bg-transparent text-sm sm:text-base text-ink outline-none placeholder:text-forest/50 font-medium"
          />
        </div>

        {/* Bottom Row: Category Pills Wrap (No Cut-Offs) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
          <span className="text-xs font-black uppercase tracking-wider text-rust flex items-center gap-1.5 mr-1">
            <Filter size={15} className="text-rust shrink-0" />
            <span>Kategori:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-rust text-cream shadow-md scale-105'
                  : 'bg-sand/30 text-forest-deep hover:bg-sand/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Campus Spots Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSpots.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
          >
            <CampusSpotCard item={item} onClick={() => setActiveItem(item)} />
          </div>
        ))}
      </div>

      {filteredSpots.length === 0 && (
        <div className="py-16 text-center rounded-3xl border border-dashed border-sand/60 bg-cream/50">
          <HelpCircle size={40} className="mx-auto text-forest/40 mb-3" />
          <h3 className="font-display text-xl font-bold text-forest-deep">
            Lokasi Kampus Tidak Ditemukan
          </h3>
          <p className="mt-1 text-sm text-forest/80 font-medium">
            Coba gunakan kata kunci lain atau pilih kategori "Semua".
          </p>
        </div>
      )}

      {/* Detail Modal Overlay (Portal ke Body, 100% Fullscreen Overlay) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveItem(null)}
                className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md overflow-hidden"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 25, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.9, y: 25, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-6xl mt-12 sm:mt-14"
                >
                  <CampusSpotExpandedDetail item={activeItem} onClose={() => setActiveItem(null)} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
