'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import anime from 'animejs';
import { Search, Filter, Users } from 'lucide-react';
import { OrmawaCard } from './ormawa-card';
import { OrmawaExpandedDetail } from './ormawa-expanded-detail';
import { INITIAL_ORMAWA_LIST, ORMAWA_CATEGORIES, type OrmawaItem } from './ormawa-data';

export function ExpandingOrmawaGrid() {
  const [selectedCat, setSelectedCat] = useState('Semua');
  const [search, setSearch] = useState('');
  const [selectedOrmawa, setSelectedOrmawa] = useState<OrmawaItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Filter items
  const filtered = useMemo(() => {
    return INITIAL_ORMAWA_LIST.filter((item) => {
      const matchCat = selectedCat === 'Semua' || item.kategori === selectedCat;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.nama.toLowerCase().includes(q) ||
        item.singkatan.toLowerCase().includes(q) ||
        item.deskripsi.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [selectedCat, search]);

  // Lock background body scroll and stop Lenis smooth scroll when modal is open
  useEffect(() => {
    if (selectedOrmawa) {
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('lenis-stopped');
      window.__lenis?.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
      window.__lenis?.start();
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
      window.__lenis?.start();
    };
  }, [selectedOrmawa]);

  // Staggered grid entrance animation with Anime.js
  useEffect(() => {
    if (!containerRef.current) return;
    anime({
      targets: containerRef.current.querySelectorAll('.ormawa-grid-card'),
      translateY: [35, 0],
      opacity: [0, 1],
      scale: [0.95, 1],
      delay: anime.stagger(90, { start: 50 }),
      easing: 'easeOutCubic',
      duration: 600,
    });
  }, [filtered.length, selectedCat]);

  // Handle card click & Anime.js expansion
  const handleCardClick = (item: OrmawaItem, rect: DOMRect) => {
    setSelectedOrmawa(item);

    // Fade and scale down sibling cards with Anime.js stagger
    if (containerRef.current) {
      anime({
        targets: containerRef.current.querySelectorAll('.ormawa-grid-card'),
        opacity: 0.35,
        scale: 0.96,
        delay: anime.stagger(40),
        duration: 350,
        easing: 'easeOutSine',
      });
    }

    // Trigger overlay entrance animation
    requestAnimationFrame(() => {
      if (modalOverlayRef.current && modalContentRef.current) {
        anime({
          targets: modalOverlayRef.current,
          opacity: [0, 1],
          duration: 300,
          easing: 'linear',
        });

        anime({
          targets: modalContentRef.current,
          scale: [0.92, 1],
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 450,
          easing: 'easeOutCubic',
        });
      }
    });
  };

  // Close expanded view with reverse Anime.js animation
  const handleClose = () => {
    if (modalOverlayRef.current && modalContentRef.current) {
      anime({
        targets: modalOverlayRef.current,
        opacity: [1, 0],
        duration: 250,
        easing: 'linear',
      });

      anime({
        targets: modalContentRef.current,
        scale: [1, 0.92],
        translateY: [0, 20],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInCubic',
        complete: () => {
          setSelectedOrmawa(null);

          // Restore sibling cards
          if (containerRef.current) {
            anime({
              targets: containerRef.current.querySelectorAll('.ormawa-grid-card'),
              opacity: 1,
              scale: 1,
              delay: anime.stagger(30),
              duration: 400,
              easing: 'easeOutQuad',
            });
          }
        },
      });
    } else {
      setSelectedOrmawa(null);
    }
  };

  return (
    <div className="space-y-10">
      {/* Controls & Filter Bar */}
      <div className="flex flex-col gap-4">
        {/* Top Row: Search Bar */}
        <div className="relative w-full max-w-xl flex items-center rounded-2xl border border-sand bg-cream px-4 py-3 shadow-sm focus-within:border-rust focus-within:ring-2 focus-within:ring-rust/20 transition-all">
          <Search size={18} className="text-forest/60 shrink-0 mr-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama Ormawa, UKM, atau minat..."
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-forest/50"
          />
        </div>

        {/* Bottom Row: Category Chips Wrap (No Cut-Offs) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
          <span className="text-xs font-black uppercase tracking-wider text-rust flex items-center gap-1.5 mr-1">
            <Filter size={15} className="text-rust shrink-0" />
            <span>Kategori:</span>
          </span>
          {ORMAWA_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                selectedCat === cat
                  ? 'bg-rust text-cream shadow-md scale-105'
                  : 'bg-sand/30 text-forest-deep hover:bg-sand/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Ormawa Cards */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((item) => (
          <OrmawaCard
            key={item.id}
            item={item}
            onClick={(rect) => handleCardClick(item, rect)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center rounded-3xl border border-dashed border-sand/60 bg-cream/50">
          <Users size={40} className="mx-auto text-forest/40 mb-3" />
          <p className="font-display text-lg font-bold text-forest-deep">
            Tidak ada Ormawa yang ditemukan
          </p>
          <p className="mt-1 text-sm text-forest/70">
            Coba ubah kata kunci pencarian atau kategori filter Anda.
          </p>
        </div>
      )}

      {/* EXPANDED MODAL OVERLAY (Wide Horizontal Panel) */}
      {selectedOrmawa &&
        typeof window !== 'undefined' &&
        createPortal(
          <div
            ref={modalOverlayRef}
            data-lenis-prevent
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-hidden"
            onClick={handleClose}
          >
            <div
              ref={modalContentRef}
              className="w-full max-w-6xl mt-12 sm:mt-14"
              onClick={(e) => e.stopPropagation()}
            >
              <OrmawaExpandedDetail item={selectedOrmawa} onClose={handleClose} />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
