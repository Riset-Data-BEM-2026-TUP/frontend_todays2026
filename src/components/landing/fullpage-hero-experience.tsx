'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { FloatingOrbs, TextReveal, FloatingBadge } from '@/components/ui/animated-section';
import { ChevronDown } from 'lucide-react';

interface FullpageHeroExperienceProps {
  tagline?: string;
  filosofi?: string;
  tema?: string;
  maknaLogo?: string;
  maknaMaskot?: string;
}

/**
 * Framer Motion frame-by-frame scroll animation.
 * Independent of Lenis — stops Lenis first, animates, then optionally restarts.
 */
function animateScrollTo(
  targetY: number,
  opts: { duration?: number; startLenisAfter?: boolean; onComplete?: () => void },
) {
  const lenis = window.__lenis;
  // Stop Lenis to prevent it from fighting our scroll animation
  if (lenis) lenis.stop();

  const startY = window.scrollY;
  if (Math.abs(startY - targetY) < 5) {
    if (opts.startLenisAfter && lenis) lenis.start();
    if (opts.onComplete) opts.onComplete();
    return;
  }

  animate(startY, targetY, {
    duration: opts.duration ?? 0.85,
    ease: [0.16, 1, 0.3, 1],
    onUpdate: (v) => window.scrollTo(0, v),
    onComplete: () => {
      if (opts.startLenisAfter && lenis) lenis.start();
      if (opts.onComplete) opts.onComplete();
    },
  });
}

