'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import anime from 'animejs';
import { TimelineDayCard } from './timeline-day-card';
import { TimelineExpandedDetail } from './timeline-expanded-detail';
import { INITIAL_TIMELINE_DAYS, type DayTimelineData } from './timeline-data';
import { Compass, Sparkles } from 'lucide-react';

interface ExpandingTimelineGridProps {
  showHeader?: boolean;
}

export function ExpandingTimelineGrid({ showHeader = true }: ExpandingTimelineGridProps) {
  const [days] = useState<DayTimelineData[]>(INITIAL_TIMELINE_DAYS);
  const [selectedDay, setSelectedDay] = useState<DayTimelineData | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

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

  // Entrance animation for grid cards on mount
  useEffect(() => {
    if (!containerRef.current) return;
    anime({
      targets: containerRef.current.querySelectorAll('.day-grid-card'),
      translateY: [35, 0],
      opacity: [0, 1],
      delay: anime.stagger(120, { start: 100 }),
      easing: 'easeOutCubic',
      duration: 700,
    });
  }, []);

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
            <div className="inline-flex items-center gap-2 rounded-full bg-rust/10 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-rust mb-2">
              <Sparkles className="size-3.5" /> Klik Setiap Hari Untuk Detail
            </div>
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

      {/* Grid of Day Cards */}
      <div ref={containerRef} className="grid gap-4 sm:gap-5">
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
