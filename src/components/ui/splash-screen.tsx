'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cek apakah splashscreen sudah pernah tampil di sesi browser ini
    const hasShown = sessionStorage.getItem('bhumara_splash_shown');
    if (hasShown) {
      return; // Jangan tampilkan lagi di klik/navigasi/refresh berikutnya dalam 1 sesi
    }

    setIsVisible(true);

    // Animasi progress yang lebih responsif (total ~600ms)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          sessionStorage.setItem('bhumara_splash_shown', 'true');
          setTimeout(() => setIsVisible(false), 200);
          return 100;
        }
        return prev + 10;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-forest-deep text-cream overflow-hidden ${
            progress >= 100 ? 'pointer-events-none' : ''
          }`}
        >
          {/* Ambient Glow Background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40 animate-pulse"
            style={{
              background: 'radial-gradient(circle at 50% 45%, rgb(var(--sage)/0.4), transparent 70%)',
            }}
          />

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative flex flex-col items-center text-center px-4"
          >
            {/* Pulsating Logo Ring */}
            <div className="relative flex items-center justify-center mb-6">
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-sage/30 blur-xl"
              />
              <Image
                src="/logo-pkkmb.png"
                alt="BHUMARA 2026 Logo"
                width={130}
                height={130}
                priority
                className="relative drop-shadow-2xl"
              />
            </div>

            {/* Title */}
            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-display text-4xl sm:text-5xl font-extrabold tracking-widest text-cream drop-shadow-md"
            >
              BHUMARA
            </motion.h1>

            {/* Slogan */}
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 0.85 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-2 text-sm sm:text-base text-cream/90 font-medium tracking-wide"
            >
              Growing Today, Thriving Tomorrow
            </motion.p>

            {/* Progress Bar Container */}
            <div className="mt-8 w-48 sm:w-64 h-1.5 rounded-full bg-cream/15 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-sage via-cream to-rust rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="mt-3 text-xs tracking-widest uppercase font-mono text-cream/60"
            >
              PKKMB Telkom University Purwokerto 2026
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
