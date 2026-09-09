'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { AtmosphericHeroBackground } from '@/components/ui/atmospheric-hero-background';
import { ChevronDown } from 'lucide-react';
import { MaskedText } from '@/components/ui/masked-reveal';

interface FullpageHeroExperienceProps {
  tagline?: string;
  tema?: string;
  /** Judul step "Tema" — dari setting `about.tema_judul` (editable via admin). */
  temaJudul?: string;
}

/**
 * Framer Motion frame-by-frame scroll animation.
 */
function animateScrollTo(
  targetY: number,
  opts: { duration?: number; startLenisAfter?: boolean; onComplete?: () => void },
) {
  const lenis = window.__lenis;
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
  tema,
  temaJudul,
}: FullpageHeroExperienceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const isAnimatingRef = useRef(false);
  const cooldownUntilRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const steps = [
    { key: 'hero', label: 'Utama', title: 'Banner Utama' },
    { key: 'tema', title: temaJudul || 'Tema PKKMB 2026', text: tema, num: '01' },
  ];

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
      const t1 = setTimeout(tryStop, 50);
      const t2 = setTimeout(tryStop, 150);
      const t3 = setTimeout(tryStop, 400);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, []);

  useEffect(() => {
    if (window.scrollY <= 50) {
      return ensureLenisStopped();
    }
  }, [ensureLenisStopped]);

  const handleStepChange = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimatingRef.current || Date.now() < cooldownUntilRef.current) return;
      isAnimatingRef.current = true;

      if (direction === 'next') {
        setSlideDirection(1);
        if (currentStep < steps.length - 1) {
          setCurrentStep((prev) => prev + 1);
          cooldownUntilRef.current = Date.now() + 600;
        } else {
          cooldownUntilRef.current = Date.now() + 1050;
          const nextEl = document.getElementById('after-hero');
          const target = nextEl ? nextEl.offsetTop : window.innerHeight;
          animateScrollTo(target, {
            duration: 0.9,
            startLenisAfter: true,
          });
        }
      } else {
        setSlideDirection(-1);
        if (currentStep > 0) {
          setCurrentStep((prev) => prev - 1);
          cooldownUntilRef.current = Date.now() + 600;
        }
      }

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 600);
    },
    [currentStep, steps.length]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const scrollY = window.scrollY;

      if (now < cooldownUntilRef.current) {
        e.preventDefault();
        e.stopPropagation();
        accumulatedDeltaRef.current = 0;
        return;
      }

      const featuresEl = document.getElementById('after-hero');
      const featuresOffset = featuresEl ? featuresEl.offsetTop : window.innerHeight;

      if (scrollY > 50) {
        if (e.deltaY < 0 && scrollY <= featuresOffset + 300) {
          e.preventDefault();
          e.stopPropagation();
          cooldownUntilRef.current = now + 1050;
          accumulatedDeltaRef.current = 0;
          animateScrollTo(0, {
            duration: 0.9,
            startLenisAfter: false,
            onComplete: () => {
              setSlideDirection(-1);
              setCurrentStep(steps.length - 1);
            },
          });
          return;
        }
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      accumulatedDeltaRef.current += e.deltaY;

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
      const featuresEl = document.getElementById('after-hero');
      const featuresOffset = featuresEl ? featuresEl.offsetTop : window.innerHeight;

      if (scrollY > 50) {
        if (deltaY < 0 && scrollY <= featuresOffset + 300) {
          e.preventDefault();
          cooldownUntilRef.current = now + 1050;
          animateScrollTo(0, {
            duration: 0.9,
            startLenisAfter: false,
            onComplete: () => {
              setSlideDirection(-1);
              setCurrentStep(steps.length - 1);
            },
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
      if (window.scrollY > 50) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        handleStepChange('next');
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        handleStepChange('prev');
      }
    };

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

  useEffect(() => {
    return () => {
      const lenis = window.__lenis;
      if (lenis) lenis.start();
    };
  }, []);

  // Framer motion directional slide variants (optimized for 60fps)
  const slideVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 35 : -35,
      scale: 0.98,
    }),
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -35 : 35,
      scale: 0.98,
      transition: {
        duration: 0.28,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <div
      ref={containerRef}
      className="relative z-[101] h-screen w-full overflow-hidden text-ink flex items-center justify-center select-none"
    >
      {/* Latar langit 2D (gradient + matahari + awan) */}
      <AtmosphericHeroBackground />

      {/* Main Hero Deck Stage (Centered Single Layout) */}
      <div className="relative z-10 mx-auto flex max-w-4xl w-full flex-col items-center justify-center px-4 sm:px-8 pointer-events-auto text-center">
        <AnimatePresence mode="wait" custom={slideDirection}>
          {currentStep === 0 ? (
            <motion.div
              key="hero-content"
              custom={slideDirection}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center text-center max-w-3xl"
            >
              {/* Logo PKKMB melayang lembut (kecil, minimalis) di atas judul */}
              <motion.div
                animate={{ y: [-5, 5], rotate: [-1.5, 1.5] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="mb-3"
              >
                <Image
                  src="/logo-pkkmb.png"
                  alt="Logo PKKMB Telkom University Purwokerto 2026"
                  width={240}
                  height={240}
                  priority
                  className="w-32 sm:w-40 lg:w-48 drop-shadow-[0_12px_24px_rgba(30,60,100,0.28)]"
                />
              </motion.div>

              {/* Title — bubbly emas ala Figma "READY" */}
              <h1 className="font-display text-6xl font-extrabold tracking-wide sm:text-8xl lg:text-9xl text-bubbly">
                <MaskedText text="BHUMARA" as="span" />
              </h1>

              {/* Tagline */}
              <p className="mt-4 text-lg sm:text-2xl font-bold text-forest-deep leading-relaxed max-w-2xl drop-shadow-[0_2px_6px_rgba(255,255,255,0.6)]">
                {tagline ?? 'Growing Today, Thriving Tomorrow'}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/cari-kelompok"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-rust px-8 py-3.5 text-base font-extrabold text-cream shadow-[0_10px_25px_rgba(180,106,50,0.35)] hover:bg-rust/90 hover:scale-105 transition-all duration-300"
                >
                  Kelompok
                </Link>

                <button
                  onClick={() => handleStepChange('next')}
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full border-2 border-forest-deep/30 bg-cream/80 px-8 py-3.5 text-base font-extrabold text-forest-deep shadow-[0_8px_20px_rgba(62,69,48,0.12)] hover:bg-cream hover:border-rust hover:text-rust hover:scale-105 backdrop-blur-md transition-all duration-300 cursor-pointer"
                >
                  Eksplorasi Nilai PKKMB
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`step-${currentStep}`}
              custom={slideDirection}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
            >
              {/* Maskot Galih sebagai "mark" di atas — selaras hierarki intro (logo → judul → tagline) */}
              <Image
                src="/images/sky/galih-hi.png"
                alt="Maskot Galih PKKMB"
                width={400}
                height={592}
                priority
                className="animate-sky-float pointer-events-none mb-3 w-32 select-none drop-shadow-[0_16px_26px_rgba(30,60,100,0.3)] sm:w-40 lg:w-44"
              />

              <h3 className="font-display text-4xl sm:text-6xl text-forest-deep leading-tight drop-shadow-[0_2px_6px_rgba(255,255,255,0.6)]">
                {steps[currentStep].title}
              </h3>
              <p className="mt-4 max-w-xl text-lg sm:text-2xl font-bold text-forest-deep/90 leading-relaxed drop-shadow-[0_2px_6px_rgba(255,255,255,0.6)]">
                {steps[currentStep].text ?? '—'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Center Scroll Hint (100% Perfectly Centered Viewport Container) */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center justify-center text-center pointer-events-none">
        <motion.button
          onClick={() => handleStepChange('next')}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-auto flex flex-col items-center justify-center text-center gap-1 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-forest-deep drop-shadow-[0_2px_4px_rgba(240,249,255,0.9)] hover:text-rust transition-colors cursor-pointer"
        >
          <span className="text-center">
            {currentStep === steps.length - 1 ? 'Lanjut Ke Fitur PKKMB' : 'Scroll saja'}
          </span>
          <ChevronDown size={20} className="text-rust" />
        </motion.button>
      </div>
    </div>
  );
}


