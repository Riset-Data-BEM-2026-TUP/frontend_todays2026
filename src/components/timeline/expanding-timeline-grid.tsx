'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import anime from 'animejs';
import { TimelineDayCard } from './timeline-day-card';
import { TimelineExpandedDetail } from './timeline-expanded-detail';
import { type DayTimelineData } from './timeline-data';
import { apiFetch } from '@/lib/api/client';
import { Compass, Loader2 } from 'lucide-react';

interface ExpandingTimelineGridProps {
  showHeader?: boolean;
  /** Data event dari server (SSR). Bila diberikan, grid TIDAK fetch di client
   *  → tampil di mana saja (termasuk akses publik/tunnel). */
  events?: ApiEvent[];
}

/** Bentuk TimelineEvent dari backend (GET /timeline) — termasuk field materi BUMPER. */
export type ApiEvent = {
  id: string;
  judul: string;
  deskripsi?: string | null;
  lokasi?: string | null;
  day?: number | null;
  sesi?: string | null;
  pematerian?: string | null;
  namaPemateri?: string | null;
  fotoUrl?: string | null;
  pptUrl?: string | null;
  startAt: string;
  endAt?: string | null;
  checklistItems?: string[] | null;
  dresscode?: string | null;
  urutan?: number;
  status: 'upcoming' | 'ongoing' | 'completed';
};

const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const pad = (n: number) => String(n).padStart(2, '0');

const jam = (d: Date) => `${pad(d.getHours())}.${pad(d.getMinutes())}`;
const fmtTanggal = (d: Date) => `${pad(d.getDate())} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;

/**
 * Bangun kartu publik hanya dari agenda utama di database.
 * Event BUMPER TALENT tetap tersimpan di database, tetapi detail rundown-nya
 * tidak dipublikasikan pada timeline peserta.
 */
function buildDays(events: ApiEvent[]): DayTimelineData[] {
  return events
    .filter((event) => event.day == null)
    .map((event) => {
      const start = new Date(event.startAt);
      const end = event.endAt ? new Date(event.endAt) : null;
      const timeRange = end ? `${jam(start)} – ${jam(end)} WIB` : `${jam(start)} WIB`;

      return {
        id: event.id,
        dayNumber: '',
        dayLabel: HARI[start.getDay()],
        dateStr: fmtTanggal(start),
        title: event.judul,
        summary: event.deskripsi ?? '',
        timeRange,
        location: event.lokasi ?? '',
        status: event.status,
        dresscode: event.dresscode ?? null,
        checklist: Array.isArray(event.checklistItems) ? event.checklistItems : [],
        mapUrl: undefined,
        sortKey: start.getTime(),
      };
    })
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ sortKey: _sortKey, ...day }, index) => ({ ...day, dayNumber: pad(index + 1) }));
}

export function ExpandingTimelineGrid({ showHeader = true, events }: ExpandingTimelineGridProps) {
  const [days, setDays] = useState<DayTimelineData[]>(() => (events ? buildDays(events) : []));
  const [loading, setLoading] = useState(!events);
  const [selectedDay, setSelectedDay] = useState<DayTimelineData | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Ambil agenda dari backend. Bila `events` sudah dikirim dari server (SSR) →
  // pakai itu (tak perlu fetch client, aman untuk akses publik/tunnel).
  useEffect(() => {
    if (events) {
      setDays(buildDays(events));
      setLoading(false);
      return;
    }
    let alive = true;
    apiFetch<ApiEvent[]>('/timeline')
      .then((data) => {
        if (alive) setDays(buildDays(Array.isArray(data) ? data : []));
      })
      .catch(() => {
        if (alive) setDays([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [events]);

  // Lock background body scroll and stop Lenis smooth scroll when modal is open
  useEffect(() => {
    if (selectedDay) {
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
  }, [selectedDay]);

  // Entrance animation for grid cards — jalan setelah data termuat.
  useEffect(() => {
    if (!containerRef.current || days.length === 0) return;
    anime({
      targets: containerRef.current.querySelectorAll('.day-grid-card'),
      translateY: [35, 0],
      opacity: [0, 1],
      delay: anime.stagger(120, { start: 100 }),
      easing: 'easeOutCubic',
      duration: 700,
    });
  }, [days]);

  // Handle card click and trigger Anime.js expansion
  const handleCardClick = (day: DayTimelineData, rect: DOMRect) => {
    setSelectedDay(day);

    // Fade and scale down sibling cards with Anime.js stagger
    if (containerRef.current) {
      anime({
        targets: containerRef.current.querySelectorAll('.day-grid-card'),
        opacity: 0.35,
        scale: 0.97,
        delay: anime.stagger(50),
        duration: 350,
        easing: 'easeOutSine',
      });
    }

    // Trigger overlay entrance animation after DOM render
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
          setSelectedDay(null);

          // Restore sibling cards
          if (containerRef.current) {
            anime({
              targets: containerRef.current.querySelectorAll('.day-grid-card'),
              opacity: 1,
              scale: 1,
              delay: anime.stagger(40),
              duration: 400,
              easing: 'easeOutQuad',
            });
          }
        },
      });
    } else {
      setSelectedDay(null);
    }
  };

  return (
    <div className={`relative ${showHeader ? 'border-t border-forest/15 pt-10' : ''}`}>
      {/* Optional Section Header */}
      {showHeader && (
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-forest-deep">
              Itinerary Orientasi BHUMARA
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-forest/80">
              Empat pemberhentian utama perjalanan PKKMB Telkom University Purwokerto 2026.
            </p>
          </div>

          <div className="hidden sm:flex size-12 items-center justify-center rounded-2xl bg-forest-deep/10 text-rust">
            <Compass className="size-6 animate-spin-slow" />
          </div>
        </div>
      )}

      {/* Loading & empty states */}
      {loading && (
        <div className="flex items-center justify-center gap-2 py-16 text-sm font-bold text-forest/70">
          <Loader2 className="size-5 animate-spin text-rust" /> Memuat agenda dari server...
        </div>
      )}
      {!loading && days.length === 0 && (
        <div className="rounded-3xl border border-dashed border-sand/70 bg-cream/50 py-16 text-center">
          <Compass className="mx-auto mb-2 size-8 text-forest/40" />
          <p className="text-sm font-bold text-forest-deep">Belum ada agenda</p>
          <p className="mt-1 text-xs text-forest/70">Agenda akan tampil setelah panitia menambahkannya.</p>
        </div>
      )}

      {/* Grid of Day Cards */}
      <div ref={containerRef} className={`grid gap-4 sm:gap-5 ${loading || days.length === 0 ? 'hidden' : ''}`}>
        {days.map((day, index) => (
          <TimelineDayCard
            key={day.id}
            day={day}
            onClick={(rect) => handleCardClick(day, rect)}
            isEven={index % 2 === 0}
          />
        ))}
      </div>

      {/* EXPANDED MODAL OVERLAY (Wide Horizontal Panel) */}
      {selectedDay &&
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
              <TimelineExpandedDetail day={selectedDay} onClose={handleClose} />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