export function FullpageHeroExperience({
  tagline,
  filosofi,
  tema,
  maknaLogo,
  maknaMaskot,
}: FullpageHeroExperienceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const isAnimatingRef = useRef(false);
  const cooldownUntilRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const steps = [
    { key: 'hero', label: 'Utama' },
    { key: 'filosofi', title: 'Filosofi BHUMARA', text: filosofi, num: '01' },
    { key: 'tema', title: 'Tema PKKMB 2026', text: tema, num: '02' },
    { key: 'makna_logo', title: 'Makna Logo', text: maknaLogo, num: '03' },
    { key: 'makna_maskot', title: 'Makna Maskot', text: maknaMaskot, num: '04' },
  ];

  /**
   * Robust Lenis stop — retries until Lenis instance exists.
   * Solves the race condition where Hero mounts before Lenis is created.
   */
  const ensureLenisStopped = useCallback(() => {
    const tryStop = () => {
      const lenis = window.__lenis;
      if (lenis) {
        lenis.stop();
        return true;
      }
      return false;
    };
    if (!tryStop()) {
      // Retry: Lenis hasn't initialized yet
      const t1 = setTimeout(tryStop, 50);
      const t2 = setTimeout(tryStop, 150);
      const t3 = setTimeout(tryStop, 400);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, []);

  // On mount: ensure Lenis is stopped while we're in the hero deck
  useEffect(() => {
    if (window.scrollY <= 50) {
      return ensureLenisStopped();
    }
  }, [ensureLenisStopped]);

  const handleStepChange = useCallback((direction: 'next' | 'prev') => {
    if (isAnimatingRef.current || Date.now() < cooldownUntilRef.current) return;
    isAnimatingRef.current = true;

    if (direction === 'next') {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        cooldownUntilRef.current = Date.now() + 600;
      } else {
        // Transition Hero Deck → Features Section
        cooldownUntilRef.current = Date.now() + 1050;
        const featuresEl = document.getElementById('features-section');
        if (featuresEl) {
          animateScrollTo(featuresEl.offsetTop, {
            duration: 0.9,
            startLenisAfter: true, // Re-enable Lenis for normal scrolling below
          });
        }
      }
    } else {
      if (currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
        cooldownUntilRef.current = Date.now() + 600;
      }
    }

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 600);
  }, [currentStep, steps.length]);

  useEffect(() => {
    /**
     * CAPTURE PHASE wheel handler.
     * Runs BEFORE Lenis's bubble-phase listener.
     * Uses stopPropagation() to prevent Lenis from ever seeing the event.
     */
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const scrollY = window.scrollY;

      // Active animation cooldown — block everything including Lenis
      if (now < cooldownUntilRef.current) {
        e.preventDefault();
        e.stopPropagation();
        accumulatedDeltaRef.current = 0;
        return;
      }

      const featuresEl = document.getElementById('features-section');
      const featuresOffset = featuresEl ? featuresEl.offsetTop : window.innerHeight;

      // === ZONE 1: Page scrolled past hero deck (features section or below) ===
      if (scrollY > 50) {
        // Scroll UP near top of features → snap back to Hero Deck
        if (e.deltaY < 0 && scrollY <= featuresOffset + 300) {
          e.preventDefault();
          e.stopPropagation();
          cooldownUntilRef.current = now + 1050;
          accumulatedDeltaRef.current = 0;
          animateScrollTo(0, {
            duration: 0.9,
            startLenisAfter: false, // Keep Lenis stopped at hero deck
            onComplete: () => setCurrentStep(steps.length - 1),
          });
          return;
        }
        // Scrolling further down (Timeline/FAQ/Footer) → let event through to Lenis
        return;
      }

      // === ZONE 2: At Hero Deck (scrollY <= 50) ===
      // Block BOTH native scroll AND Lenis
      e.preventDefault();
      e.stopPropagation();

      accumulatedDeltaRef.current += e.deltaY;

      // Touchpad & mouse wheel accumulator threshold
      if (Math.abs(accumulatedDeltaRef.current) >= 16) {
        const dir = accumulatedDeltaRef.current > 0 ? 'next' : 'prev';
        accumulatedDeltaRef.current = 0;
        handleStepChange(dir);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now < cooldownUntilRef.current) return;

      const touchEndY = e.changedTouches[0]?.clientY || 0;
      const deltaY = touchStartY.current - touchEndY;
      if (Math.abs(deltaY) < 35) return;

      const scrollY = window.scrollY;
      const featuresEl = document.getElementById('features-section');
      const featuresOffset = featuresEl ? featuresEl.offsetTop : window.innerHeight;

      if (scrollY > 50) {
        if (deltaY < 0 && scrollY <= featuresOffset + 300) {
          e.preventDefault();
          cooldownUntilRef.current = now + 1050;
          animateScrollTo(0, {
            duration: 0.9,
            startLenisAfter: false,
            onComplete: () => setCurrentStep(steps.length - 1),
          });
          return;
        }
        return;
      }

      if (deltaY > 0) {
        handleStepChange('next');
      } else {
        handleStepChange('prev');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.scrollY > 50) return; // Let normal keyboard scroll work below hero
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        handleStepChange('next');
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        handleStepChange('prev');
      }
    };

    // KEY: capture: true → runs BEFORE Lenis's bubble-phase listener
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentStep, steps.length, handleStepChange]);

  // Cleanup: re-start Lenis when this component unmounts (page navigation)
  useEffect(() => {
    return () => {
      const lenis = window.__lenis;
      if (lenis) lenis.start();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-forest-deep text-cream flex items-center justify-center select-none"
    >
      <FloatingOrbs />
      <div className="pointer-events-none absolute inset-0 opacity-15 bhumara-pattern-bg" />

      <motion.div
        animate={{
          scale: currentStep === 0 ? 1 : 1.2,
          opacity: currentStep === 0 ? 0.35 : 0.7,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sage/30 via-forest-deep to-forest-deep"
      />

      <div className="relative z-10 mx-auto flex max-w-6xl w-full flex-col lg:flex-row items-center justify-between px-6 gap-8">
        {/* Emblem & Logo Stage */}
        <div className="relative flex items-center justify-center size-64 sm:size-80 lg:size-[420px] shrink-0">
          <motion.div
            animate={{ rotate: currentStep * 90 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-sage/40"
          />
          <motion.div
            animate={{ rotate: -currentStep * 90 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-5 rounded-full border border-rust/50"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 size-4 rounded-full bg-rust shadow-[0_0_12px_#B46A32]" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 size-4 rounded-full bg-sage shadow-[0_0_12px_#9CAF88]" />
          </motion.div>

          <motion.div
            animate={{
              scale: currentStep === 0 ? 1 : 1.12,
              y: [0, -6, 0],
            }}
            transition={{
              scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="relative z-10 cursor-pointer drop-shadow-2xl"
            onClick={() => setCurrentStep(0)}
          >
            <Image
              src="/logo-pkkmb.png"
              alt="Logo BHUMARA Emblem"
              width={200}
              height={200}
              priority
              className="w-36 sm:w-48 lg:w-56 drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)]"
            />
          </motion.div>
        </div>

        {/* Content Panel Stage */}
        <div className="relative flex-1 w-full max-w-xl min-h-[340px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentStep === 0 ? (
              <motion.div
                key="hero-content"
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <div className="mb-4">
                  <FloatingBadge text="PKKMB Telkom University Purwokerto 2026" />
                </div>

                <h1 className="font-display text-5xl font-extrabold tracking-widest sm:text-7xl lg:text-8xl bg-gradient-to-b from-cream via-cream to-sage/80 bg-clip-text text-transparent drop-shadow-md">
                  BHUMARA
                </h1>

                <p className="mt-3 text-lg sm:text-xl font-medium text-cream/90 leading-relaxed max-w-lg">
                  <TextReveal text={tagline ?? 'Growing Today, Thriving Tomorrow'} delay={0.2} />
                </p>

                <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
                  <Link
                    href="/login"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-rust px-8 py-3 text-base font-semibold text-cream shadow-[0_10px_25px_rgba(180,106,50,0.4)] hover:bg-rust/90 transition-all duration-300"
                  >
                    Login
                  </Link>

                  <button
                    onClick={() => handleStepChange('next')}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-cream/40 px-8 py-3 text-base font-semibold text-cream hover:bg-cream/10 backdrop-blur-md transition-all duration-300"
                  >
                    Mulai Jelajah &rarr;
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -35, scale: 0.95 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col justify-center rounded-3xl border border-cream/20 bg-cream/10 p-8 sm:p-10 backdrop-blur-xl shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-cream/15 pb-4 mb-4">
                  <span className="font-display text-xs font-extrabold uppercase tracking-widest text-rust">
                    NILAI DASAR BHUMARA
                  </span>
                  <span className="font-display text-2xl font-black text-sage/80">
                    {steps[currentStep].num}
                  </span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-black text-cream">
                  {steps[currentStep].title}
                </h3>
                <p className="mt-4 text-base sm:text-lg text-cream/90 font-medium leading-relaxed">
                  {steps[currentStep].text ?? '—'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Step Scrubber Dots */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3.5 z-20">
        {steps.map((s, idx) => (
          <button
            key={s.key}
            onClick={() => setCurrentStep(idx)}
            className="group relative flex items-center justify-end"
            aria-label={`Ke Step ${s.label || s.title}`}
          >
            <span className="absolute right-7 rounded-md bg-forest-deep/90 border border-cream/20 px-2.5 py-1 text-xs font-bold text-cream opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {s.title || 'Banner Utama'}
            </span>
            <span
              className={`size-3.5 rounded-full border transition-all duration-300 ${
                currentStep === idx
                  ? 'border-rust bg-rust scale-125 shadow-[0_0_10px_#B46A32]'
                  : 'border-cream/40 bg-cream/20 hover:bg-cream/50'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Bottom Hint */}
      <motion.button
        onClick={() => handleStepChange('next')}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-wider text-cream/70 hover:text-cream transition-colors z-20 cursor-pointer"
      >
        <span>
          {currentStep === steps.length - 1 ? 'Lanjut Ke Fitur PKKMB' : 'Scroll / Klik Untuk Lanjut'}
        </span>
        <ChevronDown size={18} className="text-rust" />
      </motion.button>
    </div>
  );
}
